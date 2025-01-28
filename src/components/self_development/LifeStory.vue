<template>
  <h2>My Life Story</h2>
  <MyButton btn-style="standard" btn-text="View" @click="viewLifeStory = !viewLifeStory" />
  <div v-show="viewLifeStory">
    <textarea id="text" v-model="lifeStoryText"></textarea>
    <MyButton btn-style="standard" btn-text="Save" @click="saveLifeStory" />
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue'
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
})
// define access to passed props
const { db, auth, userData } = toRefs(props)
// declare variables
const viewLifeStory = ref(false)
const lifeStoryText = ref('Your awesome story')
// display database
onMounted(() => {
  setTimeout(() => {
    lifeStoryText.value = userData.value.lifeStory
  }, 1000)
})
// save function
const saveLifeStory = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  try {
    await updateDoc(userRef, {
      lifeStory: lifeStoryText.value,
    })
    userData.value.vision = lifeStoryText.value
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// observe textarea changes
var observe
if (window.attachEvent) {
  observe = function (element, event, handler) {
    element.attachEvent('on' + event, handler)
  }
} else {
  observe = function (element, event, handler) {
    element.addEventListener(event, handler, false)
  }
}
// define textarea resizing
function init() {
  var text = document.getElementById('text')
  function resize() {
    text.style.height = 'auto'
    text.style.height = text.scrollHeight + 'px'
  }
  /* 0-timeout to get the already changed text */
  function delayedResize() {
    window.setTimeout(resize, 0)
  }
  observe(text, 'change', resize)
  observe(text, 'cut', delayedResize)
  observe(text, 'paste', delayedResize)
  observe(text, 'drop', delayedResize)
  observe(text, 'keydown', delayedResize)

  text.focus()
  text.select()
  resize()
}

onMounted(() => {
  init()
})
</script>

<style scoped>
#text {
  width: 100%;
  min-height: 2em;
  overflow: hidden;
  resize: none;
}
</style>
