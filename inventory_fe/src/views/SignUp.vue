<template>
  <div>
    <b-card class="mx-auto my-5 w-50">
      <form v-on:submit.prevent="processSignUp">
        <b-form-group id="input-group-2" label="Nombre:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="user.name"
            placeholder="Ingresa tu nombre"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Dirección de correo:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            placeholder="Ingresa tu correo"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Nombre de Usuario:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="user.username"
            placeholder="Ingresa tu UserName"
            required
            minlength="8"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="Contraseña:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="user.password"
            type="password"
            required
            minlength="8"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label="Repita su contraseña:"
          label-for="input-5"
          description="Nunca compartas tu contraseña con nadie mas"
          :invalid-feedback="invalidFeedbackPass"
          :state="statePass"
        >
          <b-form-input
            id="input-5"
            v-model="passwordr"
            type="password"
            placeholder="Ingresa tu contraseña"
            :state="statePass"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="info" class="m-1">
          Registrarme
        </b-button>
      </form>
    </b-card>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "SignUp",

  data: function() {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: "",
      },
      passwordr: "",
    };
  },
  computed: {
    statePass() {
      if (this.passwordr.length == 0) {
        return null;
      }
      return this.user.password == this.passwordr;
    },
    invalidFeedbackPass() {
      if (this.passwordr.length == 0) {
        return null;
      } else if (this.user.password != this.passwordr) {
        return "Las contraseñas no coinciden.";
      }
    },
  },
  methods: {
    processSignUp: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($userInput: SignUpInput!) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
          `,
          variables: {
            userInput: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.signUpUser.access,
            token_refresh: result.data.signUpUser.refresh,
          };

          this.$emit("completedSignUp", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>
