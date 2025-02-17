<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SignIn from './components/SignIn.vue'
import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './main'

const signIn = ref(null)
const userData = ref({})

setTimeout(async () => {
  if (signIn.value.userLoggedIn === true) {
    const docRef = doc(db, 'users', signIn.value.auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      userData.value = docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }
}, 3000)
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/profile" v-if="signIn?.userLoggedIn">Profile</RouterLink>
      <SignIn ref="signIn" />
    </nav>
  </header>
  <div class="wrapper">
    <RouterView :auth="signIn" :userData="userData" />
  </div>
  <footer>All rights reserved</footer>
</template>

<style scoped>
header {
  padding: 1em;
  background-color: #00bbbbff;
}
footer {
  background-color: #101010ff;
  color: #fafaf2ff;
  height: 5em;
}
.wrapper {
  padding: 1em;
}
</style>
