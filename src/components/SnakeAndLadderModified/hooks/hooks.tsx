import { useEffect, useMemo, useRef, useState } from 'react';
import {
    BOARD_SIZE,
    DICE_FACE,
    NUM_PLAYER,
    PLAYER_COLOR,
    PLAYER_SVG,
    PLAYER_WIDTH,
    SNAKE_LADDER_SOUND,
    SOUNDS,
    SOUND_SOURCE,
} from '../constants.tsx';
import { generateRandomDiceNumber } from '../helper.tsx';
import { Animated, LayoutRectangle, View } from 'react-native';
import { Alert } from 'react-native';
import { Dice } from '../Dices.tsx';
import SoundManager from '../SoundManager.tsx';
import {
    SharedValue,
    runOnJS,
    useSharedValue,
    withTiming,
    Easing,
    ReduceMotion,
} from 'react-native-reanimated';
import { animateTiming } from '../helpers.tsx';
import { chunk } from 'lodash'

let snakes: Record<
    number,
    { destination: number; xDiff: number; yDiff: number }[]
> = {
    98: [{
        destination: 99,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 81,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 79,
        xDiff: -PLAYER_WIDTH / 3,
        yDiff: 0,
    }, {
        destination: 62,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 59,
        xDiff: -PLAYER_WIDTH / 2,
        yDiff: 0,
    }, {
        destination: 41,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 40,
        xDiff: 0,
        yDiff: 0,
    }],
    84: [{
        destination: 85,
        xDiff: 0,
        yDiff: -PLAYER_WIDTH / 4,
    },
    {
        destination: 86,
        xDiff: 0,
        yDiff: 0,
    }
        , {
        destination: 75,
        xDiff: -PLAYER_WIDTH / 2,
        yDiff: 0,
    }, {
        destination: 76,
        yDiff: -PLAYER_WIDTH / 4,
        xDiff: 0,
    }, {
        destination: 77,
        yDiff: -PLAYER_WIDTH / 4,
        xDiff: 0,
    }, {
        destination: 63,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 58,
        xDiff: 0,
        yDiff: 0,
    }],
    87: [{
        destination: 88,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 89,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 71,
        xDiff: -PLAYER_WIDTH / 3,
        yDiff: -PLAYER_WIDTH / 3,
    }, {
        destination: 70,
        xDiff: -PLAYER_WIDTH / 2,
        yDiff: 0,
    }, {
        destination: 52,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 49,
        xDiff: 0,
        yDiff: 0,
    }],
    73: [{
        destination: 74,
        xDiff: 0,
        yDiff: -PLAYER_WIDTH / 4,
    }, {
        destination: 66,
        xDiff: PLAYER_WIDTH / 4,
        yDiff: 0,
    }, {
        destination: 55,
        xDiff: PLAYER_WIDTH / 4,
        yDiff: 0,
    }, {
        destination: 46,
        xDiff: PLAYER_WIDTH / 2,
        yDiff: 0,
    }, {
        destination: 35,
        xDiff: -PLAYER_WIDTH / 4,
        yDiff: 0,
    },
    {
        destination: 25,
        xDiff: PLAYER_WIDTH / 2,
        yDiff: 0,
    }, {
        destination: 15,
        xDiff: 0,
        yDiff: 0,
    }],
    43: [
        {
            destination: 44,
            xDiff: 0,
            yDiff: 0,
        },
        {
            destination: 45,
            xDiff: -PLAYER_WIDTH / 3,
            yDiff: -PLAYER_WIDTH / 3,
        },
        {
            destination: 36,
            xDiff: -PLAYER_WIDTH / 4,
            yDiff: PLAYER_WIDTH / 4,
        },
        {
            destination: 37,
            xDiff: PLAYER_WIDTH / 4,
            yDiff: PLAYER_WIDTH / 4,
        },
        {
            destination: 24,
            xDiff: -PLAYER_WIDTH / 4,
            yDiff: -PLAYER_WIDTH / 3,
        },
        {
            destination: 17,
            xDiff: 0,
            yDiff: 0,
        },
    ],
    56: [
        {
            destination: 54,
            xDiff: 0,
            yDiff: 0,
        },
        {
            destination: 48,
            xDiff: -PLAYER_WIDTH / 4,
            yDiff: 0,
        },
        {
            destination: 33,
            xDiff: -PLAYER_WIDTH / 2,
            yDiff: 0,
        },
        {
            destination: 27,
            xDiff: PLAYER_WIDTH / 4,
            yDiff: 0,
        },
        {
            destination: 13,
            xDiff: -PLAYER_WIDTH / 2,
            yDiff: 0,
        },
        {
            destination: 8,
            xDiff: 0,
            yDiff: 0,
        },
    ],

    50: [{
        destination: 49,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 32,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 27,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 6,
        xDiff: 0,
        yDiff: 0,
    }, {
        destination: 5,
        xDiff: 0,
        yDiff: 0,
    }]
};
let ladder: Record<number, number> = {
    2: 23,
    6: 45,
    20: 59,
    57: 96,
    52: 72,
    71: 92,
    30: 96,
    4: 68,
};
export type PlayerColor = 'yellow' | 'blue' | 'red' | 'green'
export type PlayerNumber = 1 | 2 | 3
export type PlayerData = { location: { x: SharedValue<number>, y: SharedValue<number> }, position: number }
export type PlayerGroup = Record<PlayerNumber, PlayerData>
export type PlayerRefsType = Record<PlayerColor, PlayerGroup>

const getDiceInitialValue = () =>
    DICE_FACE.map((num, i) => ({
        value: i + 1,
        opacity: new Animated.Value(i == 0 ? 1 : 0),
        name: num,
    }));

const soundManager = new SoundManager<SNAKE_LADDER_SOUND>(SOUNDS, SOUND_SOURCE);

export type BoardRefType = {
    ref: React.MutableRefObject<View | undefined>,
    layout: LayoutRectangle | null,
    num: number,
    absolute: {
        x: number,
        y: number,
    }
}[][]

function useSnakeAndLadder() {
    const playerRefs = useRef<PlayerRefsType>({
        yellow: {
            1: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            },
            2: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            },
            3: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            }
        },
        blue: {
            1: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            },
            2: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            },
            3: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            }
        },
        red: {
            1: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            },
            2: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            },
            3: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            }
        },
        green: {
            1: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            },
            2: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            },
            3: {
                location: {
                    x: useSharedValue(0),
                    y: useSharedValue(0),
                },
                position: 0,
            }
        },
    });

    const gameStatus = useRef<{
        currentPlayer: PlayerColor,
    }>({
        currentPlayer: 'yellow',
    });

    // const currentPlayerRef = useRef<Animated.Value>(
    //     new Animated.Value(gameStatus.current.currentPlayer),
    // );

    // const playerRefs: Array<PlayerType> = useMemo(() => (
    //     getPlayerInitialValue(playerPositions)
    // ), [])

    const dicesRef = useRef<Array<Dice>>(getDiceInitialValue());

    const boardRef = useRef<BoardRefType>(chunk(new Array(100).fill(null).map((_, i) => {
        let finalNumber = 100 - i
        return ({
            ref: useRef<View>(),
            layout: null,
            num: finalNumber,
            absolute: { x: 0, y: 0 }
        })
    }), 10));

    const rootContainerRef = useRef<View>()

    const numberMapping = useMemo<Record<number, { i: number, j: number }>>(() => {
        const mapping = {}
        boardRef.current.forEach((row, i) => {
            row.forEach((column, j) => {
                Object.assign(mapping, { [column.num]: { i, j } })
            })
        })
        return mapping
    }, [boardRef.current])

    // const [color, setColor] = useState(
    //     playerRefs.current[gameStatus.current.currentPlayer],
    // );

    useEffect(() => {
        // setColor(playerRefs[gameStatus.current.currentPlayer].color);
        setTimeout(() => {
            rootContainerRef.current?.measure((x_p, y_p, w_p, h_p, px_p, py_p) => {
                boardRef.current.forEach((row, i) => {
                    row.forEach((column, j) => {
                        column.ref.current?.measure((x, y, w, h, px, py) => {
                            Object.assign(boardRef.current[i][j], { absolute: { x: px, y: py - py_p } })
                        })
                    })
                })
            })
        }, 1000)
    }, [gameStatus.current.currentPlayer]);

    const throwDice = () => {
        // if(gameStatus.current.isWait) return
        // gameStatus.current.isWait = true;
        let numSequence = Array(10)
            .fill(null)
            .map(() => generateRandomDiceNumber());
        let hideAnimations: Animated.CompositeAnimation[] = [];
        dicesRef.current.forEach(dice => {
            hideAnimations.push(
                Animated.timing(dice.opacity, {
                    toValue: 0,
                    delay: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
            );
        });
        Animated.parallel(hideAnimations).start(({ finished }) => {
            if (finished) {
                soundManager.playSound('rolling-dice');
                let animations: Animated.CompositeAnimation[] = [];
                numSequence.forEach(num => {
                    animations.push(
                        Animated.timing(dicesRef.current[num - 1].opacity, {
                            toValue: 1,
                            duration: 0,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),
                    );
                    animations.push(
                        Animated.timing(dicesRef.current[num - 1].opacity, {
                            toValue: 0,
                            delay: 40,
                            duration: 0,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),
                    );
                });
                Animated.sequence(animations).start(async ({ finished }) => {
                    if (finished) {
                        const steps = generateRandomDiceNumber();
                        Animated.timing(dicesRef.current[steps - 1].opacity, {
                            toValue: 1,
                            duration: 10,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }).start();

                        movePlayer(steps);
                    }
                });
            }
        });
    };

    const movePlayer = async (steps: number, num: PlayerNumber = 1) => {
        // console.log(steps, gameStatus.current.currentPlayer, playerRefs.current.yellow)
        let playerControl = playerRefs.current[gameStatus.current.currentPlayer][num];

        if (playerControl) {
            if (playerControl.position + steps > 100) {
                nextPlayer();
                return;
            }
            for (let i = 1; i <= steps; i++) {
                // playerRefs[gameStatus.current.currentPlayer] = {
                //     ...playerControl,
                //     currentPosition: (playerControl.currentPosition += 1),
                // };
                playerControl.position += 1

                //         playerControl = playerRefs[gameStatus.current.currentPlayer];

                //         if (playerControl.currentPosition == 100) {
                //             Alert.alert('You win :', playerControl.color, [
                //                 {
                //                     text: 'Restart Game',
                //                     onPress: () => restartGame(),
                //                     style: 'cancel',
                //                 },
                //             ]);
                //             return;
                await playerAnimate(num);
            }

            //         soundManager.playSound('dice-step');


            //     }

            //     let isAnimateAgain = false;
            //     if (snakes[playerControl.currentPosition]) {
            //         let snakePositions = snakes[playerControl.currentPosition];
            //         isAnimateAgain = true;
            //         soundManager.playSound('snake-hissing');

            //         for (let i = 0; i < snakePositions.length; i++) {
            //             playerRefs[gameStatus.current.currentPlayer] = {
            //                 ...playerControl,
            //                 currentPosition: snakePositions[i].destination,
            //             };
            //             await playerAnimate(snakePositions[i]);
            //         }
            //     } else if (ladder[playerControl.currentPosition]) {
            //         playerRefs[gameStatus.current.currentPlayer] = {
            //             ...playerControl,
            //             currentPosition: ladder[playerControl.currentPosition],
            //         };
            //         isAnimateAgain = true;
            //         soundManager.playSound('ladder-bonus');
            //     }
            //     if (isAnimateAgain) {
            //         await playerAnimate(true);
            //         nextPlayer();
            //     } else {
            //         if (steps != 6) {
            //             nextPlayer();
            //         }
            //     }
        }
    };

    const playerAnimate = async (
        num: PlayerNumber,
        difference: { xDiff: number; yDiff: number } | undefined = undefined,
    ) => {
        let playerControl = playerRefs.current[gameStatus.current.currentPlayer][num];
        if (playerControl) {
            // let temp = playerControl.location.x.value = 
            const positionMapping = numberMapping[playerControl.position]
            const absolutePosition = boardRef.current[positionMapping.i][positionMapping.j].absolute
            // console.log(playerControl.position, absolutePosition)

            let px = animateTiming(
                playerControl.location.x,
                absolutePosition.x,
                {
                    duration: 150,
                    easing: Easing.linear,
                },
            );

            let py = animateTiming(
                playerControl.location.y,
                absolutePosition.y,
                {
                    duration: 150,
                    easing: Easing.linear,
                },
                () => {
                    // animateTiming(playerControl.position.y, toY, {
                    //     duration: 150,
                    //     easing: Easing.linear,
                    // });
                },
            );

            //  % 20;
            // let toX = ((playerControl.currentPosition - 1) % 10) * PLAYER_WIDTH;
            //     if (temp > 10 || temp == 0) {
            //         toX = BOARD_SIZE - toX - PLAYER_WIDTH;
            //     }
            //     let toY = -Math.floor(playerControl.currentPosition / 10) * PLAYER_WIDTH;
            //     if (temp == 10 || temp == 0) {
            //         toY += PLAYER_WIDTH;
            //     }
            //     let p1 = animateTiming(
            //         playerControl.position.x,
            //         toX + (difference?.xDiff ?? 0),
            //         {
            //             duration: 300,
            //             easing: Easing.linear,
            //         },
            //     );

            // let py = animateTiming(
            //     playerControl.position.y,
            //     toY - PLAYER_WIDTH / 2,
            //     {
            //         duration: 150,
            //         easing: Easing.linear,
            //     },
            //     () => {
            //         animateTiming(playerControl.position.y, toY, {
            //             duration: 150,
            //             easing: Easing.linear,
            //         });
            //     },
            // );

            //     if (difference) {
            //         py = animateTiming(
            //             playerControl.position.y,
            //             toY + (difference?.yDiff ?? 0),
            //             {
            //                 duration: 300,
            //                 easing: Easing.linear,
            //             },
            //         );
            //     }

            await Promise.all([px, py]);
        }
    };

    const restartGame = () => {
        // playerRefs.forEach((player, i) => {
        //     let px = animateTiming(player.position.x, i * PLAYER_WIDTH, {
        //         duration: 300,
        //         easing: Easing.linear,
        //     });

        //     let py = animateTiming(player.position.y, PLAYER_WIDTH, {
        //         duration: 150,
        //         easing: Easing.linear,
        //     });

        //     Promise.all([px, py]);
        //     player.currentPosition = 0;
        // });
    };

    const nextPlayer = () => {
        // gameStatus.current.currentPlayer =
        //     (gameStatus.current.currentPlayer + 1) % NUM_PLAYER;
        // currentPlayerRef.current.setValue(gameStatus.current.currentPlayer);
        // gameStatus.current.isWait = false;
    };

    return {
        playerRefs,
        dicesRef,
        gameStatus,
        throwDice,
        // currentPlayerRef,
        resetGame: restartGame,
        boardRef,
        rootContainerRef,
        numberMapping,
    };
}

export default useSnakeAndLadder;
