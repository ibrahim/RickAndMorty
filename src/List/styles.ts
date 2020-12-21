import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
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
        width: wp('100%'),
    },
    content: {},
    listItem: {
        width: wp('100%'),
        flexDirection: 'row',
        flex: 1,
        flexGrow: 1,
    },
    loading: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
});
