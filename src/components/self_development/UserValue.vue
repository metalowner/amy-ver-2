<template>
  <h3>{{ valueHeader }}</h3>
  <p>{{ valueDescription }}</p>
  <p>{{ valueImportance }}</p>
  <MyButton btn-style="standard" btn-text="Edit" @click="valueEdit = !valueEdit" />
  <MyButton btn-style="standard" btn-text="Delete" @click="deleteValue" />
  <div v-if="valueEdit">
    <h3><input type="text" placeholder="New value header" v-model="newValueHeader" /></h3>
    <p><input type="text" placeholder="New value description" v-model="newValueDescription" /></p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveValue" />
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
  valueIndex: {
    type: Number,
    required: true,
  },
  valueHeader: {
    type: String,
    required: true,
  },
  valueDescription: {
    type: String,
    required: true,
  },
  valueImportance: {
    type: Number,
    required: true,
  },
})
// declare variables
const valueEdit = ref(false)
const newValueHeader = ref('')
const newValueDescription = ref('')
// define access to passed props
const { db, auth, userData, valueIndex, valueHeader, valueDescription, valueImportance } =
  toRefs(props)
// save function
const saveValue = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const valueRef = userData.value.values[valueIndex.value]
  if (newValueHeader.value.length != '' && newValueDescription.value.length != '') {
    valueRef.valueHeader = newValueHeader.value
    valueRef.valueDescription = newValueDescription.value
  } else if (newValueHeader.value.length != '') {
    valueRef.valueHeader = newValueHeader.value
  } else {
    valueRef.valueDescription = newValueDescription.value
  }
  try {
    await updateDoc(userRef, {
      values: userData.value.values,
    })
    valueEdit.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// delete function
const deleteValue = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const newValuesArray = userData.value.values.splice(valueIndex.value, 1)
  try {
    await updateDoc(userRef, {
      values: newValuesArray,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>
