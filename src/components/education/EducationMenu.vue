<template>
  <div v-if="userData?.education" class="educationMenu">
    <h2 @click="displayMenu = !displayMenu">Обучение</h2>
    <h4 @click="displayMenu = !displayMenu" class="educationMenuHeader">
      Пройдено {{ progressPercent }}% / 100%
    </h4>
    <MyButton btn-style="arrowDownWhite" @click="displayMenu = !displayMenu" />
    <Transition>
      <div class="educationMenuContainer" v-show="displayMenu">
        <div
          class="educationMenuItem"
          v-for="(course, index) in CoursesData"
          :class="course.active"
          :key="course.header"
          @click="displayLesson(course, index)"
        >
          <p class="educationMenuText">{{ course.header }}</p>
          <div v-if="checkPassed(course.header)" class="passedIcon"></div>
        </div>
      </div>
    </Transition>
  </div>
  <div>
    <LearnMaterial
      :data="courseData"
      :user-data="userData"
      :auth="auth"
      :time-to-exercise-prop="exerciseActive"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRefs } from 'vue'
import CoursesData from '../education/CoursesData'
import LearnMaterial from './LearnMaterial.vue'
import MyButton from '../MyButton.vue'

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

// expose props
const { auth, userData } = toRefs(props)

const courseData = ref({})
const lessonIndex = ref(0)
const displayMenu = ref(false)
const exerciseActive = ref(false)

const progressPercent = computed(() => {
  return parseInt((100 / CoursesData.length) * userData.value.education.lessons.length)
})

const checkPassed = (header) => {
  if (userData.value.education.lessons.indexOf(header) > -1) {
    return true
  } else {
    return false
  }
}

const displayLesson = (data, index) => {
  courseData.value = data
  lessonIndex.value = index
  exerciseActive.value = !exerciseActive.value
  for (let i = 0; i < CoursesData.length; i++) {
    const element = CoursesData[i]
    if (element.header == data.header) {
      element.active = 'active'
    } else {
      element.active = ''
    }
  }

  displayMenu.value = false
}

onMounted(() => {
  displayLesson(CoursesData[0], 0)
})
</script>

<style scoped>
.educationMenu {
  position: fixed;
  width: 100%;
  padding: 0.5em;
  background: var(--black);
  color: var(--white);
  z-index: 5;
}
.educationMenu h2 {
  line-height: 1.5em;
  color: var(--orange);
  text-align: center;
}
.educationMenuHeader {
  text-align: center;
}
.educationMenuItem {
  margin: 0.3em 0em;
  padding: 0.5em 1em;
  display: grid;
  grid-template-columns: 80% 20%;
  border-bottom: 1px solid var(--gray-opacity);
}
.active {
  border-bottom: 1px solid var(--blue);
}
.passedIcon {
  height: 2em;
  width: 2em;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(../../assets/complete.svg);
  margin-left: auto;
  margin-top: 3px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@media (min-width: 1100px) {
  .educationMenuContainer {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto auto auto auto auto auto;
    text-align: center;
  }
}
</style>
