<template>
    <div class="flex items-center">
        <input
            type="text"
            v-model="searchTerm"
            placeholder="Search..."
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            @click="search"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Search
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: '',
        };
    },
    methods: {
        search() {
            // Implement your search logic here
            console.log('Searching for:', this.searchTerm);
        },
    },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>