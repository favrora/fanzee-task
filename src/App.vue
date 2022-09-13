<template>
  <div id="app">
    <HeaderMenu />
    <Content />
  </div>
</template>

<script>
import HeaderMenu from "./components/Header";
import Content from "./components/Content";

export default {
  name: "App",
  components: {
    HeaderMenu,
    Content
  },
};
</script>

<style>
@import "./assets/css/app.css";
</style>
