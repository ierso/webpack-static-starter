<template>
  <div>
    <h1>Hello {{ title }}</h1>
    <component-b @update-title="updateTitle"/>
    <div v-for="(post, index) in posts" :key="index">
      <button v-on:click="doStuff(index)">Blah {{index}}</button>
      {{post.title}}
    </div>
  </div>
</template>

<script>
import ComponentB from "./ComponentB";

export default {
  components: {
    ComponentB
  },
  data: function() {
    return {
      title: "THIS IS A TITLE",
      posts: [
        {
          title: "title",
          pages: 5
        },
        {
          title: "title2",
          pages: 6
        }
      ]
    };
  },
  methods: {
    doStuff(index) {
      console.log(this);
      if (this.posts[index].title === "new title") {
        this.posts[index].title = "old title";
      } else {
        this.posts[index].title = "new title";
      }
    },
    updateTitle(message) {
      this.title = message;
    }
  }
};
</script>


