import { EntitiesType } from './types';
import Matter, { Engine } from 'matter-js';
import { Constants } from './Constants';
import Pipe from './Pipe';
import PipeTop from './PipeTop';



// pipe1: {
//     body: pipe1,
//     size: [Constants.PIPE_WIDTH, pipe1Height],
//     color: 'red',
//     renderer: Pipe,
// },
// pipe2: {
//     body: pipe2,
//     size: [Constants.PIPE_WIDTH, pipe2Height],
//     color: 'blue',
//     renderer: Pipe,
// },
// pipe3: {
//     body: pipe3,
//     size: [Constants.PIPE_WIDTH, pipe3Height],
//     color: 'yellow',
//     renderer: Pipe,
// },
// pipe4: {
//     body: pipe4,
//     size: [Constants.PIPE_WIDTH, pipe4Height],
//     color: 'pink',
//     renderer: Pipe,
// },


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

let pipes = 0;

const addPipeAtPosition = (x, world, entities) => {
    let [pipe1Height, pipe2Height] = generatePipes();

    const pipeTopWidth = Constants.PIPE_WIDTH + 20;
    const pipeTopHeight = (pipeTopWidth) * 95 / 205; // image is 205 * 95

    let pipe1 = Matter.Bodies.rectangle(
        x,
        pipe1Height / 2,
        Constants.PIPE_WIDTH,
        pipe1Height,
        { isStatic: true },
    );

    let pipe1Top = Matter.Bodies.rectangle(
        x,
        pipe1Height + pipeTopHeight / 2,
        pipeTopWidth,
        pipeTopHeight,
        { isStatic: true },
    );

    pipe2Height = pipe2Height - pipeTopHeight;

    let pipe2 = Matter.Bodies.rectangle(
        x,
        Constants.MAX_HEIGHT - pipeTopHeight / 2 - 50,
        Constants.PIPE_WIDTH,
        pipe2Height,
        { isStatic: true },
    );

    let pipe2Top = Matter.Bodies.rectangle(
        x,
        Constants.MAX_HEIGHT - pipeTopHeight - pipeTopHeight / 2 - 50,
        pipeTopWidth,
        pipeTopHeight,
        { isStatic: true },
    );

    // console.log({ pipe1, pipe2, pipe1Top, pipe2Top, });
    Matter.World.add(world, [pipe1, pipe2, pipe1Top, pipe2Top]);

    // entities['pipe' + (pipes + 1)] = {
    //     body: pipe1,
    //     scored: false,
    //     renderer: Pipe
    // }
    // entities['pipe' + (pipes + 1) + 'Top'] = {
    //     body: pipe1Top,
    //     scored: false,
    //     renderer: PipeTop
    // }
    // entities['pipe' + (pipes + 2)] = {
    //     body: pipe2,
    //     scored: false,
    //     renderer: Pipe
    // }
    // entities['pipe' + (pipes + 2) + 'Top'] = {
    //     body: pipe2Top,
    //     scored: false,
    //     renderer: PipeTop
    // }

    pipes += 2
}

const Physics = (entities: EntitiesType, { touches, time }: any) => {
    let engine = entities.physics.engine;
    let bird = entities.bird.body;
    let world = entities.world;



    let hadTouches = false;

    // console.log({
    //     hadTouches: touches
    //         .filter((t: any) => t.type === 'press')
    // })
    touches
        .filter((t: any) => t.type === 'press')
        .forEach((_: any) => {
            if (!hadTouches) {
                console.log("touched", engine.gravity.y)
                if (engine.gravity.y === 0) {
                    // first touch
                    engine.gravity.y = 1.2;
                    addPipeAtPosition(Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2, world, entities);
                    addPipeAtPosition(Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2, world, entities);
                }
                Matter.Body.setVelocity(bird, {
                    x: bird.velocity.x,
                    y: -10,
                })
                hadTouches = true;
            }
            // Matter.Body.applyForce(bird, bird.position, { x: 0.0, y: -0.05 });
        });


    for (const [key, value] of Object.entries(entities)) {
        if (key.includes('pipe')) {
            Matter.Body.translate(entities[key].body, { x: -2, y: 0 });
        }
    }

    // for (let i = 1; i <= 4; i++) {
    //     if (
    //         entities['pipe' + i].body.position.x <=
    //         -1 * (Constants.PIPE_WIDTH / 2)
    //     ) {
    //         Matter.Body.setPosition(entities['pipe' + i].body, {
    //             x: Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
    //             y: entities['pipe' + i].body.position.y,
    //         });
    //     }
    //     Matter.Body.translate(entities['pipe' + i].body, { x: -2, y: 0 });
    // }
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default Physics;