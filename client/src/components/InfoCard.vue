<template>
    <div>
        <!-- <h1>{{ title }}</h1>
        <p>{{ description }}</p> -->
    </div>
</template>

<!-- <script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'InfoCard',
    setup() {
        const title = ref('');
        const description = ref('');

        onMounted(async () => {
            try {
                const response = await axios.get('https://api.example.com/info');
                title.value = response.data.title;
                description.value = response.data.description;
            } catch (error) {
                console.error(error);
            }
        });

        return {
            title,
            description,
        };
    },
};
</script>
 -->
<style scoped>
/* Add your component styles here */
</style>