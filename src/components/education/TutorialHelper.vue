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
            <MyButton btn-style="edit" />
          </div>
          <p>
            Означает редакцию, нажав можно удалить, редактировать или завершить некоторые элементы.
          </p>
        </div>
        <div class="tutorialBlock">
          <div class="tutorialBtn">
            <MyButton btn-style="save" />
          </div>
          <p>
            Означает сохранение, нажав можно сохранить заполненую информацию. Важно помнить что
            автосохранения нет.
          </p>
        </div>
        <div class="tutorialBlock">
          <div class="tutorialBtn">
            <h2><MyButton btn-style="info" /></h2>
          </div>

          <p>Означает информацию, нажав можно полусть полузную информацию о блоке.</p>
        </div>
        <div class="tutorialBlock">
          <div class="tutorialBtn">
            <h2><MyButton btn-style="help" btn-text="?" /></h2>
          </div>

          <p>
            Означает помощь, нажав можно получить направляющие вопросы и для Премиум пользователей -
            помощь искусственного ителлекта.
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
  grid-template-columns: 10% 90%;
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
