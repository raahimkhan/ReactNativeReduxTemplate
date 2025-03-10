import React from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';

const Tab3: React.FC = () => {

    return (
        <View style={styles.container}>
            <Text>Tab3</Text>
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

export default Tab3;