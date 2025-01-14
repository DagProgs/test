new Vue({
  el: '#app',
  data: {
      currentValue: 1
  },
  methods: {
      rollDice() {
          this.currentValue = Math.floor(Math.random() * 6) + 1;
      }
  }
});
