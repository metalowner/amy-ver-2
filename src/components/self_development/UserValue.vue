<template>
  <div class="card">
    <div class="cardInfoContainer" v-show="!valueEdit">
      <div>
        <h3>{{ header }}</h3>
        <div class="valueInfo description">
          <p>{{ description }}</p>
        </div>
        <div class="descriptionFiller" v-if="description.length < 1"></div>
      </div>

      <div class="cardInfoColor">
        <div class="importanceDiv">
          <p class="importanceLabel">Важность</p>
          <p class="importance">{{ importance }}</p>
        </div>
      </div>
    </div>

    <MyButton v-if="!valueEdit" btn-style="editWhite" @click="editValueDetails" class="editBtn" />
    <MyButton v-if="valueEdit" btn-style="edit" @click="editValueDetails" class="editBtn" />
    <div class="editDiv" v-show="valueEdit">
      <p><input type="text" placeholder="Новый заголовок" v-model="newValueHeader" /></p>
      <textarea
        type="text"
        placeholder="Описания"
        v-model="newValueDescription"
        ref="valuesTextarea"
        @input="adjustHeight"
      ></textarea>
      <MyCounter :max-value="10" label="Важность" :input-value="importance" ref="newImportance" />
      <div class="btnsDiv">
        <MyButton btn-style="standard" btn-text="Сохранить" @click="saveValue" />
        <MyButton btn-style="delete" btn-text="Удалить" @click="deleteValue" />
      </div>
      <div class="btnsDiv">
        <MyButton
          v-if="property == 'obstacles'"
          btn-style="complete"
          btn-text="Завершить"
          @click="resolveObstacle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { nextTick, ref, toRefs, useTemplateRef } from 'vue'
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
const editValueDetails = async () => {
  valueEdit.value = !valueEdit.value
  newValueHeader.value = header.value
  newValueDescription.value = description.value
  await nextTick()
  adjustHeight()
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
// adjust input height
const valuesTextareaRef = useTemplateRef('valuesTextarea')

const adjustHeight = () => {
  valuesTextareaRef.value.style.height = 'auto'
  valuesTextareaRef.value.style.height = `${valuesTextareaRef.value.scrollHeight}px`
}
</script>

<style scoped>
.editDiv {
  padding-top: 2em;
}
.descriptionFiller {
  height: 2em;
}
</style>
