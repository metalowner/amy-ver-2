<template>
  <div class="wrapper shadow" @click="navigateRoute">
    <h2>{{ name }}</h2>
    <div class="iconWrapper" :class="background">
      <div class="icon" :class="fieldIcon"></div>
    </div>

    <MyRange :input-value="satisfaction" :edit-enabled="false" />
  </div>
</template>

<script setup>
import router from '@/router'
import { toRefs } from 'vue'
import MyRange from '../MyRange.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
  fieldIcon: {
    type: String,
    required: true,
  },
  satisfaction: {
    type: Number,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
})
const { routeName, name } = toRefs(props)

const navigateRoute = () => {
  router.push(routeName.value)
}
</script>

<style scoped>
.wrapper {
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em;
  margin-bottom: 1em;
}
.stats {
  display: grid;
  grid-template-columns: auto auto auto;
}
.iconWrapper {
  padding: 1em;
  border-radius: 5px;
  margin: 1em;
}
.icon {
  background-repeat: no-repeat;
  background-size: contain;
  height: 3em;
  width: 3em;
  margin-left: auto;
  margin-right: auto;
}
.health {
  background-image: url(../../assets/health.svg);
}
.social {
  background-image: url(../../assets/people.svg);
}
.finances {
  background-image: url(../../assets/finances.svg);
}
.hobbies {
  background-image: url(../../assets/hobbies.svg);
}
.sad {
  background-image: url(../../assets/sad.svg);
  height: 2em;
  width: 2em;
  margin: auto;
}
.happy {
  background-image: url(../../assets/happy.svg);
  height: 2em;
  width: 2em;
  margin: auto;
}
.green {
  background-color: #00bb65ff;
}
.blue {
  background-color: #00bbbbff;
}
.red {
  background-color: #ff4a01ff;
}
.yellow {
  background-color: rgb(196, 0, 196);
}
@media (min-width: 1024px) {
  .wrapper {
    width: 20em;
  }
}
</style>
