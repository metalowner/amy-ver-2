<template>
  <div class="lifeFieldWrapper" @click="navigateRoute">
    <div class="lifeFieldHeader">
      <div class="iconWrapper" :class="background">
        <div class="icon" :class="fieldIcon"></div>
      </div>
      <h3>{{ name }}</h3>
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
.lifeFieldWrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em auto;
}
.lifeFieldWrapper h3 {
  border-bottom: none;
  text-align: start;
}
.lifeFieldHeader {
  display: flex;
  width: 13em;
}
.stats {
  display: grid;
  grid-template-columns: auto auto auto;
}
.iconWrapper {
  padding: 0.5em;
  border-radius: 5px;
  margin-right: 1em;
}
.icon {
  background-repeat: no-repeat;
  background-size: contain;
  height: 1em;
  width: 1em;
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
