const { gql } = require('apollo-server');

const productTypeDefs = gql `
    type Product {
        id: String!
        name: String!
        type: String!
        description: String!
        price: Int!
    }

    input SaleInput {
        name: String!
        quantity: Int!
    }
    
    input ProductInput {
        name: String!
        type: String!
        description: String!
        price: Int!
        quantity: Int!
    }

    type Query {
        productAll(type: String!): [Product]
        productById(id: String!): Product
        productByName(name: String!): [Product]
        productByType(type: String!): [Product]
    }
    
    type Mutation {
        createProduct(product: ProductInput!): Product
        buyProduct(product: ProductInput!): [Product]
    }
`;

module.exports = productTypeDefs;