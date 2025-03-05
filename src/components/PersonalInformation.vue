<template>
  <div class="wrapper">
    <div class="infoContainer">
      <div class="userImg"></div>
      <div>
        <h2>{{ userData?.username }}</h2>
        <div class="infoBlock">
          <div class="icon birthday"></div>
          <p>{{ userData?.dateOfBirth }}</p>
        </div>
        <div class="infoBlock">
          <div class="icon" :class="userData?.gender"></div>
          <p>{{ userData?.relationshipStatus }}</p>
        </div>
        <div class="infoBlock">
          <div class="icon profession"></div>
          <p>{{ userData?.profession }}</p>
        </div>
        <div class="infoBlock">
          <div class="icon location"></div>
          <p>{{ userData?.country }}, {{ userData?.region }}, {{ userData?.city }}</p>
        </div>
      </div>
    </div>
    <div class="editInfoDiv" v-if="editPersonalInfo">
      <p>Имя: <input type="text" placeholder="Имя" v-model="username" /></p>
      <p>Дата рождения: <input type="date" placeholder="Дата рождения" v-model="birthDate" /></p>
      <p>
        Пол:
        <select v-model="gender">
          <option disabled value="">Выберите один</option>
          <option value="male">Мужчина</option>
          <option value="female">Женщина</option>
          <option value="bigender">Бигендер</option>
          <option value="androgyne">Андрогин</option>
          <option value="neutrois">Агендер</option>
          <option value="genderless">Бесгендер</option>
          <option value="intergender">Интергендер</option>
          <option value="demiboy">Демибой</option>
          <option value="demigirl">Демигирл</option>
          <option value="third_gender">Третий гендер</option>
          <option value="non_binary">Недвоичный</option>
          <option value="poligender">Полигендер</option>
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
      <p>Профессия: <input type="text" placeholder="" v-model="profession" /></p>
      <p>Страна: <input type="text" placeholder="Страна" v-model="country" /></p>
      <p>Регион: <input type="text" placeholder="Регион" v-model="region" /></p>
      <p class="lastStroke">Город: <input type="text" placeholder="Город" v-model="city" /></p>
      <MyButton btn-style="save" @click="savePersonalInformation" />
      <MyButton btn-style="cancelBottom" @click="editPersonalInfo = !editPersonalInfo" />
    </div>
    <h2>Достижения</h2>
    <div class="achievements">
      <UserAchievement
        v-for="(achievement, index) in userData?.achievements"
        :key="achievement.header"
        :header="achievement.header"
        :description="achievement.description"
        :score="achievement.score"
        :achievement-index="index"
        achievement-icon="badge"
      />
    </div>
    <h2>Сферы жизни</h2>
    <div class="lifeFieldsDiv">
      <LifeField
        name="Здоровье"
        route-name="health"
        field-icon="health"
        background="green"
        :satisfaction="userData?.health?.totalHealth"
      />
      <LifeField
        name="Социум"
        route-name="social"
        field-icon="social"
        background="blue"
        :satisfaction="userData?.social?.totalSocial"
      />
      <LifeField
        name="Финансы"
        route-name="finances"
        field-icon="finances"
        background="red"
        :satisfaction="userData?.finances?.totalFinances"
      />
      <LifeField
        name="Увлечения"
        route-name="hobbies"
        field-icon="hobbies"
        background="yellow"
        :satisfaction="userData?.hobbies?.totalHobbies"
      />
    </div>
    <MyButton v-if="!editPersonalInfo" btn-style="edit" @click="editInfo" />
    <MyButton
      v-if="editPersonalInfo"
      btn-style="cancelTop"
      @click="editPersonalInfo = !editPersonalInfo"
    />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from './MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import UserAchievement from './self_development/UserAchievement.vue'
import LifeField from './self_development/LifeField.vue'
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
const profession = ref('')
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
    profession.value = userData.value.profession
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
      profession: profession.value,
      country: country.value,
      region: region.value,
      city: city.value,
    })
    userData.value.username = username.value
    userData.value.dateOfBirth = birthDate.value
    userData.value.gender = gender.value
    userData.value.relationshipStatus = relationship.value
    userData.value.profession = profession.value
    userData.value.country = country.value
    userData.value.region = region.value
    userData.value.city = city.value
    editPersonalInfo.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>

<style scoped>
h3 {
  border-bottom: 1px solid #10101022;
  padding-bottom: 3px;
  margin-bottom: 3px;
}
.wrapper {
  position: relative;
  border-radius: 5px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.editInfoDiv {
  padding-bottom: 2em;
}
.userImg {
  border-radius: 5px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  background-image: url(../assets/incognito.svg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 8em;
  height: 8em;
  margin-right: 1em;
}
.infoContainer {
  display: flex;
  align-items: center;
}
.infoBlock {
  display: flex;
  justify-content: start;
  align-items: center;
}
.achievements {
  display: grid;
  grid-template-columns: auto auto;
}
.icon {
  height: 1.5em;
  width: 1.5em;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0.5em;
}

.lastStroke {
  margin-bottom: 1em;
}
.birthday {
  background-image: url(../assets/birthday.svg);
}
.location {
  background-image: url(../assets/location.svg);
}
.profession {
  background-image: url(../assets/profession.svg);
}
.male {
  background-image: url(../assets/male.svg);
}
.female {
  background-image: url(../assets/female.svg);
}
.bigender {
  background-image: url(../assets/bigender.svg);
}
.androgyne {
  background-image: url(../assets/androgyne.svg);
}
.neutrois {
  background-image: url(../assets/neutrois.svg);
}
.genderless {
  background-image: url(../assets/genderless.svg);
}
.intergender {
  background-image: url(../assets/intergender.svg);
}
.demiboy {
  background-image: url(../assets/demiboy.svg);
}
.demigirl {
  background-image: url(../assets/demigirl.svg);
}
.non_binary {
  background-image: url(../assets/non_binary.svg);
}
.third_gender {
  background-image: url(../assets/third_gender.svg);
}
.poligender {
  background-image: url(../assets/poligender.svg);
}
@media (min-width: 1024px) {
  .lifeFieldsDiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
