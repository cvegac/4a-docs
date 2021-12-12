<template>
  <div class="constainer">
    <b-card class="mx-auto my-5 w-50">
      <b-form v-on:submit.prevent="processLogInUser">
        <b-alert v-model="showDismissibleAlert" v-if="successSignUp" variant="success" dismissible>
          <strong>Ingresando...</strong>
        </b-alert>
        <b-form-group id="input-group-3" label="Nombre de Usuario:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="user.username"
            placeholder="Ingresa tu correo"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="Contraseña:"
          label-for="input-4"
          description="Nunca compartas tu contraseña con nadie mas"
        >
          <b-form-input
            id="input-4"
            v-model="user.password"
            type="password"
            placeholder="Ingresa tu contraseña"
            required
          ></b-form-input>
        </b-form-group>

        <b-button @click="showDismissibleAlert = true" type="submit" variant="info" class="m-1">
          Ingresar
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "LogIn",

  data: function() {
    return {
      user: {
        username: "",
        password: "",
      },
      showDismissibleAlert: false,
      successSignUp: false,
    };
  },

  methods: {
    processLogInUser: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($credentials: CredentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            credentials: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };

          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
};
</script>
