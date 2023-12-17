import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native/types';
import { View } from 'react-native';
import { MatterType } from './types';

const Bird = ({ body, size, color }: MatterType) => {
    const width = size[0];
    const height = size[1];
    const x = body.position.x;
    const y = body.position.y;
    const birdStyles: ViewStyle = useMemo(
        () => ({
            position: 'absolute',
            top: y,
            left: x,
            width,
            height,
            backgroundColor: color,
        }),
        [x, y, height, width, color],
    );

    return <View style={birdStyles} />;
};

export default Bird;