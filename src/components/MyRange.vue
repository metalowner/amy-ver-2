<template>
  <div>
    <div class="rangeDiv" v-if="!editEnabled">
      <div class="icon sad" :class="sadOpacity"></div>
      <input
        class="notEditable"
        :class="colorChange"
        type="range"
        min="0"
        max="100"
        :value="inputValue"
        disabled
      />
      <div class="icon happy" :class="happyOpacity"></div>
    </div>

    <input
      class="slider"
      :class="editableColor"
      v-if="editEnabled"
      type="range"
      min="0"
      max="100"
      v-model="editableValue"
    />
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'

const props = defineProps({
  inputValue: {
    type: Number,
    required: false,
  },
  editEnabled: {
    type: Boolean,
    required: true,
  },
})
const { inputValue, editEnabled } = toRefs(props)

const editableValue = ref(props.inputValue)

const colorChange = computed(() => {
  return parseInt(inputValue.value) < 75
    ? parseInt(inputValue.value) < 50
      ? parseInt(inputValue.value) < 25
        ? 'red'
        : 'lightRed'
      : 'green'
    : 'lightGreen'
})

const editableColor = computed(() => {
  return parseInt(editableValue.value) < 75
    ? parseInt(editableValue.value) < 50
      ? parseInt(editableValue.value) < 25
        ? 'red'
        : 'lightRed'
      : 'green'
    : 'lightGreen'
})

const sadOpacity = computed(() => {
  return parseInt(editableValue.value) < 75
    ? parseInt(editableValue.value) < 50
      ? parseInt(editableValue.value) < 25
        ? 'visible'
        : 'mediumVisible'
      : 'lightVisible'
    : 'noVisible'
})

const happyOpacity = computed(() => {
  return parseInt(editableValue.value) < 75
    ? parseInt(editableValue.value) < 50
      ? parseInt(editableValue.value) < 25
        ? 'noVisible'
        : 'lightVisible'
      : 'mediumVisible'
    : 'visible'
})
defineExpose({ editableValue, colorChange })
</script>

<style scoped>
.visible {
  opacity: 1;
}
.mediumVisible {
  opacity: 0.75;
}
.lightVisible {
  opacity: 0.5;
}
.noVisible {
  opacity: 0.05;
}
.rangeDiv {
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  justify-items: center;
}
.icon {
  background-repeat: no-repeat;
  background-size: contain;
  height: 1em;
  width: 1em;
  margin: 0px 0.5em;
}
.sad {
  background-image: url(../assets/sad.svg);
}
.happy {
  background-image: url(../assets/happy.svg);
}
.slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  box-shadow: none;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background: #fafaf2ff;
  cursor: pointer;
  border: 1px solid #101010ff;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background: #fafaf2ff;
  cursor: pointer;
  border: 1px solid #101010ff;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.notEditable {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  box-shadow: none;
  opacity: 0.7;
}
.notEditable::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 5px;
  height: 25px;
  border-radius: 5px;
  background: #fafaf2ff;
  border: 1px solid #101010ff;
  cursor: pointer;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.notEditable::-moz-range-thumb {
  width: 5px;
  height: 25px;
  border-radius: 5px;
  background: #fafaf2ff;
  border: 1px solid #101010ff;
  cursor: pointer;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.lightRed {
  background: #ff4848ff;
}
.lightGreen {
  background: rgb(89, 255, 56);
}
.red {
  background: #ff0101ff;
}
.green {
  background: rgb(31, 187, 0);
}
</style>
