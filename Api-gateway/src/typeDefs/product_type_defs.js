const { gql } = require('apollo-server');

const productTypeDefs = gql `
    type Product {
        id: String!
        name: String!
        type: String!
        description: String!
        price: Int!
    }
    
    input ProductInput {
        name: String!
        type: String!
        description: String!
        price: Int!
        quantity: Int!
    }

    extend type Query {
        productAll(type: String!): [Product]
        productByType(type: String!): [Product]
        productById(id: String!): Product
    }
    
    extend type Mutation {
        createProduct(product: ProductInput!): [Product]
        buyProduct(product: ProductInput!): [Product]
    }
`;

module.exports = productTypeDefs;