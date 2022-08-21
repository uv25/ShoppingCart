import React from "react";
import { View, Text, Button, FlatList } from 'react-native'
import { getItem, getItems } from '../Services/Items'
import { ListItemCard } from "../Components/ListItemCard";
import { findItemWithSku } from '../Helper/helper'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            dataArray: [],
            cart: []
        }
    }

    componentDidMount() {
        getItem(6291030200070).then(response => {
            this.setState({data: response})
            let responseArray = [response].map(obj => ({ ...obj, quantity: 0 }))

            getItem(6291030200049).then(response2 => {
                responseArray.push({ ...response2, quantity: 0})
                this.setState({dataArray: responseArray})
            })
            
        })
    }

    onPressListItem = (item) => {
        if(!item.quantity) {
            let tempCart = this.state.cart
            item.quantity++
            tempCart.push(item)
            this.setState({cart: tempCart})
        } else {
            let index2 = findItemWithSku(this.state.cart, item.sku)
            let tempCart = this.state.cart
            tempCart[index2].quantity++
            this.setState({cart: tempCart})
        }
    }




    onPressListItemRemoveListItem = (sku) => {
        let index2 = findItemWithSku(this.state.cart, sku)
        let tempCart = this.state.cart
        tempCart[index2].quantity--
    if(tempCart[index2].quantity == 0) {
            tempCart.splice(index2, 1)
        }
        this.setState({cart: tempCart})

    }

    renderItem = ({item}) => {
        let specialPrice = item.custom_attributes.find(o => o.attribute_code === 'special_price');
        return(
            <ListItemCard
                title={item.name}
                imageEndUrl={item.custom_attributes[0].value}
                onPress={() => this.onPressListItem(item)}
                onPressRemove={this.onPressListItemRemoveListItem}
                price={item.price}
                quantity={item.quantity}
                sku = {item.sku}
                specialPrice={specialPrice?.value}
                />
        )
    }

    render() {
        return(
            <View style = {{flex: 1, backgroundColor: 'white'}}>

                {/* <ListItemCard
                    title={this.state.data?.name}
                    imageEndUrl={this.state.data?.custom_attributes[0].value}/> */}

                <FlatList
                    style={{ backgroundColor: 'white', flex: 1}}
                    data={this.state.dataArray}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>
         <Button
        title="Checkout"
        color="grey"
        onPress={() =>  this.props.navigation.navigate('Cart', { cartData: this.state.cart})}
      />
                
            </View>
        )
    }
}

export default Dashboard