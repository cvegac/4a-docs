<template>
  <div>
    <div class="card p-3">
      <h2 class="text-primary">Aqui puedes filtrar por tipo de producto</h2>
      <form class="p-3" v-on:submit.prevent="processUpdateProduct">
        <label for="selectProvider">Seleccione el tipo</label>
        <b-form-select id="selectProvider" v-model="type" :options="options"></b-form-select>
      </form>
    </div>
    <b-row v-if="type != null">
      <b-col cols="12" md="6" lg="4" class="mt-2" v-for="(product, index) in productByType" :key="index">
        <ProductCard :msg="product" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductListCard",
  props: {
    msg: Object,
  },
  data() {
    return {
      productByType: [],
      type: "null",
      options: [{ value: "null", text: "Por favor seleccione un tipo de producto" }],
    };
  },
  components: {
    ProductCard,
  },
  methods: {
    fillOptions: function() {
      for (let index = 0; index < this.msg.length; index++) {
        this.options.push({
          value: this.msg[index].type,
          text: this.msg[index].type,
        });
      }
    },
  },
  apollo: {
    productByType: {
      query: gql`
        query($type: String!) {
          productByType(type: $type) {
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
          type: this.type,
        };
      },
    },
  },
  created: async function() {
    this.fillOptions();
  },
};
</script>
