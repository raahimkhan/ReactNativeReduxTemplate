import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import SomeComponent from '@screens/SomeComponent';

const Root: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <SomeComponent />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Root;