<template>
  <div class="card">
    <div v-show="!editGoal">
      <div class="cardInfoContainer">
        <div>
          <div class="headerDiv">
            <h3>{{ header }}</h3>
            <div class="description">
              <p>{{ description }}</p>
            </div>
          </div>
          <div class="infoContainer">
            <h4>Сферы жизни</h4>
            <div class="infoBlock description">
              <p v-for="lifeField in lifeFields" :key="lifeField">
                {{ lifeField }}
              </p>
            </div>
          </div>

          <h4>Ценности</h4>
          <div class="infoBlock description">
            <p v-for="value in values" :key="value">{{ value }}</p>
          </div>
        </div>
        <div class="cardInfoColor">
          <div class="importanceDiv">
            <p class="importanceLabel">Важность</p>
            <p class="importance">{{ importance }}</p>
          </div>
          <div class="urgencyDiv">
            <p class="urgencyLabel">Срочность</p>
            <p class="urgency">{{ urgency }}</p>
          </div>
          <MyButton
            btn-style="editWhite"
            @click="editGoalDetails"
            class="editBtn"
            v-if="!displayGoalInfo"
          />
        </div>
      </div>
    </div>
    <MyButton btn-style="edit" @click="editGoalDetails" class="editBtn" v-if="displayGoalInfo" />
    <div>
      <div class="editData" v-if="editGoal">
        <MyButton btn-style="edit" @click="editGoalDetails" class="editBtn" />
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
        <div class="btnsDiv">
          <MyButton btn-style="standard" btn-text="Сохранить" @click="saveGoal" />
          <MyButton btn-style="delete" btn-text="Удалить" @click="deleteGoal" />
        </div>
        <div class="btnsDiv">
          <MyButton btn-style="complete" btn-text="Завершить" @click="achieveGoal" />
          <MyButton btn-style="cancelBottom" @click="editGoal = !editGoal" />
        </div>
      </div>
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
  displayGoalInfo.value = false
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
.editData {
  position: relative;
  padding: 2em 0.5em;
  margin-bottom: 0.5em;
}

.infoContainer,
.infoBlock {
  padding: 0.5em 0em;
}
</style>
