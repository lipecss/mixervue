<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
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
    recebeDados(refValue, eventValue){
      if(refValue === 'mixer'){
        this.lista = eventValue
      }
    }
  }
};
</script>

<style>

</style>
