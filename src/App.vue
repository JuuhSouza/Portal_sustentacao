<template>
  <div>    
    <NavBar/>
    <SearchBar/>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import NavBar from './components/NavBar.vue';
    
export default {
  name : "App",
  components: {
    SearchBar, NavBar
  }
}
</script>


<style scoped>
</style>
