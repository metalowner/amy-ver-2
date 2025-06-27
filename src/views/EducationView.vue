<template>
  <div v-if="userData && auth?.auth?.currentUser?.uid" class="wrapper">
    <div v-if="checkEducation(userData?.education, auth?.auth?.currentUser?.uid)"></div>
    <div class="coursesList">
      <EducationMenu :user-data="userData" :auth="auth" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, toRefs } from 'vue'
import EducationMenu from '@/components/education/EducationMenu.vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'

const props = defineProps({
  auth: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
})
// expose props
const { auth, userData } = toRefs(props)

const checkEducation = async (data, userUid) => {
  await nextTick()
  if (data) {
    return true
  } else {
    console.log('not found')
    const userRef = doc(db, 'users', userUid)
    data = {
      progress: 0,
      lessons: [],
    }
    userData.value.education = {
      progress: 0,
      lessons: [],
    }
    try {
      await updateDoc(userRef, {
        education: data,
      })
    } catch (err) {
      console.log('Error adding documents', err)
    }
    return true
  }
}
</script>
