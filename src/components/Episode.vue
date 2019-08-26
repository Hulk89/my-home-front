<template>
  <div>
    <h1>{{title}}</h1><h2>{{episode_id}}</h2>
    <img v-for="(index, image) in images" :src="image">
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
                        img_filename: filename})
              .then((response) => {
                console.log(response)
                var b64Response = btoa(response.data)
                //const blob = new Blob([response], {type: "image/jpeg"})
                self.images.push('data:image/jpeg;base64,' + b64Response)
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
