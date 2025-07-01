<template>
  <div class="timeDiv">
    <h4 v-if="label != null">
      {{ label }}
    </h4>
    <MyButton
      btn-style="edit"
      @click="editTimeData"
      v-if="field != 'planDisplay'"
      class="editBtn"
    />
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

    <div class="edit" v-if="editTime">
      <select v-model="repetition">
        <option value="daily">Ежедневно</option>
        <option value="weekly">Еженедельно</option>
        <option value="monthly">Ежемесячно</option>
        <option value="yearly">Ежегодно</option>
      </select>
      <div class="countersDiv">
        <MyCounter label="Минуты" :input-value="time?.minutes" :max-value="60" ref="minutes" />
        <MyCounter label="Часы" :input-value="time?.hours" :max-value="24" ref="hours" />
        <MyCounter
          v-if="repetition == 'weekly' || repetition == 'monthly' || repetition == 'yearly'"
          label="Дни"
          :input-value="time?.days"
          :max-value="7"
          ref="days"
        />
        <MyCounter
          v-if="repetition == 'monthly' || repetition == 'yearly'"
          label="Недели"
          :input-value="time?.weeks"
          :max-value="4"
          ref="weeks"
        />
        <MyCounter
          v-if="repetition == 'yearly'"
          label="Месяцы"
          :input-value="time?.months"
          :max-value="12"
          ref="months"
        />
      </div>

      <MyButton btn-style="standard" btn-text="Сохранить" @click="saveTime" />
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import MyCounter from '../MyCounter.vue'

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
const minutes = ref(null)
const hours = ref(null)
const days = ref(null)
const weeks = ref(null)
const months = ref(null)
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
}

const saveTime = async () => {
  if (field.value == 'plans') {
    editTime.value = !editTime.value
    // check daily
    if (time.value.repetition === 'daily' && repetition.value != 'daily') {
      total.value.minutes -= time.value.minutes
      total.value.hours -= time.value.hours
      console.log('from daily', total.value)
    } else if (time.value.repetition != 'daily' && repetition.value === 'daily') {
      total.value.minutes += minutes.value.editableValue
      total.value.hours += hours.value.editableValue
      console.log('to daily', total.value)
    } else if (repetition.value === 'daily' && time.value.repetition === 'daily') {
      total.value.minutes += minutes.value.editableValue - time.value.minutes
      total.value.hours += hours.value.editableValue - time.value.hours
    }
    // check minutes and hours
    if (userData.value.health.time.total.minutes > 60) {
      userData.value.health.time.total.hours += 1
      userData.value.health.time.total.minutes -= 60
    } else if (userData.value.health.time.total.minutes < 0) {
      userData.value.health.time.total.hours -= 1
      userData.value.health.time.total.minutes += 60
    }
    // clean unused fields and set data
    if (repetition.value === 'daily') {
      newTimeObject.value.minutes = minutes.value.editableValue
      newTimeObject.value.hours = hours.value.editableValue
      newTimeObject.value.days = 0
      newTimeObject.value.weeks = 0
      newTimeObject.value.months = 0
      newTimeObject.value.repetition = repetition.value

      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = 0
      time.value.weeks = 0
      time.value.months = 0
      time.value.repetition = repetition.value
    } else if (repetition.value === 'weekly') {
      newTimeObject.value.minutes = minutes.value.editableValue
      newTimeObject.value.hours = hours.value.editableValue
      newTimeObject.value.days = days.value.editableValue
      newTimeObject.value.weeks = 0
      newTimeObject.value.months = 0
      newTimeObject.value.repetition = repetition.value

      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = 0
      time.value.months = 0
      time.value.repetition = repetition.value
    } else if (repetition.value === 'monthly') {
      newTimeObject.value.minutes = minutes.value.editableValue
      newTimeObject.value.hours = hours.value.editableValue
      newTimeObject.value.days = days.value.editableValue
      newTimeObject.value.weeks = weeks.value.editableValue
      newTimeObject.value.months = 0
      newTimeObject.value.repetition = repetition.value

      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = weeks.value.editableValue
      time.value.months = 0
      time.value.repetition = repetition.value
    } else {
      newTimeObject.value.minutes = minutes.value.editableValue
      newTimeObject.value.hours = hours.value.editableValue
      newTimeObject.value.days = days.value.editableValue
      newTimeObject.value.weeks = weeks.value.editableValue
      newTimeObject.value.months = months.value.editableValue
      newTimeObject.value.repetition = repetition.value

      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = weeks.value.editableValue
      time.value.months = months.value.editableValue
      time.value.repetition = repetition.value
    }
  } else {
    const userUid = auth.value.currentUser.uid
    const userRef = doc(db, 'users', userUid)
    // check daily
    if (time.value.repetition === 'daily' && repetition.value != 'daily') {
      total.value.minutes -= time.value.minutes
      total.value.hours -= time.value.hours
      console.log('from daily')
    } else if (time.value.repetition != 'daily' && repetition.value === 'daily') {
      total.value.minutes += minutes.value.editableValue
      total.value.hours += hours.value.editableValue
      console.log('to faily')
    } else if (repetition.value === 'daily' && time.value.repetition === 'daily') {
      total.value.minutes += minutes.value.editableValue - time.value.minutes
      total.value.hours += hours.value.editableValue - time.value.hours
    }
    // check minutes and hours
    if (userData.value.health.time.total.minutes > 60) {
      userData.value.health.time.total.hours += 1
      userData.value.health.time.total.minutes -= 60
    } else if (userData.value.health.time.total.minutes < 0) {
      userData.value.health.time.total.hours -= 1
      userData.value.health.time.total.minutes += 60
    }
    // clean unused fields and set data
    if (repetition.value === 'daily') {
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = 0
      time.value.weeks = 0
      time.value.months = 0
      time.value.repetition = repetition.value
    } else if (repetition.value === 'weekly') {
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = 0
      time.value.months = 0
      time.value.repetition = repetition.value
    } else if (repetition.value === 'monthly') {
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = weeks.value.editableValue
      time.value.months = 0
      time.value.repetition = repetition.value
    } else {
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = weeks.value.editableValue
      time.value.months = months.value.editableValue
      time.value.repetition = repetition.value
    }
    try {
      await updateDoc(userRef, {
        [field.value]: userData.value[field.value],
        health: userData.value.health,
      })
    } catch (err) {
      console.log('Error adding documents', err)
    }
    editTime.value = !editTime.value
  }
}

defineExpose({ newTimeObject })
</script>

<style scoped>
.timeDiv .edit {
  top: 2.6em;
  right: 0em;
}
.timeDiv {
  position: relative;
  width: 100%;
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
  box-shadow: none;
  max-width: fit-content;
  padding: 0px;
  margin: 0px;
  color: var(--black);
  font-size: 1.125em;
  font-weight: 300;
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
  padding-top: 1em;
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
.countersDiv {
  margin: 1em 0em;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: start;
  column-gap: 1em;
  row-gap: 1em;
  text-align: start;
}
.countersDiv .description {
  text-align: start;
}
</style>
