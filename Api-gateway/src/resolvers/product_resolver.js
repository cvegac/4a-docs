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
        }
    },
    Mutation: {
        createProduct: async(_, { productInput }, { dataSources }) => {
            return dataSources.accountAPI.createProduct(productInput)
        },
        buyProduct: async(_, { productInput }, { dataSources }) => {
            return dataSources.accountAPI.buyProduct(productInput)
        }
    }
};

module.exports = productResolver;