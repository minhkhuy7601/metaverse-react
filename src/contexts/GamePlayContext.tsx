/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONFIG_MAP } from "@/constant/config";
import { auth, db } from "@/lib/firebase";
import { setLoading } from "@/redux/slices/mapSlice";
import { setQA } from "@/redux/slices/popupQASlice";
import { RootState } from "@/redux/store";
import { MapType } from "@/types/map";
import { MessageType } from "@/types/message";
import { GamePlayContextProps, PlayerType, Position } from "@/types/player";
import { astar } from "@/utils/automove";
import { KeyPressListener } from "@/utils/event";
import { isPerformAction, isSolid } from "@/utils/gameplay";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export const GamePlayContext = createContext<GamePlayContextProps | undefined>(
  undefined
);

export const GamePlayProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const playerIdRef = useRef<string | null>(null);
  const playerRef = useRef<any>(null);
  const listPlayersRef = useRef<any>(null);
  const [currentRoom, setCurrentRoom] = useState<MapType>(CONFIG_MAP["school"]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(
    {} as PlayerType
  );
  const clickPositionMap = useRef<Position>({ x: null, y: null });
  const [players, setPlayers] = useState<Record<string, any>>({});
  const [messages, setMessages] = useState<Record<string, MessageType>>({});
  const qa = useSelector((state: RootState) => state.popupQASlice);
  const currentValueQA = useRef<any>(null);
  let time: NodeJS.Timeout | null = null;
  const listennerPressKeyX = (event: any) => {
    // Check if the pressed key is the "X" key (key code 88 or key identifier "KeyX")

    if (event.keyCode === 88 || event.key === "x" || event.key === "X") {
      if (!qa.question?.length) {
        if (currentValueQA.current) dispatch(setQA(currentValueQA.current));
      }
    }
  };

  async function handleActionPlayer(type: string, value: any) {
    switch (type) {
      case "CHANGE_ROOM": {
        dispatch(setLoading(true));
        new Promise<void>((resolve) => {
          setTimeout(() => {
            handleSetPositionPlayerCurrent(
              value.resetPosition.x,
              value.resetPosition.y
            );
            if (playerIdRef.current) {
              listPlayersRef.current[playerIdRef.current].roomId = value?.name;
              set(
                playerRef.current,
                listPlayersRef.current[playerIdRef.current]
              );
            }
            setCurrentRoom(CONFIG_MAP[value?.name]);
            setCurrentPlayer((curr) => ({
              ...curr,
              roomId: value?.name,
              x: value.resetPosition.x,
              y: value.resetPosition.y,
            }));
            resolve();
          }, 200);
        }).then(() => {
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 200);
        });

        break;
      }
      case "POP_UP_QUESTION": {
        currentValueQA.current = value;
        removeClickPlayerMap();
        document.addEventListener("keydown", listennerPressKeyX);
        break;
      }

      default:
        break;
    }
  }
  function handleSetPositionPlayerCurrent(x: number, y: number) {
    const playerId = playerIdRef.current;
    if (!playerId) return;
    listPlayersRef.current[playerId].x = x;
    listPlayersRef.current[playerId].y = y;
    set(playerRef.current, listPlayersRef.current[playerId]);
  }
  function handleArrowPress(xChange = 0, yChange = 0) {
    const playerId = playerIdRef.current;

    if (!playerId) return;
    if (!listPlayersRef.current[playerId]) return;

    const newX = listPlayersRef.current[playerId].x + xChange;
    const newY = listPlayersRef.current[playerId].y + yChange;

    if (!isSolid(currentRoom.map, newX, newY)) {
      listPlayersRef.current[playerId].x = newX;
      listPlayersRef.current[playerId].y = newY;
      let currentState = listPlayersRef.current[playerId].state;
      if (currentState === 3) {
        currentState = 1;
      } else {
        currentState++;
      }
      listPlayersRef.current[playerId].state = currentState;
      if (xChange === 1) {
        listPlayersRef.current[playerId].direction = "right";
      }
      if (xChange === -1) {
        listPlayersRef.current[playerId].direction = "left";
      }
      if (yChange === 1) {
        listPlayersRef.current[playerId].direction = "bottom";
      }
      if (yChange === -1) {
        listPlayersRef.current[playerId].direction = "top";
      }

      set(playerRef.current, listPlayersRef.current[playerId]);
      document.removeEventListener("keydown", listennerPressKeyX);
      isPerformAction(currentRoom, newX, newY, handleActionPlayer);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    // initEventListener();
    const ArrowUp = new KeyPressListener("ArrowUp", () =>
      handleArrowPress(0, -1)
    );
    const ArrowDown = new KeyPressListener("ArrowDown", () =>
      handleArrowPress(0, 1)
    );
    const ArrowLeft = new KeyPressListener("ArrowLeft", () =>
      handleArrowPress(-1, 0)
    );
    const ArrowRight = new KeyPressListener("ArrowRight", () =>
      handleArrowPress(1, 0)
    );

    return () => {
      ArrowUp.unbind();
      ArrowDown.unbind();
      ArrowLeft.unbind();
      ArrowRight.unbind();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom.id]);
  const handleDirectPlayer = async () => {
    setTimeout(async () => {
      if (time) clearInterval(time);
      const gameContainer = document.querySelector("#game-container");
      if (!gameContainer) return;

      // eslint-dis
      const playerId = playerIdRef.current;
      if (!playerId) return;
      try {
        const race = await astar(
          currentRoom.map,
          [
            listPlayersRef.current[playerId].x,
            listPlayersRef.current[playerId].y,
          ],
          [clickPositionMap.current.x, clickPositionMap.current.y]
        );

        if (race?.length)
          for (let i = 0; i < race.length - 1; i++) {
            const position = race[i];
            const positionNext = race[i + 1];
            const newX = positionNext[0] - position[0];
            const newY = positionNext[1] - position[1];
            const isMoving = handleArrowPress(newX, newY);
            await new Promise((resolve, reject) => {
              time = setTimeout(async () => {
                if (!isMoving) {
                  handleArrowPress(-newX, -newY);
                  reject(1);
                }
                resolve(1);
              }, 200);
            });
          }
      } catch (error) {
        console.log(error);
      }
    }, 0);
  };
  const removeClickPlayerMap = () => {
    const gameContainer = document.querySelector("#game-container");
    if (!gameContainer) return;
    gameContainer.removeEventListener("click", handleDirectPlayer);
  };

  const addClickPlayerMap = () => {
    const gameContainer = document.querySelector("#game-container");
    if (!gameContainer) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gameContainer.addEventListener("click", handleDirectPlayer);
  };
  useEffect(() => {
    if (!qa.question.length) addClickPlayerMap();
    return () => {
      removeClickPlayerMap();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom.id, qa]);
  function initGame() {
    const allPlayersRef = ref(db, `players`);
    onValue(allPlayersRef, (snapshot) => {
      //   console.log("snapshot", snapshot);

      const playersSnapshot = snapshot.val() || {};
      Object.entries(playersSnapshot).forEach(([id, value]: any) => {
        if (value.roomId !== currentRoom.id) {
          delete playersSnapshot[id];
        }
      });
      //   console.log("playersSnapshot", playersSnapshot);
      setPlayers(playersSnapshot);
      listPlayersRef.current = playersSnapshot;
    });
    // initHandleMoveOnClick();
  }

  useEffect(() => {
    const allMessagesRef = ref(db, `messages/${currentRoom.id}`);
    onValue(allMessagesRef, (snapshot) => {
      const messageSnapshot = snapshot.val() || {};
      console.log("messageSnapshot", messageSnapshot);
      setMessages(messageSnapshot);
    });
  }, [currentRoom.id]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //   console.log("user", user);
      if (user) {
        const uid = user?.uid;
        const refPlayerFirebase = ref(db, `players/${uid}`);
        playerIdRef.current = uid;
        playerRef.current = refPlayerFirebase;
        const initPlayer = {
          id: uid,
          roomId: currentRoom.id,
          name: "guest",
          direction: "down",
          state: 1,
          avatar: "character1",
          x: currentRoom.startPosition.x,
          y: currentRoom.startPosition.y,
        };

        set(refPlayerFirebase, initPlayer);
        try {
          const player = JSON?.parse(
            window.localStorage?.getItem("currentPlayer") || ""
          );

          if (player.id) {
            setCurrentPlayer(player);
          } else {
            throw "player id null";
          }
        } catch (error) {
          console.log(initPlayer);
          setCurrentPlayer(initPlayer);
        }
        onDisconnect(refPlayerFirebase).remove();
      } else {
        console.log("user is logged out");
      }
    });

    signInAnonymously(auth)
      .then(() => {})
      .catch((error) => {
        console.log("error", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom.id]);

  useEffect(() => {
    if (currentPlayer.id) {
      const refPlayerFirebase = ref(db, `players/${currentPlayer.id}`);
      window.localStorage.setItem(
        "currentPlayer",
        JSON.stringify(currentPlayer)
      );

      set(refPlayerFirebase, currentPlayer);
      setCurrentPlayer(currentPlayer);
      console.log("currentPlayer", currentPlayer);
      if (currentPlayer) setCurrentRoom(CONFIG_MAP[currentPlayer.roomId]);
    } else {
      try {
        const player = JSON?.parse(
          window.localStorage?.getItem("currentPlayer") || ""
        );
        if (player.id) {
          setCurrentPlayer(player);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentPlayer]);

  const contextValue: GamePlayContextProps = {
    playerId: playerIdRef.current,
    messages,
    setCurrentPlayer,
    playerRef,
    players,
    currentRoom,
    currentPlayer,
    clickPositionMap,
  };

  return (
    <GamePlayContext.Provider value={contextValue}>
      {children}
    </GamePlayContext.Provider>
  );
};
