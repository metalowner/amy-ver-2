<template>
  <div class="goalWrapper">
    <div v-show="!editGoal">
      <h3>{{ header }}</h3>

      <MyButton
        btn-style="arrowUp"
        @click="displayGoalInfo = !displayGoalInfo"
        v-show="displayGoalInfo"
      />
      <MyButton
        btn-style="arrowDown"
        @click="displayGoalInfo = !displayGoalInfo"
        v-show="!displayGoalInfo"
      />
      <div class="goalInfo" v-show="displayGoalInfo">
        <p class="goalDescription">{{ description }}</p>
        <h4 class="infoHeader">Сферы жизни</h4>
        <div class="infoBlock">
          <p v-for="lifeField in lifeFields" :key="lifeField">
            {{ lifeField }}
          </p>
        </div>
        <h4 class="infoHeader">Ценности</h4>
        <div class="infoBlock">
          <p v-for="value in values" :key="value">{{ value }}</p>
        </div>
        <h4 class="infoHeader">Приоритетность</h4>
        <div class="infoBlock">
          <p>Важность: {{ importance }}</p>
          <p>Срочность: {{ urgency }}</p>
        </div>
      </div>
    </div>
    <MyButton btn-style="edit" @click="editGoalDetails" />
    <div class="editData" v-if="editGoal">
      <p><input type="text" placeholder="Новый заголовок" v-model="newGoalHeader" /></p>
      <p><input type="text" placeholder="Новое описания" v-model="newGoalDescription" /></p>
      <h4>Сферы жизни</h4>
      <div class="checkboxDiv">
        <label class="container"
          >Здоровье
          <input value="Здоровье" type="checkbox" v-model="newLifeFields" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Социум
          <input value="Социум" type="checkbox" v-model="newLifeFields" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Финансы
          <input value="Финансы" type="checkbox" v-model="newLifeFields" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Увлечения
          <input value="Увлечения" type="checkbox" v-model="newLifeFields" />
          <span class="checkmark"></span>
        </label>
      </div>
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
      <MyButton btn-style="delete" @click="deleteGoal" />
      <MyButton btn-style="complete" @click="achieveGoal" />
      <MyButton btn-style="cancelBottom" @click="editGoal = !editGoal" />
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
const {
  db,
  auth,
  userData,
  header,
  description,
  importance,
  urgency,
  values,
  goalIndex,
  lifeFields,
} = toRefs(props)
// declate variables
const editGoal = ref(false)
const newGoalHeader = ref('')
const newGoalDescription = ref('')
const newGoalUrgency = ref(Number)
const newGoalImportance = ref(Number)
const newGoalValues = ref([])
const newLifeFields = ref([])
const displayGoalInfo = ref(false)
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
  resourceRef.lifeFields = newLifeFields.value
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
  newLifeFields.value = lifeFields.value
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
h4 {
  text-align: center;
  background: #00bbbbff;
  margin-top: 1em;
  color: #fafaf2ff;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

p {
  text-align: center;
  opacity: 0.8;
}
.goalWrapper {
  padding: 1em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
  margin-bottom: 1em;
  position: relative;
  width: 100%;
}
.goalDescription {
  margin-bottom: 1em;
}
.editData {
  position: relative;
  padding-bottom: 3em;
  margin-top: 1em;
  padding-top: 1em;
}

.infoHeader {
  position: relative;
}
.goalInfo {
  margin-top: 2em;
}
</style>
