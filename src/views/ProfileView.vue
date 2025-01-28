<script setup>
import { db } from '@/main'
import PersonalInformation from '@/components/PersonalInformation.vue'
import { ref, toRefs } from 'vue'
import LifeStory from '@/components/self_development/LifeStory.vue'
import PersonalVision from '@/components/self_development/PersonalVision.vue'
import UserValue from '@/components/self_development/UserValue.vue'
import MyButton from '@/components/MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import UserObstacle from '@/components/self_development/UserObstacle.vue'
import UserResource from '@/components/self_development/UserResource.vue'
import UserGoal from '@/components/self_development/UserGoal.vue'

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

const { auth, userData } = toRefs(props)
// declare value variables
const addNewValue = ref(false)
const newValueHeader = ref('')
const newValueDescription = ref('')
// declare obstacle variables
const addNewObstacle = ref(false)
const newObstacleHeader = ref('')
const newObstacleDescription = ref('')
// declare resources variables
const addNewResource = ref(false)
const newResourceHeader = ref('')
const newResourceDescription = ref('')
// declare value methods
const saveNewValue = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newValueObject = {
    valueHeader: newValueHeader.value,
    valueDescription: newValueDescription.value,
    valueImportance: 1,
  }
  userData.value.values.push(newValueObject)
  try {
    await updateDoc(userRef, {
      values: userData.value.values,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// declare obstacle method
const saveNewObstacle = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newObstacleObject = {
    obstacleHeader: newObstacleHeader.value,
    obstacleDescription: newObstacleDescription.value,
    obstacleImportance: 1,
  }
  userData.value.obstacles.push(newObstacleObject)
  try {
    await updateDoc(userRef, {
      obstacles: userData.value.obstacles,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// declare resources methods
const saveNewResource = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newResourceObject = {
    resourceHeader: newResourceHeader.value,
    resourceDescription: newResourceDescription.value,
    resourceImportance: 1,
  }
  userData.value.resources.push(newResourceObject)
  try {
    await updateDoc(userRef, {
      resources: userData.value.resources,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>

<template>
  <h1>Profile</h1>
  <PersonalInformation :db="db" :auth="auth.auth" :userData="userData" />
  <LifeStory :db="db" :auth="auth.auth" :userData="userData" />
  <PersonalVision :db="db" :auth="auth.auth" :userData="userData" />
  <h2>Values</h2>
  <MyButton btn-style="standard" btn-text="Add value" @click="addNewValue = !addNewValue" />
  <div v-if="addNewValue">
    <h3><input type="text" placeholder="New value header" v-model="newValueHeader" /></h3>
    <p><input type="text" placeholder="New value description" v-model="newValueDescription" /></p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveNewValue" />
  </div>
  <UserValue
    v-for="(value, index) in userData?.values"
    :key="value.valueHeaer"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :value-index="index"
    :value-header="value.valueHeader"
    :value-description="value.valueDescription"
    :value-importance="value.valueImportance"
  />
  <h2>Obstacles</h2>
  <MyButton
    btn-style="standard"
    btn-text="Add obstacle"
    @click="addNewObstacle = !addNewObstacle"
  />
  <div v-if="addNewObstacle">
    <h3><input type="text" placeholder="New obstacle header" v-model="newObstacleHeader" /></h3>
    <p>
      <input type="text" placeholder="New obstacle description" v-model="newObstacleDescription" />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveNewObstacle" />
  </div>
  <UserObstacle
    v-for="(obstacle, index) in userData?.obstacles"
    :key="obstacle.obstacleHeader"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :obstacle-index="index"
    :obstacle-header="obstacle.obstacleHeader"
    :obstacle-description="obstacle.obstacleDescription"
    :obstacle-importance="obstacle.obstacleImportance"
  />
  <h2>Resources</h2>
  <MyButton
    btn-style="standard"
    btn-text="Add resource"
    @click="addNewResource = !addNewResource"
  />
  <div v-if="addNewResource">
    <h3><input type="text" placeholder="New resource header" v-model="newResourceHeader" /></h3>
    <p>
      <input type="text" placeholder="New resource description" v-model="newResourceDescription" />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveNewResource" />
  </div>
  <UserResource
    v-for="(resource, index) in userData?.resources"
    :key="resource.resourceHeader"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :resource-index="index"
    :resource-header="resource.resourceHeader"
    :resource-description="resource.resourceDescription"
    :resource-importance="resource.resourceImportance"
  />
  <h2>Goals</h2>
  <UserGoal
    v-for="(goal, index) in userData?.goals"
    :key="goal.goalHeader"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :goal-header="goal.goalHeader"
    :goal-description="goal.goalDescription"
    :goal-importance="goal.goalImportance"
    :goal-index="index"
    :goal-measures="goal.goalMeasures"
    :goal-price="goal.goalPrice"
    :goal-urgency="goal.goalUrgency"
    :goal-values="goal.goalValues"
  />
  <p>Plans:</p>
  <p>Actions:</p>
  <p>Business:</p>
</template>
