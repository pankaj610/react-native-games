import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import ChessBoard from './common/ChessBoard';

interface ChessGameComponentProps { }

const ChessGameComponent = (props: ChessGameComponentProps) => {
    return (
        <View style={styles.container}>
            <ChessBoard />
        </View>
    );
};

export default ChessGameComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgb(255, 255, 255)",
    }
});
