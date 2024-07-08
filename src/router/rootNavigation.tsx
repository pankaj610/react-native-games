import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { restoreToken } from '../actions/appActions';
import Login from '../components/Login';
import DrawerNavigation from './drawerNavigation';
import { enableScreens } from 'react-native-screens';
import ReAnimatedAnimations from '../components/reanimated/ReAnimatedAnimations';
import LayoutAnimations from '../components/reanimated/LayoutAnimation';
import ScrollExampleComponent from '../components/reanimated/ScrollAnimationEx';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WorkletExample from '../components/reanimated/WorkletExample';
import PanGestureHandlerExample from '../components/reanimated/PanGestureHandlerExample';
import ScrollProAnimation from '../components/reanimated/ScrollProAnimation';
import PinGestureHandlerExample from '../components/reanimated/PinGestureHandlerExample';
import TapGestureHandlerExample from '../components/reanimated/TapGestureHandlerExample';
import SnakeAndLadder from '../components/SnakeAndLadder';
import SnakeGame from '../components/SnakeGame';
import FlappyBird from '../components/FlappyBird';
import MineSweeper from '../components/MineSweeper';
import ChessGameComponent from '../components/ChessGame';

enableScreens();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
class RootNavigation extends Component {
  render() {
    const { isSignedIn } = { isSignedIn: false } || this.props;
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
        <Drawer.Screen component={ChessGameComponent} name="ChessGame" />
        <Drawer.Screen component={MineSweeper} name="MineSweeper" />
        <Drawer.Screen component={FlappyBird} name="FlappyBird" />
        <Drawer.Screen component={SnakeGame} name="SnakeGame" />
        <Drawer.Screen component={SnakeAndLadder} name="SnakeAndLadder" />
        <Drawer.Screen
          component={TapGestureHandlerExample}
          name="TapGestureHandlerExample"
        />
        <Drawer.Screen
          component={PinGestureHandlerExample}
          name="PinGestureHandlerExample"
        />
        <Drawer.Screen
          component={ScrollProAnimation}
          name="ScrollProAnimation"
        />
        <Drawer.Screen
          component={PanGestureHandlerExample}
          name="PanGestureHandlerExample"
        />
        <Drawer.Screen component={WorkletExample} name="WorkletExample" />
        <Drawer.Screen
          component={ScrollExampleComponent}
          name="ScrollExampleComponent"
        />
        <Drawer.Screen component={ReAnimatedAnimations} name="ReAnimated" />
        <Drawer.Screen component={LayoutAnimations} name="LayoutAnimation" />
        <Drawer.Screen component={Login} name="Login" />
      </Drawer.Navigator>
    );
  }
}

const mapDispatchToProps = {
  restoreToken,
};

const mapStateToProps = state => ({
  token: state.appReducer.token,
  isSignedIn: state.appReducer.isSignedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);
