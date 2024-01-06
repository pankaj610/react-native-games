import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { GameEngine } from 'react-native-game-engine';
import Matter, { IEngineDefinition } from 'matter-js';
import { Constants } from './Constants';
import { EntitiesType } from './types';
import Bird from './Bird';
import Physics from './Physics';
import Wall from './Wall';




const useGameEngine = (gameEngineRef: any) => {
    const [entities, setEntities] = useState<EntitiesType | null>(null);
    const [running, setRunning] = useState<boolean>(true);
    useEffect(() => {
        const tempEntities = setupWorld();
        setEntities(tempEntities);
    }, []);

    const setupWorld = () => {
        const options: IEngineDefinition = { enableSleeping: false };
        let engine = Matter.Engine.create(options);
        let world = engine.world;
        engine.gravity.y = 0.0;

        let bird = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH / 4,
            Constants.MAX_HEIGHT / 2,
            50,
            50,
        );
        const floor = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH / 2,
            Constants.MAX_HEIGHT - 100,
            Constants.MAX_WIDTH,
            50,
            { isStatic: true },
        );
        const ceiling = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH / 2,
            0,
            Constants.MAX_WIDTH,
            50,
            { isStatic: true },
        );


        Matter.World.add(world, [bird, floor, ceiling]);
        Matter.Events.on(engine, 'collisionStart', (ev) => {
            //   let pairs = event.pairs;

            gameEngineRef.current.dispatch({
                type: 'game-over',
            });
        });
        return {
            physics: { engine, world },
            bird: { body: bird, size: [50, 50], color: 'red', renderer: Bird },
            ceiling: {
                body: ceiling,
                size: [Constants.MAX_WIDTH, 50],
                color: 'lightblue',
                renderer: Wall,
            },
            floor: {
                body: floor,
                size: [Constants.MAX_WIDTH, 50],
                color: 'green',
                renderer: Wall,
            },

        };
    };

    const onEvent = (e: any) => {
        if (e.type === 'game-over') {
            setRunning(false);
        }
    };
    const restartGame = () => {
        gameEngineRef.current.swap(setupWorld());
        setRunning(true);
    };
    return { entities, running, onEvent, restartGame };
};

function FlappyBird(): JSX.Element {
    const gameEngineRef = useRef(null);
    const { entities, running, onEvent, restartGame } =
        useGameEngine(gameEngineRef);

    return (
        <View style={styles.container}>
            {!!entities && (
                <GameEngine
                    ref={gameEngineRef}
                    style={styles.gameContainer}
                    entities={entities}
                    systems={[Physics]}
                    running={running}
                    onEvent={onEvent}
                />
            )}
            {!running && (
                <TouchableOpacity onPress={restartGame}>
                    <View style={styles.fullscreen}>
                        <Text style={styles.gameOverText}>Game Over</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    gameContainer: {},
    fullscreen: {
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverText: {
        color: 'white',
        fontSize: 48,
    },
});

export default FlappyBird;