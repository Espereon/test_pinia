<script setup>
import { useCounterStore, useFetcherStore } from "./store/index";
import { onMounted, ref } from "vue";

const counter = useCounterStore();
const fetcher = useFetcherStore();

onMounted(() => {
  fetcher.fetchItems();
});

const nameInput = ref("");
const priceInput = ref("");
const yearInput = ref("");

async function handleSubmit() {
  const newItem = {
    name: nameInput.value,
    price: priceInput.value,
    year: yearInput.value,
  };
  await fetcher.addItem(newItem);
  nameInput.value = "";
  priceInput.value = "";
  yearInput.value = "";
}
</script>

<template>
  <div>
    <input v-model="nameInput" placeholder="название" type="text" />
    <input v-model="priceInput" placeholder="цена" type="text" />
    <input v-model="yearInput" placeholder="год" type="text" />
    <button @click="handleSubmit()">Добавить данные</button>
    <h1>Count is {{ counter.count }}</h1>
    <button @click="counter.increment(5)">Увеличение</button>
    <button @click="counter.waitAndAdd">Увеличение с задержкой</button>
    <div v-for="item in fetcher.items" :key="item.id">
      <p>Наименование товара: {{ item.name }}</p>
      <b> Цена: {{ item.price }} </b>
      <span> Год производства: {{ item.year }}</span>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
