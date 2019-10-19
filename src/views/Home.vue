<template>
  <div class="container">
    <div class="row">
      <div id="main" class="col-md-12">
        <AutoComplete @return-autocomplete="recebeDados('mixer', $event)"/>
        <InfoUser :propLista="lista"/>
      </div>
    </div>
  </div>
</template>

<script>
const AutoComplete = () => import('@/components/AutoComplete');
const InfoUser = () => import('@/components/InfoUser');

export default {
  name: 'Home',
  data() {
    return {
      lista: {},
    };
  },
  components: {
    AutoComplete,
    InfoUser,
  },
  methods: {
    recebeDados(refValue, eventValue) {
      if (refValue === 'mixer') {
        this.lista = eventValue;
      }
    },
  },
};
</script>

<style>
.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

body {
    margin: 15px;
    font-size: 1rem;
    line-height: 1.5;
    background-color: #212c3d ;
}
</style>
