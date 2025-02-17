<template>
  <div class="signInBtn" v-show="!userLoggedIn">
    <MyButton
      btn-style="navLink"
      btn-text="Login"
      @click="((loginActive = !loginActive), (registerActive = false))"
    />
    <MyButton
      btn-style="navLink"
      btn-text="Register"
      @click="((registerActive = !registerActive), (loginActive = false))"
    />
  </div>
  <div class="signInBtn" v-show="userLoggedIn">
    <MyButton btn-style="navLink" btn-text="Logout" @click="userLogout" />
  </div>
  <div class="popUp" v-if="registerActive">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><MyButton btn-style="standard" btn-text="Submit" @click="register" /></p>
  </div>
  <div class="popUp" v-if="loginActive">
    <h1>Login to account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><MyButton btn-style="standard" btn-text="Submit" @click="login" /></p>
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
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/main'

const registerActive = ref(false)
const loginActive = ref(false)
const userLoggedIn = ref(false)
const email = ref('')
const password = ref('')
const router = useRouter() // get a reference to our vue router
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user
      console.log(user)
      router.push('/profile') // redirect to the profile
      registerActive.value = false
      const today = new Date()
      const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const nextYear =
        today.getFullYear() + 1 + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      // ...
      await setDoc(doc(db, 'users', user.uid), {
        lifeStory: 'Your awesome story',
        vision: 'Your motivating vision',
        values: [
          {
            header: 'Self-development',
            description: 'The will to learn, adapt and transform.',
            importance: 2,
          },
          {
            header: 'Pleasure',
            description: 'Every action and path I take should be pleasant.',
            importance: 2,
          },
        ],
        obstacles: [
          {
            header: 'Fear of change',
            description: 'Endless excuses whenever comes the time to take action.',
            importance: 1,
          },
        ],
        resources: [
          {
            header: 'Friends',
            description: 'Friends that can help overcome my fear of changes.',
            importance: 1,
          },
        ],
        goals: [
          {
            header: 'Results!',
            description: 'Get first results from this app',
            values: ['Self-development'],
            measures: ['Filled fields'],
            importance: 1,
            urgency: 10,
            prices: ['Time', 'Effort'],
          },
        ],
        plans: [
          {
            header: 'Start getting results',
            goals: ['Results!'],
            values: ['Pleasure'],
            startDate: todayDate,
            deadline: nextYear,
            importance: 1,
            urgency: 10,
            obstacles: ['Fear of change'],
            resources: ['Friends'],
          },
        ],
        actions: [
          {
            header: 'Fill the fields',
            plans: ['Start getting results'],
            duration: 'Daily',
            importance: 1,
            urgency: 10,
            actionType: 'Learn',
            startDate: todayDate,
          },
        ],
      })
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
    .then(() => {
      // Signed in
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

<style scoped>
.signInBtn {
  margin-left: auto;
  border-left: 1px solid #fafaf2ff;
}
.popUp {
  display: block;
  position: fixed;
  top: 40%;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: fit-content;
  border-radius: 5px;
  padding: 1em;
  text-align: center;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
</style>
