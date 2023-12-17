import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { GameEngine } from 'react-native-game-engine';
import Matter, { IEngineDefinition } from 'matter-js';
import { Constants } from './Constants';
import { EntitiesType } from './types';
import Bird from './Bird';
import Physics from './Physics';
import Wall from './Wall';
import Pipe from './Pipe';

export const randomBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generatePipes = () => {
    let topPipeHeight = randomBetween(100, Constants.MAX_HEIGHT / 2 - 100);
    let bottomPipeHeight =
        Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;
    let sizes = [topPipeHeight, bottomPipeHeight];
    if (Math.random() < 0.5) {
        sizes = sizes.reverse();
    }
    return sizes;
};

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
            50,
            Constants.MAX_WIDTH,
            50,
            { isStatic: true },
        );
        let [pipe1Height, pipe2Height] = generatePipes();
        let [pipe3Height, pipe4Height] = generatePipes();

        let pipe1 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH - Constants.PIPE_WIDTH / 2,
            pipe1Height / 2,
            Constants.PIPE_WIDTH,
            pipe1Height,
            { isStatic: true },
        );
        let pipe2 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH - Constants.PIPE_WIDTH / 2,
            Constants.MAX_HEIGHT - pipe2Height / 2,
            Constants.PIPE_WIDTH,
            pipe2Height,
            { isStatic: true },
        );

        let pipe3 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
            pipe3Height / 2,
            Constants.PIPE_WIDTH,
            pipe3Height,
            { isStatic: true },
        );
        let pipe4 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
            Constants.MAX_HEIGHT - pipe4Height / 2,
            Constants.PIPE_WIDTH,
            pipe4Height,
            { isStatic: true },
        );

        Matter.World.add(world, [bird, floor, ceiling, pipe1, pipe2, pipe3, pipe4]);
        Matter.Events.on(engine, 'collisionStart', () => {
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
            pipe1: {
                body: pipe1,
                size: [Constants.PIPE_WIDTH, pipe1Height],
                color: 'red',
                renderer: Pipe,
            },
            pipe2: {
                body: pipe2,
                size: [Constants.PIPE_WIDTH, pipe2Height],
                color: 'blue',
                renderer: Pipe,
            },
            pipe3: {
                body: pipe3,
                size: [Constants.PIPE_WIDTH, pipe3Height],
                color: 'yellow',
                renderer: Pipe,
            },
            pipe4: {
                body: pipe4,
                size: [Constants.PIPE_WIDTH, pipe4Height],
                color: 'pink',
                renderer: Pipe,
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