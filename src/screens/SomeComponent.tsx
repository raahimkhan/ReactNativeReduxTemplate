import React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    Button,
    Platform
} from 'react-native';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateEntireUserState,
} from '@store/slices/userSlice';
import Constants from 'expo-constants';

const SomeComponent: React.FC = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const name = useSelector((state: { user: { name: string } }) => state.user.name);
    const age = useSelector((state: { user: { age: number } }) => state.user.age);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}> Hello World </Text>
            <Button
                title="Go to Dashboard"
                onPress={() => navigation.reset({ index: 0, routes: [{ name: '(tabs)' as never }] })}
            />
            <Button
                title="Update Redux State"
                onPress={() => dispatch(updateEntireUserState({
                    name: 'updated',
                    age: 50
                }))}
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
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : undefined
    },
    text: {
        fontSize: wp(10)
    },
});

export default SomeComponent;