<script>
  import { RouterView } from 'vue-router'
  import SearchBar from './components/SearchBar.vue'
  import HomeButton from './components/HomeButton.vue'
  export default {
    name: 'App',
    components: {
      RouterView,
      SearchBar,
      HomeButton,
    },
  };

</script>

<template>
  <div id="home-bg" class="min-w-screen min-h-screen bg-gradient-to-b to-cyan-900 via-20% from-indigo-600">
    <nav class="py-4 grid place-content-center">
      <div
        class="mx-10 py-2 px-4 min-w-full flex flex-row items-center justify-between bg-blend-normal bg-white-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-white/20">
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
    background-size: 100% 100%;
    filter: blur(1px);
  }
</style>
