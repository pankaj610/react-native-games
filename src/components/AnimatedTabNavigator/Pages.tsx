// @flow
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { type Section, SMALL_HEADER_HEIGHT } from './Model';
import { MockCard } from './MockCard';
import { MockEntry } from './MockEntry';
import Animated, { SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

type PagesProps = {
    sections: Section[],
    x: SharedValue<number>,
    y: SharedValue<number>,
};

const { height, width } = Dimensions.get('window');

export const Pages: React.FC<PagesProps> = (props) => {

    const { sections, x, y } = props;

    const animatedStyles = useAnimatedStyle(() => {
        const translateX = x.value * -1;
        const translateY = y.value * -1;
        return {
            transform: [{ translateX: translateX }, { translateY: translateY }]
        }
    })

    return (
        <View style={styles.container}>
            {
                sections.map(({ image }, key) => (
                    <Animated.View style={[styles.page, animatedStyles]} {...{ key }}>
                        <MockEntry {...{ image }} />
                        <MockCard {...{ image }} />
                        <MockEntry {...{ image }} />
                        <MockEntry {...{ image }} />
                        <MockEntry {...{ image }} />
                        <MockEntry {...{ image }} />
                    </Animated.View>
                ))
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    page: {
        backgroundColor: 'white',
        width,
        height: height - SMALL_HEADER_HEIGHT,
    },
});