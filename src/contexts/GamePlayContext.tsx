/* eslint-disable @typescript-eslint/no-explicit-any */
import { CLASS_MAP } from "@/constant/maps/class";
import { auth, db } from "@/lib/firebase";
import { GamePlayContextProps } from "@/types/player";
import { astar } from "@/utils/automove";
import { KeyPressListener } from "@/utils/event";
import { getGridCoordinates, isSolid } from "@/utils/gameplay";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { ReactNode, createContext, useEffect, useRef, useState } from "react";
export const GamePlayContext = createContext<GamePlayContextProps | undefined>(
	undefined
);

export const GamePlayProvider = ({ children }: { children: ReactNode }) => {
	const playerIdRef = useRef<string | null>(null);
	const playerRef = useRef<any>(null);
	const listPlayersRef = useRef<any>(null);
	const [players, setPlayers] = useState<Record<string, any>>({});

	function handleArrowPress(xChange = 0, yChange = 0) {
		const playerId = playerIdRef.current;

		if (!playerId) return;
		if (!listPlayersRef.current[playerId]) return;

		const newX = listPlayersRef.current[playerId].x + xChange;
		const newY = listPlayersRef.current[playerId].y + yChange;

		if (!isSolid(CLASS_MAP, newX, newY)) {
			//move to the next space
			listPlayersRef.current[playerId].x = newX;
			listPlayersRef.current[playerId].y = newY;
			//   if (xChange === 1) {
			//     players[playerId].direction = "right";
			//   }
			//   if (xChange === -1) {
			//     players[playerId].direction = "left";
			//   }
			set(playerRef.current, listPlayersRef.current[playerId]);
			return true;
		} else {
			return false;
		}
	}

	function initEventListener() {
		new KeyPressListener("ArrowUp", () => handleArrowPress(0, -1));
		new KeyPressListener("ArrowDown", () => handleArrowPress(0, 1));
		new KeyPressListener("ArrowLeft", () => handleArrowPress(-1, 0));
		new KeyPressListener("ArrowRight", () => handleArrowPress(1, 0));
	}

	function initHandleMoveOnClick() {
		const gameContainer = document.querySelector("#game-container");
		if (!gameContainer) return;
		const rect = gameContainer.getBoundingClientRect();
		let time: NodeJS.Timeout | null = null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		gameContainer.addEventListener("click", async (event: any) => {
			if (time) clearTimeout(time);
			const playerId = playerIdRef.current;
			if (!playerId) return;
			try {
				const { x, y } = getGridCoordinates(event.pageX, event.pageY, rect);
				const race = astar(
					CLASS_MAP,
					[
						listPlayersRef.current[playerId].x,
						listPlayersRef.current[playerId].y,
					],
					[x, y]
				);
				if (race?.length)
					for (let i = 0; i <= race.length; i++) {
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
							}, 100);
						});
					}
			} catch (error) {
				console.log(error);
			}
		});
	}

	function initGame() {
		initEventListener();
		const allPlayersRef = ref(db, `players`);
		onValue(allPlayersRef, (snapshot) => {
			console.log("snapshot", snapshot);

			const playersSnapshot = snapshot.val() || {};
			console.log("playersSnapshot", playersSnapshot);
			setPlayers(playersSnapshot);
			listPlayersRef.current = playersSnapshot;
		});
		initHandleMoveOnClick();
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			console.log("user", user);
			if (user) {
				const uid = user?.uid;
				const refPlayerFirebase = ref(db, `players/${uid}`);
				playerIdRef.current = uid;
				playerRef.current = refPlayerFirebase;
				set(refPlayerFirebase, {
					id: uid,
					name: "test",
					direction: "right",
					color: "red",
					x: Math.floor(Math.random() * 10) + 1,
					y: Math.floor(Math.random() * 10) + 1,
				});
				onDisconnect(refPlayerFirebase).remove();
				initGame();
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

	const contextValue: GamePlayContextProps = {
		playerId: playerIdRef.current,
		playerRef,
		players,
	};

	return (
		<GamePlayContext.Provider value={contextValue}>
			{children}
		</GamePlayContext.Provider>
	);
};
