import { GameEngineUpdateEventOptionType } from 'react-native-game-engine';
import { Constants } from './Constants';
import { EntityType, randomBetween } from './useGameEngine';

const SnakeGameSystem = (
    entities: EntityType,
    { touches, events, dispatch }: GameEngineUpdateEventOptionType,
) => {
    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;
    head.nextMove -= 1;
    if (events.length) {
        events.forEach(event => {
            switch (event.type) {
                case 'move-up':
                    head.yspeed = -1;
                    head.xspeed = 0;
                    break;
                case 'move-down':
                    head.yspeed = +1;
                    head.xspeed = 0;
                    break;
                case 'move-left':
                    head.xspeed = -1;
                    head.yspeed = 0;
                    break;
                case 'move-right':
                    head.xspeed = 1;
                    head.yspeed = 0;
                    break;
            }
        });
    }
    if (head.nextMove === 0) {
        head.nextMove = head.updateFrequency;

        if (
            head.position[0] + head.xspeed < 0 ||
            head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
            head.position[1] + head.yspeed < 0 ||
            head.position[1] + head.yspeed >= Constants.GRID_SIZE
        ) {
            // game over;
            dispatch({
                type: 'game-over',
            });
        } else {
            tail.elements = [[head.position[0], head.position[1]]]
                .concat(tail.elements)
                .slice(0, -1);

            head.position[0] += head.xspeed; // move head
            head.position[1] += head.yspeed;
            //follow tail with head

            //collision with self
            for (let i = 0; i < tail.elements.length; i++) {
                if (
                    head.position[0] === tail.elements[i][0] &&
                    head.position[1] === tail.elements[i][1]
                ) {
                    dispatch({
                        type: 'game-over',
                    });
                }
            }

            if (
                head.position[0] === food.position[0] &&
                head.position[1] === food.position[1]
            ) {
                // grow tail
                tail.elements = [[food.position[0], food.position[1]]].concat(
                    tail.elements,
                );
                dispatch({
                    type: 'eat-food',
                });
                // eat food
                food.position[0] = randomBetween(0, Constants.GRID_SIZE - 1);
                food.position[1] = randomBetween(0, Constants.GRID_SIZE - 1);
            }
        }
    }
    return entities;
};

export default SnakeGameSystem;