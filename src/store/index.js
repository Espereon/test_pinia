import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 0,
    };
  },
  actions: {
    increment(i) {
      this.count += i;
    },
    async waitAndAdd() {
      setTimeout(() => {
        this.count++;
      }, 2000);
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});

export const useFetcherStore = defineStore("data", {
  state: () => ({
    items: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await axios.get(
          "https://13c7dcadda889182.mokky.dev/items"
        );
        this.items = response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async addItem(newData) {
      try {
        const response = await axios.post(
          "https://13c7dcadda889182.mokky.dev/items",
          newData
        );
        if (response.status === 201 || response.status === 200) {
          this.fetchItems();
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
});
