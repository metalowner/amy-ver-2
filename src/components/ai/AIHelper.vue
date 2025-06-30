<template>
  <div>
    <p class="description">
      И.И. помощник проанализирует ваши ответы и выдаст подходящую под раздел информацию,
      попробуйте!
    </p>
    <p>{{ questionData?.question }}</p>
    <input type="text" :placeholder="questionData?.inputPlaceHolder" v-model="userText" />
    <MyButton v-show="!notRunning" btn-style="standard" btn-text="Проверить" @click="main()" />
  </div>
  <div v-if="notRunning">
    <div class="response" v-for="value in reply" :key="value.header">
      <h4>Заголовок: {{ value.header }}</h4>
      <p>Описание: {{ value.description }}</p>
      <MyButton
        btn-style="standard"
        btn-text="Добавить"
        @click="saveNewValue(arrayName, value.header, value.description, 1)"
      />
    </div>
    <MyButton btn-style="standard" btn-text="Назад к вопросу" @click="notRunning = !notRunning" />
  </div>
</template>

<script setup>
import OpenAI from 'openai'
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'

const props = defineProps({
  questionData: {
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
  arrayName: {
    type: String,
    required: true,
  },
})

const { questionData, auth, userData } = toRefs(props)

const userText = ref('')
const reply = ref('')
const notRunning = ref(false)

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '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',
  dangerouslyAllowBrowser: true,
})

async function main() {
  notRunning.value = !notRunning.value
  const requestText =
    questionData.value.request +
    ' ' +
    userText.value +
    'return russian text with only an array of json objects with the properties header and description (remove all ` and ```json at the beginning!)'
  let completion = await openai.chat.completions.create({
    model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
    messages: [{ role: 'user', content: requestText }],
  })
  let parsedCompletion = completion.choices[0].message.content.replace('```json', '')
  let readyToUseReply = parsedCompletion.replace('```', '')
  console.log(readyToUseReply)
  reply.value = JSON.parse(readyToUseReply)

  console.log(reply.value)
}

// declare simple value save methods
const saveNewValue = async (array, newHeader, newDescription, newImportance) => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newValueObject = {
    header: newHeader,
    description: newDescription,
    importance: newImportance,
  }
  if (
    newValueObject.header != '' &&
    containsObject(newValueObject.header, userData.value[array]) == false
  ) {
    userData.value[array].push(newValueObject)
  }

  try {
    await updateDoc(userRef, {
      [array]: userData.value[array],
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// check if array contains object
const containsObject = (obj, list) => {
  var i
  for (i = 0; i < list.length; i++) {
    if (list[i].header == obj) {
      return true
    }
  }
  return false
}
</script>

<style scoped>
.AIReplyDiv {
  border: 1px solid var(--black);
  border-radius: 5px;
  padding: 0.5em;
  margin-bottom: 0.5em;
}
.response {
  margin: 1em 0em;
}
.response p {
  margin-bottom: 1em;
}
input {
  margin-bottom: 1em;
}
</style>
