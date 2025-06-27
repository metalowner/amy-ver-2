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
  <div class="popUp" v-if="userData?.plans?.length > 0 && displayPlansProgress">
    <h2>Как идут планы?</h2>
    <div v-for="(plan, index) in userData?.plans" :key="plan.header">
      <div v-if="plan.displayProgress == true">
        <p>С момента начала {{ plan.header }} прошло {{ plan.daysPassed }} дней.</p>
        <p>Как ваша успешность исполнения?</p>
        <MyRange
          :edit-enabled="true"
          :input-value="0"
          :ref="(el) => (successValues['process' + index] = el)"
        />
        <p>Как ваша удовлетворённость результатами?</p>
        <MyRange
          :edit-enabled="true"
          :input-value="0"
          :ref="(el) => (successValues['result' + index] = el)"
        />
      </div>
      <MyButton btn-style="standard" btn-text="Сохранить" @click="saveProgress" />
      <MyButton
        btn-style="standard"
        btn-text="Закрыть"
        @click="displayPlansProgress = !displayPlansProgress"
      />
    </div>
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
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import MyRange from './MyRange.vue'
import moment from 'moment'
import Swal from 'sweetalert2'

const registerActive = ref(false)
const loginActive = ref(false)
const userLoggedIn = ref(false)
const email = ref('')
const password = ref('')
const router = useRouter() // get a reference to our vue router
const auth = getAuth()
const userData = ref({})
const displayPlansProgress = ref(false)
const successValues = ref({})

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user
      registerActive.value = false
      const today = moment().format('YYYY-MM-DD')
      const todayDate = today
      // ...
      await setDoc(doc(db, 'users', user.uid), {
        lifeStory: 'Ваша история...',
        vision: 'Жить удовлетворительную жизнь',
        achievements: {
          finishedPlans: [],
          resolvedObstacles: [],
          achievedGoals: [],
        },
        health: {
          physicalHealth: 0,
          emotionalHealth: 0,
          totalHealth: 0,
          time: {
            sleep: {
              minutes: 0,
              hours: 8,
              days: 0,
              weeks: 0,
              months: 0,
              repetition: 'daily',
            },
            total: {
              minutes: 0,
              hours: 20,
              days: 0,
              weeks: 0,
              months: 0,
            },
          },
        },
        social: {
          family: 0,
          love: 0,
          friends: 0,
          pals: 0,
          strangers: 0,
          totalSocial: 0,
          time: {
            family: {
              minutes: 0,
              hours: 1,
              days: 1,
              weeks: 0,
              months: 0,
              repetition: 'weekly',
            },
            love: {
              minutes: 0,
              hours: 2,
              days: 0,
              weeks: 0,
              months: 0,
              repetition: 'daily',
            },
            friends: {
              minutes: 0,
              hours: 1,
              days: 1,
              weeks: 0,
              months: 0,
              repetition: 'weekly',
            },
            pals: {
              minutes: 0,
              hours: 1,
              days: 1,
              weeks: 0,
              months: 0,
              repetition: 'monthly',
            },
            strangers: {
              minutes: 0,
              hours: 1,
              days: 1,
              weeks: 0,
              months: 0,
              repetition: 'monthly',
            },
          },
        },
        finances: {
          income: 0,
          partners: 0,
          education: 0,
          profession: 0,
          schedule: 0,
          totalFinances: 0,
          time: {
            work: {
              minutes: 0,
              hours: 8,
              days: 0,
              weeks: 0,
              months: 0,
              repetition: 'daily',
            },
            education: {
              minutes: 0,
              hours: 2,
              days: 0,
              weeks: 0,
              months: 0,
              repetition: 'daily',
            },
          },
        },
        hobbies: {
          hobbies: 100,
          freeTime: 0,
          totalHobbies: 50,
          time: {
            funTime: {
              minutes: 0,
              hours: 0,
              days: 3,
              weeks: 0,
              months: 0,
              repetition: 'monthly',
            },
          },
        },
        values: [
          {
            header: 'Саморазвитие',
            description: 'Желание учиться, приспосабливаться и трансформироваться',
            importance: 2,
          },
          {
            header: 'Удовлетворение',
            description: 'Всё, что делается, делается ради каких-то результатов',
            importance: 2,
          },
        ],
        obstacles: [
          {
            header: 'Страх перемен',
            description: 'Каждый раз выбирать привычные действия препятствуя своему развитию',
            importance: 1,
          },
        ],
        resources: [
          {
            header: 'Друзья',
            description: 'Которые поддержат, подскажут и помогут',
            importance: 1,
          },
        ],
        goals: [
          {
            header: 'Саморазвитие!',
            description: 'Раскрыть свой потенциал',
            values: ['Саморазвитие'],
            importance: 1,
            urgency: 10,
            lifeFields: ['Здоровье', 'Социум', 'Финансы', 'Увлечения'],
          },
        ],
        plans: [
          {
            header: 'Развить навык саморазвития в привычку',
            goals: ['Саморазвитие!'],
            values: ['Удовлетворение'],
            startDate: todayDate,
            importance: 10,
            urgency: 10,
            obstacles: ['Страх перемен'],
            resources: ['Друзья'],
            daysPassed: 0,
            displayProgress: false,
            success: {
              processSuccess: 0,
              resultsSuccess: 0,
            },
            time: {
              days: null,
              weeks: null,
              months: null,
              hours: 1,
              minutes: 0,
              repetition: 'daily',
            },
          },
        ],
      })
      Swal.fire({ text: 'Пользователь успешно создан!', buttonsStyling: false })
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
      loginActive.value = false
      Swal.fire({ text: 'Вход прошёл успешно!', buttonsStyling: false })
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

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    userLoggedIn.value = true
    const docRef = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      userData.value = docSnap.data()
      if (userData.value.values.length > 0) {
        sortArray(userData.value.values)
      }
      if (userData.value.obstacles.length > 0) {
        sortArray(userData.value.obstacles)
      }
      if (userData.value.resources.length > 0) {
        sortArray(userData.value.resources)
      }
      if (userData.value.goals.length > 0) {
        sortArray(userData.value.goals)
      }
      if (userData.value.plans.length > 0) {
        const plans = userData.value.plans
        sortArray(plans)
        for (let i = 0; i < plans.length; i++) {
          const element = plans[i]
          const newDaysPassed = parseInt(parseTime(element.startDate))
          const newDays = newDaysPassed - element.daysPassed
          console.log(newDays)
          if (newDays < 6) {
            return
          } else {
            if (element.time.repetition == 'monthly' && newDaysPassed - element.daysPassed > 29) {
              element.daysPassed = newDaysPassed
              element.displayProgress = true
            } else if (
              element.time.repetition == 'yearly' &&
              newDaysPassed - element.daysPassed > 364
            ) {
              element.daysPassed = newDaysPassed
              element.displayProgress = true
            } else {
              element.daysPassed = newDaysPassed
              element.displayProgress = true
            }
            displayPlansProgress.value = true
          }
        }
      }
      if ('incomes' in userData.value.finances) {
        return
      } else {
        userData.value.finances.incomes = []
        userData.value.finances.costs = []
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
    // ...
  } else {
    // User is signed out
    userLoggedIn.value = false
    // ...
  }
})
// ellapsed time function
function parseTime(startDate) {
  let start = moment(startDate, 'YYYY-MM-DD')
  let now = moment()
  let daysPassed = now.valueOf() - start.valueOf()

  return differenceInDays(daysPassed)
}
// calculate ellapsed time in days
function differenceInDays(difference) {
  let result = Math.round(difference / (1000 * 3600 * 24))
  return result
}
// save progress
const saveProgress = async () => {
  const userUid = auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  for (let a = 0; a < userData.value.plans.length; a++) {
    const element = userData.value.plans[a]
    if (element.displayProgress == true) {
      element.success.processSuccess = parseInt(successValues.value['process' + a].editableValue)
      element.success.resultsSuccess = parseInt(successValues.value['result' + a].editableValue)
      element.displayProgress = false
    }
  }
  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
    })
    displayPlansProgress.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// sort array according to importance
const sortArray = (array) => {
  array.sort((a, b) => b.importance - a.importance)
}
defineExpose({
  auth,
  userLoggedIn,
  userData,
})
</script>
