export const findItemWithSku = (list, sku ) => {
    console.log("findIemWithSku: ", sku)
    let index = 0

    for (let i = 0; i < list.length; i++) {
        if(list[i].sku == sku) {
            console.log("if conditionsku: ", index)
            return index;
        } else {
            console.log("else conditionsku: ", index)
            index++
        }
    }

    return -1

}