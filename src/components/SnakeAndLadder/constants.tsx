import { Dimensions, ImageSourcePropType } from "react-native";

export const screenWidth = Dimensions.get('screen').width;

export const screenHeight = Dimensions.get('screen').height;

export const BOARD_SIZE = screenWidth;

export const PLAYER_WIDTH = BOARD_SIZE / 10;

export const NUM_PLAYER = 2;

export const PLAYER_COLOR = ['red', 'green', 'yellow', 'blue'];

export const DICE_FACE = ['one', 'two', 'three', 'four', 'five', 'six'];

export const PLAYER_IMAGE: Record<string, ImageSourcePropType> = {
    'red': require('./assets/red_piece.png'),
    'blue': require('./assets/blue_piece.png'),
    'green': require('./assets/green_piece.png'),
    'yellow': require('./assets/yellow_piece.png'),
}

export const DICE_FACE_IMAGE: Record<string, ImageSourcePropType> = {
    'one': require('./assets/dice-six-faces-one.png'),
    'two': require('./assets/dice-six-faces-two.png'),
    'three': require('./assets/dice-six-faces-three.png'),
    'four': require('./assets/dice-six-faces-four.png'),
    'five': require('./assets/dice-six-faces-five.png'),
    'six': require('./assets/dice-six-faces-six.png'),
}