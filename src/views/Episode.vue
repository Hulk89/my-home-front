<template>
  <v-container>
    <v-row>
      <h1>{{title}}-{{episode_id}}</h1>
    </v-row>
    <v-row v-for="(item, key) in items" :key="key">
      <img :src="item.src"/>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn width="100%" text :to='prev_ep()'>prev</v-btn>
      </v-col>
      <v-col cols="6"/>
      <v-col cols="3">
        <v-btn width="100%" text :to='next_ep()'>next</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {BACKEND_URL} from '../constants'

export default {
  data: () => ({
      items: []
  }),
  props: ["title", "episode_id"],
  created: function () {
    this.reload() 
  },
  watch: {
    episode_id: function(newVal, oldVal) {
      this.reload() 
    }
  },
  methods: {
    reload() {
      this.items = []
      let self = this
      axios.post(`${BACKEND_URL}/comics/image_list`,
                 {title: this.title, ep_id: this.episode_id})
      .then( ({data}) => {
        data.sort((a, b) => parseInt(a) - parseInt(b))
        for (let index in data) {
          axios.post(`${BACKEND_URL}/comics/image`,
                     {title: this.title,
                      ep_id: this.episode_id,
                      img_filename: data[index]},
                     {responseType: "blob"})
            .then((response) => {
              const blob = new Blob([response.data], {type: "image/jpeg"})
              const url = window.URL.createObjectURL(blob)
              self.items.push({src: url, index: index})
              self.items.sort((a, b) => a.index - b.index)
            })
        }
      })
    },
    prev_ep() {
      return "episode?title=" + this.title + "&episode_id=" + (parseInt(this.episode_id) - 1)
    },
    next_ep() {
      return "episode?title=" + this.title + "&episode_id=" + (parseInt(this.episode_id) + 1)
    }
  }
}
</script>

<style scoped>
h1 {
    text-align:center;
}
img {
    width: 100%;
    height: auto !important;
}
</style>
