<template>
  <div class="goalWrapper">
    <h3>{{ header }}</h3>
    <p class="goalDescription">{{ description }}</p>
    <h4 class="infoHeader">
      Сферы жизни <MyButton btn-style="arrowDown" @click="displayLifeFields = !displayLifeFields" />
    </h4>
    <div v-if="displayLifeFields" class="infoBlock">
      <p v-for="(lifeField, index) in lifeFields" :key="lifeField">
        {{ index + 1 }}. {{ lifeField }}
      </p>
    </div>
    <h4 class="infoHeader">
      Ценности <MyButton btn-style="arrowDown" @click="displayValues = !displayValues" />
    </h4>
    <div v-if="displayValues" class="infoBlock">
      <p v-for="(value, index) in values" :key="value">{{ index + 1 }}. {{ value }}</p>
    </div>
    <h4 class="infoHeader">
      Приоритетность
      <MyButton btn-style="arrowDown" @click="displayPriorities = !displayPriorities" />
    </h4>
    <div v-if="displayPriorities" class="infoBlock">
      <p>Важность: {{ importance }}</p>
      <p>Срочность: {{ urgency }}</p>
    </div>

    <MyButton btn-style="edit" @click="editGoalDetails" />
    <MyButton btn-style="delete" @click="deleteGoal" />
    <MyButton btn-style="standard" btn-text="Достичь" @click="achieveGoal" />
    <div class="editData" v-if="editGoal">
      <p><input type="text" placeholder="Новый заголовок" v-model="newGoalHeader" /></p>
      <p><input type="text" placeholder="Новое описания" v-model="newGoalDescription" /></p>
      <div class="counterDiv">
        <p>
          <MyCounter
            label="Срочность"
            :input-value="urgency"
            :max-value="10"
            ref="newGoalUrgency"
          />
        </p>
        <p>
          <MyCounter
            label="Важность"
            :input-value="importance"
            :max-value="10"
            ref="newGoalImportance"
          />
        </p>
      </div>
      <h4>Ценности</h4>
      <div class="checkboxDiv">
        <label v-for="value in userData.values" :key="value.header" class="container"
          >{{ value.header }}
          <input :value="value.header" type="checkbox" v-model="newGoalValues" />
          <span class="checkmark"></span>
        </label>
      </div>
      <MyButton btn-style="save" @click="saveGoal" />
    </div>
  </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import MyCounter from '../MyCounter.vue'

// declare component props
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
  urgency: {
    type: Number,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
  goalIndex: {
    type: Number,
    required: true,
  },
  lifeFields: {
    type: Array,
    required: true,
  },
})
// expose props
const { db, auth, userData, header, description, importance, urgency, values, goalIndex } =
  toRefs(props)
// declate variables
const editGoal = ref(false)
const newGoalHeader = ref('')
const newGoalDescription = ref('')
const newGoalUrgency = ref(Number)
const newGoalImportance = ref(Number)
const newGoalValues = ref([])
const displayValues = ref(false)
const displayLifeFields = ref(false)
const displayPriorities = ref(false)
// define methods
// delete function
const deleteGoal = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  userData.value.goals.splice(goalIndex.value, 1)
  try {
    await updateDoc(userRef, {
      goals: userData.value.goals,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// save function
const saveGoal = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const resourceRef = userData.value.goals[goalIndex.value]
  resourceRef.header = newGoalHeader.value
  resourceRef.description = newGoalDescription.value
  resourceRef.urgency = parseInt(newGoalUrgency.value.editableValue)
  resourceRef.importance = parseInt(newGoalImportance.value.editableValue)
  resourceRef.values = newGoalValues.value
  try {
    await updateDoc(userRef, {
      goals: userData.value.goals,
    })
    editGoal.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// edit goal
const editGoalDetails = () => {
  editGoal.value = !editGoal.value
  newGoalHeader.value = header.value
  newGoalDescription.value = description.value
  newGoalUrgency.value = urgency.value
  newGoalImportance.value = importance.value
  newGoalValues.value = values.value
}

const achieveGoal = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const resourceRef = userData.value.goals[goalIndex.value]
  userData.value.achievements.achievedGoals.push(resourceRef)
  userData.value.goals.splice(goalIndex.value, 1)

  try {
    await updateDoc(userRef, {
      goals: userData.value.goals,
      achievements: userData.value.achievements,
    })
    editGoal.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>

<style scoped>
h3 {
  border-bottom: 1px solid #10101044;
  padding-bottom: 3px;
  margin-bottom: 3px;
}

h4 {
  border-bottom: 1px solid #10101022;
  padding-bottom: 1em;
  padding-top: 1em;
}
.goalWrapper {
  padding: 1em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
  margin-bottom: 1em;
  position: relative;
  padding-right: 3em;
  padding-bottom: 3em;
  max-width: 25em;
}
.goalDescription {
  margin-bottom: 1em;
}
.editData {
  position: relative;
  padding-bottom: 3em;
  border-top: 1px solid #10101011;
  margin-top: 1em;
  padding-top: 1em;
  border-bottom: 1px solid #10101011;
}
.infoBlock {
  display: grid;
  grid-template-columns: auto auto;
  padding: 1em;
}
.infoHeader {
  position: relative;
}
</style>
