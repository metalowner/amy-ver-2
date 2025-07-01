<template>
  <div>
    <div class="headerContainer">
      <div class="headerDiv">
        <MyButton btn-style="add" @click="addNewData()" />
        <h3 @click="displayBlock = !displayBlock">
          {{ header }}
        </h3>
        <MyButton btn-style="arrowDown" @click="displayBlock = !displayBlock" />
      </div>
      <div class="headerBtns">
        <MyButton
          btn-style="help"
          btn-text="?"
          @click="displayHelp = !displayHelp"
          v-if="dataType === 'values' || dataType === 'obstacles' || dataType === 'resources'"
        />
        <MyButton btn-style="lock" v-if="dataType === 'goals' || dataType === 'plans'" />
        <MyButton btn-style="info" btn-text="i" @click="displayDescription()" />
      </div>
    </div>
  </div>
  <div v-if="dataType === 'values' || dataType === 'obstacles' || dataType === 'resources'">
    <AddNewValue
      :user-data="userData"
      :auth="auth"
      @close="addNewData()"
      v-if="addNewValue"
      :data-type="dataType"
    />
  </div>
  <div v-if="dataType === 'goals'">
    <AddNewGoal
      :user-data="userData"
      :auth="auth"
      v-if="addNewGoal"
      :data-type="dataType"
      @close="addNewData()"
    />
  </div>
  <div v-if="dataType === 'plans'">
    <AddNewPlan
      :user-data="userData"
      :auth="auth"
      v-if="addNewPlan"
      :data-type="dataType"
      :new-start="newPlanStartDate"
      :new-time="newPlanTimeObject"
      @close="addNewData()"
    />
  </div>
</template>

<script setup>
import moment from 'moment'
import { ref, toRefs } from 'vue'
import MyButton from './MyButton.vue'
import AddNewValue from './self_development/AddNewValue.vue'
import AddNewGoal from './self_development/AddNewGoal.vue'
import AddNewPlan from './self_development/AddNewPlan.vue'
import Swal from 'sweetalert2'

const props = defineProps({
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
  dataType: {
    type: String,
    required: true,
  },
})

const { auth, userData, dataType, description, header } = toRefs(props)
const addNewValue = ref(false)
const displayBlock = ref(false)
const displayHelp = ref(false)
// declare info variables
const displayDescription = () => {
  Swal.fire({
    title: header.value,
    text: description.value,
    buttonsStyling: false,
    confirmButtonText: 'Понятно',
  })
}
// declare goal variables
const addNewGoal = ref(false)

// declare plan variables
const addNewPlan = ref(false)
const newPlanStartDate = ref(Date)
const newPlanTimeObject = ref({})
// add new data function
const addNewData = () => {
  if (dataType.value === 'goals') {
    addNewGoal.value = !addNewGoal.value
  } else if (dataType.value === 'plans') {
    addNewPlan.value = !addNewPlan.value
    newPlanStartDate.value = moment().format('YYYY-MM-DD')
    newPlanTimeObject.value = {
      repetition: 'daily',
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
    }
  } else {
    addNewValue.value = !addNewValue.value
  }
}
// expose to parent
defineExpose({ displayBlock, displayHelp })
</script>

<style scoped>
.headerDiv {
  display: grid;
  grid-template-columns: 2em 10em auto;
  column-gap: 1em;
  max-width: 13em;
  align-items: center;
}
.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headerBtns {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1em;
}
</style>
