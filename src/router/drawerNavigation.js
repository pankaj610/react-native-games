import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { Component } from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import Home from "../components/Home";
import BottomNavigation from "./bottomTab";
import { signOut } from "../actions/appActions";
import { getHeaderTitle } from "@react-navigation/elements";
import MyHeader from "./MyHeader";
import IonIcons from "react-native-vector-icons/Ionicons";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Drawer = createDrawerNavigator();

class DrawerNavigation extends Component {
  async signOut() {
    const { signOut } = this.props;
    // await GoogleSignin.signOut();
    signOut();
  }
  render() {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerType: "slide",
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={this.signOut.bind(this)} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          component={BottomNavigation}
          name="ISKCON Calling Management"
          options={() => ({
            headerRight: (props) => (
              <IonIcons
                name="add-outline"
                size={30}
                style={{ marginRight: 12 }}
                onPress={() =>
                  this.props.navigation.navigate("DevoteeRegistration")
                }
              />
            ),
            // header: ({ navigation, route, options }) => {
            //   const title = getHeaderTitle(options, route.name);

            //   return (
            //     <MyHeader
            //       title={title}
            //       style={options.headerStyle}
            //       navigation={navigation}
            //     />
            //   );
            // },
            swipeEnabled: true,
          })}
        />
      </Drawer.Navigator>
    );
  }
}

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(DrawerNavigation);
