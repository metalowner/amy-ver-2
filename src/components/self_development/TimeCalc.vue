<template>
  <div>
    <h2>{{ label }}</h2>
    <p>Минуты: <input type="number" min="0" max="60" :value="time.minutes" disabled /></p>
    <p>Часы: <input type="number" min="0" max="24" :value="time.hours" disabled /></p>
    <p>Дни: <input type="number" min="0" max="7" :value="time.days" disabled /></p>
    <p>Месяцы: <input type="number" min="0" max="12" :value="time.months" disabled /></p>
  </div>
</template>

<script setup>
defineProps({
  time: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>
