import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import MC from 'react-native-vector-icons/MaterialCommunityIcons'
import FA5 from 'react-native-vector-icons/FontAwesome5'

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

            <View style = {{marginTop: 40, flexDirection: 'row', justifyContent: 'center'}}>
                {quantity ? 
                <TouchableOpacity onPress={()=>onPressRemove(sku)}>
                    {<FA5 name="minus"  size={20} solid/>}
                </TouchableOpacity> 
                : null}

                <TouchableOpacity onPress={quantity ? ()=>{} : onPress} style = {{flexDirection: 'row'}}>
                    {quantity ? <Text style ={{marginHorizontal: 5, fontWeight: "bold", fontSize: 17}}>{quantity}</Text> : <MC name="cart-outline"  size={24} solid/>}
                </TouchableOpacity>

                {quantity ? 
                <TouchableOpacity onPress={onPress} style = {{flexDirection: 'row'}}>
                    {<FA5 name="plus"  size={20} solid/>}
                </TouchableOpacity> 
                : null}
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
        borderColor: '#e6e6e6', borderWidth: 1,
        backgroundColor: 'white'
    },
    imageStyle: {
        height: 130,
        width: 90, 
        resizeMode: "contain",
        marginVertical: 10,
        backgroundColor: 'white'
        // borderColor: 'green', borderWidth: 3,
    },
    cardDescriptionStyle: {
        marginVertical: 20,
        marginTop:30
    },
    textStyle: {
        // textAlign: "center",
        marginHorizontal: 20,
        width: 170
    },
    titleTextStyle: {
        marginHorizontal: 20,
        width: 170,
        fontSize: 17,
        fontWeight: "bold"
    },
    highlightText: {
        marginHorizontal: 20,
        width: 170,
        fontSize: 20,
        fontWeight: "bold"
    }
})