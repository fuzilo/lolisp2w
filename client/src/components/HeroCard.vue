<template>
 <div
  class="glass-card flex-grow"
 >
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
 </div>
</template>

<script>

export default {
 name: 'HeroCard',
 props: {
  title: {
   type: String,
   required: true
  },
  description: {
   type: String,
   required: true
  }
 },
 setup() {
  return {}
 }
}
</script>

<style scoped>
/* Add your component styles here */
</style>
