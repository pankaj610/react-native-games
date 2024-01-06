import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native/types';
import { View } from 'react-native';
import { MatterType } from './types';
import { ImageStyle } from 'react-native';
import { Animated } from 'react-native';
import { FLAPPY_BIRD_IMG } from './Constants';

const Pipe = ({ body, size, color }: MatterType) => {
    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    const pipeStyles: ImageStyle = useMemo(
        () => ({
            position: 'absolute',
            top: y,
            left: x,
            width,
            height,
            backgroundColor: color,
            resizeMode: 'stretch'
        }),
        [x, y, height, width, color],
    );

    return <Animated.Image source={FLAPPY_BIRD_IMG.pipe_core} style={pipeStyles} />;
};

export default Pipe;