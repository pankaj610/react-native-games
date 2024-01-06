import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Pages } from './Pages';
import { MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT, Section } from './Model';
import { Headers } from './Headers';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
const { width, height } = Dimensions.get("screen");
export interface SectionsProps {
    sections: Section[],
}

const onScroll = (contentOffset: { x?: Animated.Value, y?: Animated.Value }) => Animated.event([{
    nativeEvent: {
        contentOffset: {
            y: contentOffset.y || new Animated.Value(0),
            x: contentOffset.x || new Animated.Value(0),
        },
    }
}], { useNativeDriver: true })

export function Sections(props: SectionsProps) {
    const { sections } = props;
    // const y = React.useRef(new Animated.Value(0)).current;
    // const x = React.useRef(new Animated.Value(0)).current;
    const scrollXRef = useAnimatedRef<Animated.ScrollView>();
    const scrollYRef = useAnimatedRef<Animated.ScrollView>();

    const x = useScrollViewOffset(scrollXRef)
    const y = useScrollViewOffset(scrollYRef)


    return (
        <View style={styles.container}>
            <View>
                <Headers {...{ sections, x, y }} />
                <Pages {...{ sections, x, y }} />
            </View>
            <Animated.ScrollView
                ref={scrollYRef}
                style={StyleSheet.absoluteFill}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
                contentContainerStyle={{ height: height + height - SMALL_HEADER_HEIGHT * 1.5 }}
            >
                <Animated.ScrollView
                    ref={scrollXRef}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    bounces={false}
                    contentContainerStyle={{ width: width * props.sections.length }}
                    snapToInterval={width}
                    decelerationRate='fast'
                    horizontal
                />

            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});