<script>
import { RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue'
import HomeButton from './components/HomeButton.vue'
export default {
 name: 'App',
 components: {
  RouterView,
  SearchBar,
  HomeButton
 }
}
</script>

<template>
 <div
  id="home-bg"
  class="min-w-screen min-h-screen bg-gradient-to-b to-cyan-900 via-20% from-indigo-600"
 >
  <nav class="py-4 flex items-center justify-center">
   <div class="container mx-auto py-2 px-4 flex flex-row items-center justify-between glass-card">
    <HomeButton />
    <SearchBar />
   </div>
  </nav>
  <div class="container mx-auto grid grid-flow-col gap-4 z-10 min-h-[80vh] columns-2">
   <RouterView />
  </div>
 </div>
</template>

<style scoped>
#home-bg {
 position: relative;
}

#home-bg::before {
 content: '';
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-size: 100% 100%;
 filter: blur(1px);
 opacity: 0.1;
 background-image: url('@/assets/img/logo-v2.jpg');
}
</style>
