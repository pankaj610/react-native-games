import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const SQUARE_SIZE = width * 0.8;
const WORDS = ["What's", 'up', 'mobile', 'users'];
interface PageProps {
	title: string;
	index: number;
	translateX: Animated.SharedValue<number>;
}
const Page: React.FC<PageProps> = ({ title, index, translateX }) => {
	const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
	const rStyle = useAnimatedStyle(() => {
		const scale = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);
		const borderRadius = interpolate(
			translateX.value,
			inputRange,
			[0, SQUARE_SIZE / 2, 0],
			Extrapolation.CLAMP
		);
		return {
			transform: [{ scale: scale }],
			borderRadius,
		};
	});
	const rTextStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			translateX.value,
			inputRange,
			[height / 2, 0, -height / 2],
			Extrapolation.CLAMP
		);
		const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2], Extrapolation.CLAMP);
		return {
			transform: [
				{
					translateY: translateY,
				},
			],
			opacity,
		};
	});
	return (
		<View
			key={index}
			style={[styles.pageContainer, { backgroundColor: `rgba(0, 0, 256, 0.${index + 2})` }]}>
			<Animated.View style={[styles.square, rStyle]} />
			<Animated.View style={[{ position: 'absolute' }, rTextStyle]}>
				<Text style={styles.text}>{title}</Text>
			</Animated.View>
		</View>
	);
};

function ScrollProAnimation() {
	const translateX = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateX.value = event.contentOffset.x;
	});

	return (
		<Animated.ScrollView
			onScroll={scrollHandler}
			scrollEventThrottle={16}
			style={styles.container}
			contentContainerStyle={styles.contentStyle}
			horizontal={true}
			pagingEnabled>
			{WORDS.map((title, index) => {
				return (
					<Page
						key={index.toString()}
						index={index}
						title={title}
						translateX={translateX}
					/>
				);
			})}
		</Animated.ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentStyle: {},
	pageContainer: { width, height, justifyContent: 'center', alignItems: 'center' },
	square: {
		width: SQUARE_SIZE,
		height: SQUARE_SIZE,
		backgroundColor: 'rgba(0,0,256, 0.4)',
	},
	text: {
		fontSize: 70,
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: '700',
	},
});

export default ScrollProAnimation;
