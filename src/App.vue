<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SignIn from './components/SignIn.vue'
import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './main'

const signIn = ref(null)
const userData = ref({})

setTimeout(async () => {
  if (signIn.value.userLoggedIn === true) {
    const docRef = doc(db, 'users', signIn.value.auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      userData.value = docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }
}, 3000)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <SignIn ref="signIn" />
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/profile" v-if="signIn?.userLoggedIn">Profile</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView :auth="signIn" :userData="userData" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
