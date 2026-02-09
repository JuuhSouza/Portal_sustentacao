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
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
