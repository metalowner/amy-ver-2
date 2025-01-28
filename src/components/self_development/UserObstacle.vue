<template>
  <h3>{{ obstacleHeader }}</h3>
  <p>{{ obstacleDescription }}</p>
  <p>{{ obstacleImportance }}</p>
  <MyButton btn-style="standard" btn-text="Edit" @click="editObstacle = !editObstacle" />
  <MyButton btn-style="standard" btn-text="Delete" @click="deleteObstacle" />
  <div v-if="editObstacle">
    <h3><input type="text" placeholder="New obstacle header" v-model="newObstacleHeader" /></h3>
    <p>
      <input type="text" placeholder="New obstacle description" v-model="newObstacleDescription" />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveObstacle" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'

// define props
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
  obstacleIndex: {
    type: Number,
    required: true,
  },
  obstacleHeader: {
    type: String,
    required: true,
  },
  obstacleDescription: {
    type: String,
    required: true,
  },
  obstacleImportance: {
    type: Number,
    required: true,
  },
})
// define access to passed props
const {
  db,
  auth,
  userData,
  obstacleIndex,
  obstacleHeader,
  obstacleDescription,
  obstacleImportance,
} = toRefs(props)
// declare variables
const editObstacle = ref(false)
const newObstacleHeader = ref('')
const newObstacleDescription = ref('')
// define methods
// delete function
const deleteObstacle = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const newObstaclesArray = userData.value.obstacles.splice(obstacleIndex.value, 1)
  try {
    await updateDoc(userRef, {
      obstacles: newObstaclesArray,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// save function
const saveObstacle = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const obstacleRef = userData.value.obstacles[obstacleIndex.value]
  if (newObstacleHeader.value.length != '' && newObstacleDescription.value.length != '') {
    obstacleRef.obstacleHeader = newObstacleHeader.value
    obstacleRef.valueDescription = newObstacleDescription.value
  } else if (newObstacleHeader.value.length != '') {
    obstacleRef.obstacleHeader = newObstacleHeader.value
  } else {
    obstacleRef.obstacleDescription = newObstacleDescription.value
  }
  try {
    await updateDoc(userRef, {
      obstacles: userData.value.obstacles,
    })
    editObstacle.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>
