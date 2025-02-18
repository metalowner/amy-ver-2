<template>
  <div class="signInBtn" v-show="!userLoggedIn">
    <MyButton
      btn-style="navLink"
      btn-text="Войти"
      @click="((loginActive = !loginActive), (registerActive = false))"
    />
    <MyButton
      btn-style="navLink"
      btn-text="Регистрация"
      @click="((registerActive = !registerActive), (loginActive = false))"
    />
  </div>
  <div class="signInBtn" v-show="userLoggedIn">
    <MyButton btn-style="navLink" btn-text="Выйти" @click="userLogout" />
  </div>
  <div class="popUp" v-if="registerActive">
    <h1>Создать аккаунт</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><MyButton btn-style="standard" btn-text="Отправить" @click="register" /></p>
  </div>
  <div class="popUp" v-if="loginActive">
    <h1>Войти в аккаунт</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><MyButton btn-style="standard" btn-text="Отправить" @click="login" /></p>
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
        lifeStory: 'Ваша история...',
        vision: 'Жить удовлетворительную жизнь',
        values: [
          {
            header: 'Саморазвития',
            description: 'Желание учится, приспосабливаться и трансформироваться',
            importance: 2,
          },
          {
            header: 'Удовлетворение',
            description: 'Всё что делается, делается ради каких-то результатов',
            importance: 2,
          },
        ],
        obstacles: [
          {
            header: 'Страх перемен',
            description: 'Каждый раз выбирать привычные действия препятсвуя своему развитию',
            importance: 1,
          },
        ],
        resources: [
          {
            header: 'Друзья',
            description: 'Кторые поддержат, подскажут и помогут',
            importance: 1,
          },
        ],
        goals: [
          {
            header: 'Саморазвития!',
            description: 'Раскрыть свой потенциал',
            values: ['Саморазвития'],
            measures: ['Заполненые поля', 'Уделённое время'],
            importance: 1,
            urgency: 10,
            prices: ['Время', 'Усилия'],
          },
        ],
        plans: [
          {
            header: 'Развить навык саморазвития в привычку',
            goals: ['Саморазвития!'],
            values: ['Удовлетворение'],
            startDate: todayDate,
            deadline: nextYear,
            importance: 1,
            urgency: 10,
            obstacles: ['Страх перемен'],
            resources: ['Друзья'],
          },
        ],
        actions: [
          {
            header: 'Заполнять и редактировать поля',
            plans: ['Развить навык саморазвития в привычку'],
            duration: 'Ежедневно',
            importance: 1,
            urgency: 10,
            actionType: 'Учить',
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
