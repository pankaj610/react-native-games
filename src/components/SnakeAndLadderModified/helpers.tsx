import { EasingFunction } from "react-native"
import {
    AnimatableValue,
    runOnJS,
    SharedValue,
    withRepeat,
    withTiming,
    WithTimingConfig,
} from "react-native-reanimated"

export const TOGGLE = undefined

export const RANDOM = "random"

export type AnimationConfig = boolean | { delay?: number; duration?: number; easing?: EasingFunction }

const animationDelays = new Map()

export const animate = async (
    executor: (value: any, config?: WithTimingConfig, callback?: any) => AnimatableValue,
    variable: SharedValue<any>,
    value: any,
    config: AnimationConfig = {},
    callback?: (finished: boolean) => void,
) => {
    const animationTimeout = animationDelays.get(variable)
    if (animationTimeout) {
        clearTimeout(animationTimeout.timeout)
        animationTimeout.resolve(false)
        animationDelays.delete(variable)
        return null
    }

    if (config) {
        return new Promise((resolve) => {
            const safeConfig = config as any
            let animation = executor(value, safeConfig, function (finished) {
                "worklet"
                callback && runOnJS(callback)(finished)
                runOnJS(resolve)(finished)
            })
            if (safeConfig?.repeat) animation = withRepeat(animation, safeConfig.repeat)

            if (safeConfig?.delay > 0) {
                const runner = () => {
                    animationDelays.delete(variable)
                    variable.value = animation
                }
                const timeout = setTimeout(runner, safeConfig?.delay)
                animationDelays.set(variable, {
                    timeout,
                    resolve
                })
            } else {
                variable.value = animation
            }
        })
    } else {
        variable.value = value
        return null
    }
}

export const animateTiming = async (
    variable: SharedValue<any>,
    value: any,
    config?: AnimationConfig,
    callback?: (finished: boolean) => void,
) => {
    return animate(withTiming, variable, value, config, callback)
}
