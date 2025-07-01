<template>
  <div>
    <MyButton
      btn-style="tutorial"
      btn-text="i"
      @click="displayTutorialContent = !displayTutorialContent"
    />
    <div class="popUp" v-if="displayTutorialContent">
      <div class="tutorialSection">
        <h3>Иконки</h3>
        <div class="tutorialBlock">
          <div class="tutorialBtn">
            <MyButton btn-style="add" />
          </div>
          <p class="description">
            Означает добавить, при нажатие вы можете добавить новую информацию.
          </p>
        </div>
        <div class="tutorialBlock">
          <div class="tutorialBtn">
            <MyButton btn-style="edit" />
          </div>
          <p class="description">Означает редакцию, нажав можно редактировать елемент.</p>
        </div>
        <div class="tutorialBlock">
          <div class="tutorialBtn">
            <MyButton btn-style="info" btn-text="i" />
          </div>

          <p class="description">
            Означает информацию, нажав можно получить полезную информацию о блоке.
          </p>
        </div>
        <div class="tutorialBlock">
          <div class="tutorialBtn">
            <MyButton btn-style="help" btn-text="?" />
          </div>
          <p class="description">
            Означает помощь, нажав можно получить направляющие вопросы и помощь искусственного
            ителлекта.
          </p>
        </div>
      </div>
      <MyButton
        btn-style="standard"
        btn-text="Понятно"
        @click="displayTutorialContent = !displayTutorialContent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MyButton from '../MyButton.vue'

const displayTutorialContent = ref(false)
</script>

<style scoped>
.tutorialBlock {
  position: relative;
  display: grid;
  grid-template-columns: 10% 80%;
  column-gap: 1em;
  text-align: start;
  margin-bottom: 0.5em;
  border-bottom: 1px solid var(--gray-opacity);
}
.tutorialBtn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
