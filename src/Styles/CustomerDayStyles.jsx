import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const CustomerDayStyles = StyleSheet.create({
    
    titleCard: {
        width: '65%',
        backgroundColor: "white",
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    textTittle: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'PoppinsBold',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 14,
        paddingVertical: 18,
        paddingHorizontal: 50,
        marginBottom: 10,
        marginTop: 30,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    searchContainer:{
        width: '80%',
            backgroundColor: 'white',
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 1,
            marginTop: 20,
    },
})
