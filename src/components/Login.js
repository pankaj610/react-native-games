import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { signIn } from './../actions/appActions';
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Storage } from "../utils.js/utils";
import { TOKEN } from './../constants/index';

class Login extends React.Component  {
    async login() {
        const {signIn} = this.props;
        // const { idToken } = await GoogleSignin.signIn();
        let idToken = "ABC";
        signIn(idToken); 
    }
    render() {
        return(<View style={styles.container}>
            <View>
                 
                <Text>Google Login</Text> 
                <Button color={'green'} title="Google Login" onPress={this.login.bind(this)}/>

            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => ({
    isSignedIn: state.appReducer.isSignedIn
});

const mapDispatchToProps =  {
    signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);