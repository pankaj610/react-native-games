import { Animated, ImageStyle } from "react-native"
import { FLAPPY_BIRD_IMG } from "./Constants"
import { useMemo } from "react"
import Matter from "matter-js"

interface PipeTopProps {
    body: Matter.Body;

}

const PipeTop = ({ body }: PipeTopProps) => {
    const width = body.bounds.max.x - body.bounds.min.x
    const height = body.bounds.max.y - body.bounds.min.y
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    const styles: ImageStyle = useMemo(() => ({
        width,
        height,
        x,
        y,
        position: "absolute",

    }), []);

    return <Animated.Image source={FLAPPY_BIRD_IMG.pipe_top} style={styles} />
}

export default PipeTop