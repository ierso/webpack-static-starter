<template>
  <div>
    <h1>Component B {{message}}</h1>
    <button v-on:click="buttonClick()">Click Here</button>
    <input type="text" v-model="message">
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      message: "hey"
    };
  },
  methods: {
    buttonClick() {
      this.$emit("update-title", this.message);
    }
  }
};
</script>


