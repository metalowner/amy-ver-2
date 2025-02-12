<script setup>
import { db } from '@/main'
import PersonalInformation from '@/components/PersonalInformation.vue'
import { ref, toRefs } from 'vue'
import LifeStory from '@/components/self_development/LifeStory.vue'
import PersonalVision from '@/components/self_development/PersonalVision.vue'
import UserValue from '@/components/self_development/UserValue.vue'
import MyButton from '@/components/MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import UserGoal from '@/components/self_development/UserGoal.vue'
import UserPlan from '@/components/self_development/UserPlan.vue'

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
// declare goal variables
const addNewGoal = ref(false)
const newGoalHeader = ref('')
const newGoalDescription = ref('')

// declare simple value save methods
const saveNewValue = async (array, newHeader, newDescription) => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newValueObject = {
    header: newHeader,
    description: newDescription,
    importance: 1,
  }
  userData.value[array].push(newValueObject)
  try {
    await updateDoc(userRef, {
      [array]: userData.value[array],
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}

// declate goal method
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
    <MyButton
      btn-style="standard"
      btn-text="Save"
      @click="saveNewValue('values', newValueHeader, newValueDescription)"
    />
  </div>
  <UserValue
    v-for="(value, index) in userData?.values"
    :key="value.header"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :index="index"
    :header="value.header"
    :description="value.description"
    :importance="value.importance"
    property="values"
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
    <MyButton
      btn-style="standard"
      btn-text="Save"
      @click="saveNewValue('obstacles', newObstacleHeader, newObstacleDescription)"
    />
  </div>
  <UserValue
    v-for="(obstacle, index) in userData?.obstacles"
    :key="obstacle.header"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :index="index"
    :header="obstacle.header"
    :description="obstacle.description"
    :importance="obstacle.importance"
    property="obstacles"
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
    <MyButton
      btn-style="standard"
      btn-text="Save"
      @click="saveNewValue('resources', newResourceHeader, newResourceDescription)"
    />
  </div>
  <UserValue
    v-for="(resource, index) in userData?.resources"
    :key="resource.header"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :index="index"
    :header="resource.header"
    :description="resource.description"
    :importance="resource.importance"
    property="resources"
  />
  <h2>Goals</h2>
  <MyButton btn-style="standard" btn-text="Add new goal" @click="addNewGoal = !addNewGoal" />
  <div v-if="addNewGoal">
    <h3><input type="text" placeholder="Goal Header" v-model="newGoalHeader" /></h3>
    <p><input type="text" placeholder="Goal description" v-model="newGoalDescription" /></p>
  </div>
  <UserGoal
    v-for="(goal, index) in userData?.goals"
    :key="goal.header"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :header="goal.header"
    :description="goal.description"
    :importance="goal.importance"
    :goal-index="index"
    :measures="goal.measures"
    :prices="goal.prices"
    :urgency="goal.urgency"
    :values="goal.values"
  />
  <h2>Plans</h2>
  <UserPlan
    v-for="(plan, index) in userData?.plans"
    :key="plan.header"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :header="plan.header"
    :importance="plan.importance"
    :plan-index="index"
    :urgency="plan.urgency"
    :values="plan.values"
    :start-date="plan.startDate"
    :deadline="plan.deadline"
    :goals="plan.goals"
    :obstacles="plan.obstacles"
    :resources="plan.resources"
  />
  <p>Plans:</p>
  <p>Actions:</p>
  <p>Business:</p>
</template>
