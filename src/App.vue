<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SignIn from './components/SignIn.vue'
import { ref } from 'vue'

const signIn = ref(null)
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/about">О нас</RouterLink>
      <RouterLink to="/profile" v-if="signIn?.userLoggedIn">Профиль</RouterLink>
      <SignIn ref="signIn" />
    </nav>
  </header>
  <RouterView :auth="signIn" :userData="signIn?.userData" />
  <footer>
    <div>
      <a href="https://vk.com/simonmys">Вконтакте</a>
      <p>Телефон: +7 961 435 90 49 Павел</p>
    </div>
    <p>Все права защищены!</p>
  </footer>
</template>

<style scoped>
header {
  padding: 1em;
  background-color: #101010ff;
}
header a {
  margin-right: 1em;
}
footer {
  padding: 2em 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #101010ff;
  color: #fafaf2ff;
  border-top: 1px solid #fafaf2ff;
}
</style>
