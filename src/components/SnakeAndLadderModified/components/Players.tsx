import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { PLAYER_SVG, screenWidth } from '../constants';
import { PlayerColor, PlayerData, PlayerRefsType, PlayerGroup } from '../hooks/hooks';


interface PlayerProps {
    player: PlayerData,
    color: PlayerColor,
}

const Player = (props: PlayerProps) => {
    const { player: { location } } = props

    const playerStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: location.x.value,
            },
            {
                translateY: location.y.value,
            }
            ],
            width: 25,
        }
    })
    const SvgComponent = PLAYER_SVG[props.color]
    return (
        <Animated.View style={playerStyles}>
            <SvgComponent />
        </Animated.View>
    );
};

type PlayerGroupProps = {
    playerGroup: PlayerGroup,
    color: PlayerColor,
}

const PlayerGroupFC = (props: PlayerGroupProps) => {

    const { playerGroup, color } = props
    if (!playerGroup) return

    return (
        <View style={styles.playerGroupContainer}>
            <Player player={playerGroup[1]} color={color} />
            <Player player={playerGroup[2]} color={color} />
            <Player player={playerGroup[3]} color={color} />
        </View>
    );
};

interface PlayersProps {
    playerRefs: React.MutableRefObject<PlayerRefsType>
}


export const Players: React.FC<PlayersProps> = ({ playerRefs }) => {

    return <>
        <View style={styles.playerContainer}>
            <PlayerGroupFC color='yellow' playerGroup={playerRefs.current.yellow} />
            <PlayerGroupFC color='blue' playerGroup={playerRefs.current.blue} />
            <PlayerGroupFC color='red' playerGroup={playerRefs.current.red} />
            <PlayerGroupFC color='green' playerGroup={playerRefs.current.green} />
        </View>
        <View style={styles.playerBox}>

        </View>
    </>
}

const styles = StyleSheet.create({
    playerBox: {
        width: screenWidth - 32,
        borderRadius: 10,
        borderWidth: 9,
        backgroundColor: '#04104F',
        borderColor: '#0051FF',
        height: 80,
        marginTop: 10,
    },
    playerContainer: {
        position: 'absolute',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    container: {
        // backgroundColor: 'red',
    },
    playerGroupContainer: {
        flexDirection: 'row',
    }
});
