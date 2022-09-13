<template>
  <div id="app">
    <HeaderMenu />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./MainPageContent";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Content
  },
};
</script>

<style>
@import "./assets/css/app.css";
</style>
