<template>
  <div class="valueCard">
    <h3>{{ header }}</h3>
    <p>{{ description }}</p>
    <p>Важность: {{ importance }}</p>
    <MyButton v-if="!valueEdit" btn-style="edit" @click="editValueDetails" />
    <MyButton v-if="valueEdit" btn-style="cancelTop" @click="valueEdit = !valueEdit" />
    <MyButton btn-style="delete" @click="deleteValue" />
    <MyButton
      v-if="property == 'obstacles'"
      btn-style="standard"
      btn-text="Справиться"
      @click="resolveObstacle"
    />
    <div class="editDiv" v-if="valueEdit">
      <p><input type="text" placeholder="Новый заголовок" v-model="newValueHeader" /></p>
      <p><input type="text" placeholder="Новое описания" v-model="newValueDescription" /></p>
      <MyCounter :max-value="10" label="Важность" :input-value="importance" ref="newImportance" />
      <MyButton btn-style="save" @click="saveValue" />
      <MyButton btn-style="cancelBottom" @click="valueEdit = !valueEdit" />
    </div>
  </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import MyCounter from '../MyCounter.vue'

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
const newImportance = ref(Number)
// define access to passed props
const { db, auth, userData, header, description, importance, index, property } = toRefs(props)
// edit function
const editValueDetails = () => {
  valueEdit.value = !valueEdit.value
  newValueHeader.value = header.value
  newValueDescription.value = description.value
}
// save function
const saveValue = async () => {
  const arrayName = property.value
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const valueRef = userData.value[arrayName][index.value]

  valueRef.header = newValueHeader.value
  valueRef.description = newValueDescription.value
  valueRef.importance = newImportance.value.editableValue
  try {
    await updateDoc(userRef, {
      [arrayName]: userData.value[arrayName],
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
  userData.value[arrayName].splice(index.value, 1)
  try {
    await updateDoc(userRef, {
      [arrayName]: userData.value[arrayName],
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
const resolveObstacle = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const arrayName = property.value
  const valueRef = userData.value[arrayName][index.value]

  userData.value.achievements.resolvedObstacles.push(valueRef)
  userData.value[arrayName].splice(index.value, 1)
  try {
    await updateDoc(userRef, {
      [arrayName]: userData.value[arrayName],
      achievements: userData.value.achievements,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>

<style scoped>
.valueCard {
  padding: 1em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
  margin-bottom: 1em;
  position: relative;
  padding-right: 3em;
  max-width: 25em;
}

h3 {
  border-bottom: 1px solid #10101044;
  padding-bottom: 3px;
  margin-bottom: 3px;
}

.editDiv {
  padding-bottom: 3em;
  border-top: 1px solid #10101011;
  margin-top: 1em;
  padding-top: 1em;
}
</style>
