<template>
  <div id="app">
    <Header />
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
@import "./assets/css/main.css";
</style>
