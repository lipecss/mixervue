<template>
  <div class="container">
    <div class="row">
      <div id="main" class="col-md-12">
        <AutoComplete @return-autocomplete="recebeDados('mixer', $event)"/>
        <InfoUser :propLista="lista"/>

      </div>
      <div id="api-information" class="row">
          <div class="col-md-12">
            <p>A Mixer é de propriedade da Microsoft. Este projeto é de código aberto e usa apenas informações públicas diretamente da API MIXER.</p>
            <p>Se você não deseja que seus dados sejam Públicos, entre em contato diretamente com o Mixer</p>
            <p>MixerVue não é afiliado com Mixer</p>
          </div>
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

#api-information{
  border-radius: 25px;
  box-shadow: 12px 9px 82px -12px #0075d5;
  color: white;
  text-align: center;
  font-family: myriad-pro-condensed, sans-serif;
  font-size: 20px;
  width:80%;
  padding:20px;
  margin:0 auto;
  margin-top: 20px;
}
body {
    margin: 15px;
    font-size: 1rem;
    line-height: 1.5;
    background-color: #212c3d ;
}

ul {

list-style-type: none;

}
</style>
