<template>
  <h2>Имя: {{ userData?.username }}</h2>
  <p>Дата рождения: {{ userData?.dateOfBirth }}</p>
  <p>Пол: {{ userData?.gender }}</p>
  <p>Отношения: {{ userData?.relationshipStatus }}</p>
  <p>Страна: {{ userData?.country }}</p>
  <p>Область: {{ userData?.region }}</p>
  <p>Город: {{ userData?.city }}</p>
  <MyButton btn-style="standard" btn-text="Редактировать" @click="editInfo" />
  <div v-if="editPersonalInfo">
    <p><input type="text" placeholder="Имя" v-model="username" /></p>
    <p>Дата рождения: <input type="date" placeholder="Дата рождения" v-model="birthDate" /></p>
    <p>
      Пол:
      <select v-model="gender">
        <option disabled value="">Выберите один</option>
        <option>Мужчина</option>
        <option>Женщина</option>
        <option>Другое</option>
      </select>
    </p>
    <p>
      Отношения:
      <select v-model="relationship">
        <option disabled value="">Выберите один</option>
        <option>Женат \ Замужем</option>
        <option>В отношениях</option>
        <option>Не в отношениях</option>
      </select>
    </p>
    <p>Страна: <input type="text" placeholder="Страна" v-model="country" /></p>
    <p>Регион: <input type="text" placeholder="Регион" v-model="region" /></p>
    <p>Город: <input type="text" placeholder="Город" v-model="city" /></p>
    <MyButton btn-style="standard" btn-text="Сохранить" @click="savePersonalInformation" />
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
