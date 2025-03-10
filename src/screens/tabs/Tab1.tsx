import React from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';

const Tab1: React.FC = () => {

    return (
        <View style={styles.container}>
            <Text>Tab1</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default Tab1;