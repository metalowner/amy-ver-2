<template>
  <div class="innerBlock">
    <input type="text" placeholder="Заголовок цели" v-model="newGoalHeader" />
    <p><input type="text" placeholder="Описание цели" v-model="newGoalDescription" /></p>
    <h4>Сферы жизни</h4>
    <div class="checkboxDiv">
      <label class="container"
        >Здоровье
        <input value="Здоровье" type="checkbox" v-model="newGoalLifeFields" />
        <span class="checkmark"></span>
      </label>
      <label class="container"
        >Социум
        <input value="Социум" type="checkbox" v-model="newGoalLifeFields" />
        <span class="checkmark"></span>
      </label>
      <label class="container"
        >Финансы
        <input value="Финансы" type="checkbox" v-model="newGoalLifeFields" />
        <span class="checkmark"></span>
      </label>
      <label class="container"
        >Увлечения
        <input value="Увлечения" type="checkbox" v-model="newGoalLifeFields" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="counterDiv">
      <p>
        <MyCounter label="Срочность" :input-value="1" :max-value="10" ref="newGoalUrgency" />
      </p>
      <p>
        <MyCounter label="Важность" :input-value="1" :max-value="10" ref="newGoalImportance" />
      </p>
    </div>
    <h4>Ценности</h4>
    <div class="checkboxDiv">
      <label class="container" v-for="value in userData?.values" :key="value"
        >{{ value.header }}
        <input :value="value.header" type="checkbox" v-model="newGoalValues" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="btnsDiv">
      <MyButton btn-style="standard" btn-text="Сохранить" @click="saveGoal" />
      <MyButton btn-style="delete" btn-text="Отменить" @click="close()" />
    </div>
  </div>
</template>

<script setup>
import { db } from '@/main'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, toRefs } from 'vue'
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
})

const { userData, auth } = toRefs(props)

const newGoalHeader = ref('')
const newGoalDescription = ref('')
const newGoalValues = ref([])
const newGoalUrgency = ref(1)
const newGoalImportance = ref(1)
const newGoalLifeFields = ref([])

// save new goal
const saveGoal = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  if (newGoalHeader.value != '') {
    Swal.fire({ text: 'Нужуе заголовок!', buttonsStyling: false })
  } else if (containsObject(newGoalHeader.value, userData.value.goals) == false) {
    Swal.fire({ text: 'Такой заголовок уже есть!', buttonsStyling: false })
  } else {
    const newGoalObject = {
      header: newGoalHeader.value,
      description: newGoalDescription.value,
      lifeFields: newGoalLifeFields.value,
      urgency: parseInt(newGoalUrgency.value.editableValue),
      values: newGoalValues.value,
      importance: parseInt(newGoalImportance.value.editableValue),
    }
    userData.value.goals.push(newGoalObject)
    try {
      await updateDoc(userRef, {
        goals: userData.value.goals,
      })
      Swal.fire({ text: 'Цель успешно добавлена!', buttonsStyling: false })
      newGoalHeader.value = ''
      newGoalDescription.value = ''
      newGoalValues.value = []
      newGoalLifeFields.value = []
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
