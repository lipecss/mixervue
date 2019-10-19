<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {

    };
  },
};
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    -webkit-border-radius: 3em;
}
::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    -webkit-border-radius: 3em;
}
/* Handle */
::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}


</style>
