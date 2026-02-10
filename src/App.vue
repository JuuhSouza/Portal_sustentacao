<template>
  <div>    
    <NavBar/>
    <IframeSite/>
    <SearchBar/>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import NavBar from './components/NavBar.vue';
import SiteRealTime from './components/SiteRealTime.vue';
    
export default {
  name : "App",
  components: {
    SearchBar, NavBar, SiteRealTime
  }
}
</script>


<style scoped>
</style>
