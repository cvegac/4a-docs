<template>
  <div>
    <div class="card p-3">
      <h2 class="text-primary">Aqui puedes comprar lo que desees</h2>
      <div class="p-3">
        <label for="selectProvider">Seleccione el nombre del producto</label>
        <b-form-select id="selectProvider" v-model="name" :options="options"></b-form-select>
      </div>
    </div>
    <b-row v-if="name != 'null' && productByName.length > 0">
      <b-col cols="12" md="6" lg="4" class="mt-2">
        <ProductCard :msg="productByName[0]" />
      </b-col>
      <b-col cols="12" md="6" lg="4" class="mt-2">
        <div class="card p-3">
          <label v-if="productByName[0] != null" for="range-1"
            ><h5>
              Comprar <b-badge variant="primary">{{ quantity }}</b-badge>
            </h5></label
          >
          <b-form-input
            id="range-1"
            v-if="productByName[0] != null"
            v-model="quantity"
            type="range"
            min="1"
            :max="productByName.length"
          ></b-form-input>
          <h6>
            Total: <b-badge variant="info">{{ total }} COP</b-badge>
          </h6>
          <form v-on:submit.prevent="processBuyProduct">
            <button type="submit" class="btn btn-primary">Comprar</button>
          </form>
          {{ fillProduct }}
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductBuyCard",
  props: {
    msg: Object,
  },
  data() {
    return {
      productByName: [],
      product: null,
      name: "null",
      quantity: 1,
      options: [{ value: "null", text: "Por favor seleccione el nombre del producto" }],
    };
  },
  components: {
    ProductCard,
  },
  computed: {
    fillProduct: function() {
      if (this.productByName.length > 0) {
        this.product = {
          name: this.productByName[0].name,
          type: this.productByName[0].type,
          description: this.productByName[0].description,
          price: this.productByName[0].price,
          quantity: parseInt(this.quantity),
        };
      }
    },
    total: function() {
      return this.productByName[0].price * parseInt(this.quantity);
    },
  },
  methods: {
    fillOptions: function() {
      for (let index = 0; index < this.msg.length; index++) {
        this.options.push({
          value: this.msg[index].name,
          text: this.msg[index].name,
        });
      }
    },
    processBuyProduct: async function() {
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
              buyProduct(product: $product) {
                id
                name
                type
                description
                price
              }
            }
          `,
          variables: {
            product: this.product,
          },
        })
        .then((result) => {
          this.name = "null";
          this.quantity = 1;
          alert("Gracias por comprar el producto");
        })
        .catch((error) => {
          alert("Error al crear al comprar el producto");
        });
    },
  },
  apollo: {
    productByName: {
      query: gql`
        query($name: String!) {
          productByName(name: $name) {
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
          name: this.name,
        };
      },
    },
  },
  created: async function() {
    this.fillOptions();
  },
};
</script>
