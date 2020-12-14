import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isEmpty } from 'lodash';
import SearchBox from './search-box';
import { Character, NavigationProp, Info} from './types';


interface ComponentProps {
    characters: Character[];
		info: Info;
		fetchMore: any;
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
        <ListItem containerStyle={styles.listItem } bottomDivider onPress={() => navigation.navigate('Details', { id: item.id })}>
            { item.image && <Avatar title={item.name} source={{ uri: item.image }} />}
            <ListItem.Content style={{ flexGrow: 1, flex:1}}>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};
const CharactersList = (props: Props): JSX.Element => {
    const { navigation, characters, info, fetchMore } = props;
		const [name, setName] = React.useState<string>("")
		//const showLoading = React.useRef<boolean>(false)
		const [errorMessages, setErrorMessages] = React.useState<string[]>([])

    const onEndReached = async () => {
			if(info && info.next){
				//showLoading.current = true
				try{
					await fetchMore({
						variables: { page: info.next, filter: { name } }
					});
				}catch(error){
					console.log("Error Fetch more", {error})
				}
				//showLoading.current = false
			}
    }


    const Footer = React.useMemo(() => {
				const noMoreItems = !info || (info && !info.next)
				if(noMoreItems) return null;
        return <ActivityIndicator size="large" />;
    },[info]);

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
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
						<View style={{ flex: 1 }}>
							<SearchBox newSearch={ newSearch } name={name}/>
							<View style={styles.list}>
								<FlatList
								keyExtractor={keyExtractor}
								data={ hasError ? [] : characters}
								renderItem={renderItemWithNavigation}
								ListFooterComponent={Footer}
								ListFooterComponentStyle={{ padding: 60 }}
								ListEmptyComponent={<ErrorMessage errorMessages={errorMessages}/>}
								onEndReached={onEndReached}
								onEndReachedThreshold={0.2}
								contentContainerStyle={styles.content}
								/* updateCellsBatchingPeriod={50} */
								/* getItemLayout={getItemLayout} */
								/* maxToRenderPerBatch={30} */
								/>
							</View>
						</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ccc',
    },
    errorMessages: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    list: {
        width: wp("100%"),
    },
    content: {
    },
    listItem: {
        width: wp('100%'),
				flexDirection: 'row',
				flex:1,
				flexGrow: 1,
    },
});

export default CharactersList;
