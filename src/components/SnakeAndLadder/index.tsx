import {Animated, Button, ImageBackground, Text} from "react-native";
import styles from "./game.css";
import useSnakeAndLadder from "./hooks/hooks";
import Players from "./Players";
import { Dices } from "./Dices";
import {NUM_PLAYER, PLAYER_COLOR, PLAYER_IMAGE} from "./constants";
import Reanimated from "react-native-reanimated";



function SnakeAndLadder() {
    const { playerRefs, dicesRef, currentPlayerRef, throwDice, resetGame } = useSnakeAndLadder();

    const backgroundStyles = {
        backgroundColor: currentPlayerRef.current.interpolate({
            inputRange: Array(NUM_PLAYER).fill(null).map((_, i) => i),
            outputRange: PLAYER_COLOR
        })
    }

    return <Animated.View style={[styles.container, backgroundStyles]}>
        <Button title="Reset" onPress={resetGame}/>

        <ImageBackground source={require('./assets/board.png')} style={styles.board} >
            <Players playerRefs={playerRefs} />
        </ImageBackground>





        <Dices dicesRef={dicesRef} onPress={throwDice} />

    </Animated.View>
}

export default SnakeAndLadder
