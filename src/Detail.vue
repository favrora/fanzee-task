<template>
  <div id="detail">
    <Header />

    Detail

    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "Detail",
  components: {
    Header,
    Footer
  },
};
</script>

<style>
  @import "./assets/css/detail.css";
</style>
