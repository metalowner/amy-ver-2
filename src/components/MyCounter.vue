<template>
  <p class="description">{{ label }}</p>
  <div class="counter">
    <div class="counterButton decrement" @click="decrement">-</div>
    <input min="0" :max="maxValue" type="number" v-model="editableValue" />
    <div class="counterButton increment" @click="increment">+</div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  inputValue: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  maxValue: {
    type: Number,
    required: false,
  },
})

const { inputValue, maxValue } = toRefs(props)

const editableValue = ref(inputValue.value)

const decrement = () => {
  if (editableValue.value > 0) {
    editableValue.value -= 1
  }
}

const increment = () => {
  if (editableValue.value < maxValue.value) {
    editableValue.value += 1
  }
}

defineExpose({ editableValue })
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
  box-shadow: none;
  width: 3.2em;
  height: 1.4em;
  text-align: center;
  border-radius: 0px;
  margin: 0px;
  font-size: 1.2em;
}

p {
  text-align: center;
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.counterButton {
  width: 1.5em;
  height: 1.1em;
  text-align: center;
  font-size: 1.5em;
  line-height: 0.9em;
  cursor: pointer;
  color: var(--white);
}
.decrement {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: var(--red);
}
.increment {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: var(--dark-blue);
}
</style>
