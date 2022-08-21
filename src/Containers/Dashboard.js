import React from "react";
import { View, Text, Button, FlatList } from 'react-native'
import { getItem, getItems } from '../Services/Items'
import { ListItemCard } from "../Components/ListItemCard";

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
        getItem().then(response => {
            this.setState({data: response})
            let responseArray = [response].map(obj => ({ ...obj, quantity: 0 }))
            this.setState({dataArray: responseArray})
            console.log("response: ", this.state.dataArray)
        })
    }

    onPressListItem = (item) => {
        if(!item.quantity) {
            console.log("onPress list item: ", item)
            let tempCart = this.state.cart
            item.quantity++
            tempCart.push(item)
            this.setState({cart: tempCart})
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
        tempCart.splice(index2)
        this.setState({cart: tempCart})

    }

    renderItem = ({item}) => {
        console.log("item: ", item.sku)
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
        return(
            <View style = {{flex: 1}}>

                {/* <ListItemCard
                    title={this.state.data?.name}
                    imageEndUrl={this.state.data?.custom_attributes[0].value}/> */}

                <FlatList
                    style={{borderColor: "blue", borderWidth: 1, flex: 1}}
                    data={this.state.dataArray}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>
                
            </View>
        )
    }
}

export default Dashboard