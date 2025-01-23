<template>
  <div v-show="!userLoggedIn">
    <MyButton
      btn-style="standard"
      btn-text="Login"
      @click="((loginActive = !loginActive), (registerActive = false))"
    />
    <MyButton
      btn-style="standard"
      btn-text="Register"
      @click="((registerActive = !registerActive), (loginActive = false))"
    />
  </div>
  <div v-show="userLoggedIn">
    <MyButton btn-style="standard" btn-text="Logout" @click="userLogout" />
  </div>
  <div v-if="registerActive">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
  </div>
  <div v-if="loginActive">
    <h1>Login to account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="login">Submit</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { useRouter } from 'vue-router' // import router
import MyButton from './MyButton.vue'

const registerActive = ref(false)
const loginActive = ref(false)
const userLoggedIn = ref(false)
const email = ref('')
const password = ref('')
const router = useRouter() // get a reference to our vue router
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      console.log(user)
      router.push('/profile') // redirect to the profile
      registerActive.value = false
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      // ..
    })
}
const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user)
      router.push('/profile')
      loginActive.value = false
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}

const userLogout = () => {
  auth.signOut() // sign out
  router.push('/') // redirect to home page
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    userLoggedIn.value = true
    // ...
  } else {
    // User is signed out
    userLoggedIn.value = false
    // ...
  }
})
defineExpose({
  auth,
  userLoggedIn,
})
</script>
