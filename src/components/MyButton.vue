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
  color: #101010ff;
  border-radius: 5px;
  padding: 5px 1em;
  line-height: 3em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.delete {
  background-image: url(../assets/delete.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  bottom: 1em;
  right: 1em;
}
.edit {
  background-image: url(../assets/edit.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 1;
  opacity: 0.7;
}
.save {
  background-image: url(../assets/save.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  bottom: 1em;
  left: 1em;
}
.cancelTop {
  background-image: url(../assets/cancel.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  top: 1em;
  right: 1em;
  border: 1px solid #101010ff;
  border-radius: 5px;
}
.cancelBottom {
  background-image: url(../assets/cancel.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  bottom: 1em;
  left: 4em;
  border: 1px solid #101010ff;
  border-radius: 5px;
}
.add {
  background-image: url(../assets/add.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.8em;
  width: 1.8em;
  position: absolute;
  top: 0em;
  left: 0em;
}
.back {
  background-image: url(../assets/back.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  bottom: 1em;
  left: 0;
  right: 0;
  margin-inline: auto;
}
.arrowDown {
  background-image: url(../assets/arrowDown.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.7em;
  width: 1.7em;
  position: absolute;
  left: 1em;
  top: 1em;
  opacity: 0.3;
}
.arrowUp {
  background-image: url(../assets/arrowDown.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.7em;
  width: 1.7em;
  position: absolute;
  left: 1em;
  top: 1em;
  opacity: 0.3;
  transform: rotate(180deg);
}
.info {
  background-image: url(../assets/info.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 1em;
  width: 1em;
  border: 1px solid #101010ff;
  border-radius: 5px;
  position: absolute;
  right: -2em;
  top: 0.4em;
}
.complete {
  background-image: url(../assets/complete.svg);
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  bottom: 1em;
  left: 0;
  right: 0;
  margin-inline: auto;
  height: 1.5em;
  width: 1.5em;
  border: 1px solid #101010ff;
  border-radius: 5px;
}
</style>
