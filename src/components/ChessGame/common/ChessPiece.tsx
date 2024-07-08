import { Chess, Position } from 'chess.js';
import * as React from 'react';
import { Image } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PIECES } from '../constants';
import { CHESS_WIDTH } from './ChessBoard';
import { Gesture, GestureDetector, PanGestureHandler } from 'react-native-gesture-handler';
import { Vector } from 'matter-js';

interface ChessPieceProps {
    id: Piece;
    startPosition: {
        x: number;
        y: number;
    }
    chess: Chess
    onTurn: () => void;
    enabled: boolean
}


export type Player = "b" | "w";
export type Type = "q" | "r" | "n" | "b" | "k" | "p";
export type Piece = `${Player}${Type}`;
export type Pieces = Record<Piece, ReturnType<typeof require>>;

const PIECE_WIDTH = CHESS_WIDTH / 8

const toPosition = ({ x, y }: Vector) => {
    'worklet'
    const col = String.fromCharCode(97 + Math.round(x / PIECE_WIDTH))
    const row = 8 - Math.round(y / PIECE_WIDTH)
    return `${col}${row}` as Position
}

const toTranslation = (to: Position) => {
    'worklet'
    const tokens = to.split("")
    const col = tokens[0]
    const row = tokens[1]
    if (!row || !col) {
        throw new Error("Row or column doesn't exist")
    }
    const indexes = {
        x: col.charCodeAt(0) - 'a'.charCodeAt(0),
        y: parseInt(row, 10) - 1
    }
    return {
        x: indexes.x * PIECE_WIDTH,
        y: (7 - indexes.y) * PIECE_WIDTH
    }
}

const ChessPiece = (props: ChessPieceProps) => {
    const { id, startPosition, chess, onTurn, enabled } = props
    const isGestureActive = useSharedValue(false);
    const isMovable = useSharedValue(false)
    const offsetX = useSharedValue(0)
    const offsetY = useSharedValue(0)
    const translateX = useSharedValue(startPosition.x * PIECE_WIDTH)
    const translateY = useSharedValue(startPosition.y * PIECE_WIDTH)

    const movePiece = React.useCallback((to: Position) => {
        const moves = chess.moves({ verbose: true })
        const from = toPosition({ x: offsetX.value, y: offsetY.value })
        const move = moves.find((m) => m.from === from && m.to === to)
        // console.log(x, y, to)
        const { x, y } = toTranslation(move ? move.to : from)
        translateX.value = withTiming(x, {
            duration: 100,
        }, () => {
            offsetX.value = translateX.value
        })
        translateY.value = withTiming(y, {
            duration: 100
        }, () => {
            offsetY.value = translateY.value
            isGestureActive.value = false
        })
        if (move) {
            chess.move({ from, to });
            onTurn();
        }
    }, [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY])

    const enableMoves = React.useCallback(() => {
        const moves = chess.moves({ verbose: true })
        const from = toPosition({ x: offsetX.value, y: offsetY.value })
        const availableMoves = moves.filter((m) => m.from === from)
        console.log(availableMoves)
    }, [])

    const tapGesture = Gesture.Tap().onEnd(() => {
        runOnJS(enableMoves)()
        isGestureActive.value = false
    })

    const panGesture = Gesture.Pan().onBegin((props) => {
        offsetX.value = translateX.value;
        offsetY.value = translateY.value;
        isGestureActive.value = true
    }).onChange(({ translationX, translationY }) => {
        translateX.value = offsetX.value + translationX
        translateY.value = offsetY.value + translationY
    }).onEnd((props) => {
        runOnJS(movePiece)(
            toPosition({ x: translateX.value, y: translateY.value })
        )
    })

    const combinedGesture = Gesture.Simultaneous(tapGesture, panGesture)

    const style = useAnimatedStyle(() => ({
        transform: [{
            translateX: translateX.value,
        }, {
            translateY: translateY.value,
        }],
        position: 'absolute'
    }))



    const original = useAnimatedStyle(() => {
        return {
            position: "absolute",
            width: PIECE_WIDTH,
            height: PIECE_WIDTH,
            zIndex: 0,
            backgroundColor: isGestureActive.value
                ? "rgba(255, 255, 0, 0.5)"
                : "transparent",
            transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
        };
    });
    const underlay = useAnimatedStyle(() => {
        const position = toPosition({ x: translateX.value, y: translateY.value });
        const translation = toTranslation(position);
        return {
            position: "absolute",
            width: PIECE_WIDTH,
            height: PIECE_WIDTH,
            zIndex: 0,
            backgroundColor: isGestureActive.value
                ? "rgba(255, 255, 0, 0.5)"
                : "transparent",
            transform: [{ translateX: translation.x }, { translateY: translation.y }],
        };
    });

    return (
        <>
            <Animated.View style={original} />
            <Animated.View style={underlay} />
            <GestureDetector gesture={combinedGesture}>
                <Animated.View style={style}>
                    <Image source={PIECES[id]} style={{
                        width: PIECE_WIDTH,
                        height: PIECE_WIDTH,
                    }} />
                </Animated.View>
            </GestureDetector>
        </>
    );
};

export default ChessPiece;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: 10,
        width: 10,
    },
    piece: {
        width: PIECE_WIDTH,
        height: PIECE_WIDTH,
    },
});
