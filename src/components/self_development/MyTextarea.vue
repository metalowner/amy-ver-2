<template>
  <div class="lifeStoryInnerHeader">
    <h4>{{ header }}</h4>
    <MyButton btn-style="edit" @click="startEdit" class="lifeStoryEditBtn" />
    <div class="displayDiv" v-show="!editOn">
      <p class="description">{{ inputText }}</p>
    </div>

    <div class="editDiv" v-show="editOn">
      <textarea
        type="text"
        :placeholder="placeholderText"
        v-model="myTextareaText"
        ref="myTextarea"
        @input="adjustHeight"
      >
      </textarea>
      <MyButton
        btn-style="standard"
        btn-text="Сохранить"
        @click="saveChanges(period, field, myTextareaText)"
      />
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, toRefs, useTemplateRef } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import MyButton from '../MyButton.vue'

const props = defineProps({
  placeholderText: {
    type: String,
    required: false,
  },
  inputText: {
    type: String,
    required: false,
  },
  header: {
    type: String,
    required: false,
  },
  userData: {
    type: Object,
    required: true,
  },
  auth: {
    type: Object,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
})
const { placeholderText, inputText, header, userData, auth } = toRefs(props)
const myTextareaText = ref('')
const editOn = ref(false)

// adjust content
const startEdit = async () => {
  editOn.value = !editOn.value
  if (inputText.value) {
    myTextareaText.value = inputText.value
    await nextTick()
    adjustHeight()
  }
}
// save function
const saveChanges = async (period, field, text) => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db, 'users', userUid)

  userData.value.lifeStory[period][field] = text

  try {
    await updateDoc(userRef, {
      lifeStory: userData.value.lifeStory,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}

// adjust input height
const textareaRef = useTemplateRef('myTextarea')

const adjustHeight = () => {
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
}
</script>

<style scoped>
.lifeStoryEditBtn {
  position: absolute;
  top: 0em;
  right: 1em;
}
.lifeStoryInnerHeader {
  margin: 0.5em 0em;
}
</style>
