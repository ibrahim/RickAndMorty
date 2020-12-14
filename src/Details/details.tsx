import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Avatar, Tile } from 'react-native-elements';
import Episodes from './episodes';
import { Character } from './types';

interface ComponentProps {
    character: Character;
}

type Props = ComponentProps;

const Loading = () => (
    <View style={styles.loading}>
        <ActivityIndicator size="large" />
    </View>
);

const Caption = ({ character: { species, gender, name } }: { character: Character }) => (
    <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>
            <Text style={styles.b}>Species:</Text> {species} <Text style={styles.b}>Gender: </Text>
            {gender}
        </Text>
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
                <Avatar size="xlarge" rounded source={{ uri: character.image }} />
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
        fontSize: 40,
				marginTop: 10,
				marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
    },
    banner: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
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
        fontSize: 26,
				display: 'flex',
    },
    b: {
        fontWeight: 'bold',
    },
});

export default Details;
