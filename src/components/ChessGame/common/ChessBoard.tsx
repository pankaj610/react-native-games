import { Chess } from 'chess.js';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { screenWidth } from '../../SnakeAndLadder/constants';
import ChessBackground from './ChessBackground';
import ChessPiece from './ChessPiece';

interface ChessBoardProps { }

export const CHESS_WIDTH = screenWidth

const ChessBoard = (props: ChessBoardProps) => {
    const chess = React.useRef(new Chess()).current
    const [state, setState] = React.useState({
        player: "w",
        board: chess.board()
    })

    const onTurn = React.useCallback(() => {
        setState({
            player: state.player === "w" ? "b" : "w",
            board: chess.board(),
        });
    }, [chess, state.player]);

    return (
        <View style={styles.container}>
            <ChessBackground />
            {state.board.map((row, y) => {
                return row.map((piece, x) => {
                    if (piece != null) {
                        return <ChessPiece
                            key={`${x}_${y}`}
                            id={`${piece.color}${piece.type}`}
                            startPosition={{
                                x,
                                y
                            }} chess={chess}
                            onTurn={onTurn}
                            enabled={state.player === piece.color}
                        />
                    }
                })
            })}
        </View>
    );
};

export default ChessBoard;

const styles = StyleSheet.create({
    container: {
        width: CHESS_WIDTH,
        height: CHESS_WIDTH,
    }
});
