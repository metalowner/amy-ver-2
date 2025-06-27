<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SignIn from './components/SignIn.vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const signIn = ref(null)
const displayMenu = ref(false)
const windowWidth = ref(window.innerWidth)
const displayProperMenu = computed(() => {
  return windowWidth.value > 725 ? true : false
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header>
    <div class="logo"></div>
    <div class="menuIcon" @click="displayMenu = !displayMenu"></div>
    <div v-if="displayProperMenu" id="largeScreenMenu">
      <div id="largeScreenRouters">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/about">О нас</RouterLink>
        <RouterLink to="/education" v-if="signIn?.userLoggedIn">Обучение</RouterLink>
        <RouterLink to="/profile" v-if="signIn?.userLoggedIn">Профиль</RouterLink>
      </div>
      <SignIn ref="signIn" v-if="displayProperMenu" />
    </div>
    <Transition>
      <nav v-show="displayMenu && !displayProperMenu">
        <RouterLink @click="displayMenu = !displayMenu" to="/">Главная</RouterLink>
        <RouterLink @click="displayMenu = !displayMenu" to="/about">О нас</RouterLink>
        <RouterLink @click="displayMenu = !displayMenu" to="/education" v-if="signIn?.userLoggedIn"
          >Обучение</RouterLink
        >
        <RouterLink @click="displayMenu = !displayMenu" to="/profile" v-if="signIn?.userLoggedIn"
          >Профиль</RouterLink
        >
        <SignIn ref="signIn" />
      </nav>
    </Transition>
  </header>
  <RouterView :auth="signIn" :userData="signIn?.userData" />
  <footer>
    <div class="footerContacts">
      <a class="footerLink" target="_blank" href="https://vk.com/simonmys">Вконтакте</a>
      <p>Телефон: +7 961 435 90 49 Павел</p>
      <p>Все права защищены!</p>
    </div>
  </footer>
</template>

<style scoped>
header {
  background: var(--black);
  position: relative;
  position: absolute;
  width: 100%;
  z-index: 9;
  border-bottom: 1px solid var(--white);
}
nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
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
#largeScreenMenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#largeScreenRouters {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 5em;
  padding-left: 5em;
}
@media (min-width: 725px) {
  .menuIcon {
    display: none;
  }
  header {
    display: block;
  }
  header a {
    padding: 0em 1em;
  }
  .logo {
    position: absolute;
  }
}
</style>
