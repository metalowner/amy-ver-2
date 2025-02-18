<template>
  <h2>Видение идеальной жизни</h2>
  <h3>{{ userData?.vision }}</h3>
  <MyButton btn-style="standard" btn-text="Редактировать" @click="editVisionDetails" />
  <div v-if="editVision">
    <p><input type="text" placeholder="Мое мотивирующие видение" v-model="visionText" /></p>
    <MyButton btn-style="standard" btn-text="Сохранить" @click="saveVision" />
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
})
// define access to passed props
const { db, auth, userData } = toRefs(props)
// declare variables
const visionText = ref('')
const editVision = ref(false)
// edit function
const editVisionDetails = () => {
  editVision.value = !editVision.value
  visionText.value = userData.value.vision
}
// save function
const saveVision = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  try {
    await updateDoc(userRef, {
      vision: visionText.value,
    })
    userData.value.vision = visionText.value
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>
