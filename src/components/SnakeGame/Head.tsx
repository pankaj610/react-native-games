import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ViewStyle } from 'react-native';
import { MatterType } from './types';

export const Head = ({ position, size }: MatterType) => {
    const x = position[0];
    const y = position[1];

    const headStyles: ViewStyle = useMemo(
        () => ({
            width: size,
            height: size,
            backgroundColor: 'red',
            position: 'absolute',
            left: x * size,
            top: y * size,
        }),
        [size, x, y],
    );

    return <View style={headStyles} />;
};