<template>
  <div class="timeDiv">
    <h4>{{ label }}</h4>
    <div class="display">
      <select :value="time?.repetition" disabled>
        <option value="daily">Ежедневно</option>
        <option value="weekly">Еженедельно</option>
        <option value="monthly">Ежемесячно</option>
        <option value="yearly">Ежегодно</option>
      </select>

      <p v-if="time?.months > 0" class="timeBlock">
        {{ time?.months }}<span class="measure">Месяца</span>
      </p>
      <p v-if="time?.weeks > 0" class="timeBlock">
        {{ time?.weeks }}<span class="measure">Недели</span>
      </p>
      <p v-if="time?.days > 0" class="timeBlock">{{ time?.days }}<span class="measure">д</span></p>
      <p v-if="time?.hours > 0" class="timeBlock">
        {{ time?.hours }}<span class="measure">ч</span>
      </p>
      <p v-if="time?.minutes > 0" class="timeBlock">
        {{ time?.minutes }}<span class="measure">м</span>
      </p>
    </div>
    <MyButton btn-style="edit" @click="editTimeData" v-if="field != 'planDisplay'" />
    <div class="edit" v-if="editTime">
      <select v-model="repetition">
        <option value="daily">Ежедневно</option>
        <option value="weekly">Еженедельно</option>
        <option value="monthly">Ежемесячно</option>
        <option value="yearly">Ежегодно</option>
      </select>
      <p>Минуты: <input type="number" min="0" max="60" v-model="minutes" /></p>
      <p>Часы: <input type="number" min="0" max="24" v-model="hours" /></p>
      <p v-if="repetition == 'weekly' || repetition == 'monthly' || repetition == 'yearly'">
        Дни: <input type="number" min="0" max="7" v-model="days" />
      </p>
      <p v-if="repetition == 'monthly' || repetition == 'yearly'">
        Недели: <input type="number" min="0" max="4" v-model="weeks" />
      </p>
      <p v-if="repetition == 'yearly'">
        Месяцы: <input type="number" min="0" max="12" v-model="months" />
      </p>
      <MyButton btn-style="save" @click="saveTime" />
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'

const props = defineProps({
  auth: {
    type: Object,
    required: false,
  },
  time: {
    type: Object,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  total: {
    type: Object,
    required: false,
  },
  userData: {
    type: Object,
    required: false,
  },
  field: {
    type: String,
    required: false,
  },
})
const { time, auth, total, userData, field } = toRefs(props)
const editTime = ref(false)
const repetition = ref('')
const minutes = ref('')
const hours = ref(0)
const days = ref(0)
const weeks = ref(0)
const months = ref(0)
const newTimeObject = ref({
  repetition: repetition.value,
  months: months.value,
  weeks: weeks.value,
  days: days.value,
  hours: hours.value,
  minutes: minutes.value,
})

const editTimeData = () => {
  editTime.value = !editTime.value
  repetition.value = time.value.repetition
  minutes.value = time.value.minutes
  hours.value = time.value.hours
  days.value = time.value.days
  weeks.value = time.value.weeks
  months.value = time.value.months
}

const saveTime = async () => {
  if (field.value == 'plans') {
    editTime.value = !editTime.value
    newTimeObject.value.repetition = repetition.value
    newTimeObject.value.minutes = minutes.value
    newTimeObject.value.hours = hours.value
    newTimeObject.value.days = days.value
    newTimeObject.value.weeks = weeks.value
    newTimeObject.value.months = months.value
    time.value.repetition = repetition.value
    time.value.minutes = minutes.value
    time.value.hours = hours.value
    time.value.days = days.value
    time.value.weeks = weeks.value
    time.value.months = months.value
  } else {
    const userUid = auth.value.currentUser.uid
    const userRef = doc(db, 'users', userUid)
    if (
      repetition.value != time.value.repetition ||
      minutes.value != time.value.minutes ||
      hours.value != time.value.hours ||
      days.value != time.value.days ||
      weeks.value != time.value.weeks ||
      months.value != time.value.months
    ) {
      if (repetition.value == 'daily') {
        total.value.minutes += minutes.value - time.value.minutes
        total.value.hours += hours.value - time.value.hours
        if (total.value.minutes > 60) {
          total.value.hours += 1
          total.value.minutes -= 60
        }
      }
      time.value.repetition = repetition.value
      time.value.minutes = minutes.value
      time.value.hours = hours.value
      time.value.days = days.value
      time.value.weeks = weeks.value
      time.value.months = months.value

      try {
        await updateDoc(userRef, {
          [field.value]: userData.value[field.value],
          health: userData.value.health,
        })
      } catch (err) {
        console.log('Error adding documents', err)
      }
    }
    editTime.value = !editTime.value
  }
}
defineExpose({ newTimeObject })
</script>

<style scoped>
.timeDiv {
  position: relative;
}
input[type='number'] {
  box-shadow: none;
  background: transparent;
  max-width: 5em;
  text-align: center;
}
.display {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
}
.display select {
  appearance: none;
  opacity: 0.7;
  box-shadow: none;
  max-width: fit-content;
  padding: 0px;
  text-align: center;
  margin: 0px;
  color: #101010ff;
}
.timeBlock {
  position: relative;
}
.measure {
  opacity: 0.7;
  font-size: smaller;
  padding-left: 0.2em;
}
.repetition {
  margin-right: 0.3em;
}
.edit {
  padding-bottom: 3em;
}
.edit input[type='number'] {
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.totalTimeBlock {
  position: absolute;
  top: 0em;
  right: 3em;
}
</style>
