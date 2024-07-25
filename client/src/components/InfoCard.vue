<template>
 <div
  class="glass-card"
 >
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
 </div>
</template>

<script>
export default {
 name: 'InfoCard',
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
