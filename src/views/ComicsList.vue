<template>
  <v-container fluid>
    <v-row v-for="(item, key) in items" :key="key">
      <router-link :to="item.path"><h3>{{item.title}}</h3></router-link>
    </v-row>
  </v-container>
</template>

<script>
import {BACKEND_URL} from '../constants'

export default {
  data: () => ({
      items: []
  }),
  created: function () {
    axios.get(`${BACKEND_URL}/comics/list`)
      .then( ({data}) => {
        for (let item of data) {
          this.items.push({path: 'comics/episode_list?title='+item, title: item})        
        }
      })
  },
  methods: {
    
  }
}
</script>
