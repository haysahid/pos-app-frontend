export default ({ $axios }, inject) => {
    const api = $axios.create({
        headers: {
            common: {
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
                'key': '127008e814f92eb90c426c3cf74af835',
            }
        }
    })

    api.setBaseURL('https://api.rajaongkir.com/starter/province')

    inject('shippingApi', api)
}