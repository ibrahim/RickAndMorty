import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Episode } from './types';

interface ComponentProps {
    episodes: Episode[];
}

type Props = ComponentProps;

interface RenderItemProps {
    item: Episode;
}

const keyExtractor = (item: Episode) => `${item.id}-${item.name}`;

const renderItem = ({ item }: RenderItemProps) => {
    return (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>
                    <Text style={{ fontSize: wp('4.2%') }}>{item.name}</Text>
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: wp('3.5%'), color: 'grey' }}>{item.air_date}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};
const Episodes = (props: Props): JSX.Element => {
    const { episodes } = props;
    return (
        <View style={styles.container}>
            <FlatList style={styles.list} keyExtractor={keyExtractor} data={episodes} renderItem={renderItem} />
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

export default Episodes;
