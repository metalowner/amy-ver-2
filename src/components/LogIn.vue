<template>
  <div>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
  </div>
</template>

<script setup>
import { ref } from 'firebase/database'

const email = ref('')
const password = ref('')

defineExpose({ email, password })
</script>
