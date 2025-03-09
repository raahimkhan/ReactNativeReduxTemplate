import React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Tab1: React.FC = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}> Tab1 </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: wp(10)
    },
});

export default Tab1;