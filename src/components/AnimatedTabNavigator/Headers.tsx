import * as React from 'react';
import { Dimensions, StyleSheet, } from 'react-native';
import { CURSOR_GAP, CURSOR_WIDTH, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT, Section } from './Model';
import { Header } from './Header';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
const { height, width } = Dimensions.get('screen')

const backgroundColor = '#343761';

const { View } = Animated;

export interface HeadersProps {
    sections: Section[],
    x: SharedValue<number>,
    y: SharedValue<number>,
}

export function Headers(props: HeadersProps) {
    const { sections, x, y } = props;
    const FULL_HEADER_HEIGHT = height / sections.length;


    const getStyles = (index: number) => {
        return useAnimatedStyle(() => {
            const translateY = interpolate(y.value,
                [0, height - MEDIUM_HEADER_HEIGHT],
                [FULL_HEADER_HEIGHT * index, 0],
                Extrapolation.CLAMP,
            )
            const translateX = interpolate(y.value, [0, height - MEDIUM_HEADER_HEIGHT], [x.value, width * index],
                Extrapolation.CLAMP,
            )

            const HeaderHeight = interpolate(y.value, [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
                [FULL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT],
                Extrapolation.CLAMP)

            return {
                position: "absolute",
                top: 0,
                left: 0,
                height: HeaderHeight,
                transform: [{ translateY }, { translateX }],
            }
        })
    }

    const containerStyles = useAnimatedStyle(() => {
        return ({
            transform: [{ translateX: x.value * -1 }],
        })
    })

    const getLabelStyles = (index: number) => {
        return useAnimatedStyle(() => {
            const HeaderHeight = interpolate(y.value, [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
                [FULL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT],
                Extrapolation.CLAMP)

            const translateY = interpolate(y.value,
                [0, height - MEDIUM_HEADER_HEIGHT],
                [FULL_HEADER_HEIGHT / 2 - 20, HeaderHeight / 4],
                Extrapolation.CLAMP,
            )
            const translateX = interpolate(y.value,
                [0, height - MEDIUM_HEADER_HEIGHT],
                [width / 10, width / 2 - sections[index].title.length * 10],
                Extrapolation.CLAMP,
            )
            const opacity = interpolate(x.value, [width * (index - 1), width * index, width * (index + 1)], [0.5, 1, 0.5], Extrapolation.CLAMP)
            return {
                transform: [{ translateY }, { translateX }],
                opacity,
            }
        })
    }

    const getCursorStyles = (index: number) => {
        return useAnimatedStyle(() => {
            const HeaderHeight = interpolate(y.value, [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
                [FULL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT],
                Extrapolation.CLAMP)

            const translateY = interpolate(y.value,
                [0, height - MEDIUM_HEADER_HEIGHT],
                [HeaderHeight / 1.7 + FULL_HEADER_HEIGHT * index, HeaderHeight / 2],
                Extrapolation.CLAMP,
            )
            const diff = width / 2 - (sections.length * (CURSOR_WIDTH + CURSOR_GAP)) / 2
            const translateX = interpolate(y.value,
                [0, height - MEDIUM_HEADER_HEIGHT],
                [x.value + width / 10, diff + x.value + (CURSOR_WIDTH + CURSOR_GAP) * index],
                Extrapolation.CLAMP,
            )
            const opacity = interpolate(x.value, [width * (index - 1), width * index, width * (index + 1)], [0.5, 1, 0.5], Extrapolation.CLAMP)
            return {
                transform: [{ translateY }, { translateX }],
                opacity,
                position: 'absolute',
            }
        })
    }

    return (
        <View style={[{ height: height, width: sections.length * width, backgroundColor }, containerStyles]}>
            {sections.map((section, index) => {
                return (<View style={getStyles(index)} key={index}>
                    <Header section={section} labelStyles={getLabelStyles(index)} />
                </View>)
            })}

            {sections.map((_, index) => {
                return (<Animated.View style={[styles.cursorStyles, getCursorStyles(index)]} key={index} />)
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    cursorStyles: {
        height: 5,
        width: CURSOR_WIDTH,
        backgroundColor: 'white',
        borderRadius: 3,
        zIndex: 2
    }
});