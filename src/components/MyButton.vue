<script setup>
defineProps({
  btnStyle: {
    type: String,
    required: true,
  },
  btnText: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <a :class="btnStyle">{{ btnText }}</a>
</template>

<style scoped>
.standard {
  color: var(--white);
  background: var(--blue-gradient);
  border-radius: 5px;
  padding: 5px 1em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.complete {
  background: var(--green-gradient);
  color: var(--white);
  border-radius: 5px;
  display: block;
  padding: 5px 1em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.delete {
  color: var(--white);
  background: var(--red-gradient);
  border-radius: 5px;
  padding: 5px 1em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.navLink {
  padding-bottom: 2px;
  padding-left: 1em;
  padding-right: 1em;
}
.edit {
  background-image: url(../assets/edit.svg);
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 1.5em;
  width: 1.5em;
  z-index: 1;
  opacity: 0.7;
}
.editWhite {
  background-image: url(../assets/editWhite.svg);
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 1.5em;
  width: 1.5em;
  z-index: 1;
  opacity: 0.9;
}
.save {
  background-image: url(../assets/save.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  display: block;
}
.cancelTop {
  background-image: url(../assets/cancel.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  border: 1px solid var(--black);
  border-radius: 5px;
  display: block;
}
.cancelBottom {
  background-image: url(../assets/cancel.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  border: 1px solid var(--black);
  border-radius: 5px;
  display: block;
}
.add {
  background-image: url(../assets/add.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 2.3em;
  width: 2.3em;
  display: block;
}
.back {
  background-image: url(../assets/back.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  display: block;
}
.arrowDown {
  background-image: url(../assets/arrowDown.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1em;
  width: 1em;
  display: block;
  opacity: 0.5;
  margin-top: 0.5em;
  margin-left: auto;
  margin-right: auto;
}
.arrowUp {
  background-image: url(../assets/arrowDown.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1em;
  width: 1em;
  display: block;
  opacity: 0.5;
  margin-top: 0.5em;
  transform: rotate(180deg);
  margin-left: auto;
  margin-right: auto;
}

.tutorial {
  background: var(--red);
  height: 2em;
  width: 2em;
  border-radius: 15em;
  position: fixed;
  right: 1em;
  bottom: 1em;
  text-align: center;
  font-weight: 700;
  line-height: 1.3em;
  font-size: 1.3em;
  display: block;
  z-index: 5;
}
.help,
.info {
  color: var(--white);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.4em;
  width: 1.4em;
  border-radius: 5px;
  line-height: 0.3em;
  font-size: 1.3em;
  text-align: center;
  display: block;
  font-weight: 500;
}
.help {
  background: var(--orange);
}
.info {
  background: var(--dark-blue);
}
.arrowDownWhite {
  background-image: url(../assets/arrowDownWhite.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1em;
  width: 1em;
  display: block;
  opacity: 0.5;
  margin-top: 0.5em;
  margin-left: auto;
  margin-right: auto;
}
</style>
