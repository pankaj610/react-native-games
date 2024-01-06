import React, { useMemo, useRef } from 'react';
import { MatterType } from './types';
import { Animated } from 'react-native';
import { FLAPPY_BIRD_IMG } from './Constants';
import { ImageStyle } from 'react-native';

const Bird = ({ body, size, color, pose = 1 }: MatterType) => {
    const velocityRef = useRef(new Animated.Value(body.velocity.y))
    velocityRef.current.setValue(body.velocity.y)

    const width = size[0];
    const height = size[1];
    const x = body.position.x;
    const y = body.position.y;

    // Interpolated rotation wrt the current y velocity of the bird
    const rotate = velocityRef.current.interpolate({
        inputRange: [-10, 0, 10, 20],
        outputRange: ['-20deg', '0deg', '15deg', '45deg'],
        extrapolate: 'clamp',
    })

    // Styles for the bird position
    const birdStyles: ImageStyle = useMemo(
        () => ({
            position: 'absolute',
            top: y,
            left: x,
            width,
            height,
            transform: [{
                rotate
            }]
        }),
        [x, y, height, width, color],
    );

    const bird = FLAPPY_BIRD_IMG[`bird${pose}`]

    return <Animated.Image source={bird} style={birdStyles} />;
};

export default Bird;