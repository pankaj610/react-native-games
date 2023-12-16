import React from "react";

import { DICE_FACE_IMAGE } from "./constants";
import styles from "./game.css";
import { Animated, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export type Dice = {
    opacity: Animated.Value,
    value: number,
    name: string
}


export const Dice: React.FC<{ dice: Dice }> = ({ dice }) => {
    const diceStyle = {
        opacity: dice.opacity
    }

    return <Animated.Image source={DICE_FACE_IMAGE[dice.name]} style={[styles.dice, diceStyle]} />;
}

interface DicesProps {
    dicesRef: React.MutableRefObject<Array<Dice>>,
    onPress: () => void
}

export const Dices: React.FC<DicesProps> = ({ dicesRef, onPress }) => {

    return <TouchableOpacity onPress={onPress} style={styles.diceContainer}>
        {dicesRef.current.map((dice) => <Dice dice={dice} key={dice.name} />)}
    </TouchableOpacity>
}