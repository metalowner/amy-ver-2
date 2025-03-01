<template>
  <div class="attention">
    <h1>И.О.М.</h1>
    <h3>Искусственный освободитель мозга</h3>
  </div>
  <div class="interest">
    <h2>Сказка</h2>
    <p>
      В современом мире сложно прожить удовлетворительную жизнь. Слишком много информации которая
      отвлекает, тревожит и препятствует рациональному мышлению. Так получилось что совмещая
      множество вариантов решений данной сложности появилась идея создать Иом. Платформа для
      использования и обучения ускусственного интеллекта который поможет сделать жизнь проще и
      удовлетворительней.
    </p>
  </div>
  <div class="trust">
    <h2>Честно говоря</h2>
    <p>
      Получив образования и опыт в различных сферах психологии и бизнеса стало очевидно что
      важнейший фундамент это граматно распределять свои ресурсы. Дело не только в деньгах. Время,
      сила и фокус имеют куда больше влияния чем кажется. Используя профессиональные практики мы
      создаём инструменты как путеводители, курсы обучения и приложения для того чтобы вы могли
      организовать бордак в голове и сфокусировать силы на самое важное и срочное. Так получилось,
      что в итоге это помогает сделать жизнь проще и более удовлетворительной.
    </p>
  </div>
  <div class="action">
    <h2>Попробуйте</h2>
    <p>
      Мы предлагаем доступные, эффективные и практичные инструменты в сферах саморазвития, бизнеса и
      маркетинга. Можете бесплатно проверить наши путеводители прямо сейчас.
    </p>
    <div class="actionGrid">
      <div class="gridBlock">
        <div>
          <div class="selfDev actionImage"></div>
          <h3>Саморазвитие</h3>
          <p>
            Нам дали жизнь но не дали инструкцию. Данный путеводитель поможет вам самостоятельно
            понять некоторые фундаменты жизни, их взаимосвязи и как построить грамотною жизненую
            стратегию.
          </p>
        </div>
        <a class="blackLink" href="/selfdev.pdf" download="Путеводитель для саморазвития.pdf"
          >Скачать путеводитель</a
        >
      </div>
      <div class="gridBlock">
        <div>
          <div class="business actionImage"></div>
          <h3>Бизнес</h3>
          <p>
            Деньги важная часть жизни почти любого из нас. Чтобы больше зарабатывать не достаточно
            просто больше трудится. Важно понимать что такое бизнес и как с ним взаимодействовать. С
            этим вам поможет путеводитель для бизнеса.
          </p>
        </div>
        <a class="blackLink" href="/business.pdf" download="Путеводитель для бизнеса.pdf"
          >Скачать путеводитель</a
        >
      </div>
      <div class="gridBlock">
        <div class="marketing actionImage"></div>
        <h3>Маркетинг</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  max-width: 25em;
  padding: 0px 1em;
  text-align: center;
  margin-bottom: 1em;
  text-align: justify;
}

.blackLink {
  color: #101010ff;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
  padding: 5px 1em;
}

.attention,
.interest,
.trust {
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5em 0px;
}
.actionGrid {
  display: grid;
  grid-template-columns: auto;
  text-align: center;
}
.gridBlock {
  border-radius: 5px;
  padding: 1em;
  margin: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.attention {
  background-image: url(../assets/home_bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  color: #fafaf2ff;
}
.trust {
  background-color: #101010ff;
  color: #fafaf2ff;
}
.actionImage {
  height: 20em;
  width: 20em;
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
}
.selfDev {
  background-image: url(../assets/selfdev.svg);
}
.business {
  background-image: url(../assets/business.svg);
}
.marketing {
  background-image: url(../assets/marketing.svg);
}

@media (min-width: 768px) {
  .actionGrid {
    grid-template-columns: auto auto;
  }
}
@media (min-width: 1280px) {
  .actionGrid {
    grid-template-columns: auto auto auto;
  }
}
</style>
