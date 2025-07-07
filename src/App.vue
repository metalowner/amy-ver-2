<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SignIn from './components/SignIn.vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const signIn = ref(null)
const displayMenu = ref(false)
const windowWidth = ref(window.innerWidth)
const displayProperMenu = computed(() => {
  return windowWidth.value > 725 ? 'largeScreen' : 'smallScreen'
})
const displayProperHeader = computed(() => {
  return windowWidth.value > 725 ? 'largeHeader' : 'smallHeader'
})
const displayProperMenuIcon = computed(() => {
  return windowWidth.value > 725 ? false : true
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (displayProperMenu.value === 'largeScreen') {
    displayMenu.value = true
  }
}

const handleMenuClick = () => {
  if (displayProperHeader.value === 'smallScreen') {
    displayMenu.value = !displayMenu.value
  }
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header :class="displayProperHeader">
    <div class="logo"></div>
    <div class="menuIcon" @click="displayMenu = !displayMenu" v-if="displayProperMenuIcon"></div>
    <Transition>
      <nav v-show="displayMenu" :class="displayProperMenu">
        <RouterLink @click="handleMenuClick" to="/">Главная</RouterLink>
        <RouterLink @click="handleMenuClick" to="/about">О нас</RouterLink>
        <RouterLink @click="handleMenuClick" to="/education" v-if="signIn?.userLoggedIn"
          >Обучение</RouterLink
        >
        <RouterLink @click="handleMenuClick" to="/profile" v-if="signIn?.userLoggedIn"
          >Профиль</RouterLink
        >
        <SignIn ref="signIn" />
      </nav>
    </Transition>
  </header>
  <RouterView :auth="signIn" :userData="signIn?.userData" />
  <footer>
    <div class="footerContacts">
      <a class="footerLink" target="_blank" href="https://vk.com/neo_life">ВКонтакте</a>
      <p>Телефон: +7 961 435 90 49 Павел</p>
      <p>Все права защищены!</p>
    </div>
  </footer>
</template>

<style scoped>
.largeHeader {
  background: var(--black);
  position: fixed;
  width: 100%;
  z-index: 9;
  border-bottom: 1px solid var(--white);
  display: grid;
  grid-template-columns: 5em 85%;
  justify-content: start;
  align-items: center;
  text-align: center;
}
.smallHeader {
  background: var(--black);
  position: relative;
  position: fixed;
  width: 100%;
  z-index: 9;
  border-bottom: 1px solid var(--white);
}
.smallScreen {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
}
.largeScreen {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
footer {
  background: var(--black);
  color: var(--white);
  border-top: 1px solid var(--white);
}
.footerContacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  justify-content: start;
  align-items: start;
}
.footerLink {
  border-bottom: 1px solid var(--white);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
