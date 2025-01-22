import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAaboroWx51bVpf2gn8X00S948wE3654MU',
  authDomain: 'amy-ver-2.firebaseapp.com',
  projectId: 'amy-ver-2',
  storageBucket: 'amy-ver-2.firebasestorage.app',
  messagingSenderId: '223332939584',
  appId: '1:223332939584:web:041368e4ae5c59d18deca5',
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

const app = createApp(App)

app.use(router)

app.mount('#app')

export { auth }
console.log(auth)
