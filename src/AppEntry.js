/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import RootNavigation from './router/rootNavigation';
import store from './store';
import { QueryClientProvider, QueryClient } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();
class AppEntry extends React.Component {
	render() {
		return (
			<GestureHandlerRootView style={{ flex: 1 }}>
				<QueryClientProvider client={queryClient}>
					<PaperProvider>
						<Provider store={store}>
							<NavigationContainer>
								<RootNavigation></RootNavigation>
							</NavigationContainer>
						</Provider>
					</PaperProvider>
				</QueryClientProvider>
			</GestureHandlerRootView>
		);
	}
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default AppEntry;
