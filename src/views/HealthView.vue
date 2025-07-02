<template>
  <div class="wrapper">
    <div class="satisfactionDiv">
      <h1>Здоровье!</h1>
      <div class="block">
        <p>Физическое здоровье</p>
        <MyRange
          :max-value="100"
          :input-value="userData?.health?.physicalHealth"
          :edit-enabled="false"
        />
      </div>
      <div class="block">
        <p>Эмоциональное здоровье</p>
        <MyRange
          :max-value="100"
          :input-value="userData?.health?.emotionalHealth"
          :edit-enabled="false"
        />
      </div>
      <MyButton btn-style="edit" @click="editHealthData" />
      <div class="block" v-if="editHealth">
        <p>Физическое здоровье</p>
        <MyRange
          :max-value="100"
          :edit-enabled="true"
          :input-value="userData?.health?.physicalHealth"
          ref="physicalHealth"
        />
        <p>Эмоциональное здоровье</p>
        <MyRange
          :max-value="100"
          :edit-enabled="true"
          :input-value="userData?.health?.emotionalHealth"
          ref="emotionalHealth"
        />
        <MyButton btn-style="save" @click="saveHealth" />
      </div>
      <TimeCalc
        :time="userData?.health?.time?.sleep"
        label="Сон"
        :total="userData?.health?.time?.total"
        :auth="auth.auth"
        :user-data="userData"
        field="health"
      />
    </div>

    <MyButton btn-style="back" @click="router.push('profile')" />
  </div>
</template>

<script setup>
import router from '@/router'
import MyButton from '@/components/MyButton.vue'
import { ref, toRefs } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import MyRange from '@/components/MyRange.vue'
import TimeCalc from '@/components/self_development/TimeCalc.vue'

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
// declare props
const editHealth = ref(false)
const physicalHealth = ref(Number)
const emotionalHealth = ref(Number)
// declare functions
const editHealthData = () => {
  editHealth.value = !editHealth.value
}
const saveHealth = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const physicalInt = parseInt(physicalHealth.value.editableValue)
  const emotionalInt = parseInt(emotionalHealth.value.editableValue)

  if (
    userData.value.health.physicalHealth != physicalInt ||
    userData.value.health.emotionalHealth != emotionalInt
  ) {
    userData.value.health.physicalHealth = physicalInt
    userData.value.health.emotionalHealth = emotionalInt
    const healthMath = parseInt((physicalInt + emotionalInt) / 2)

    userData.value.health.totalHealth = healthMath
  }

  try {
    await updateDoc(userRef, {
      health: userData.value.health,
    })
    editHealth.value = !editHealth.value
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>

<style scoped>
p {
  text-align: center;
}
.satisfactionDiv {
  max-width: 25em;
  position: relative;
  padding-bottom: 3em;
}
input[type='number'] {
  max-width: 5em;
}
</style>
