<template>
 <div class="flex flex-col min-w-[50%]">
  <input
   list="skins"
   class="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
   placeholder="Search"
   :disabled="!skins.length"
   @input="onInput"
  />
  <datalist v-if="searchType === 'name'" id="skins">
   <option class="cursor-pointer" v-for="skin in skins" :key="skin.id" :value="skin.name">
    {{ skin.name }}
   </option>
  </datalist>
  <datalist v-else-if="searchType === 'champion'" id="skins">
   <option class="cursor-pointer" v-for="skin in skins" :key="skin.id" :value="skin.champion">
    {{ skin.champion }}
   </option>
  </datalist>
  <datalist v-else-if="searchType === 'theme'" id="skins">
   <option class="cursor-pointer" v-for="skin in skins" :key="skin.id" :value="skin.theme">
    {{ skin.theme }}
   </option>
  </datalist>
  <div class="flex items-center mt-4 space-x-4">
   <label class="flex items-center">
    <input type="radio" value="name" v-model="searchType" class="form-radio" />
    <span class="ml-2">Skin Name</span>
   </label>
   <label class="flex items-center">
    <input type="radio" value="champion" v-model="searchType" class="form-radio" />
    <span class="ml-2">Champion Name</span>
   </label>
   <label class="flex items-center">
    <input type="radio" value="theme" v-model="searchType" class="form-radio" />
    <span class="ml-2">Skin Theme</span>
   </label>
  </div>
 </div>
</template>

<script setup>
import { useSkinsStore } from '@/stores/skins'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const store = useSkinsStore()
const skins = computed(() => store.getAllSkins)
const selectedSkin = ref([])
const searchType = ref('name')

const onInput = (event) => {
 const value = event.target.value
 selectedSkin.value = store.getAllSkins.filter((skin) => skin.name.includes(value))
 console.log(searchType)
 console.log(selectedSkin.value)
}

const fetchSkins = async () => {
 try {
  const response = await axios.get('http://localhost:8080/skin')
  store.setSkins(response.data)
 } catch (error) {
  console.error(error)
 }
}

onMounted(fetchSkins)
</script>

<style scoped>
/* Add any custom styles here */
</style>
