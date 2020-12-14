import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { isEmpty } from 'lodash';
import SearchBox from './search-box';
import { Character, NavigationProp, Info} from './types';


interface ComponentProps {
    characters: Character[];
		info: Info;
		fetchMore: any;
		loading: boolean;
}

type Props = NavigationProp & ComponentProps;

interface RenderItemProps {
    item: Character;
}

const NOT_FOUND = 'Error: 404: Not Found';
const ITEM_HEIGHT = 64;
const human = (message: string) => {
    switch (message) {
        case NOT_FOUND:
            return 'No matching name was found.';
    }
    return message;
};

const keyExtractor = (item: Character) => `${item.id}-${item.name}`;

const ErrorMessage = ({ errorMessages }: { errorMessages: string[] }) => {
    if (isEmpty(errorMessages)) return null;
    return (
        <View style={styles.errorMessages}>
            {errorMessages &&
                errorMessages.map((msg, i) => (
                    <Text style={{ fontSize: 20 }} key={i}>
                        {human(String(msg))}
                    </Text>
                ))}
        </View>
    );
};

//eslint-disable-next-line
const getItemLayout = (data: any, index: number) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index });

const renderItem = ({ navigation }: NavigationProp) => ({ item }: RenderItemProps) => {
    return (
        <ListItem bottomDivider onPress={() => navigation.navigate('Details', { id: '1' })}>
            { item.image && <Avatar title={item.name} source={{ uri: item.image }} />}
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};
const List = (props: Props): JSX.Element => {
    const { navigation, characters, info, loading, fetchMore } = props;
		const [name, setName] = React.useState<string>("")
		const [errorMessages, setErrorMessages] = React.useState<string[]>([])
    const onEndReached = async () => {
			if(info && info.next){
				try{
					await fetchMore({
						variables: { page: info.next, filter: { name } }
					});
				}catch(error){
					console.log("Error Fetch more", {error})
				}
			}
    }


    const Footer = React.useCallback(() => {
        if (!loading) return null;
        console.log({ loading });
        return <ActivityIndicator size="large" />;
    }, [loading]);

    const renderItemWithNavigation = React.useCallback(renderItem({ navigation }), [navigation]);
		const newSearch = async (name:string) => {
				setName(name)
				setErrorMessages([])
				try{
					await fetchMore({
						variables: { page: 1, filter: { name: name ? name : "" } }
					});
				}catch(e){
					console.log("SearchBox fetchMore", {e})
					setErrorMessages(Array(e))
				}
		}
		const hasError = !isEmpty(errorMessages)
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
						<FlatList
							style={styles.list}
							keyExtractor={keyExtractor}
							data={ hasError ? [] : characters}
							renderItem={renderItemWithNavigation}
							ListFooterComponent={Footer}
							ListFooterComponentStyle={{ padding: 60 }}
							ListHeaderComponent={<SearchBox newSearch={ newSearch } name={name}/>}
							ListEmptyComponent={<ErrorMessage errorMessages={errorMessages}/>}
							stickyHeaderIndices={[0]}
							onEndReached={onEndReached}
							onEndReachedThreshold={0.2}
							/* updateCellsBatchingPeriod={50} */
							/* getItemLayout={getItemLayout} */
							/* maxToRenderPerBatch={30} */
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
    errorMessages: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    list: {
        width: '100%',
    },
});

export default List;
