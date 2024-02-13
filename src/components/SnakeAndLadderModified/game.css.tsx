import { StyleSheet } from "react-native";
import { BOARD_SIZE, DICE_WIDTH, PLAYER_WIDTH, screenWidth } from "./constants";




const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    board: {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    player: {
        height: PLAYER_WIDTH,
        width: PLAYER_WIDTH,
        // shadowOpacity: 0.7,
        // shadowOffset: {
        //     height: 1,
        //     width: 1
        // },
        resizeMode: 'contain',
        position: 'absolute'
    },
    dice: {
        height: DICE_WIDTH,
        width: DICE_WIDTH,
        resizeMode: 'contain',
        position: 'absolute',
    },
    diceContainer: {
        height: DICE_WIDTH,
        width: DICE_WIDTH,
        marginTop: DICE_WIDTH / 2
    },
})
export default styles;
