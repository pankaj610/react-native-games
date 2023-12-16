import { Animated, ImageBackground, Text } from "react-native";
import styles from "./game.css";
import useSnakeAndLadder from "./hooks/hooks";
import Players from "./Players";
import { Dices } from "./Dices";
import { NUM_PLAYER, PLAYER_COLOR } from "./constants";



function SnakeAndLadder() {
    const { playerRefs, dicesRef, currentPlayerRef, throwDice } = useSnakeAndLadder();

    const backgroundStyles = {
        backgroundColor: currentPlayerRef.current.interpolate({
            inputRange: Array(NUM_PLAYER).fill(null).map((_, i) => i),
            outputRange: PLAYER_COLOR
        })
    }

    console.log("Re-rendering", backgroundStyles);

    return <Animated.View style={[styles.container, backgroundStyles]}>
        <ImageBackground source={require('./assets/board.png')} style={styles.board} >
            <Players playerRefs={playerRefs} />
        </ImageBackground>

        <Dices dicesRef={dicesRef} onPress={throwDice} />

    </Animated.View>
}

export default SnakeAndLadder