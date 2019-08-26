<template>
  <div>
      <!--<h1>{{title}}</h1>-->
    <ul>
        <li v-for="item in episodes">
            <router-link :to="item.path">{{item.title}}</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import {BACKEND_URL} from '../constants'

export default {
  data: () => ({
      title: "",
      episodes: []
  }),
  created: function () {
    let title = this.$route.params.title
    axios.get(`${BACKEND_URL}/comics/episode_list/${title}`)
      .then( ({data}) => {
        //TODO sorting
        for (let item of data) {
          this.episodes.push({path: 'episode/'+item, title: item})        
        }
    })
  },
  methods: {
    
  }
}
</script>
