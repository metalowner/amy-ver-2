<template>
  <h2>Vision</h2>
  <p><input type="text" placeholder="Your motivating vision!" v-model="visionText" /></p>
  <MyButton btn-style="standard" btn-text="Save" @click="saveVision" />
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { onMounted, ref, toRefs } from 'vue'
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
// update vision from database
onMounted(() => {
  setTimeout(() => {
    visionText.value = userData.value.vision
  }, 3000)
})
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
