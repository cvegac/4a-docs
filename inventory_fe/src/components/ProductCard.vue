<template>
  <div>
    <b-card
      :title="msg.name"
      img-src="https://cdn.pixabay.com/photo/2020/09/20/03/50/box-5585923_960_720.png"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Tipo: {{ msg.type }} <br />
        Description: {{ msg.description }} <br />
        Precio: {{ msg.price }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    msg: Object,
  },
};
</script>
