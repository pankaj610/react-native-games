import { Text, View, StyleSheet } from 'react-native';
import { screenWidth } from '../constants';
import { BoardRefType } from '../hooks/hooks';


interface BoardProps {
    boardRef: React.MutableRefObject<BoardRefType>,
}


const GAP = 4

const BOARD_SIZE = screenWidth - 32

const Board = (props: BoardProps) => {
    const { boardRef } = props

    return (
        <View style={styles.container}>
            <View style={styles.boardContainer}>
                {boardRef.current.map((row, rowIdx) => {
                    const finalRow = rowIdx % 2 == 0 ? row : [...row].reverse()
                    return (<View key={rowIdx} style={styles.boardRowContainer}>
                        {finalRow.map((item) => {
                            const callback: React.LegacyRef<View> = (element: View) =>
                                (item.ref.current = element);
                            return (<View ref={callback} onLayout={(event) => {
                                item.layout = event.nativeEvent.layout;
                            }} style={[styles.boardStepContainer, item.num % 2 == 0 ? styles.lightBackground : styles.whiteBackground]} key={item.num}>
                                <Text style={styles.boardStep}>{item.num}</Text>
                            </View>)
                        })}
                    </View>)
                })}
            </View>

        </View>
    );
};

export default Board;

const styles = StyleSheet.create({
    container: {
    },
    boardContainer: {
        width: BOARD_SIZE + GAP,
        height: BOARD_SIZE + GAP,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2A5FA1"
    },
    boardStepContainer: {
        height: (BOARD_SIZE - GAP * 11) / 10,
        width: (BOARD_SIZE - GAP * 11) / 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 4,
        margin: GAP / 2
    },
    boardRowContainer: {
        flexDirection: 'row',
    },
    boardStep: {
        textAlign: 'center'
    },
    whiteBackground: {
        backgroundColor: '#E9F3FF',
    },
    lightBackground: {
        backgroundColor: '#D3E0FE',
    }
});
