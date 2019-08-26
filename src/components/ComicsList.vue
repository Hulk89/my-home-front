<template>
    <ul>
        <li v-for="item in items">
            <router-link :to="item.path">{{item.title}}</router-link>
        </li>
    </ul>
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
          this.items.push({path: 'comics/episode_list/'+item, title: item})        
        }
      })
  },
  methods: {
    
  }
}
</script>
