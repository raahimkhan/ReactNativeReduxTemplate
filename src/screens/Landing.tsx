import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Button,
    Text
} from 'react-native';
import { useRouter } from 'expo-router';

const Landing: React.FC = () => {

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text>Initial Stack Screen</Text>
            <Button 
                title="Go to Tab2" 
                onPress={() => router.replace('/(tabs)/tab2')}
            />
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
});

export default Landing;