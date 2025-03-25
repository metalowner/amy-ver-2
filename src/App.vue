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
    <div class="footerContacts">
      <a class="footerLink" target="_blank" href="https://vk.com/simonmys">Вконтакте</a>
      <p>Телефон: +7 961 435 90 49 Павел</p>
      <p>Все права защищены!</p>
    </div>
  </footer>
</template>

<style scoped>
header {
  background-color: #101010ff;
}
nav {
  width: 100%;
  border-bottom: 1px solid #fafaf222;
  padding: 1em;
}
header a {
  margin-right: 1em;
}
footer {
  background-color: #101010ff;
  color: #fafaf2ff;
  border-top: 1px solid #fafaf2ff;
}
.footerContacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
}
.footerLink {
  border-bottom: 1px solid #fafaf222;
}
</style>
