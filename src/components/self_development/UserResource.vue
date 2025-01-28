<template>
  <h3>{{ resourceHeader }}</h3>
  <p>{{ resourceDescription }}</p>
  <p>{{ resourceImportance }}</p>
  <MyButton btn-style="standard" btn-text="Edit" @click="editResource = !editResource" />
  <MyButton btn-style="standard" btn-text="Delete" @click="deleteResource" />
  <div v-if="editResource">
    <h3><input type="text" placeholder="New resource header" v-model="newResourceHeader" /></h3>
    <p>
      <input type="text" placeholder="New resource description" v-model="newResourceDescription" />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveResource" />
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
  resourceIndex: {
    type: Number,
    required: true,
  },
  resourceHeader: {
    type: String,
    required: true,
  },
  resourceDescription: {
    type: String,
    required: true,
  },
  resourceImportance: {
    type: Number,
    required: true,
  },
})
// define access to passed props
const {
  db,
  auth,
  userData,
  resourceIndex,
  resourceHeader,
  resourceDescription,
  resourceImportance,
} = toRefs(props)
// declare variables
const editResource = ref(false)
const newResourceHeader = ref('')
const newResourceDescription = ref('')
// define methods
// delete function
const deleteResource = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const newResourcesArray = userData.value.resources.splice(resourceIndex.value, 1)
  try {
    await updateDoc(userRef, {
      resources: newResourcesArray,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// save function
const saveResource = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const resourceRef = userData.value.obstacles[resourceIndex.value]
  if (newResourceHeader.value.length != '' && newResourceDescription.value.length != '') {
    resourceRef.resourceHeader = newResourceHeader.value
    resourceRef.resourceDescription = newResourceDescription.value
  } else if (newResourceHeader.value.length != '') {
    resourceRef.resourceHeader = newResourceHeader.value
  } else {
    resourceRef.resourceDescription = newResourceDescription.value
  }
  try {
    await updateDoc(userRef, {
      resources: userData.value.resources,
    })
    editResource.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>
