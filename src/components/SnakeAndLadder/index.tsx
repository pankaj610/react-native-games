import { ImageBackground, Text, View } from "react-native";
import styles from "./game.css";
import useSnakeAndLadder from "./hooks/hooks";
import Players from "./Players";
import { Button } from "react-native-paper";
import { Dices } from "./Dices";


function SnakeAndLadder() {
    const { playerRefs, dicesRef, throwDice } = useSnakeAndLadder();
    return <View style={styles.container}>
        <Text >Snake & Ladders</Text>
        <ImageBackground source={require('./assets/board.png')} style={styles.board} >
            <Players playerRefs={playerRefs} />
        </ImageBackground>

        <Dices dicesRef={dicesRef} onPress={throwDice} />
    </View>
}

export default SnakeAndLadder