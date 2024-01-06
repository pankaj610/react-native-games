// @flow
import * as React from 'react';
import {
    View, StyleSheet, Image, Dimensions, TextStyle,
} from 'react-native';
import { Section } from './Model';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

type HeaderProps = {
    section: Section,
    labelStyles: AnimatedStyle<TextStyle>,
};

const { width } = Dimensions.get('window');

export const Header: React.FC<HeaderProps> = (props) => {
    const { section, labelStyles, } = props;
    const colors = [section.leftColor, section.rightColor];
    return (
        <View style={styles.container}>
            <Image source={section.image} style={styles.image} />
            <LinearGradient
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                {...{ colors }}
            />
            <Animated.Text style={[styles.sectionTitle, labelStyles]}>{section.title}</Animated.Text>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        position: 'relative'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.9,
        zIndex: 1
    },
    sectionTitle: {
        color: 'white',
        fontSize: 32,
        zIndex: 2,
        fontFamily: 'Menlo',
        fontWeight: '400',
    },

});