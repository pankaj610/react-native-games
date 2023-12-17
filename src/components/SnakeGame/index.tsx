
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Constants } from './Constants';
import SnakeGameSystem from './SnakeGameSystem';
import useGameEngine, { getEntities } from './useGameEngine';



function SnakeGame(): JSX.Element {
    const gameEngineRef = useRef<any>(null);
    const [running, setRunning] = useState(true);
    const [score, setScore] = useState(0);

    const { entities } = useGameEngine({ gameEngineRef });
    const boardSize = Constants.CELL_SIZE * Constants.GRID_SIZE;

    const onEvent = (e: any) => {
        if (e.type === 'game-over') {
            setRunning(false);
        }
        if (e.type === 'eat-food') {
            setScore(s => s + 1);
        }
    };

    const resetGame = () => {
        gameEngineRef.current.swap(getEntities());
        setRunning(true);
        setScore(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.score}>Score: {score}</Text>
            {!!entities && (
                <GameEngine
                    ref={gameEngineRef}
                    style={[styles.board, { width: boardSize, height: boardSize }]}
                    entities={entities}
                    systems={[SnakeGameSystem]}
                    onEvent={onEvent}
                    running={running}>
                    {!running && (
                        <TouchableOpacity onPress={resetGame}>
                            <View style={styles.gameover}>
                                <Text>Game Over</Text>
                                <Text>Your Score: {score}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </GameEngine>
            )}
            <View style={styles.controls}>
                <View style={styles.controlRow}>
                    <TouchableOpacity
                        onPress={() => {
                            gameEngineRef.current?.dispatch({ type: 'move-up' });
                        }}>
                        <View style={styles.control} />
                    </TouchableOpacity>
                </View>
                <View style={styles.controlRow}>
                    <TouchableOpacity
                        onPress={() => {
                            gameEngineRef.current?.dispatch({ type: 'move-left' });
                        }}>
                        <View style={styles.control} />
                    </TouchableOpacity>

                    <View style={[styles.control, { backgroundColor: 'black' }]} />

                    <TouchableOpacity
                        onPress={() => {
                            gameEngineRef.current?.dispatch({ type: 'move-right' });
                        }}>
                        <View style={styles.control} />
                    </TouchableOpacity>
                </View>
                <View style={styles.controlRow}>
                    <TouchableOpacity
                        onPress={() => {
                            gameEngineRef.current?.dispatch({ type: 'move-down' });
                        }}>
                        <View style={styles.control} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    board: {
        flex: 0,
        backgroundColor: '#ffffff',
    },
    controls: {
        width: 300,
        height: 300,
        flexDirection: 'column',
        marginTop: 30,
    },
    controlRow: {
        width: 300,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    control: {
        height: 100,
        width: 100,
        backgroundColor: 'blue',
    },
    gameover: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    score: {
        color: 'white',
    },
});

export default SnakeGame;