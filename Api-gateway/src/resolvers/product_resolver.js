const productResolver = {
    Query: {
        productAll: async(_, { type }, { dataSources }) => {
            return await dataSources.productAPI.productAll(type)
        },

        productByType: async(_, { type }, { dataSources }) => {
            return await dataSources.productAPI.productByType(type)
        },

        productById: async(_, { id }, { dataSources }) => {
            return await dataSources.productAPI.productById(id)
        },

        productByName: async(_, { name }, { dataSources }) => {
            return await dataSources.productAPI.productByName(name)
        }
    },
    Mutation: {
        createProduct: async(_, { product }, { dataSources }) => {
            return await dataSources.productAPI.createProduct(product);
        },
        buyProduct: async(_, { product }, { dataSources }) => {
            return await dataSources.productAPI.buyProduct(product);
        }
    }
};

module.exports = productResolver;