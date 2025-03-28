<template>
  <div class="wrapper">
    <div class="headerGrid">
      <div class="infoContainer">
        <h2>
          {{ userData?.username }}
        </h2>
        <MyButton v-if="!editPersonalInfo" btn-style="edit" @click="editInfo" />
        <MyButton
          v-if="editPersonalInfo"
          btn-style="cancelTop"
          @click="editPersonalInfo = !editPersonalInfo"
        />
        <div class="infoData">
          <div class="userImg"></div>
          <div>
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
          <p>
            Дата рождения: <input type="date" placeholder="Дата рождения" v-model="birthDate" />
          </p>
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
      </div>

      <UserStats :user-data="userData" />
    </div>

    <div class="block">
      <h2>
        Достижения<MyButton
          class="infoBtn"
          btn-style="info"
          @click="displayAchievementsInfo = !displayAchievementsInfo"
        />
      </h2>
      <div class="popUp" v-if="displayAchievementsInfo">
        <p>
          Достижения это результаты ваших действий и важная часть мотивации. Они помогают продолжать
          двигаться когда сложно.
        </p>
      </div>
      <div class="achievements">
        <UserAchievements :user-data="userData" />
      </div>
    </div>
    <div class="block">
      <h2>
        Сферы жизни<MyButton
          class="infoBtn"
          btn-style="info"
          @click="displayLifeFieldsInfo = !displayLifeFieldsInfo"
        />
      </h2>
      <div class="popUp" v-if="displayLifeFieldsInfo">
        <p>
          Жизнь почти каждого человека можно отоброзить и описать четырмя сферами. Они состовляют
          общую удовлитворительность жизни, помогают с принятием решений и выбором целей.
        </p>
      </div>
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
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from './MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import UserAchievements from './self_development/UserAchievements.vue'
import LifeField from './self_development/LifeField.vue'
import UserStats from './self_development/UserStats.vue'
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
const displayAchievementsInfo = ref(false)
const displayLifeFieldsInfo = ref(false)

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
.infoBtn {
  right: 0px;
}
h3 {
  border-bottom: 1px solid #10101022;
  padding-bottom: 3px;
  margin-bottom: 3px;
}
.infoContainer {
  position: relative;
}

.infoContainer h2 {
  margin: 0px;
}
.infoData {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: center;
}
.popUp {
  position: absolute;
  top: 3em;
  left: 0px;
  right: auto;
  margin-inline: inherit;
  max-width: 25em;
  text-align: start;
}
.block {
  position: relative;
}
.wrapper {
  position: relative;
  padding: 0em 1em;
}
.editInfoDiv {
  padding-bottom: 2em;
  max-width: 25em;
  position: relative;
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
  margin-bottom: auto;
  margin-top: 0.5em;
}
.infoBlock {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 0.5em;
  justify-content: start;
  align-items: center;
  border: none;
  padding: 0px;
}
.achievements {
  display: grid;
  grid-template-columns: auto auto;
}
.icon {
  height: 1.5em;
  width: 1.5em;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0.5em;
}
.lifeFieldsDiv {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1em;
}
.headerGrid {
  padding-top: 0.5em;
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
@media (min-width: 768px) {
  .lifeFieldsDiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
@media (min-width: 1024px) {
  .headerGrid {
    display: grid;
    grid-template-columns: 40% 50%;
    column-gap: 5%;
  }
}
</style>
