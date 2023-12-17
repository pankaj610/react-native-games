import Matter from 'matter-js';
import { FunctionComponent } from 'react';

export interface MatterType {
    body: Matter.Body;
    size: number;
    position: Array<number>;
    color: string;
    renderer: FunctionComponent<MatterType>;
}