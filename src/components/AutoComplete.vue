<template>
  <div class="">
    <div class="row">
      <div class="col-md-4 offset-md-4 text-center">
        <a class="image-logo" href="#">
          <img style="max-width:250px; margin-top: -7px;" v-bind:src="mixerLogoURL" />
        </a>
      </div>
    </div>
    <div class="row searsher">
      <div class="col-md-6 offset-md-3">
        <input
          v-model="username"
          id="username"
          class="form-control"
          type="text"
          autocomplete="off"
          placeholder="Digite o nome do canal"
        />
      </div>
    </div>
    <div id="teste" class="row">
      <div id="main-message" class="col-md-12">
        <span id="message">{{initialMessage}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AutoComplete',
  data() {
    return {
      mixerLogoURL:
        'img/mixervue_logo2.png',
        // 'https://raw.githubusercontent.com/mixer/branding-kit/master/png/MixerMerge_Black.png',
      username: '',
      data: '',
      errors: '',
      initialMessage: 'Dê um vue(view) no seu canal preferido e veja todas as informaçoes!'
    };
  },
  methods: {
    async buscarUsuario() {
      this.errors = ''
      let url = `https://mixer.com/api/v1/channels/${this.username}`;
      await axios
        .get(url)
        .then((response) => {
          // JSON responses are automatically parsed.
          //this.data = response.data;
          this.$emit('return-autocomplete', response.data);
        })
        .catch((e) => {
          this.errors = e;
        });
    },
  },
  watch: {
    username(valorNovo, valorAntigo) {
      if (valorNovo !== valorAntigo && valorNovo !== '') {
        this.buscarUsuario();
      }

      let canErase = false
      let input = document.getElementById('username').value
      let msg = document.getElementById('message')

      if(input.length > 0){
        canErase = true
        msg.textContent=" "
      }else if(canErase && input == '' ){
        canErase = false
        msg.textContent=" "
      }else{
        msg.textContent="Dê um vue(view) 👀 no seu canal preferido e veja todas as informaçoes!"
        canErase = false
        console.log(input)
      }
    },
  },
};
</script>

<style scoped>

input, input[type=text]{
  background: #131d2c;
  border-radius: 2px;
  padding: 0.7em;
  font-size: 1.1em;
  font-family: myriad-pro-condensed, sans-serif;
  color: #fff;
  border: 2px solid transparent;
  width: 100%;
}

.searsher{
  padding: 10px
}

#username{

 border-radius: 25px;
}

#main-message{
  padding: 15px;
}

#teste{
  color: #fff!important;
  text-align: center;
  font-size: 2rem;
  font-family: 'Catamaran', sans-serif;
  padding-top: 10px;
  padding: 0px;
}

.red{
  background: red;
}
.green{
  background: green;
}
.orange{
  background: orange;
}
.blue{
  background: blue;
}
.tomato{
  background: tomato
}
</style>
