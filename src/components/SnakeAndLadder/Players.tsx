import { Animated } from "react-native"
import styles from "./game.css"
import { PLAYER_IMAGE } from "./constants"

export type PlayerType = {
    position: Animated.ValueXY,
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
    const playerStyles = {
        transform: [{
            translateX: player.position.x,
        },
        {
            translateY: player.position.y,
        }
        ],
        shadowColor: player.color,
    }

    return (<Animated.Image source={PLAYER_IMAGE[player.color]} style={[playerStyles, styles.player]} />)
}

const Players: React.FC<PlayersProps> = ({ playerRefs }) => {

    return <>{playerRefs.current.map(player => {
        return <Player player={player} key={player.color} />
    })}</>
}

export default Players