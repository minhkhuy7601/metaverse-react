import { auth, db } from "@/lib/firebase";
import { setSession } from "@/redux/slices/authSlice";
import { setMessagesList, setPlayersList } from "@/redux/slices/gamePlaySlice";
import { RootState } from "@/redux/store";
import { PlayerType } from "@/types/player";
import { KeyPressListener } from "@/utils/event";
import { handleUpdatePlayer } from "@/utils/gameplay";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGamePlay = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.authSlice.session
  );
  const currentRoom = useSelector(
    (state: RootState) => state.gamePlaySlice.currentRoom
  );
  const playersList = useSelector(
    (state: RootState) => state.gamePlaySlice.playersList
  );

  const updateCurrentPlayer = useCallback(
    (updatedPlayer: PlayerType) => {
      const playerRef = ref(db, `players/${currentUser?.id}`);
      set(playerRef, updatedPlayer);
    },
    [currentUser?.id]
  );

  //  init get user's id
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user?.uid;
        dispatch(setSession({ id: uid }));
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

  //   create ref when user's id available
  useEffect(() => {
    const id = currentUser?.id;
    const refPlayerFirebase = ref(db, `players/${id}`);
    const initPlayer = {
      id,
      roomId: currentRoom.id,
      name: currentUser?.name,
      direction: "down",
      state: 1,
      avatar: currentUser?.avatar,
      x: 16,
      y: 6,
    };
    set(refPlayerFirebase, initPlayer);
    onDisconnect(refPlayerFirebase).remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  useEffect(() => {
    //   subscribe all player in current room
    const allPlayersRef = ref(db, `players`);
    onValue(allPlayersRef, (snapshot) => {
      const playersSnapshot = snapshot.val() || {};
      Object.entries(playersSnapshot).forEach(([id, value]: any) => {
        if (value.roomId !== currentRoom.id) {
          delete playersSnapshot[id];
        }
      });
      dispatch(setPlayersList(playersSnapshot));
    });
    //   subscribe all message in current room
    const allMessagesRef = ref(db, `messages/${currentRoom.id}`);
    onValue(allMessagesRef, (snapshot) => {
      const messageSnapshot = snapshot.val() || {};
      dispatch(setMessagesList(messageSnapshot));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom.id]);

  //update current player
  useEffect(() => {
    if (!currentUser?.id || !playersList) return;
    const ArrowUp = new KeyPressListener("ArrowUp", () => {
      const updatedPlayer = handleUpdatePlayer(
        currentRoom.map,
        playersList[currentUser.id],
        0,
        -1
      );
      if (updatedPlayer) updateCurrentPlayer(updatedPlayer);
    });
    const ArrowDown = new KeyPressListener("ArrowDown", () => {
      const updatedPlayer = handleUpdatePlayer(
        currentRoom.map,
        playersList[currentUser.id],
        0,
        1
      );
      if (updatedPlayer) updateCurrentPlayer(updatedPlayer);
    });
    const ArrowLeft = new KeyPressListener("ArrowLeft", () => {
      const updatedPlayer = handleUpdatePlayer(
        currentRoom.map,
        playersList[currentUser.id],
        -1,
        0
      );
      if (updatedPlayer) updateCurrentPlayer(updatedPlayer);
    });
    const ArrowRight = new KeyPressListener("ArrowRight", () => {
      const updatedPlayer = handleUpdatePlayer(
        currentRoom.map,
        playersList[currentUser.id],
        1,
        0
      );
      if (updatedPlayer) updateCurrentPlayer(updatedPlayer);
    });

    return () => {
      ArrowUp.unbind();
      ArrowDown.unbind();
      ArrowLeft.unbind();
      ArrowRight.unbind();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom.id]);

  return {};
};

export default useGamePlay;
