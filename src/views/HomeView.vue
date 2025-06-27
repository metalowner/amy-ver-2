<template>
  <div class="wrapper">
    <div class="attention">
      <div class="neolifeHeader"></div>
    </div>
    <div class="interest">
      <h2>Суть</h2>
      <p>
        Основная сложность современного мира - это избыток информации и перемен, усложняющих путь к
        удовлетворительной жизни и мешающих отличать хотелки от потребностей.
      </p>
      <p>
        А.И. План. - это платформа для планирования, учитывающая эти сложности и помогающая их
        преодолеть. С помощью взгляда внутрь себя, организации по полочкам и сортировки по
        приоритетам можно улучшить свои определения целей и видение путей для их достижения. Что в
        итоге повышает удовлетворённость жизнью.
      </p>
    </div>
    <div class="trust">
      <h2>Наше решение</h2>
      <p>
        Грамотные процессы, вопросы и описания, которые помогут вам развивать грамотное мышление и
        формировать грамотные цели и планы.
      </p>
    </div>
    <div class="action">
      <h2>Попробуйте</h2>
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
              Деньги - важная часть жизни почти любого из нас. Чтобы больше зарабатывать не
              достаточно просто больше трудиться. Важно понимать, что такое бизнес и как с ним
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
              Навык преподнесения информации один из важнейших в общении. Как привлечь внимание,
              заинтересовать, выработать доверие и внушить идею вы найдёте здесь.
            </p>
          </div>
          <a class="blackLink" href="/marketing.pdf" download="Путеводитель для маркетинга.pdf"
            >Скачать путеводитель</a
          >
        </div>
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
.neolifeHeader {
  background-image: url(../assets/neolife_header.svg);
  height: 15em;
  width: 15em;
  background-repeat: no-repeat;
  background-size: contain;
  margin-top: 5em;
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
  background: var(--blue-gradient);
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
