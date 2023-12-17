import Matter from 'matter-js';
import { FunctionComponent } from 'react';

export interface MatterType {
    body: Matter.Body;
    size: Array<number>;
    color: string;
    renderer: FunctionComponent<MatterType>;
}

export interface PhysicsType {
    engine: Matter.Engine;
    world: Matter.World;
}

interface Map {
    [key: string]: any | undefined;
}

export interface EntitiesType extends Map {
    physics: PhysicsType;
    bird: MatterType;
    floor?: MatterType;
    ceiling?: MatterType;
    pipe1?: MatterType;
    pipe2?: MatterType;
    pipe3?: MatterType;
    pipe4?: MatterType;
}