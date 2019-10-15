<template>
  <div class="">

    <div class="row">
      <div class="col-md-4 offset-md-4 text-center">
        <a class="image-logo" href="#">
          <img style="max-width:250px; margin-top: -7px;" v-bind:src="mixerLogoURL" />
        </a>
      </div>
    </div>
    <div id="row">
      <div class="col-md-8 offset-md-2">
        <input
          v-model="username"
          id="username"
          class="form-control"
          type="text"
          autocomplete="off"
          placeholder="Enter your username..."
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p>{{ data }}</p>
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
        'https://raw.githubusercontent.com/mixer/branding-kit/master/png/MixerMerge_Black.png',
      username: '',
      data: '',
    };
  },
  methods: {
    buscarUsuario() {
      const url = `https://mixer.com/api/v1/channels/${this.username}`;
      axios
        .get(url)
        .then((response) => {
          // JSON responses are automatically parsed.
          //this.data = response.data;
          this.$emit('return-autocomplete', response.data)
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  watch: {
    username(valorNovo, valorAntigo) {
      if (valorNovo !== valorAntigo && valorNovo !== '') {
        this.buscarUsuario();
      } else if (valorNovo === '') {
        this.data = ' ';
      }
    },
  },
};
</script>

<style scoped>

</style>
