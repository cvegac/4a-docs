<template>
  <div class="container p-2">
    <div class="jumbotron border bg-secondary rounded p-3 border-info text-white">
      <h1 class="display-1">Productos</h1>
      <p class="lead">
        Aqui puedes encontrar todo lo relacionado a productos
      </p>
      <p class="lead btn-group" role="group" aria-label="Basic example" v-if="action == ''">
        <a type="button" class="btn btn-primary" @click="action = 'create'">Ingresar Producto</a>
        <a type="button" class="btn btn-warning" @click="action = 'List'">Listar productos</a>
        <a type="button" class="btn btn-danger" @click="action = 'buy'">Comprar productos</a>
      </p>
      <p class="lead" v-else>
        <a type="button" class="btn btn-info" @click="action = ''">Ver todos</a>
      </p>
    </div>
    <div class="container" style="height: 50px"></div>
    <b-row v-if="action == ''">
      <b-col cols="12" md="6" lg="4" class="mt-2" v-for="(product, index) in productAll" :key="index">
        <ProductCard :msg="product" />
      </b-col>
    </b-row>
    <div v-else-if="action == 'create'" class="container-fluid">
      <ProductCreateCard />
    </div>
    <div v-else-if="action == 'List'" class="container-fluid p-2">
      <ProductListCard :msg="types" />
    </div>
    <div v-else-if="action == 'buy'" class="container-fluid p-2">
      <ProductBuyCard :msg="names" />
    </div>
    <br />
    <br />
    {{ Filter }}
  </div>
</template>

<script>
import gql from "graphql-tag";
// @ is an alias to /src
import ProductCard from "@/components/ProductCard.vue";
import ProductCreateCard from "@/components/ProductCreateCard.vue";
import ProductListCard from "@/components/ProductListCard.vue";
import ProductBuyCard from "@/components/ProductBuyCard.vue";

export default {
  name: "Products",
  data: function() {
    return {
      type: "null",
      productAll: [],
      action: "",
      types: [],
      names: [],
    };
  },
  computed: {
    Filter: function() {
      if (this.productAll != [] && this.types.length == 0) {
        for (let index = 0; index < this.productAll.length; index++) {
          this.types.push({
            type: this.productAll[index].type,
          });
        }
        this.types = this.types.filter(
          (data, index, j) => index === j.findIndex((t) => t.type === data.type)
        );
      }

      if (this.productAll != [] && this.names.length == 0) {
        for (let index = 0; index < this.productAll.length; index++) {
          this.names.push({
            name: this.productAll[index].name,
          });
        }
        this.names = this.names.filter(
          (data, index, j) => index === j.findIndex((t) => t.name === data.name)
        );
      }
    },
  },
  components: {
    ProductCard,
    ProductCreateCard,
    ProductListCard,
    ProductBuyCard,
  },
  apollo: {
    productAll: {
      query: gql`
        query($type: String!) {
          productAll(type: $type) {
            id
            name
            type
            description
            price
          }
        }
      `,
      variables() {
        return {
          type: this.action,
        };
      },
    },
  },
  created: function() {
    this.$apollo.queries.productAll.refetch();
  },
};
</script>
