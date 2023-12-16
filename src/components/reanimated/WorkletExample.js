import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

const SIZE = 100;
function WorkletExample() {
	const progress = useSharedValue(0);
	const scale = useSharedValue(0);

	const handleRotation = (progress) => {
		'worklet';
		return `${progress.value * 2 * Math.PI}deg`;
	};

	const reanimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: progress.value,
			transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
			borderRadius: (progress.value * SIZE) / 8,
		};
	}, []);

	useEffect(() => {
		progress.value = withRepeat(withSpring(1, { duration: 500 }), -1, true);
		scale.value = withRepeat(withSpring(2), -1, true);
	}, []);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					{
						height: SIZE,
						width: SIZE,
						backgroundColor: 'red',
					},
					reanimatedStyle,
				]}></Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default WorkletExample;
