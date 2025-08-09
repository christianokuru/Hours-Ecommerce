import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    payload: null,
  }),
  actions: {
    setPayload(payload) {
      this.payload = payload;
    },
    clearPayload() {
      this.payload = null;
    }
  }
});
