<template>
  <div>
    <div class="statsDiv">
      <div class="fieldDiv">
        <h3>
          Доходы
          <MyButton btn-style="add" @click="addNewIncome = !addNewIncome" />
        </h3>
        <div class="addDiv" v-if="addNewIncome">
          <input type="text" v-model="incomeHeader" placeholder="Заголовок дохода" />
          <input type="text" v-model="incomeAmount" placeholder="Сумма дохода" />
          <select v-model="incomeRepetition">
            <option disabled>Повторяймость дохода</option>
            <option>День</option>
            <option>Месяц</option>
            <option>Год</option>
          </select>
          <MyButton
            btn-style="save"
            @click="saveNewObject(incomeHeader, incomeAmount, incomeRepetition, 'incomes')"
          />
        </div>
        <div v-for="income in userData?.finances?.incomes" :key="income.header" class="valueDiv">
          <p>{{ income.header }}</p>
          <p class="amount">{{ income.amount }}</p>
        </div>
        <div class="totalDiv" v-if="userData?.finances?.incomes.length > 0">
          <p class="total">{{ totalIncome }}</p>
          <p class="totalUnits">₽ / Месяц</p>
        </div>
      </div>
      <div class="fieldDiv">
        <h3>
          Расходы
          <MyButton btn-style="add" @click="addNewCost = !addNewCost" />
        </h3>
        <div class="addDiv" v-if="addNewCost">
          <input type="text" v-model="costHeader" placeholder="Заголовок расхода" />
          <input type="text" v-model="costAmount" placeholder="Сумма расхода" />
          <select v-model="costRepetition">
            <option disabled>Повторяймость расхода</option>
            <option>День</option>
            <option>Месяц</option>
            <option>Год</option>
          </select>
          <MyButton
            btn-style="save"
            @click="saveNewObject(costHeader, costAmount, costRepetition, 'costs')"
          />
        </div>
        <div v-for="cost in userData?.finances?.costs" :key="cost.header" class="valueDiv">
          <p>{{ cost.header }}</p>
          <p class="amount">{{ cost.amount }}</p>
        </div>
        <div class="totalDiv" v-if="userData?.finances?.costs.length > 0">
          <p class="total">{{ totalCost }}</p>
          <p class="totalUnits">₽ / Месяц</p>
        </div>
      </div>
    </div>
    <p v-if="userData?.finances?.costs.length > 0 && userData?.finances?.incomes.length > 0">
      {{ profit }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
  auth: {
    type: Object,
    required: true,
  },
})

const { userData, auth } = toRefs(props)

const addNewIncome = ref(false)
const addNewCost = ref(false)
const incomeHeader = ref('')
const incomeAmount = ref('')
const incomeRepetition = ref('')
const costHeader = ref('')
const costAmount = ref('')
const costRepetition = ref('')

const totalIncome = computed(() => {
  let sum = 0
  for (let i = 0; i < userData.value.finances.incomes.length; i++) {
    const element = userData.value.finances.incomes[i]
    sum += element.amount
  }
  return sum
})

const totalCost = computed(() => {
  let sum = 0
  for (let i = 0; i < userData.value.finances.costs.length; i++) {
    const element = userData.value.finances.costs[i]
    sum += element.amount
  }
  return sum
})

const profit = computed(() => {
  return totalIncome.value - totalCost.value
})

const saveNewObject = async (header, amount, repetition, arrayName) => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const arrayRef = userData.value.finances[arrayName]
  const amountInt = parseInt(amount)
  const newObject = {
    header: header,
    amount: amountInt,
    repetition: repetition,
  }
  arrayRef.push(newObject)
  try {
    await updateDoc(userRef, {
      finances: userData.value.finances,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>

<style scoped>
.statsDiv {
  display: grid;
}
.fieldDiv {
  position: relative;
}
.addDiv {
  padding-bottom: 3em;
  position: relative;
}
.valueDiv {
  display: grid;
  grid-template-columns: auto auto;
  margin: 0em 1em;
  padding: 0em 0.5em;
  border-bottom: 1px solid #10101022;
}
.amount {
  text-align: right;
}
.totalDiv {
  display: flex;
  align-items: center;
  justify-content: center;
}
.total {
  font-size: 1.2em;
}
.totalUnits {
  opacity: 0.7;
  margin-left: 0.5em;
}
@media (min-width: 768px) {
  .statsDiv {
    grid-template-columns: auto auto;
  }
}
</style>
