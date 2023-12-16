import { useEffect, useRef } from "react";
import { Easing, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import { PlayerType } from "../Players";
import { BOARD_SIZE, DICE_FACE, NUM_PLAYER, PLAYER_COLOR, PLAYER_WIDTH } from "../constants";
import { generateRandomDiceNumber } from "../helper";
import { Animated } from "react-native";
import { Alert } from "react-native";
import { Dice } from "../Dices";


let snakes: Record<number, number> = {
    98: 40,
    84: 58,
    87: 49,
    73: 15,
    56: 8,
    43: 17,
    50: 5
}
let ladder: Record<number, number> = {
    2: 23,
    6: 45,
    20: 59,
    57: 96,
    52: 72,
    71: 92,
    30: 96,
    4: 68,
}
const getPlayerInitialValue = () => new Array(NUM_PLAYER).fill(null).map((_, i) => ({
    position: new Animated.ValueXY({
        x: i * PLAYER_WIDTH,
        y: BOARD_SIZE,
    }),
    color: PLAYER_COLOR[i],
    currentPosition: 0,
}))

const getDiceInitialValue = () => DICE_FACE.map((num, i) => ({
    value: i + 1,
    opacity: new Animated.Value(i == 0 ? 1 : 0),
    name: num,
}))

function useSnakeAndLadder() {
    const gameStatus = useRef({
        currentPlayer: 0,
    })

    const playerRefs = useRef<Array<PlayerType>>(getPlayerInitialValue());

    const dicesRef = useRef<Array<Dice>>(getDiceInitialValue());

    // useEffect(() => {
    //     initializeGame();
    // }, []);

    // const initializeGame = () => {
    //     // playerRefs.current.forEach((player, i) => {
    //     //     player.x.value = withTiming(i * PLAYER_WIDTH, { duration: 100, easing: Easing.circle });
    //     //     player.y.value = withTiming(BOARD_SIZE, { duration: 100, easing: Easing.circle });
    //     // })
    // }

    const throwDice = () => {
        // movePlayer(1);
        // return;
        let numSequence = Array(10).fill(null).map(() => generateRandomDiceNumber());
        let hideAnimations: Animated.CompositeAnimation[] = [];
        dicesRef.current.forEach(dice => {
            hideAnimations.push(Animated.timing(dice.opacity, {
                toValue: 0,
                delay: 0,
                duration: 100,
                useNativeDriver: true
            }));
        });
        Animated.parallel(hideAnimations).start(({ finished }) => {
            if (finished) {
                let animations: Animated.CompositeAnimation[] = [];
                numSequence.forEach(num => {
                    animations.push(Animated.timing(dicesRef.current[num - 1].opacity, { toValue: 1, duration: 0, easing: Easing.linear, useNativeDriver: true }))
                    animations.push(Animated.timing(dicesRef.current[num - 1].opacity, { toValue: 0, delay: 40, duration: 0, easing: Easing.linear, useNativeDriver: true }))
                })
                Animated.sequence(animations).start(({ finished }) => {
                    if (finished) {
                        const steps = generateRandomDiceNumber();
                        Animated.timing(dicesRef.current[steps - 1].opacity, { toValue: 1, duration: 10, easing: Easing.linear, useNativeDriver: true }).start();
                        movePlayer(steps);
                    }
                })
            }
        })
    }

    const movePlayer = (steps: number) => {
        const playerControl = playerRefs.current[gameStatus.current.currentPlayer];
        if (playerControl) {
            playerControl.currentPosition = playerControl.currentPosition + steps > 100 ? 100 : playerControl.currentPosition + steps;
            playerAnimate(() => {
                let isAnimateAgain = false;
                if (snakes[playerControl.currentPosition]) {
                    playerControl.currentPosition = snakes[playerControl.currentPosition]
                    isAnimateAgain = true;
                } else if (ladder[playerControl.currentPosition]) {
                    playerControl.currentPosition = ladder[playerControl.currentPosition]
                    isAnimateAgain = true;
                }
                if (isAnimateAgain) {
                    playerAnimate();
                } else {
                    nextPlayer();
                }
            });
        }

    }

    const playerAnimate = (onFinish = () => { nextPlayer() }) => {
        const playerControl = playerRefs.current[gameStatus.current.currentPlayer];
        if (playerControl.currentPosition == 100) {
            Alert.alert("You win :", playerControl.color, [
                {
                    text: 'Restart Game',
                    onPress: () => restartGame(),
                    style: 'cancel',
                },],);
        }

        if (playerControl) {
            let temp = playerControl.currentPosition % 20;
            let toX = ((playerControl.currentPosition - 1) % 10) * PLAYER_WIDTH;
            if (temp > 10 || temp == 0) {
                toX = BOARD_SIZE - toX - PLAYER_WIDTH;
            }
            let toY = BOARD_SIZE - (Math.floor(playerControl.currentPosition / 10)) * PLAYER_WIDTH - PLAYER_WIDTH;
            if (temp == 10 || temp == 0) {
                toY += PLAYER_WIDTH;
            }
            Animated.timing(playerControl.position, {
                toValue: {
                    x: toX,
                    y: toY,
                },
                duration: 100,
                delay: 0,
                easing: Easing.circle,
                useNativeDriver: true
            }).start(({ finished }) => {
                if (finished) {
                    console.log("On Finish");
                    onFinish();
                }
            });
        }
    }

    const restartGame = () => {
        playerRefs.current.forEach((player, i) => {
            Animated.timing(player.position, {
                toValue: {
                    x: i * PLAYER_WIDTH,
                    y: BOARD_SIZE,
                },
                delay: 0,
                duration: 100,
                useNativeDriver: true,
            }).start();
            player.currentPosition = 0;
        });
    }

    const nextPlayer = () => {
        console.log("Current", gameStatus.current.currentPlayer);
        gameStatus.current.currentPlayer = (gameStatus.current.currentPlayer + 1) % NUM_PLAYER;
    }


    return { playerRefs, dicesRef, throwDice, }
}

export default useSnakeAndLadder;