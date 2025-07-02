<template>
  <div class="innerBlock">
    <input type="text" placeholder="Заголовок" v-model="newValueHeader" />
    <p>
      <textarea
        type="text"
        placeholder="Описание"
        v-model="newValueDescription"
        ref="valuesTextarea"
        @input="adjustHeight"
      ></textarea>
    </p>
    <MyCounter :max-value="10" label="Важность" :input-value="1" ref="newValueImportance" />
    <div class="btnsDiv">
      <MyButton
        btn-style="standard"
        btn-text="Сохранить"
        @click="
          saveNewValue(
            dataType,
            newValueHeader,
            newValueDescription,
            newValueImportance.editableValue,
          )
        "
      />
      <MyButton btn-style="delete" btn-text="Отменить" @click="close()" />
    </div>
  </div>
</template>

<script setup>
import { db } from '@/main'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, toRefs } from 'vue'
import MyCounter from '../MyCounter.vue'
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
  dataType: {
    type: String,
    required: true,
  },
})

const { userData, auth, dataType } = toRefs(props)
// declare value variables
const newValueHeader = ref('')
const newValueDescription = ref('')
const newValueImportance = ref({})
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
  } else {
    if (dataType.value === 'values') {
      Swal.fire({ text: 'Ценность уже добавлена!', buttonsStyling: false })
    } else if (dataType.value === 'obstacles') {
      Swal.fire({ text: 'Препятствие уже добавлена!', buttonsStyling: false })
    } else {
      Swal.fire({ text: 'Ресурс уже добавлен!', buttonsStyling: false })
    }

    return
  }
  try {
    await updateDoc(userRef, {
      [array]: userData.value[array],
    })
    Swal.fire({ text: 'Сохранение прошло успешно!', buttonsStyling: false })
    newValueHeader.value = ''
    newValueDescription.value = ''
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
// adjust input height
const valuesTextarea = ref(null)
const adjustHeight = () => {
  valuesTextarea.value.style.height = 'auto'
  valuesTextarea.value.style.height = `${valuesTextarea.value.scrollHeight}px`
}
// emit close
const close = () => {
  emit('close')
}
const emit = defineEmits(['close'])
</script>
