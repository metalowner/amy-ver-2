<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { initializeApp } from 'firebase/app'
import { useRouter } from 'vue-router' // import router
const email = ref('')
const password = ref('')
const router = useRouter() // get a reference to our vue router

const firebaseConfig = {
  apiKey: 'AIzaSyAaboroWx51bVpf2gn8X00S948wE3654MU',
  authDomain: 'amy-ver-2.firebaseapp.com',
  projectId: 'amy-ver-2',
  storageBucket: 'amy-ver-2.firebasestorage.app',
  messagingSenderId: '223332939584',
  appId: '1:223332939584:web:041368e4ae5c59d18deca5',
}

const firebaseApp = initializeApp(firebaseConfig)

const register = () => {
  firebaseApp
    .auth() // get the auth api
    .createUserWithEmailAndPassword(email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log('Successfully registered!')
      console.log(data)
      router.push('/feed') // redirect to the feed
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}
</script>
