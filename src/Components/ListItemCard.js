import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import MC from 'react-native-vector-icons/MaterialCommunityIcons'

const imageBaseUrl = "https://uat.grandiose.ae/media/catalog/product"

export const ListItemCard = ({title, imageEndUrl, onPress, onPressRemove, price, quantity, sku}) => {
    return(
        <View style={styles.cardContainer}>
            <Image
                source={{uri: imageBaseUrl+imageEndUrl}}
                style={styles.imageStyle}/>
            
            <View style={styles.cardDescriptionStyle}>
                <Text style={styles.titleTextStyle}>{title}</Text>
                <Text style={styles.highlightText}>{`₹ ${price}`}</Text>
            </View>

            <View style = {{marginTop: 7}}>
                <TouchableOpacity onPress={quantity ? ()=>onPressRemove(sku) : onPress} style = {{flexDirection: 'row'}}>
                    {/* <FA5 name="minus"  size={20} solid/> */}
                    {quantity ? <MC name="cart-minus"  size={20} solid/> : <MC name="cart-outline"  size={24} solid/>}
                    {/* <FA5 name="cart-minus"  size={20} solid/> */}
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        // flex: 1,
        flexDirection: "row",
        margin: 10,
        // height: 80,
        borderRadius: 10,
        // elevation: 1,
        borderColor: '#e6e6e6', borderWidth: 1
    },
    imageStyle: {
        height: 150,
        width: 90, 
        resizeMode: "contain",
        marginVertical: 10,
        backgroundColor: 'white'
        // borderColor: 'green', borderWidth: 3,
    },
    cardDescriptionStyle: {
        marginVertical: 20
    },
    textStyle: {
        // textAlign: "center",
        marginHorizontal: 20,
        width: 170
    },
    titleTextStyle: {
        marginHorizontal: 20,
        width: 170,
        fontSize: 15,
        fontWeight: "bold"
    },
    highlightText: {
        marginHorizontal: 20,
        width: 170,
        fontSize: 18,
        fontWeight: "bold"
    }
})