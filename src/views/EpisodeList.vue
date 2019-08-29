<template>
  <div>
    <h1>{{title}}</h1>
    <ul>
        <li v-for="(item, key) in episodes" :key="key">
            <router-link :to="item.path">{{item.title}}</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import {BACKEND_URL} from '../constants'

export default {
  data: () => ({
      episodes: []
  }),
  props: ['title'],
  created: function () {
    axios.get(`${BACKEND_URL}/comics/episode_list/${this.title}`)
      .then( ({data}) => {
        data.sort((a, b) => parseInt(a) - parseInt(b))
        for (let item of data) {
          this.episodes.push({path: 'episode?title='+this.title+'&episode_id='+item, title: item})        
        }
    })
  },
  methods: {
    
  }
}
</script>
