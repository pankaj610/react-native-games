import * as React from 'react';
import { View, Text } from 'react-native';

const stories = [
    // {
    //     id: '2',
    //     source: require('./assets/stories/2.jpg'),
    //     user: 'derek.russel',
    //     avatar: require('./assets/avatars/derek.russel.png'),
    // },
    // {
    //     id: '4',
    //     source: require('./assets/stories/4.jpg'),
    //     user: 'jmitch',
    //     avatar: require('./assets/avatars/jmitch.png'),
    // },
    // {
    //     id: '5',
    //     source: require('./assets/stories/5.jpg'),
    //     user: 'monicaa',
    //     avatar: require('./assets/avatars/monicaa.png'),
    // },
    // {
    //     id: '3',
    //     source: require('./assets/stories/3.jpg'),
    //     user: 'alexandergarcia',
    //     avatar: require('./assets/avatars/alexandergarcia.png'),
    // },
    // {
    //     id: '1',
    //     source: require('./assets/stories/1.jpg'),
    //     user: 'andrea.schmidt',
    //     avatar: require('./assets/avatars/andrea.schmidt.png'),
    // },
];

export interface InstagramStoriesProps {
}

export function InstagramStories(props: InstagramStoriesProps) {
    return (
        <View>
            <Text>InstagramStories</Text>
        </View>
    );
}
