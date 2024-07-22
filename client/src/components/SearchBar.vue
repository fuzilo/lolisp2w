<template>
	<div class="flex flex-col">
		<input list="champions" class="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" id="champion-filter" v-model="selectedChampion" @input="filterSkins" placeholder="Search">
		<datalist id="champions">
		  <option value="">All Champions</option>
		  <option v-for="champion in champions" :key="champion.id" :value="champion">{{ champion }}</option>
		</datalist>
	</div>
</template>

<script>
	import axios from 'axios';
	import { ref } from 'vue';

	export default {
		setup() {
			const champions = ref('');
			const filterSkins = () => {
				axios.get(`http://localhost:8080/skins/search?field=champion&value=${champions.value}`)
					.then((response) => {
						console.log(response.data);
					})
					.catch((error) => {
						console.error(error);
					});
			};

			return {
				filterSkins,
				champions,
			};

		}
	};
</script>

<style scoped>
	/* Add any custom styles here */
</style>