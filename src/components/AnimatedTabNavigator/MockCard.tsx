// @flow
import * as React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';


type MockCardProps = {
    image: ImageSourcePropType;
};

export const MockCard: React.FC<MockCardProps> = (props) => {

    const { image: source } = props;
    return (
        <View style={styles.container}>
            <Image style={styles.image} {...{ source }} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
    },
    image: {
        borderRadius: 5,
        height: 200,
        width: null,
        resizeMode: 'cover',
        margin: 8,
    },
});