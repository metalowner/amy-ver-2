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
      <MyButton btn-style="save" @click="saveTime" />
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
    newTimeObject.value.repetition = repetition.value
    time.value.repetition = repetition.value
    if (repetition.value == 'daily') {
      newTimeObject.value.minutes = minutes.value.editableValue
      newTimeObject.value.hours = hours.value.editableValue
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
    } else if (repetition.value == 'weekly') {
      newTimeObject.value.minutes = minutes.value.editableValue
      newTimeObject.value.hours = hours.value.editableValue
      newTimeObject.value.days = days.value.editableValue
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
    } else if (repetition.value == 'monthly') {
      newTimeObject.value.minutes = minutes.value.editableValue
      newTimeObject.value.hours = hours.value.editableValue
      newTimeObject.value.days = days.value.editableValue
      newTimeObject.value.weeks = weeks.value.editableValue
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = weeks.value.editableValue
    } else {
      newTimeObject.value.minutes = minutes.value.editableValue
      newTimeObject.value.hours = hours.value.editableValue
      newTimeObject.value.days = days.value.editableValue
      newTimeObject.value.weeks = weeks.value.editableValue
      newTimeObject.value.months = months.value.editableValue

      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = weeks.value.editableValue
      time.value.months = months.value.editableValue
    }
  } else {
    const userUid = auth.value.currentUser.uid
    const userRef = doc(db, 'users', userUid)
    if (repetition.value == 'daily') {
      total.value.minutes += minutes.value.editableValue - time.value.minutes
      total.value.hours += hours.value.editableValue - time.value.hours
      console.log(minutes.value.editableValue, hours.value.editableValue)
      if (total.value.minutes > 60) {
        total.value.hours += 1
        total.value.minutes -= 60
      }
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      try {
        await updateDoc(userRef, {
          [field.value]: userData.value[field.value],
          health: userData.value.health,
        })
      } catch (err) {
        console.log('Error adding documents', err)
      }
    } else if (repetition.value == 'weekly') {
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      try {
        await updateDoc(userRef, {
          [field.value]: userData.value[field.value],
          health: userData.value.health,
        })
      } catch (err) {
        console.log('Error adding documents', err)
      }
    } else if (repetition.value == 'monthly') {
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = weeks.value.editableValue
      try {
        await updateDoc(userRef, {
          [field.value]: userData.value[field.value],
          health: userData.value.health,
        })
      } catch (err) {
        console.log('Error adding documents', err)
      }
    } else {
      time.value.minutes = minutes.value.editableValue
      time.value.hours = hours.value.editableValue
      time.value.days = days.value.editableValue
      time.value.weeks = weeks.value.editableValue
      time.value.months = months.value.editableValue
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
