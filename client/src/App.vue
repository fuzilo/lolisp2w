<script setup>
  import { RouterView } from 'vue-router'
  import SearchBar from './components/SearchBar.vue'
  import HomeButton from './components/HomeButton.vue'
</script>

<template>
  <div id="home-bg" class="w-screen h-screen">
    <nav class="py-2 bg-blend-normal">
      <div class="mx-10 flex flex-row items-center justify-between">
        <HomeButton />
        <SearchBar />
      </div>
    </nav>
    <div class="container mx-auto z-10">
      <div class="columns-2">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
  #home-bg {
    position: relative;
  }

  #home-bg::before {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/logo-v2.jpg');
    background-size: 100% 100%;
    filter: blur(5px);

  }
</style>
