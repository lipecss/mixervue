<template>
  <div class="">
    <div class="row red">
        <div class="col-md-5">
            <img v-bind:src="propLista.user.avatarUrl" alt="">
        </div>
        <div class="col-md-7">
            <p> {{propLista.name}} {{propLista.audience}}</p>
            <p>{{propLista.viewersCurrent}}</p>
            <p> Currently playing {{propLista.type.name}}</p>
            <div id='stats'>
              <span id="level">Level: {{propLista.user.level}}</span>
              <span id="xp"> Xp: {{propLista.user.experience}}</span>
              <span id="sparks">
                <i> Sparks: {{propLista.user.sparks}}</i>
              </span>
              <span id="created"> {{propLista.createdAt | formatDate}}</span>
            </div>
        </div>
    </div>
    <div class="about row green">
        
    </div>
  </div>
</template>

<script>

export default {
  name: 'infoUser',
  data() {
    return {
      iframe: {
        src: 'https://mixer.com/embed/player/' + propLista.token,
      }
    };
  },
  props: {
    propLista: {
      type: [Object],
      required: true,
    },
  },
  methods: {
    formatDate(date){
      return moment(date).format('LL');
    }
  }
};
</script>

<style scoped>
.red{
  background: red;
}
.green{
  background: green;
}
.orange{
  background: orange;
}
</style>