<template>
  <div class="wrapper">
    <div class="satisfactionDiv">
      <h1>Увлечения!</h1>
      <p>Увлечения</p>
      <MyRange :edit-enabled="false" :input-value="userData?.hobbies?.hobbies" />
      <p>Свободное время</p>
      <MyRange :edit-enabled="false" :input-value="userData?.hobbies?.freeTime" />

      <MyButton btn-style="edit" @click="editHobbies = !editHobbies" />
    </div>
    <div class="satisfactionDiv" v-if="editHobbies">
      <h1>Увлечения!</h1>
      <p>Увлечения</p>
      <MyRange :edit-enabled="true" :input-value="userData?.hobbies?.hobbies" ref="hobbies" />
      <p>Свободное время</p>
      <MyRange :edit-enabled="true" :input-value="userData?.hobbies?.freeTime" ref="freeTime" />
      <MyButton btn-style="save" @click="saveHobbies" />
    </div>
    <TimeCalc
      :time="userData?.hobbies?.time?.funTime"
      label="Занятия увлечением"
      :total="userData?.health?.time?.total"
      :auth="auth.auth"
      :user-data="userData"
      field="hobbies"
    />
    <MyButton btn-style="back" @click="router.push('profile')" />
  </div>
</template>

<script setup>
import MyButton from '@/components/MyButton.vue'
import MyRange from '@/components/MyRange.vue'
import TimeCalc from '@/components/self_development/TimeCalc.vue'
import { db } from '@/main'
import router from '@/router'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, toRefs } from 'vue'

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
// declare variables
const editHobbies = ref(false)
const hobbies = ref(Number)
const freeTime = ref(Number)

// declare functions
const saveHobbies = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const hobbiesRef = userData.value.hobbies
  const hobbiesInt = parseInt(hobbies.value.editableValue)
  const freeTimeInt = parseInt(freeTime.value.editableValue)

  if (hobbiesInt != hobbiesRef.hobbies || freeTimeInt != hobbiesRef.freeTime) {
    hobbiesRef.hobbies = hobbiesInt
    hobbiesRef.freeTime = freeTimeInt
    hobbiesRef.totalHobbies = (hobbiesInt + freeTimeInt) / 2

    try {
      await updateDoc(userRef, {
        hobbies: hobbiesRef,
      })
    } catch (err) {
      console.log('Error adding documents', err)
    }
  }
  editHobbies.value = !editHobbies.value
}
</script>

<style scoped>
.wrapper {
  padding: 1em;

  position: relative;
}
.satisfactionDiv {
  max-width: 25em;
  position: relative;
  padding-bottom: 3em;
}
</style>
