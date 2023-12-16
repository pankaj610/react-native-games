import React, { useState } from 'react';
import { Button, LayoutAnimation, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
	BounceInRight,
	BounceOutDown,
	Layout,
	SlideInLeft,
	SlideInRight,
	SlideOutDown,
	SlideOutLeft,
	SlideOutRight,
} from 'react-native-reanimated';

function LayoutAnimations() {
	const [tasks, setTasks] = useState(['Learn 1', 'Learn 2', 'Learn 3', 'Learn 4', 'Learn 5 ']);
	const popTask = () => {
		setTasks((t) => {
			t.splice(-1);
			return [...t];
		});
	};
	const insertTask = () => {
		setTasks((t) => {
			return [...t, 'Learn ' + Math.ceil(Math.random() * 100)];
		});
	};
	return (
		<ScrollView style={{ flex: 1 }}>
			<Button title="Add" onPress={insertTask} />
			<Button title="Remove" onPress={popTask} />
			{tasks.map((task, index) => (
				<Animated.View
					key={index}
					entering={BounceInRight}
					exiting={BounceOutDown}
					layout={Layout.springify()}>
					<View style={styles.row}>
						<Text>{task}</Text>
					</View>
				</Animated.View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	row: {
		padding: 20,
		borderBottomColor: '#ccc',
		borderBottomWidth: 2,
	},
});

export default LayoutAnimations;
