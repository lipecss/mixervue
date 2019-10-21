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

input{
  background: #131d2c;
  border-radius: 2px;
  outline: 0 !important;
  padding: 0.7em;
  font-size: 0.9em;
  color: #fff;
  border: 2px solid transparent;
  width: 100%;
}

/*
  WEB KIT
*/

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
