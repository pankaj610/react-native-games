import * as React from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';

const WHITE = "rgb(100, 133, 68)";
const BLACK = "rgb(230, 233, 198)";

interface SquareProps {
    row: number;
    col: number;
    white: boolean
}

const Square = (props: SquareProps) => {
    const backgroundColor = props.white ? WHITE : BLACK;
    const color = props.white ? BLACK : WHITE;
    const textStyle = React.useMemo(() => ({ color, fontWeight: "800" } as TextStyle), [color])

    return (
        <View style={[styles.squareContainer, { backgroundColor }]}>
            {props.col === 0 && <Text style={textStyle}>{"" + (8 - props.row)}</Text>}
            {props.row === 7 && <Text style={textStyle}>{"" + (String.fromCharCode(97 + props.col))}</Text>}
        </View>
    );
};

interface RowProps {
    row: number
    white: boolean
}

const Row = (props: RowProps) => {
    return (
        <View style={styles.rowContainer}>
            {new Array(8).fill(0).map((_, j) => (
                <Square row={props.row} col={j} white={((props.row + j) % 2 === 0)} />
            ))}
        </View>
    );
};


interface ChessBackgroundProps { }

const ChessBackground = (props: ChessBackgroundProps) => {
    return (
        <View style={styles.container}>
            {new Array(8).fill(0).map((_, i) => (
                <Row key={i} white={i % 2 === 0} row={i} />
            ))}
        </View>
    );
};

export default ChessBackground;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
    },
    squareContainer: {
        flex: 1,
        padding: 4,
        justifyContent: "space-between",
    }
});
