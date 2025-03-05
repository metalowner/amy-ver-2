<template>
  <div class="wrapper">
    <div class="satisfactionDiv">
      <h1>Социум!</h1>
      <div class="block">
        <p>Семья</p>
        <MyRange :input-value="userData?.social?.family" :edit-enabled="false" />
      </div>
      <div class="block">
        <p>Партнёр \ Партнёрша</p>
        <MyRange :input-value="userData?.social?.love" :edit-enabled="false" />
      </div>
      <div class="block">
        <p>Друзья</p>
        <MyRange :input-value="userData?.social?.friends" :edit-enabled="false" />
      </div>
      <div class="block">
        <p>Знакомые</p>
        <MyRange :input-value="userData?.social?.pals" :edit-enabled="false" />
      </div>
      <div class="block">
        <p>Незнакомцы</p>
        <MyRange :input-value="userData?.social?.strangers" :edit-enabled="false" />
      </div>
      <MyButton btn-style="edit" @click="editSocial = !editSocial" />
    </div>

    <div class="satisfactionDiv" v-if="editSocial">
      <h1>Социум!</h1>
      <div class="block">
        <p>Семья</p>
        <MyRange :input-value="userData?.social?.family" :edit-enabled="true" ref="familyScore" />
      </div>
      <div class="block">
        <p>Партнёр \ Партнёрша</p>
        <MyRange :input-value="userData?.social?.love" :edit-enabled="true" ref="loveScore" />
      </div>
      <div class="block">
        <p>Друзья</p>
        <MyRange :input-value="userData?.social?.friends" :edit-enabled="true" ref="friendsScore" />
      </div>
      <div class="block">
        <p>Знакомые</p>
        <MyRange :input-value="userData?.social?.pals" :edit-enabled="true" ref="palsScore" />
      </div>
      <div class="block">
        <p>Незнакомцы</p>
        <MyRange
          :input-value="userData?.social?.strangers"
          :edit-enabled="true"
          ref="strangersScore"
        />
      </div>
      <MyButton btn-style="save" @click="saveSocial" />
    </div>
    <MyButton btn-style="back" @click="router.push('profile')" />
  </div>
</template>

<script setup>
import MyButton from '@/components/MyButton.vue'
import MyRange from '@/components/MyRange.vue'
import { db } from '@/main'
import router from '@/router'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, toRefs } from 'vue'

const props = defineProps({
  auth: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
})
// expose props
const { auth, userData } = toRefs(props)
// declare variables
const editSocial = ref(false)

const familyScore = ref(Number)
const loveScore = ref(Number)
const friendsScore = ref(Number)
const palsScore = ref(Number)
const strangersScore = ref(Number)
//declare functions
const saveSocial = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const socialRef = userData.value.social
  const familyInt = parseInt(familyScore.value.editableValue)
  const loveInt = parseInt(loveScore.value.editableValue)
  const friendsInt = parseInt(friendsScore.value.editableValue)
  const palsInt = parseInt(palsScore.value.editableValue)
  const strangersInt = parseInt(strangersScore.value.editableValue)
  if (
    familyInt != socialRef.family ||
    loveInt != socialRef.love ||
    friendsInt != socialRef.friends ||
    palsInt != socialRef.pals ||
    strangersInt != socialRef.strangers
  ) {
    socialRef.family = familyInt
    socialRef.love = loveInt
    socialRef.friends = friendsInt
    socialRef.pals = palsInt
    socialRef.strangers = strangersInt
    socialRef.totalSocial = (familyInt + loveInt + friendsInt + palsInt + strangersInt) / 5

    try {
      await updateDoc(userRef, {
        social: socialRef,
      })
    } catch (err) {
      console.log('Error adding documents', err)
    }
  }
  editSocial.value = !editSocial.value
}
</script>

<style scoped>
.wrapper {
  padding: 1em;

  position: relative;
}
.satisfactionDiv {
  max-width: 25em;
  position: relative;
  padding-bottom: 3em;
}
</style>
