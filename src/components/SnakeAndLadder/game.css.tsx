import { StyleSheet } from "react-native";
import { BOARD_SIZE, PLAYER_WIDTH, screenWidth } from "./constants";




const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    board: {
        width: BOARD_SIZE,
        height: BOARD_SIZE
    },
    player: {
        height: PLAYER_WIDTH,
        width: PLAYER_WIDTH,
        resizeMode: 'contain',
        position: 'absolute'
    },
    dice: {
        height: PLAYER_WIDTH,
        width: PLAYER_WIDTH,
        resizeMode: 'contain',
        position: 'absolute',
    },
    diceContainer: {
        height: PLAYER_WIDTH,
        width: PLAYER_WIDTH,
    },
})
export default styles;