import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { ChildDataProps } from './'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface NavigationProp {
    navigation: ProfileScreenNavigationProp;
}

type Props = NavigationContainer & ChildDataProps;

const List = (props: Props): JSX.Element => {
    const { navigation, data } = props;
		console.log({data})
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Screen 1 : List Component</Text>
            <Button onPress={() => navigation.navigate('Details', { id: '1' })} title="Go to details page" />
						{ data && data.characters && Array.isArray(data.characters.results) && data.characters.results.map( character => <Text>{ character.name }</Text>)}
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
