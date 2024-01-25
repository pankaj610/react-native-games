import { Animated, Button, ImageBackground, Text } from "react-native";
import styles from "./game.css";
import useSnakeAndLadder from "./hooks/hooks";
import Players from "./Players";
import { Dices } from "./Dices";
import { NUM_PLAYER, PLAYER_COLOR, PLAYER_IMAGE } from "./constants";
import Reanimated from "react-native-reanimated";
import Board from "./components/Board";



function SnakeAndLadderModified() {
    const { playerRefs, dicesRef, currentPlayerRef, boardRef, numberMapping, throwDice, resetGame } = useSnakeAndLadder();

    const backgroundStyles = {
        backgroundColor: currentPlayerRef.current.interpolate({
            inputRange: Array(NUM_PLAYER).fill(null).map((_, i) => i),
            outputRange: PLAYER_COLOR
        })
    }

    const tempFunction = () => {
        console.log(numberMapping)
        console.log(boardRef.current[0][7].ref.current?.measure((x, y, width, height, pageX, pageY) => console.log(x, y, width, height, pageX, pageY)))
        // console.log(JSON.stringify(boardRef.current, null, 2))
    }

    return <Animated.View style={[styles.container]}>
        <Button title="View Output" onPress={tempFunction} />
        {/* <Button title="Reset" onPress={resetGame} /> */}

        <Board boardRef={boardRef} />

        {/* <ImageBackground source={require('./assets/board.png')} style={styles.board} >
            <Players playerRefs={playerRefs} />
        </ImageBackground> */}


        <Dices dicesRef={dicesRef} onPress={throwDice} />

    </Animated.View>
}

export default SnakeAndLadderModified
