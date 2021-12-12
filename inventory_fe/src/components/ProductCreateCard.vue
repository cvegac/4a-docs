<template>
  <div>
    <div class="card">
      <form class="p-3" v-on:submit.prevent="processCreateProduct">
        <h2 class="text-primary">Aqui puedes ingresar tu nuevo producto</h2>
        <div class="form-row">
          <div class="col-6">
            <label for="name">Nombre</label>
            <input
              type="text"
              class="form-control"
              v-model="createProduct.name"
              placeholder="Nombre del producto"
            />
          </div>
          <div class="col-6">
            <label for="type">Tipo</label>
            <input
              type="text"
              class="form-control"
              v-model="createProduct.type"
              placeholder="Tipo de producto"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <input
            type="text"
            class="form-control"
            v-model="createProduct.description"
            placeholder="Agregue una descripcion del producto"
          />
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label for="price">Precio por unidad</label>
            <input type="number" class="form-control" v-model="createProduct.price" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label for="quantity">Cantidad disponible</label>
            <input type="number" class="form-control" v-model="createProduct.quantity" />
          </div>
        </div>
        <br />
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "ProductCreateCard",
  data() {
    return {
      createProduct: {
        name: "",
        type: "",
        description: "",
        price: 0,
        quantity: 0,
      },
    };
  },

  methods: {
    processCreateProduct: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($refresh: String!) {
              refreshToken(refresh: $refresh) {
                access
              }
            }
          `,
          variables: {
            refresh: localStorage.getItem("token_refresh"),
          },
        })
        .then((result) => {
          localStorage.setItem("token_access", result.data.refreshToken.access);
        });

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($product: ProductInput!) {
              createProduct(product: $product) {
                name
                type
                description
                price
              }
            }
          `,
          variables: {
            product: this.createProduct,
          },
        })
        .then((result) => {
          alert("Producto creado correctamente");
        })
        .catch((error) => {
          alert("Error al crear al crear el producto");
        });
    },
  },
};
</script>
