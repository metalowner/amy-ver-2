<template>
  <div class="dreamLifeWrapper" v-if="userData && auth?.currentUser?.uid">
    <div v-if="checkDreamLife(userData?.dreamLife, auth?.currentUser?.uid)"></div>
    <h2>Жизнь моей мечты</h2>
    <p>{{ userData?.dreamLife?.text }}</p>
    <MyButton btn-style="edit" @click="editDreamLife" class="editBtn" />
    <div v-show="displayEdit">
      <textarea
        type="text"
        placeholder="Описание"
        v-model="dreamLifeText"
        ref="dreamLifeTextarea"
        @input="adjustHeight"
      >
      </textarea>
      <MyButton btn-style="standard" btn-text="Сохранить" @click="saveDreamLife" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, toRefs, useTemplateRef } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'

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

const displayEdit = ref(false)
const dreamLifeText = ref('')

const checkDreamLife = async (data, userUid) => {
  if (data) {
    return true
  } else {
    console.log('not found')
    const userRef = doc(db, 'users', userUid)
    data = {
      text: 'Удовлетворение от каждого момента!',
    }
    userData.value.dreamLife = {
      text: 'Удовлетворение от каждого момента!',
    }
    try {
      await updateDoc(userRef, {
        dreamLife: data,
      })
    } catch (err) {
      console.log('Error adding documents', err)
    }
    return true
  }
}
// edit
const editDreamLife = async () => {
  displayEdit.value = !displayEdit.value
  dreamLifeText.value = userData.value.dreamLife.text
  await nextTick()
  adjustHeight()
}
// save
const saveDreamLife = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db, 'users', userUid)

  userData.value.dreamLife.text = dreamLifeText.value

  try {
    await updateDoc(userRef, {
      dreamLife: userData.value.dreamLife,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
  displayEdit.value = !displayEdit.value
}
// adjust input height
const dreamLifeTextareaRef = useTemplateRef('dreamLifeTextarea')

const adjustHeight = () => {
  dreamLifeTextareaRef.value.style.height = 'auto'
  dreamLifeTextareaRef.value.style.height = `${dreamLifeTextareaRef.value.scrollHeight}px`
}
</script>

<style scoped>
.dreamLifeWrapper {
  position: relative;
  padding: 1em 0em;
  margin: 1em 0em;
}
.dreamLifeWrapper h2 {
  margin: 0em auto;
}
</style>
