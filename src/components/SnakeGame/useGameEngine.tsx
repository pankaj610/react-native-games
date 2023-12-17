import { useEffect, useState } from 'react';
import { Constants } from './Constants';
import { Head } from './Head';

import { Food } from './Food';
import { Tail } from './Tail';

export const randomBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

let Entities = {
    head: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        updateFrequency: 10,
        nextMove: 10,
        size: Constants.CELL_SIZE,
        renderer: Head,
    },
    food: {
        position: [
            randomBetween(0, Constants.GRID_SIZE - 1),
            randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        renderer: Food,
    },
    tail: {
        size: Constants.CELL_SIZE,
        elements: [] as number[][],
        renderer: Tail,
    },
}
export type EntityType = typeof Entities;

export const getEntities = () => (Entities);

const useGameEngine = ({ gameEngineRef }: any) => {
    const [entities, setEntities] = useState<EntityType>();

    useEffect(() => {
        setEntities(getEntities());
        return () => { };
    }, []);

    return { entities };
};

export default useGameEngine;