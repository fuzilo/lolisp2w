<template>
	<div class="flex items-center">
		<div>
			<label for="champion-filter">Filter by Champion:</label>
			<select class="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
				id="champion-filter" v-model="selectedChampion" @change="filterSkins">
				<option value="">All Champions</option>
				<option :key="champion.id" v-for="champion in champions" :value="champion">{{ champion }}</option>
			</select>
		</div>
		<!-- <input type="text" v-model="searchTerm" placeholder="Search..."
            class="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button @click="search"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </button> -->
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