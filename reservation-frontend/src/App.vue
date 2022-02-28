<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />

        <v-btn to="/form" class="ml-2" text>
          <v-icon>mdi-calendar</v-icon>
          <span class="ml-2">Reservation</span>
        </v-btn>
        
        <v-btn to="/register" class="ml-2" text v-if="!loggedInUser">
          <v-icon>mdi-account-plus</v-icon>
          <span class="ml-2">Register</span>
        </v-btn>
        
        <v-btn to="/login" class="ml-2" text v-if="!loggedInUser">
          <v-icon>mdi-account</v-icon>
          <span class="ml-2">Login</span>
        </v-btn>


        <v-btn class="ml-2" text v-if="loggedInUser">
          <v-icon>mdi-account</v-icon>
          <span class="ml-2">{{ loggedInUser.name }}</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-alert
          v-for="(error,key) as errors"
          :key="key"
          type="error"
          transition="scale-transition"
        >
          <v-row align="center">
            <v-col class="grow">
              {{ error }}
            </v-col>
            <v-col class="shrink">
              <v-btn @click.prevent="deleteError(key)"> Dismiss </v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-container>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    ...mapMutations(["deleteError"]),
  },

  computed: {
    ...mapState(["errors", "loggedInUser"]),
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
