import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

const List = (props: Props): JSX.Element => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Screen 1 : List Component</Text>
            <Button onPress={() => navigation.navigate('Details', { id: '1' })} title="Go to details page" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default List
