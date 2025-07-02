<template>
  <div class="innerBlock" v-if="newTime && userData && newStart">
    <h4>Ваши цели</h4>
    <div class="checkboxDiv">
      <label class="container" v-for="value in userData?.goals" :key="value.header"
        >{{ value.header }}
        <input :value="value.header" type="checkbox" v-model="newPlanGoals" />
        <span class="checkmark"></span>
      </label>
    </div>
    <p><input type="text" placeholder="Ваше действие" v-model="newPlanHeader" /></p>
    <TimeCalc
      :time="newPlanTimeObject"
      label="Повторяемость"
      :total="userData?.health?.time?.total"
      :auth="auth.auth"
      :user-data="userData"
      field="plans"
      ref="newPlanTime"
    />
    <p>Дата начала: <input type="date" placeholder="Дата начала" v-model="newPlanStartDate" /></p>
    <div class="counterDiv">
      <p>
        <MyCounter label="Срочность" :input-value="1" :max-value="10" ref="newPlanUrgency" />
      </p>
      <p>
        <MyCounter label="Важность" :input-value="1" :max-value="10" ref="newPlanImportance" />
      </p>
    </div>

    <h4>Ценности</h4>
    <div class="checkboxDiv">
      <label class="container" v-for="value in userData?.values" :key="value"
        >{{ value.header }}
        <input :value="value.header" type="checkbox" v-model="newPlanValues" />
        <span class="checkmark"></span>
      </label>
    </div>
    <h4>Препятствия</h4>
    <div class="checkboxDiv">
      <label class="container" v-for="value in userData?.obstacles" :key="value"
        >{{ value.header }}
        <input :value="value.header" type="checkbox" v-model="newPlanObstacles" />
        <span class="checkmark"></span>
      </label>
    </div>
    <h4>Ресурсы</h4>
    <div class="checkboxDiv">
      <label class="container" v-for="value in userData?.resources" :key="value"
        >{{ value.header }}
        <input :value="value.header" type="checkbox" v-model="newPlanResources" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="btnsDiv">
      <MyButton btn-style="standard" btn-text="Сохранить" @click="savePlan" />
      <MyButton btn-style="delete" btn-text="Отменить" @click="close()" />
    </div>
  </div>
</template>

<script setup>
import { db } from '@/main'
import { doc, updateDoc } from 'firebase/firestore'
import { toRefs, ref } from 'vue'
import TimeCalc from './TimeCalc.vue'
import MyCounter from '../MyCounter.vue'
import MyButton from '../MyButton.vue'
import Swal from 'sweetalert2'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
  auth: {
    type: Object,
    required: true,
  },
  newStart: {
    type: String,
    required: true,
  },
  newTime: {
    type: Object,
    required: true,
  },
})

const { userData, auth, newStart, newTime } = toRefs(props)

const newPlanHeader = ref('')
const newPlanUrgency = ref(Number)
const newPlanImportance = ref(Number)
const newPlanStartDate = ref(newStart.value)
const newPlanGoals = ref([])
const newPlanValues = ref([])
const newPlanObstacles = ref([])
const newPlanResources = ref([])
const newPlanTime = ref(Object)
const newPlanTimeObject = ref(newTime.value)

// save new plan
const savePlan = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  if (newPlanHeader.value === '') {
    Swal.fire({ text: 'Нужен заголовок!', buttonsStyling: false })
  } else if (containsObject(newPlanHeader.value, userData.value.plans) === true) {
    Swal.fire({ text: 'Такой заголовок плана уже есть!', buttonsStyling: false })
  } else {
    if (newPlanTime.value.newTimeObject.repetition == '') {
      newPlanTime.value.newTimeObject = newPlanTimeObject
    }
    const newPlanObject = {
      header: newPlanHeader.value,
      urgency: parseInt(newPlanUrgency.value.editableValue),
      importance: parseInt(newPlanImportance.value.editableValue),
      startDate: newPlanStartDate,
      goals: newPlanGoals.value,
      values: newPlanValues.value,
      obstacles: newPlanObstacles.value,
      resources: newPlanResources.value,
      time: newPlanTime.value.newTimeObject,
      daysPassed: 0,
      displayProgress: false,
      success: {
        processSuccess: 100,
        resultsSuccess: 100,
      },
    }
    userData.value.plans.push(newPlanObject)
    try {
      await updateDoc(userRef, {
        plans: userData.value.plans,
        health: userData.value.health,
      })
      Swal.fire({ text: 'Сохранение прошло успешно!', buttonsStyling: false })
      newPlanHeader.value = ''
      newPlanGoals.value = []
      newPlanObstacles.value = []
      newPlanResources.value = []
      newPlanValues.value = []
    } catch (err) {
      console.log('Error adding documents', err)
    }
  }
}
// check if array contains object
const containsObject = (obj, list) => {
  var i
  for (i = 0; i < list.length; i++) {
    if (list[i].header == obj) {
      return true
    }
  }
  return false
}
// emit close
const close = () => {
  emit('close')
}
const emit = defineEmits(['close'])
</script>
