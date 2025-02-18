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
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/about">О нас</RouterLink>
      <RouterLink to="/profile" v-if="signIn?.userLoggedIn">Профиль</RouterLink>
      <SignIn ref="signIn" />
    </nav>
  </header>
  <RouterView :auth="signIn" :userData="userData" />
  <footer>Все права защищены!</footer>
</template>

<style scoped>
header {
  padding: 1em;
  background-color: #101010ff;
}
footer {
  background-color: #101010ff;
  color: #fafaf2ff;
  height: 5em;
}
</style>
