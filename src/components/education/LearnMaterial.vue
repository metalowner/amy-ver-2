<template>
  <div
    class="testDiv"
    v-if="activeTest === false && data?.content?.length > 1 && timeToExercise === false"
  >
    <h3>{{ data.header }}</h3>
    <div v-for="paragraph in data.content" :key="paragraph" class="paragraphDivision">
      <p v-html="paragraph"></p>
    </div>
    <div v-if="!testNotPassed()">
      <div v-for="paragraph in data.exercise" :key="paragraph" class="paragraphDivision">
        <p v-html="paragraph"></p>
      </div>
    </div>

    <div class="btnContainer">
      <MyButton
        v-if="activeTest === false && testNotPassed()"
        btn-style="standard"
        btn-text="Перейти к экзамену"
        @click="activeTest = true"
      />
      <MyButton
        v-if="!testNotPassed()"
        btn-style="standard"
        :btn-text="'Добавить ' + data.header"
        @click="router.push('/profile')"
      />
    </div>
  </div>

  <div class="testDiv" v-if="activeTest === true && timeToExercise === false">
    <h3>{{ data.header }}</h3>
    <div
      class="questionDiv"
      v-for="question in data.test"
      :key="question.text"
      :class="question.inCorrect"
    >
      <h4>{{ question.text }}</h4>
      <div class="educationCheckboxDiv">
        <label v-for="value in question.answers" :key="value" class="container"
          >{{ value }}
          <input :value="value" type="checkbox" v-model="question.selectedAnswers" />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
    <MyButton btn-style="standard" btn-text="Назад" @click="activeTest = false" />
    <MyButton btn-style="standard" btn-text="Сдать на проверку" @click="checkAnswers(data.test)" />
  </div>
  <div class="testDiv" v-if="timeToExercise">
    <h4>
      Поздравляю! Вы завершили обучение "{{ data.header }}" и сейчас самое время закрепить новые
      знания практикой!
    </h4>
    <div v-for="paragraph in data.exercise" :key="paragraph" class="paragraphDivision">
      <p v-html="paragraph"></p>
    </div>
    <div class="valueInput" v-if="data.header === 'Современная жизнь'">
      <LifeStory :user-data="userData" :auth="auth.auth" />
    </div>
    <div
      class="valueInput"
      v-if="
        data.header === 'Ценности' || data.header === 'Препятствия' || data.header === 'Ресурсы'
      "
    >
      <AddNewValue :user-data="userData" :auth="auth" :data-type="dataType" />
    </div>
    <div class="valueInput" v-if="data.header === 'Жизнь моей мечты'">
      <DreamLife :auth="auth.auth" :userData="userData" />
    </div>
    <div class="valueInput" v-if="data.header === 'Цели'">
      <AddNewGoal :user-data="userData" :auth="auth" :data-type="dataType" />
    </div>
    <div class="valueInput" v-if="data.header === 'Планы'">
      <AddNewPlan
        :user-data="userData"
        :auth="auth"
        :data-type="dataType"
        :new-start="newPlanStartDate"
        :new-time="newPlanTimeObject"
      />
    </div>
    <MyButton btn-style="standard" btn-text="Профиль" @click="router.push('/profile')" />
    <MyButton btn-style="standard" btn-text="Следующий урок" @click="emit('finish-lesson')" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import router from '@/router'
import DreamLife from '../self_development/DreamLife.vue'
import AddNewValue from '../self_development/AddNewValue.vue'
import AddNewGoal from '../self_development/AddNewGoal.vue'
import moment from 'moment'
import LifeStory from '../self_development/LifeStory.vue'
import AddNewPlan from '../self_development/AddNewPlan.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  auth: {
    type: Object,
    required: true,
  },
})

const { data, userData, auth } = toRefs(props)
const activeTest = ref(false)
const timeToExercise = ref(false)
const newPlanStartDate = moment().format('YYYY-MM-DD')
const newPlanTimeObject = {
  repetition: 'daily',
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
}

const testNotPassed = () => {
  if (userData.value.education.lessons.indexOf(data.value.header) > -1) {
    return false
  } else {
    return true
  }
}

const checkAnswers = async (a) => {
  const answers = data.value.test.map((q) => q.selectedAnswers)
  const wrongAnswers = []
  for (let i = 0; i < a.length; i++) {
    const present = (currentValue) => answers[i].includes(currentValue)
    console.log(a[i].correctAnswers, answers[i])

    if (a[i].correctAnswers.every(present)) {
      a[i].inCorrect = 'correct'
    } else {
      a[i].inCorrect = 'wrong'
      wrongAnswers.push(a[i])
    }
  }
  if (wrongAnswers.length === 0) {
    const userUid = auth.value.auth.currentUser.uid
    const userRef = doc(db, 'users', userUid)

    if (userData.value.education.lessons.indexOf(data.value.header) > -1) {
      return
    } else {
      userData.value.education.lessons.push(data.value.header)
      try {
        await updateDoc(userRef, {
          education: userData.value.education,
        })
      } catch (err) {
        console.log('Error adding documents', err)
      }
      console.log(data.value.header)
    }
    activeTest.value = false
    timeToExercise.value = true
  }
  return true
}

const emit = defineEmits(['finish-lesson'])
</script>

<style scoped>
.paragraphDivision {
  max-width: 35em;
}

.testDiv {
  padding: 1em;
  max-width: 35em;
}
.questionDiv {
  padding: 1em;
  border-radius: 5px;
}
.educationCheckboxDiv {
  margin: 0.5em 0em;
}
.wrong {
  background: var(--red-gradient);
}
.valueInput {
  border: 1px solid var(--red);
}
</style>
