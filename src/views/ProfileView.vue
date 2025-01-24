<script setup>
import { db } from '@/main'
import PersonalInformation from '@/components/PersonalInformation.vue'
import { toRefs } from 'vue'
import LifeStory from '@/components/LifeStory.vue'

const props = defineProps({
  auth: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
})

const { auth } = toRefs(props)
</script>

<template>
  <h1>Profile</h1>
  <PersonalInformation :db="db" :auth="auth.auth" :userData="userData" />
  <LifeStory :db="db" :auth="auth.auth" :userData="userData" />
  <p>Vision:</p>
  <p>Values:</p>
  <p>Obstacles:</p>
  <p>Resources:</p>
  <p>Goals:</p>
  <p>Plans:</p>
  <p>Actions:</p>
  <p>Business:</p>
</template>
