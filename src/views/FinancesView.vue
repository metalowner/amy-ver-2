<template>
  <div class="wrapper">
    <div class="satisfactionDiv">
      <h1>Финансы!</h1>
      <p>Доход</p>
      <MyRange :edit-enabled="false" :input-value="userData?.finances?.income" />
      <p>Коллектив</p>
      <MyRange :edit-enabled="false" :input-value="userData?.finances?.partners" />
      <p>Профессия</p>
      <MyRange :edit-enabled="false" :input-value="userData?.finances?.profession" />
      <p>Образования</p>
      <MyRange :edit-enabled="false" :input-value="userData?.finances?.education" />
      <p>График</p>
      <MyRange :edit-enabled="false" :input-value="userData?.finances?.schedule" />
      <MyButton btn-style="edit" @click="editFinances = !editFinances" />
    </div>
    <div class="satisfactionDiv" v-if="editFinances">
      <p>Доход</p>
      <MyRange :edit-enabled="true" :input-value="userData?.finances?.income" ref="income" />
      <p>Коллектив</p>
      <MyRange :edit-enabled="true" :input-value="userData?.finances?.partners" ref="partners" />
      <p>Профессия</p>
      <MyRange
        :edit-enabled="true"
        :input-value="userData?.finances?.profession"
        ref="profession"
      />
      <p>Образования</p>
      <MyRange :edit-enabled="true" :input-value="userData?.finances?.education" ref="education" />
      <p>График</p>
      <MyRange :edit-enabled="true" :input-value="userData?.finances?.schedule" ref="schedule" />
      <MyButton btn-style="save" @click="saveFinances" />
    </div>
    <TimeCalc
      :time="userData?.finances?.time?.work"
      label="Работа"
      :total="userData?.health?.time?.total"
      :auth="auth.auth"
      :user-data="userData"
      field="finances"
    />
    <TimeCalc
      :time="userData?.finances?.time?.education"
      label="Обучение"
      :total="userData?.health?.time?.total"
      :auth="auth.auth"
      :user-data="userData"
      field="finances"
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
const editFinances = ref(false)
const income = ref(Number)
const partners = ref(Number)
const profession = ref(Number)
const education = ref(Number)
const schedule = ref(Number)
// declare functions
const saveFinances = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const financesRef = userData.value.finances
  const incomeInt = parseInt(income.value.editableValue)
  const partnersInt = parseInt(partners.value.editableValue)
  const professionInt = parseInt(profession.value.editableValue)
  const educationInt = parseInt(education.value.editableValue)
  const scheduleInt = parseInt(schedule.value.editableValue)

  if (
    incomeInt != financesRef.income ||
    partnersInt != financesRef.partners ||
    professionInt != financesRef.profession ||
    educationInt != financesRef.education ||
    scheduleInt != financesRef.schedule
  ) {
    financesRef.income = incomeInt
    financesRef.partners = partnersInt
    financesRef.profession = professionInt
    financesRef.education = educationInt
    financesRef.schedule = scheduleInt
    financesRef.totalFinances =
      (incomeInt + partnersInt + professionInt + educationInt + scheduleInt) / 5

    try {
      await updateDoc(userRef, {
        finances: financesRef,
      })
    } catch (err) {
      console.log('Error adding documents', err)
    }
  }
  editFinances.value = !editFinances.value
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
