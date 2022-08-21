import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
  StyleSheet,
  Image
} from 'react-native';
import { ListItemCard } from "../Components/ListItemCard";
class CheckoutItems extends Component {  
    constructor(props) {
        super(props)

        this.state = {
            cart: this.props.route.params.cartData
        }
    }
    findItemWithSku = (list, sku ) => {
        let index = 0
        list.map((obj) => {
            if(obj.sku == sku) {
                console.log("if condition: ", index)
                return index;
            } else {
                console.log("else condition: ", index)
                index++
            }
        })
        //  return list.every(obj => {
        //     if(obj.sku == sku) {
        //         return index;
        //     } else { 
        //         index++
        //     }
        // })

        if(index != list.length) {
            return index
        }

        return -1

    }
    onPressListItemRemoveListItem = (sku) => {
        console.log("onPressRemoveListItem: ", sku)
        let index2 = this.findItemWithSku(this.state.cart, sku)
        console.log("index: ", index2)
        let tempCart = this.state.cart
        tempCart[index2].quantity--
        console.log("quantity: ", tempCart[index2].quantity)

        if(tempCart[index2].quantity == 0) {
            tempCart.splice(index2)
        }
        this.setState({cart: tempCart})

    }

    onPressListItem = (item) => {
        if(!item.quantity) {
            // console.log("onPress list item: ", item)
            let tempCart = this.state.cart
            item.quantity++
            tempCart.push(item)
            this.setState({cart: tempCart})
        } else {
            let index2 = this.findItemWithSku(this.state.cart, item.sku)
            let tempCart = this.state.cart
            tempCart[index2].quantity++
            this.setState({cart: tempCart})

        }
    }

    renderItem = ({item}) => {
        //console.log("cart item: ", item.sku)
        return(
            <ListItemCard
                title={item.name}
                imageEndUrl={item.custom_attributes[0].value}
                onPress={() => this.onPressListItem(item)}
                onPressRemove={this.onPressListItemRemoveListItem}
                price={item.price}
                quantity={item.quantity}
                sku = {item.sku}/>
        )
    }

  render() {
    const { cartItems, navigation } = this.props;
    var cartData = this.props.route.params.cartData
    
    console.log("cart data: ", cartData)
    return (
      <View style={styles.container}>
                
                    <View style={ cartData.length ? styles.annouc : styles.info}>
                    {cartData.length ?  <Text style={styles.anncText}>Please confirm your order and checkout your cart.</Text> : <Image
               source={require('../Images/emptyCart.png')}
                style={styles.imageStyle}/>}
                    </View>
                    <View style={styles.ckitems}>
                    <FlatList
                    style={{ flex: 1}}
                    data={cartData}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>  
                    </View>
       </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  custForm: {
    flex: 1
  },
  ckitems: {
    flex:0.8
  },
  imageStyle: {
    width:350,
    height:500,
    resizeMode:'stretch'
  },
    annouc:{
      padding: 12,
      borderRadius: 5,
      backgroundColor: '#34495e90',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    info:{
      padding: 12,
      borderRadius: 5,
      backgroundColor: 'white',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      textAlign: 'center',
      color: 'red'
    },
    anncText:{
        textAlign: 'center',
        color: '#fff'  
    }
});
export default CheckoutItems;