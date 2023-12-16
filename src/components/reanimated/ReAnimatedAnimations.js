import React, { useRef } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	SensorType,
	useAnimatedGestureHandler,
	useAnimatedScrollHandler,
	useAnimatedSensor,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

function ReAnimatedAnimations() {
	const scrollOffset = useSharedValue(0);
	const offset = useSharedValue(0);
	const rotation = useSharedValue(0);
	const pressed = useSharedValue(false);
	const startingPosition = 10;
	const x = useSharedValue(startingPosition);
	const y = useSharedValue(startingPosition);
	const onScrollHandler = useAnimatedScrollHandler({
		// onScroll: (event) => {
		// 	scrollOffset.value = event.contentOffset.y;
		// },
	});
	const doubleTapRef = useRef();
	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(offset.value, {
						duration: 500,
						easing: Easing.out(Easing.exp),
					}),
				},
				// {
				// 	translateY: withSpring(offset.value, {
				// 		damping: 20,
				// 		stiffness: 90,
				// 	}),
				// },
				{
					rotateZ: `${rotation.value}deg`,
				},
				// {
				// 	rotateY: `${offset.value}deg`,
				// },
			],
		};
	});
	const eventHandler = useAnimatedGestureHandler({
		onStart: (event, ctx) => {
			pressed.value = true;
		},
		onEnd: (event, ctx) => {
			pressed.value = false;
		},
	});

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (event, ctx) => {
			pressed.value = true;
			ctx.startX = x.value;
			ctx.startY = y.value;
		},
		onActive: (event, ctx) => {
			x.value = ctx.startX + event.translationX;
			y.value = ctx.startY + event.translationY;
		},
		onEnd: (event, ctx) => {
			pressed.value = false;
			x.value = withSpring(startingPosition);
			y.value = withSpring(startingPosition);
		},
	});
	const gestureAnim = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: x.value,
				},
				{
					translateY: y.value,
				},
			],
		};
	});

	const ballAnim = useAnimatedStyle(() => {
		return {
			backgroundColor: pressed.value ? '#FEEF86' : '#001972',
			transform: [{ scale: withSpring(pressed.value ? 1.2 : 1) }],
		};
	});
	const sensorData = useAnimatedSensor(SensorType.ROTATION, { interval: 10 });
	const sensorStyle = useAnimatedStyle(() => {
		const yaw = Math.abs(sensorData.sensor.value.yaw);
		const pitch = Math.abs(sensorData.sensor.value.pitch);
		return {
			height: withTiming(yaw * 200 + 20, { duration: 100 }), // <- usage
			width: withTiming(pitch * 200 + 20, { duration: 100 }), // <- usage
		};
	});

	return (
		<View style={{ flex: 1, alignItems: 'flex-start', padding: 30, width: '100%' }}>
			{/* <Animated.ScrollView onScroll={onScrollHandler}> */}
			<Button
				onPress={() => {
					const ANGLE = 10;
					offset.value = Math.random() * 255;
					rotation.value = withSequence(
						withTiming(-10, { duration: 50 }),
						withRepeat(withTiming(ANGLE, { duration: 100 }), 6, true),
						withTiming(0, { duration: 50 })
					);
				}}
				title="Press"
			/>
			<Animated.View style={[styles.box, animatedStyles]} />

			<TapGestureHandler onGestureEvent={eventHandler}>
				<Animated.View style={[styles.ball, ballAnim]} />
			</TapGestureHandler>
			<PanGestureHandler onGestureEvent={gestureHandler}>
				<Animated.View style={[styles.ball, gestureAnim]} />
			</PanGestureHandler>
			<Animated.View style={[styles.sensorBall, sensorStyle]} />
		</View>
	);
}

const styles = StyleSheet.create({
	box: {
		width: 100,
		height: 100,
		backgroundColor: 'purple',
		marginTop: 30,
		borderRadius: 10,
	},
	ball: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: 'green',
	},
	sensorBall: {
		borderRadius: 50,
		backgroundColor: 'red',
	},
});

export default ReAnimatedAnimations;
