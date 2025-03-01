<script setup>
defineProps({
  btnStyle: {
    type: String,
    required: true,
  },
  btnText: {
    type: String,
    required: true,
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
}
.add {
  background-image: url(../assets/add.svg);
  background-repeat: no-repeat;
  background-size: contain;
  height: 2.7em;
  width: 2.7em;
  position: absolute;
  top: 0em;
  left: 1em;
}
</style>
