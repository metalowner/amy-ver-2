<template>
  <div class="lifeStoryWrapper" v-if="userData && auth?.currentUser?.uid">
    <div v-if="checkLifeStory(userData?.lifeStory, auth?.currentUser?.uid)"></div>
    <div class="infoHeader">
      <div class="lifeStoryHeader">
        <h2 @click="displayLifeStoryContent = !displayLifeStoryContent">История жизни</h2>
        <MyButton
          class="toLeft"
          btn-style="arrowDown"
          @click="displayLifeStoryContent = !displayLifeStoryContent"
          v-if="!displayLifeStoryContent"
        />
        <MyButton
          class="toLeft"
          btn-style="arrowUp"
          @click="displayLifeStoryContent = !displayLifeStoryContent"
          v-if="displayLifeStoryContent"
        />
      </div>
      <MyButton btn-style="info" btn-text="i" @click="displayLifeStoryInfo()" />
    </div>

    <div class="lifeStoryContent" v-if="displayLifeStoryContent">
      <div>
        <h3>Детство ~ 0 - 12</h3>
        <p class="description">
          Время полное эмоций, когда мы активнее всего развиваемся и учимся взаимодействовать с
          окружающим миром. Время, когда активно впитываются впечатления и начинают формироваться
          черты характера.
        </p>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваше здоровье в детстве"
            :input-text="userData?.lifeStory?.childhood?.health"
            header="Здоровье"
            :user-data="userData"
            :auth="auth"
            period="childhood"
            field="health"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши отношения в детстве, скорее всего, в основном с семьёй"
            :input-text="userData?.lifeStory?.childhood?.social"
            header="Социум"
            :user-data="userData"
            :auth="auth"
            period="childhood"
            field="social"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите вашу взаимосвязь с финансами в детстве, если была"
            :input-text="userData?.lifeStory?.childhood?.finances"
            header="Финансы"
            :user-data="userData"
            :auth="auth"
            period="childhood"
            field="finances"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши увлечения в детстве"
            :input-text="userData?.lifeStory?.childhood?.hobbies"
            header="Увлечения"
            :user-data="userData"
            :auth="auth"
            period="childhood"
            field="hobbies"
          />
        </div>
      </div>
      <div>
        <h3>Подростковый период ~ 13 - 17</h3>
        <p class="description">
          Время созревания, сопровождаемое множеством изменений, эксперементов и социального
          развития.
        </p>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваше здоровье в подростковом периоде"
            :input-text="userData?.lifeStory?.teenage?.health"
            header="Здоровье"
            :user-data="userData"
            :auth="auth"
            period="teenage"
            field="health"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши отношения в подростковом периоде"
            :input-text="userData?.lifeStory?.teenage?.social"
            header="Социум"
            :user-data="userData"
            :auth="auth"
            period="teenage"
            field="social"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваше финансы в подростковом периоде"
            :input-text="userData?.lifeStory?.teenage?.finances"
            header="Финансы"
            :user-data="userData"
            :auth="auth"
            period="teenage"
            field="finances"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши увлечения в подростковом периоде"
            :input-text="userData?.lifeStory?.teenage?.hobbies"
            header="Увлечения"
            :user-data="userData"
            :auth="auth"
            period="teenage"
            field="hobbies"
          />
        </div>
      </div>
      <div>
        <h3>Переходная взрослость ~ 18 - 24</h3>
        <p class="description">Время взросления, когда закрепляются ценности и характер.</p>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваше здоровье в периоде переходной взрослости"
            :input-text="userData?.lifeStory?.earlyAdolescence?.health"
            header="Здоровье"
            :user-data="userData"
            :auth="auth"
            period="earlyAdolescence"
            field="health"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши отношения в периоде переходной взрослости"
            :input-text="userData?.lifeStory?.earlyAdolescence?.social"
            header="Социум"
            :user-data="userData"
            :auth="auth"
            period="earlyAdolescence"
            field="social"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши финансы в периоде переходной взрослости"
            :input-text="userData?.lifeStory?.earlyAdolescence?.finances"
            header="Финансы"
            :user-data="userData"
            :auth="auth"
            period="earlyAdolescence"
            field="finances"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши увлечения в периоде переходной взрослости"
            :input-text="userData?.lifeStory?.earlyAdolescence?.hobbies"
            header="Увлечения"
            :user-data="userData"
            :auth="auth"
            period="earlyAdolescence"
            field="hobbies"
          />
        </div>
      </div>
      <div>
        <h3>Взрослость ~ 25+</h3>
        <p class="description">Время действий, когда характер и ценности уже закрепились.</p>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваше здоровье в периоде взрослости"
            :input-text="userData?.lifeStory?.adolescence?.health"
            header="Здоровье"
            :user-data="userData"
            :auth="auth"
            period="adolescence"
            field="health"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши отношения в периоде взрослости"
            :input-text="userData?.lifeStory?.adolescence?.social"
            header="Социум"
            :user-data="userData"
            :auth="auth"
            period="adolescence"
            field="social"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши финансы в периоде взрослости"
            :input-text="userData?.lifeStory?.adolescence?.finances"
            header="Финансы"
            :user-data="userData"
            :auth="auth"
            period="adolescence"
            field="finances"
          />
        </div>
        <div class="insideBlock">
          <MyTextarea
            placeholder-text="Опишите ваши увлечения в периоде взрослости"
            :input-text="userData?.lifeStory?.adolescence?.hobbies"
            header="Увлечения"
            :user-data="userData"
            :auth="auth"
            period="adolescence"
            field="hobbies"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import MyTextarea from './MyTextarea.vue'
import MyButton from '../MyButton.vue'
import Swal from 'sweetalert2'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
  auth: {
    type: Object,
    required: true,
  },
})

const { userData, auth } = toRefs(props)
const displayLifeStoryContent = ref(false)

const displayLifeStoryInfo = () => {
  Swal.fire({
    title: 'История жизни',
    text: 'Это одна из самых полезных практик, которую рекомендуют многие профессионалы. Просто уделяя время описанию своей истории, вы осознаете множество моментов, которые повлияли на вашу судьбу. А осознать момент, когда появилось жизненное препятствие - это пол пути к его решению!',
    buttonsStyling: false,
    confirmButtonText: 'Понятно',
  })
}
// check required data
const checkLifeStory = async (data, userUid) => {
  if (data) {
    return true
  } else {
    console.log('not found')
    const userRef = doc(db, 'users', userUid)
    data = {
      childhood: {
        health: '',
        social: '',
        finances: '',
        hobbies: '',
      },
      teenage: {
        health: '',
        social: '',
        finances: '',
        hobbies: '',
      },
      earlyAdolescence: {
        health: '',
        social: '',
        finances: '',
        hobbies: '',
      },
      adolescence: {
        health: '',
        social: '',
        finances: '',
        hobbies: '',
      },
    }
    userData.value.lifeStory = data
    try {
      await updateDoc(userRef, {
        lifeStory: data,
      })
    } catch (err) {
      console.log('Error adding documents', err)
    }
    return true
  }
}
</script>

<style scoped>
.lifeStoryWrapper {
  padding: 1em 1em;
  margin: 1em 0em;
}
.insideBlock {
  position: relative;
}
.lifeStoryHeader {
  display: flex;
  align-items: center;
}
.toLeft {
  margin-right: auto;
  margin-left: 1em;
}
</style>
