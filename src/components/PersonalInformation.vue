<template>
  <h2>Username: {{ userData?.username }}</h2>
  <p>Date of birth: {{ userData?.dateOfBirth }}</p>
  <p>Age:</p>
  <p>Gender: {{ userData?.gender }}</p>
  <p>Relationship status: {{ userData?.relationshipStatus }}</p>
  <p>Country: {{ userData?.country }}</p>
  <p>Region: {{ userData?.region }}</p>
  <p>City: {{ userData?.city }}</p>
  <MyButton btn-style="standard" btn-text="Edit" @click="editInfo" />
  <div v-if="editPersonalInfo">
    <p><input type="text" placeholder="Username" v-model="username" /></p>
    <p><input type="date" placeholder="Birth date" v-model="birthDate" /></p>
    <select v-model="gender">
      <option disabled value="">Please select one</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
    <select v-model="relationship">
      <option disabled value="">Please select one</option>
      <option>Married</option>
      <option>In a relationship</option>
      <option>Not in a relationship</option>
    </select>
    <p><input type="text" placeholder="Country" v-model="country" /></p>
    <p><input type="text" placeholder="Region" v-model="region" /></p>
    <p><input type="text" placeholder="City" v-model="city" /></p>
    <MyButton btn-style="standard" btn-text="Save" @click="savePersonalInformation" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from './MyButton.vue'
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
})
// define access to passed props
const { db, auth, userData } = toRefs(props)
// define variables
const username = ref('')
const birthDate = ref(Date)
const gender = ref('')
const relationship = ref('')
const country = ref('')
const region = ref('')
const city = ref('')
const editPersonalInfo = ref(false)

const editInfo = () => {
  editPersonalInfo.value = !editPersonalInfo.value
  if (userData.value != {}) {
    username.value = userData.value.username
    birthDate.value = userData.value.dateOfBirth
    gender.value = userData.value.gender
    relationship.value = userData.value.relationshipStatus
    country.value = userData.value.country
    region.value = userData.value.region
    city.value = userData.value.city
  }
}

const savePersonalInformation = async () => {
  const userUid = auth.value.currentUser.uid
  try {
    await updateDoc(doc(db.value, 'users', userUid), {
      username: username.value,
      dateOfBirth: birthDate.value,
      gender: gender.value,
      relationshipStatus: relationship.value,
      country: country.value,
      region: region.value,
      city: city.value,
    })
    userData.value.username = username.value
    userData.value.dateOfBirth = birthDate.value
    userData.value.gender = gender.value
    userData.value.relationshipStatus = relationship.value
    userData.value.country = country.value
    userData.value.region = region.value
    userData.value.city = city.value
    editPersonalInfo.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>
