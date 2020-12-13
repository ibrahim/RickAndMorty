import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { ChildDataProps, Character } from './';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface NavigationProp {
    navigation: ProfileScreenNavigationProp;
}

type Props = NavigationProp & ChildDataProps;

interface RenderItemProps {
    items: Character;
    index: number;
}

const renderItem = (props: RenderItemProps & NavigationProp) => {
    const { item, navigation } = props;
    return (
        <ListItem bottomDivider onPress={() => navigation.navigate('Details', { id: '1' })}>
            <Avatar title={item.name} source={item.image && { uri: item.image }} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};

const keyExtractor = (item, index) => index.toString();

const List = (props: Props): JSX.Element => {
    const { navigation, data } = props;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                style={styles.list}
                keyExtractor={keyExtractor}
                data={data && data.characters && data.characters.results}
                renderItem={(character) => renderItem({ ...character, navigation })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '100%',
    },
});

export default List;
