<template>
  <div id="app" class="app">
    <div class="container-fluid">
      <nav class="fixed-top navbar navbar-expand-sm navbar-dark bg-primary p-2 justify-content-between">
        <a class="navbar-brand" href="#">Mi Tiendita</a>

        <div class="navbar-nav" id="navbarSupportedContent">
          <ul class="navbar-nav pull-right">
            <li class="nav-item" v-if="is_auth">
              <button type="button" class="btn btn-primary" @click="loadHome">Inicio</button>
            </li>
            <li class="nav-item" v-if="is_auth">
              <button type="button" class="btn btn-primary" @click="loadProducts">Productos</button>
            </li>
            <li class="nav-item" v-if="is_auth">
              <button type="button" class="btn btn-primary" @click="logOut">Cerrar Sesión</button>
            </li>
            <li class="nav-item" v-if="!is_auth">
              <button type="button" class="btn btn-primary" @click="loadLogIn">Iniciar Sesión</button>
            </li>
            <li class="nav-item" v-if="!is_auth">
              <button type="button" class="btn btn-primary" @click="loadSignUp">Registrarse</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="container" style="height: 70px"></div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>

    <footer class="bg-light text-center text-lg-start container-fluid" style="position: fixed; bottom: 0;">
      <!-- Copyright -->
      <div class="text-center " style="background-color: rgba(0, 0, 0, 0.2);">
        © 2021 Copyright:
        <a class="text-dark" href="https://www.linkedin.com/in/ccvc">Cristhian Vega</a> and
        <a class="text-dark" href="https://www.linkedin.com/in/ccvc">Hernan Eraso</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",

  computed: {
    is_auth: {
      get: function() {
        return this.$route.meta.requiresAuth;
      },
      set: function() {},
    },
  },

  methods: {
    loadLogIn: function() {
      this.$router.push({ name: "logIn" });
    },

    loadSignUp: function() {
      this.$router.push({ name: "signUp" });
    },

    completedLogIn: function(data) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.loadHome();
    },

    completedSignUp: function(data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },

    loadHome: function() {
      this.$router.push({ name: "home" });
    },

    loadProducts: function() {
      this.$router.push({ name: "products" });
    },

    logOut: function() {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.loadLogIn();
    },
  },
};
</script>

<style>
body {
  background-image: url("https://www.namesnack.com/images/namesnack-nombres-para-tiendas-de-alimentaci%C3%B3n-1920x1280-20210310.jpeg?crop=16:9,smart&width=1200&dpr=2");
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0 0 0 0;
}
</style>
