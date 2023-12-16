import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

type ContextType = {
	startX: number;
	startY: number;
};

const SIZE = 50;
const CIRCLE_RADIUS = 150;

function PanGestureHandlerExample() {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const panGestureHandler = useAnimatedGestureHandler({
		onStart: (event: PanGestureHandlerEventPayload, context: ContextType) => {
			context.startX = translateX.value;
			context.startY = translateY.value;
		},
		onActive: (event: PanGestureHandlerEventPayload, context: ContextType) => {
			translateX.value = context.startX + event.translationX;
			translateY.value = context.startY + event.translationY;
		},
		onEnd: (event) => {
			const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

			if (distance < CIRCLE_RADIUS + SIZE / 2) {
				translateX.value = withSpring(0);
				translateY.value = withSpring(0);
			}
		},
	});
	const translateStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
		};
	}, []);
	return (
		<View style={styles.container}>
			<PanGestureHandler onGestureEvent={panGestureHandler}>
				<Animated.View style={[styles.circle]}>
					<Animated.View style={[styles.square, translateStyle]}></Animated.View>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	square: {
		width: SIZE,
		height: SIZE,
		backgroundColor: 'rgba(0, 0, 256, 0.5)',
		borderRadius: 20,
	},
	circle: {
		width: CIRCLE_RADIUS * 2,
		height: CIRCLE_RADIUS * 2,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: CIRCLE_RADIUS,
		borderWidth: 5,
		borderColor: 'rgba(0, 0, 256, 0.5)',
	},
});

export default PanGestureHandlerExample;
