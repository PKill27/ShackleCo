var rope = {
    sku: 'sku_FHNL9Nzpxd0jcc'
    , image: "url"
    , description: "holds stuff together"
}
var shackle = {
    sku: 'sku_FHOOU00rMB91c0'
    , image: "url"
    , description: "holds stuff together"
}
let products = new Map()
products.set(1, rope)
products.set(2, shackle)

function getData(number) {
    return products.get(number)
}
//to do later