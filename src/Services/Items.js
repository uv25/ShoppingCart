import axios from "axios";

// export const getItem = () => {
//     console.log("Inside getItem")
//     axios.get('https://api.github.com/users/mapbox')
//   .then((response) => {
//     console.log(response.data);
//     console.log(response.status);
//     console.log(response.statusText);
//     console.log(response.headers);
//     console.log(response.config);
//   });
// }

const token = "3ogqzxcpd6teaww79puqjiibgbcy11a1"

const config = {
    headers: { 
        Authorization: `Bearer ${token}` 
    }
};

const axiosInstance = axios.create({
    headers: {
       Authorization: `Bearer ${token}`
    }
  });

export const getItem = async (sku) => new Promise(async (resolve, reject) => {
    console.log("Inside getItem")
    axios.get(
        'https://uat.grandiose.ae/rest/V1/products/'+sku,
        config)
    .then((response) => {
    resolve(response.data)
    })
    .catch(error => {
        reject(error)
    })
})

export const getItems = () => {
    console.log("Inside getItemsssss")
    axiosInstance.all([
        axios.get('https://uat.grandiose.ae/rest/V1/products/6291030200070'),
        axios.get('https://uat.grandiose.ae/rest/V1/products/6291030200049')
    ])
    .then((responseArray) => {
        console.log(responseArray[0].data.sku)
        console.log(responseArray[1].data.sku)
    })
}