import * as React from 'react';
import { Sections } from './Sections';
import { Section } from './Model';

const mariner = '#3B5F8F';
const mediumPurple = '#8266D4';
const tomato = '#F95B57';
const mySin = '#F3A646';

const sections: Section[] = [
    {
        title: 'SUNGLASSES',
        leftColor: mediumPurple,
        rightColor: mariner,
        image: require('./assets/sunnies.png'),
    },
    {
        title: 'FURNITURE',
        leftColor: tomato,
        rightColor: mediumPurple,
        image: require('./assets/table.png'),
    },
    {
        title: 'JEWELRY',
        leftColor: mySin,
        rightColor: tomato,
        image: require('./assets/earrings.png'),
    },
    {
        title: 'HEADWEAR',
        leftColor: 'white',
        rightColor: tomato,
        image: require('./assets/hat.png'),
    },
];

interface AnimatedTabNavigatorProps {
}

export const AnimatedTabNavigator: React.FC<AnimatedTabNavigatorProps> = (props) => {
    return <Sections sections={sections} />;
};