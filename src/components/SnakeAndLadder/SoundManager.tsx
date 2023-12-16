import { ImageSourcePropType } from "react-native";
import { SOUND_SOURCE } from "./constants";
import Sound from 'react-native-sound';

class SoundManager<T extends number | symbol | string> {
    soundRef: Partial<Record<T, Sound>> = {}
    constructor(sounds: T[], sources: Record<T, ImageSourcePropType>) {
        this.initializeSounds(sounds, sources);
    }

    initializeSounds(soundList: T[], sources: Record<T, ImageSourcePropType>) {
        soundList.forEach(sound => {
            let soundSource = sources[sound]
            this.soundRef[sound] = new Sound(soundSource, (error) => {
                if (error) {
                    console.log("Error while loading the sound ", sound);
                    return;
                }
            })
        })
    }

    playSound(name: T) {
        if (this.soundRef[name]) {
            this.stopSound(this.soundRef[name])
            this.soundRef[name]?.play();
        }
    }

    stopSound(soundRef: Sound | undefined) {
        soundRef?.stop();
    }
}

export default SoundManager;