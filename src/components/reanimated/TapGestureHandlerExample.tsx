import React, { useCallback, useRef } from 'react';
import { Text, StyleSheet, Image, Dimensions, View, ImageBackground } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
const imageUri =
	'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const { height, width } = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);
function TapGestureHandlerExample() {
	const scale = useSharedValue(0);
	const doubleTapRef = useRef();
	const trippleTap = useRef();

	const scaleStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: Math.max(scale.value, 0) }],
		};
	}, []);

	const onDoubleTap = useCallback(() => {
		scale.value = withSpring(1, undefined, (isFinished) => {
			if (isFinished) {
				scale.value = withSpring(0);
			}
		});
	}, []);

	return (
		<View style={styles.container}>
			<TapGestureHandler
				waitFor={doubleTapRef}
				onActivated={() => {
					console.log('Single Tap');
				}}>
				<TapGestureHandler
					maxDelayMs={250}
					waitFor={trippleTap}
					ref={doubleTapRef}
					numberOfTaps={2}
					onActivated={onDoubleTap}>
					<TapGestureHandler
						maxDelayMs={250}
						ref={trippleTap}
						numberOfTaps={3}
						onActivated={() => {
							alert('Tripple Pressed');
						}}>
						<Animated.View>
							<ImageBackground source={{ uri: imageUri }} style={styles.image}>
								<AnimatedImage
									source={require('./../../../assets/heart.png')}
									style={[styles.heart, scaleStyle]}
								/>
							</ImageBackground>
						</Animated.View>
					</TapGestureHandler>
				</TapGestureHandler>
			</TapGestureHandler>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: width,
		width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	heart: {
		height: 100,
		width: 110,
		resizeMode: 'contain',
	},
});

export default TapGestureHandlerExample;
