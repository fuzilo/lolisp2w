<template>
    <img @click="$router.push('/')" id="home-button"
        class="text-white rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 h-8" alt="Home" src="@/assets/img/logo-v2.jpg"/>
</template>

<style scoped>
    #home-button {
        cursor: pointer;
        object-fit: cover;
        object-position: 0% 65%;
    }
</style>