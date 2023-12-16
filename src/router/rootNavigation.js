import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { restoreToken } from '../actions/appActions';
import Login from '../components/Login';
import DrawerNavigation from './drawerNavigation';
import { enableScreens } from 'react-native-screens';
import { Snackbar } from 'react-native-paper';
import ReactQuery from '../components/react-query/ReactQuery';
import InfiniteQuery from '../components/react-query/InfiniteQuery';
import MutationQuery from '../components/react-query/MutationQuery';
import ReAnimatedAnimations from '../components/reanimated/ReAnimatedAnimations';
import LayoutAnimations from '../components/reanimated/LayoutAnimation';
import ScrollExampleComponent from '../components/reanimated/ScrollAnimationEx';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WorkletExample from '../components/reanimated/WorkletExample';
import PanGestureHandlerExample from '../components/reanimated/PanGestureHandlerExample';
import ScrollProAnimation from '../components/reanimated/ScrollProAnimation';
import PinGestureHandlerExample from '../components/reanimated/PinGestureHandlerExample';
import TapGestureHandlerExample from '../components/reanimated/TapGestureHandlerExample';
enableScreens();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
class RootNavigation extends Component {
	render() {
		const { isSignedIn } = this.props;
		return isSignedIn ? (
			<Stack.Navigator>
				<Stack.Screen
					component={DrawerNavigation}
					name="DrawerStack"
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		) : (
			<Drawer.Navigator>
				<Drawer.Screen
					component={TapGestureHandlerExample}
					name="TapGestureHandlerExample"
				/>
				<Drawer.Screen
					component={PinGestureHandlerExample}
					name="PinGestureHandlerExample"
				/>
				<Drawer.Screen component={ScrollProAnimation} name="ScrollProAnimation" />
				<Drawer.Screen
					component={PanGestureHandlerExample}
					name="PanGestureHandlerExample"
				/>
				<Drawer.Screen component={WorkletExample} name="WorkletExample" />
				<Drawer.Screen component={ScrollExampleComponent} name="ScrollExampleComponent" />
				<Drawer.Screen component={ReAnimatedAnimations} name="ReAnimated" />
				<Drawer.Screen component={LayoutAnimations} name="LayoutAnimation" />
				<Drawer.Screen component={MutationQuery} name="MutationQuery" />
				<Drawer.Screen component={InfiniteQuery} name="InfiniteQuery" />
				<Drawer.Screen component={ReactQuery} name="ReactQuery" />
				<Drawer.Screen component={Login} name="Login" />
			</Drawer.Navigator>
		);
	}
}

const mapDispatchToProps = {
	restoreToken,
};

const mapStateToProps = (state) => ({
	token: state.appReducer.token,
	isSignedIn: state.appReducer.isSignedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);
