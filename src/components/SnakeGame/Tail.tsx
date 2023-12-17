import React from 'react';
import { View } from 'react-native';
import { ViewStyle } from 'react-native';
import { Constants } from './Constants';

export const Tail = ({
    elements,
    size,
}: {
    elements: Array<Array<number>>;
    size: number;
}) => {
    let tailList = elements.map((element, index) => {
        const x = element[0];
        const y = element[1];
        const headStyles: ViewStyle = {
            width: size,
            height: size,
            backgroundColor: '#888888',
            position: 'absolute',
            left: x * size,
            top: y * size,
        };
        return <View style={headStyles} key={index} />;
    });

    return (
        <View
            style={{
                width: Constants.GRID_SIZE * size,
                height: Constants.GRID_SIZE * size,
            }}>
            {tailList}
        </View>
    );
};