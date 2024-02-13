import { Animated, Button, View } from "react-native";
import styles from "./game.css";
import useSnakeAndLadder from "./hooks/hooks";
import { Dices } from "./Dices";
import { NUM_PLAYER, PLAYER_COLOR } from "./constants";
import Board from "./components/Board";
import { Players } from "./components/Players";



function SnakeAndLadderModified() {
    const { playerRefs, dicesRef, boardRef, rootContainerRef, numberMapping, throwDice, resetGame } = useSnakeAndLadder();

    // const backgroundStyles = {
    //     backgroundColor: currentPlayerRef.current.interpolate({
    //         inputRange: Array(NUM_PLAYER).fill(null).map((_, i) => i),
    //         outputRange: PLAYER_COLOR
    //     })
    // }

    const tempFunction = () => {
        console.log(numberMapping)
        console.log(boardRef.current[0][7].ref.current?.measure((x, y, width, height, pageX, pageY) => console.log(x, y, width, height, pageX, pageY)))
        // console.log(JSON.stringify(boardRef.current, null, 2))
    }

    const callback: React.LegacyRef<View> = (element: View) =>
        (rootContainerRef.current = element);

    return <View style={[styles.container]} ref={callback}>
        <Button title="View Output" onPress={tempFunction} />
        {/* <Button title="Reset" onPress={resetGame} /> */}

        <Board boardRef={boardRef} />
        <Players playerRefs={playerRefs} />

        {/* <ImageBackground source={require('./assets/board.png')} style={styles.board} >
            <Players playerRefs={playerRefs} />
        </ImageBackground> */}


        <Dices dicesRef={dicesRef} onPress={throwDice} />

    </View>
}

export default SnakeAndLadderModified
