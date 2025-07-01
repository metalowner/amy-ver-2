<template>
  <div class="wrapper">
    <div class="attention">
      <div class="neolifeHeader"></div>
    </div>
    <div class="interest">
      <h2>Проблема</h2>
      <p class="subHeader">
        Удовлетворение – это привилегия и роскошь в современном мире (даже для богатых).
        Исследования показывают постоянный рост показателей депрессии и тревожности при отсутствии
        доступности решений. Больше всего страдает молодёжь возрастом 10 - 30 лет. Всё потому, что
        эволюция дала нам тело и разум, но не дала инструкцию.
      </p>
      <div class="stats"></div>
    </div>
    <div class="trust">
      <h2>Наше решение</h2>
      <p class="subHeader">Доступное приложение для саморазвития и управления жизнью.</p>
      <div class="actionGrid">
        <div class="gridItem">
          <div class="actionImage educationImg"></div>
          <h3>Обучение</h3>
          <p class="description">
            Что означают различные черты характера и как с ними взаимодействовать.
          </p>
        </div>
        <div class="gridItem">
          <div class="actionImage coachingImg"></div>
          <h3>Канвас</h3>
          <p class="description">
            Все разделы коучинга на одном листе помогают сформировать полноценный и структурный
            взгляд на свою реальность с возможностью строить эффективные долгосрочные планы.
          </p>
        </div>
        <div class="gridItem">
          <div class="actionImage AIImg"></div>
          <h3>Искусственный интеллект</h3>
          <p class="description">
            Методом наводящих вопросов помогает анализировать значения ваших убеждений.
          </p>
        </div>
      </div>
    </div>
    <div class="information">
      <h2>Узнайте больше</h2>
      <p class="subHeader">О нас и нашей методике, прочитав наши бесплатные путеводители.</p>
      <div class="actionGrid">
        <div class="gridBlock">
          <div>
            <div class="selfDev actionImage"></div>
            <h3>Саморазвитие</h3>
            <p>
              Нам дали жизнь, но не дали инструкцию. Данный путеводитель поможет вам самостоятельно
              понять некоторые фундаменты жизни, их взаимосвязи и как построить грамотную жизненную
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
              Деньги - важная часть жизни почти любого из нас. Чтобы больше зарабатывать,
              недостаточно просто больше трудиться. Важно понимать, что такое бизнес и как с ним
              взаимодействовать. С этим вам поможет путеводитель для бизнеса.
            </p>
          </div>
          <a class="blackLink" href="/business.pdf" download="Путеводитель для бизнеса.pdf"
            >Скачать путеводитель</a
          >
        </div>
        <div class="gridBlock">
          <div>
            <div class="marketing actionImage"></div>
            <h3>Маркетинг</h3>
            <p>
              Навык преподнесения информации - один из важнейших в общении. Как привлечь внимание,
              заинтересовать, выработать доверие и внушить идею вы найдёте здесь.
            </p>
          </div>
          <a class="blackLink" href="/marketing.pdf" download="Путеводитель для маркетинга.pdf"
            >Скачать путеводитель</a
          >
        </div>
      </div>
    </div>
    <div class="action">
      <h2>Попробуйте</h2>
      <p class="subHeader">Зарегистрироваться и начать свою НЕОЖИЗНЬ</p>
      <div class="registerGuide"></div>
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
.subHeader {
  margin: 1em 0em;
}
.blackLink {
  color: var(--white);
  background: var(--blue);
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
  padding: 5px 1em;
}
.neolifeHeader {
  background-image: url(../assets/neolife_header.svg);
  height: 20em;
  width: 20em;
  background-repeat: no-repeat;
  background-size: contain;
  margin-top: 5em;
}
.attention,
.interest,
.trust {
  padding: 0em 1em;
  padding-top: 5em;
  padding-bottom: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.action {
  padding-top: 5em;
  padding-bottom: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--black);
  color: var(--white);
}
.information {
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
.gridItem {
  padding: 1em;
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gridItem h3 {
  margin-top: 1em;
}
.attention {
  background: var(--blue-gradient);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  color: var(--white);
}
.trust {
  background-color: var(--black);
  color: var(--white);
}
.trust p {
  margin-bottom: 5em;
}
.actionImage {
  height: 20em;
  width: 20em;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  background-position: center;
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
.stats {
  background-image: url(../assets/stats.svg);
  width: 20em;
  height: 10em;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: block;
}
.educationImg {
  background-image: url(../assets/education.svg);
}
.coachingImg {
  background-image: url(../assets/canvas.svg);
}
.AIImg {
  background-image: url(../assets/ai.svg);
}
.registerGuide {
  background-image: url(../assets/registerGuide.png);
  width: 20em;
  height: 15em;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: block;
  margin: 1em 0em;
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
