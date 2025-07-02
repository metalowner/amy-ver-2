<template>
  <div class="block">
    <div class="infoHeader">
      <h2>Сферы жизни</h2>
      <MyButton class="infoBtn" btn-style="info" btn-text="i" @click="displayLifeFieldsInfo()" />
    </div>
    <div class="lifeFieldsDiv" v-if="userData?.health">
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
</template>

<script setup>
import Swal from 'sweetalert2'
import MyButton from '../MyButton.vue'
import LifeField from './LifeField.vue'

defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
const displayLifeFieldsInfo = () => {
  Swal.fire({
    title: 'Сферы жизни',
    text: 'Это основные сферы, в которых действует почти каждый человек на земле. Понимание своего удовлетворения в каждой из сфер поможет определять, как лучше всего двигаться дальше.',
    buttonsStyling: false,
    confirmButtonText: 'Понятно',
  })
}
</script>
