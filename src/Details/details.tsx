import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Episodes from './episodes';
import { Character } from './types';

interface ComponentProps {
    character: Character;
}

type Props = ComponentProps;

const Loading = () => (
    <View style={styles.loading}>
        <ActivityIndicator size="large" color="#666" />
    </View>
);
const ios = Platform.OS === 'ios';

const Caption = ({ character: { species, gender, name } }: { character: Character }) => (
    <View>
        <View>
            <Text style={styles.title} testID="name">
                {name}
            </Text>
        </View>
        <View style={styles.subtitle}>
            <Text>
                <Text style={styles.b}>Species:</Text> <Text testID="species">{species}</Text>
            </Text>
            <Text style={{ marginLeft: 10 }}>
                <Text style={styles.b}>Gender: </Text> <Text testID="gender">{gender}</Text>
            </Text>
        </View>
    </View>
);
const Details = (props: Props): JSX.Element => {
    const { character } = props;
    if (!character) return <Loading />;
    const { episode } = character;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.banner}>
                <Avatar
                    imageProps={{ accessibilityLabel: 'avatar' }}
                    size={ios ? 'xlarge' : 'xlarge'}
                    rounded
                    source={{ uri: character.image }}
                />
                <Caption character={character} />
            </View>
            <View>
                <Text style={styles.sectionHeader}>Episodes</Text>
            </View>
            <Episodes episodes={episode} />
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
    title: {
        fontSize: wp('10%'),
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: wp('4%'),
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    banner: {
        height: ios ? hp('40%') : hp('45%'),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    loading: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    sectionHeader: {
        width: '100%',
        fontSize: wp('5%'),
        marginBottom: 10,
        display: 'flex',
    },
    b: {
        fontWeight: 'bold',
    },
});

export default Details;
