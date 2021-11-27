const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class ProductAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.product_api_url;
    }

    async productAll(type) {
        return await this.get(`/products`);
    }

    async productByType(type) {
        return await this.get(`/products/${type}`);
    }

    async productById(id) {
        return await this.get(`/product/${id}`);
    }

    async productByName(name) {
        return await this.get(`/productname/${name}`);
    }

    async createProduct(product) {
        product = new Object(JSON.parse(JSON.stringify(product)));
        let quantity = product.quantity;
        delete product.quantity;
        console.log(product);
        for (let index = 0; index < quantity; index++) {
            await this.post('/product', product);
        }
        return product;
    }

    async buyProduct(product) {
        product = new Object(JSON.parse(JSON.stringify(product)));
        let quantity = product.quantity;
        delete product.quantity;
        return await this.put(`/product/${quantity}`, product);
    }

}

module.exports = ProductAPI;