<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hulk's </span>
        <span class="font-weight-light">Home</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="item in items" 
          text 
          :to="item.path">
          <span class="mr-2">{{item.name}}</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    items: []
  }),
  created() {
    this.$router.options.routes.forEach(route => {
      this.items.push({
        name: route.name
        , path: route.path
      })
    })
  },
};
</script>
