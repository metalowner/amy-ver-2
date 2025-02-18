<template>
  <h3>{{ header }}</h3>
  <p>{{ description }}</p>
  <p>Важность: {{ importance }}</p>
  <MyButton btn-style="standard" btn-text="Редактировать" @click="valueEdit = !valueEdit" />
  <MyButton btn-style="standard" btn-text="Удалить" @click="deleteValue" />
  <div v-if="valueEdit">
    <h3><input type="text" placeholder="Новый заголовок" v-model="newValueHeader" /></h3>
    <p><input type="text" placeholder="Новое описания" v-model="newValueDescription" /></p>
    <MyButton btn-style="standard" btn-text="Сохранить" @click="saveValue" />
  </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'

// define props
const props = defineProps({
  db: {
    type: Object,
    required: true,
  },
  auth: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  importance: {
    type: Number,
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
})
// declare variables
const valueEdit = ref(false)
const newValueHeader = ref('')
const newValueDescription = ref('')
// define access to passed props
const { db, auth, userData, header, description, importance, index, property } = toRefs(props)
// save function
const saveValue = async () => {
  const arrayName = property.value
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const valueRef = userData.value[arrayName][index.value]
  if (newValueHeader.value.length != '' && newValueDescription.value.length != '') {
    valueRef.header = newValueHeader.value
    valueRef.description = newValueDescription.value
  } else if (newValueHeader.value.length != '') {
    valueRef.header = newValueHeader.value
  } else {
    valueRef.description = newValueDescription.value
  }
  try {
    await updateDoc(userRef, {
      arrayName: userData.value[arrayName],
    })
    valueEdit.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// delete function
const deleteValue = async () => {
  const arrayName = property.value
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const newValuesArray = userData.value[arrayName].splice(index.value, 1)
  try {
    await updateDoc(userRef, {
      arrayName: newValuesArray,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>
