import { Dimensions, ImageRequireSource } from 'react-native';

export const Constants = {
    MAX_WIDTH: Dimensions.get('screen').width,
    MAX_HEIGHT: Dimensions.get('screen').height,
    GAP_SIZE: 300,
    PIPE_WIDTH: 30,
};

export const FLAPPY_BIRD_IMG: Record<string, ImageRequireSource> = {
    background: require('./assets/background.png'),
    bird1: require('./assets/bird1.png'),
    bird2: require('./assets/bird2.png'),
    bird3: require('./assets/bird3.png'),
    floor: require('./assets/floor.png'),
    pipe_core: require('./assets/pipe_core.png'),
    pipe_top: require('./assets/pipe_top.png'),
}