<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'HeroCard',
    setup() {
        const title = ref('My Hero');
        const description = ref('This is a hero card component.');

        return {
            title,
            description
        };
    }
};
</script>

<style scoped>
/* Add your component styles here */
</style>