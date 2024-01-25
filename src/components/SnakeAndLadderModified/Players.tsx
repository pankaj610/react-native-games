
import styles from "./game.css"
import { PLAYER_IMAGE } from "./constants"
import { SharedValue, useAnimatedStyle } from "react-native-reanimated"
import Reanimated from 'react-native-reanimated'

export type PlayerType = {
    position: {
        x: SharedValue<number>,
        y: SharedValue<number>
    },
    color: string,
    currentPosition: number
}

interface PlayerProps {
    player: PlayerType
}

interface PlayersProps {
    playerRefs: React.MutableRefObject<Array<PlayerType>>
}



const Player: React.FC<PlayerProps> = ({ player }) => {

    const playerStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: player.position.x.value,
            },
            {
                translateY: player.position.y.value,
            }
            ],
        }
    })

    return (<Reanimated.Image source={PLAYER_IMAGE[player.color]} style={[playerStyles, styles.player, { shadowColor: player.color }]} />)
}

const Players: React.FC<PlayersProps> = ({ playerRefs }) => {

    return <>{playerRefs.current.map(player => {
        return <Player player={player} key={player.color} />
    })}</>
}

export default Players