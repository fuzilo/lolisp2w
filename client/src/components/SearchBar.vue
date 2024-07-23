<template>
 <div class="flex flex-col min-w-[40vw]">
  <input
   list="skins"
   class="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
   placeholder="Search"
  />
  <datalist id="skins">
   <option
    class="cursor-pointer"
    v-for="skin in skins"
    :key="skin.id"
    :value="skin.name"
    @click="() => $router.push(`http://localhost:8080/skin/${skin.id}`)"
   >
    {{ skin.name }}
   </option>
  </datalist>
 </div>
</template>

<script>
import axios from 'axios'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
 setup() {
  const store = useStore()

  const getSkins = async () => {
   try {
    const response = await axios.get('http://localhost:8080/skin')
    store.commit('setSkins', response.data)
   } catch (error) {
    console.error(error)
   }
  }

  return {
   skins: computed(() => store.state.skins),
   getSkins
  }
 },
 created() {
  this.getSkins()
 }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
