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
            valueHeader: 'Self-development',
            valueDescription: 'The will to learn, adapt and transform.',
            valueImportance: 2,
          },
          {
            valueHeader: 'Pleasure',
            valueDescription: 'Every action and path I take should be pleasant.',
            valueImportance: 2,
          },
        ],
        obstacles: [
          {
            obstacleHeader: 'Fear of change',
            obstacleDescription: 'Endless excuses whenever comes the time to take action.',
            obstacleImportance: 1,
          },
        ],
        resources: [
          {
            resourceHeader: 'Friends',
            resourceDescription: 'Friends that can help overcome my fear of changes.',
            resourceImportance: 1,
          },
        ],
        goals: [
          {
            goalHeader: 'Results!',
            goalDescription: 'Get first results from this app',
            goalValues: ['Self-development'],
            goalMeasures: ['Filled fields'],
            goalImportance: 10,
            goalUrgency: 10,
            goalPrice: ['Time', 'Effort'],
          },
        ],
        plans: [
          {
            planHeader: 'Start getting results',
            planGoals: ['Results!'],
            planValues: ['Pleasure'],
            planStartDate: todayDate,
            planDeadline: nextYear,
            planImportance: 10,
            planUrgency: 10,
            planObstacles: ['Fear of change'],
            planResources: ['Friends'],
          },
        ],
        actions: [
          {
            actionHeader: 'Fill the fields',
            actionPlans: ['Start getting results'],
            actionDuration: 'Daily',
            actionImportance: 10,
            actionUrgency: 10,
            actionType: 'Learn',
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
