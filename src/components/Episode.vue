<template>
  <div>
    <h1>{{title}}</h1><h2>{{episode_id}}</h2>
    <img v-for="image in images" :src="image">
  </div>
</template>

<script>
import {BACKEND_URL} from '../constants'

export default {
  data: () => ({
      images: []
  }),
  props: ["title", "episode_id"],
  created: function () {
    let self = this
    axios.post(`${BACKEND_URL}/comics/image_list`,
               {title: this.title, ep_id: this.episode_id})
      .then( ({data}) => {
        data.sort((a, b) => parseInt(a) - parseInt(b))
        for (let filename of data) {
            axios.post(`${BACKEND_URL}/comics/image`,
                       {title: this.title,
                        ep_id: this.episode_id,
                        img_filename: filename},
                       {responseType: "blob"})
              .then((response) => {
                console.log(response)
                const blob = new Blob([response.data], {type: "image/jpeg"})
                const url = window.URL.createObjectURL(blob)
                self.images.push(url)
              })
        }
    })
  },
  methods: {
    hexToBase64(str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    } 
  }
}
</script>
