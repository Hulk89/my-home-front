<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit(id, password)">
      <input type="text" v-model="id" placeholder="ID">
      <input type="password" v-model="password" placeholder="Password">
      <input type="submit" value="Login">
    </form>
    <p><i>{{msg}}</i></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    onSubmit(id, password) {
      // LOGIN 액션 실행
      this.$store.dispatch('LOGIN', {id, password})
        .then(() => this.redirect())
        .catch(({message}) => this.msg = message)
    },
    redirect() {
      const {hash} = window.location
      const uri = decodeURIComponent(hash)
      const newPath = uri.replace(/^[^?]*\?returnPath=/, '')
      // 리다이렉트 처리
      this.$router.push(newPath)
    }
  }
}
</script>
