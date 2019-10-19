<template>
  <div class="">
    <div id="principal-box" class="row" :style="{ background: `url(${propLista.type.backgroundUrl})` }">
        <div class="col-md-3">
          <a :href="channelLink+propLista.token" target="_blank">
            <img id="avatar" v-bind:src="propLista.user.avatarUrl" alt="Game Image">
          </a>
        </div>
        <div class="col-md-9 info">
            <div class="row mixerbar-color">
              <div id="game-image" class="col-md-2">
                <a :href="gameStreamsLink" target="_blank">
                  <img :src="propLista.type.coverUrl" alt="">
                </a>
              </div>

              <div id="playing" class="col-md-10">
                  <div class="row">
                      <div id="player" class="col-md-12">
                          <i>{{propLista.token}} </i>
                          <img v-if="propLista.partnered" src="img/verified.png">
                      </div>
                  </div>

                  <div class="row">
                    <div id="playing" class="col-md-12">
                      <h5 v-if="propLista.online">Currently playing {{propLista.type.name}}</h5>
                      <h5 v-else>Was playing {{propLista.type.name}}</h5>
                    </div>
                  </div>

                  <div v-if="propLista.online" class="row live-status">
                    <div id="live-contet" class="col-md-7">
                        <i id="family" v-if="propLista.audience == 'family'">Audiencia para toda a família</i>
                        <i id="teen" v-else-if="propLista.audience == 'teen'">Audiencia para maiores de 16 anos</i>
                        <i id="eighteen" v-else>Audiencia para maiores de 18 anos</i>
                    </div>

                    <div class="col-md-5">
                        <i id="live-couting"><font-awesome-icon icon="eye" /> {{propLista.viewersCurrent}}</i>
                    </div>
                  </div>
              </div>
            </div>

            <div class="row">
              <span id="textlive">{{propLista.name}}</span>
            </div>

            <div class="row">
              <div id="infos" class="col-md-12">
                <span id="level"><font-awesome-icon icon="sort-amount-up-alt" /> Level: {{propLista.user.level}}</span>
                <span id="xp"><font-awesome-icon icon="hat-wizard" /> XP: {{propLista.user.experience}}</span>
                <span id="sparks">
                <img src="img/spark-coin.svg" height="20px" width="20px" />
                <span> {{propLista.user.sparks}}</span>
              </span>
              <span id="created"> <font-awesome-icon icon="calendar-alt" /> {{ propLista.createdAt | moment("LL") }}</span>
              </div>
            </div>

            <div id="bio" class="row">
                <div class="col-md">
                    <p v-if="propLista.user.bio">{{propLista.user.bio}}</p>
                    <p v-else>Não há nada no momento para se mostrar</p>
                </div>
            </div>
        </div>
    </div>

    <div id="about-box" v-if="propLista.description" class="row">
      <div class="col-md-12">
        <i id="aboutwho">Sobre o {{propLista.token}}</i>
        <br>
      </div>
      <div class="row">
        <div class="col-md-12" v-html="propLista.description">
        </div>
      </div>
    </div>

    <div id="live-box" class="row green" v-if="propLista.online">
        <div class="col-md-8">
            <iframe id="embed-player" :src="video"></iframe>
        </div>
        <div class="col-md-4">
            <iframe id="embed-chat" :src="chat"></iframe>
        </div>
    </div>

    <div id="analytics-box" class="row orange">
      <div class="col-md-5">
          <div class="row">
              <div class="col-md-12">
                <select id="spark-table" v-model="selectSpark" @change="onChange('spark')" class="custom-select">
                  <option v-for="(option, index) in optionsSpark" :selected="index == 0" :key="index" :value="option.key">
                      {{option.value}}
                  </option>
                </select>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                <table class="table table-dark">
                  <tr class="">
                    <td>Logo</td>
                    <td>Username</td>
                    <td>Sparks</td>
                  </tr>
                  <tr v-for="(spark, index) in leaderboard"  v-bind:key="index" :spark="spark">
                    <td>
                      <img style="width: 40px" :src="spark.avatarUrl" alt="">
                    </td>
                    <td>{{spark.username}}</td>
                    <td>{{spark.statValue}}</td>
                  </tr>
                </table>
              </div>
          </div>
      </div>
      <div class="col-md-5">
        <div class="row">
          <div class="col-md-12">
            <select id="ember-table" v-model="selectEmber" @change="onChange('ember')" class="custom-select">
                <option :selected="index == 0" v-for="(option, index) in optionsEmber" :key="index" :value="option.key">
                    {{option.value}}
                </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <table class="table table-dark">
              <tr class="">
                <td>Logo</td>
                <td>Username</td>
                <td>Sparks</td>
              </tr>
              <tr v-for="(spark, index) in leaderboard"  v-bind:key="index" :spark="spark">
                <td>
                  <img style="width: 40px" :src="spark.avatarUrl" alt="">
                </td>
                <td>{{spark.username}}</td>
                <td>{{spark.statValue}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>


    <div class="row tomato">

    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'infoUser',
  created() {
      //const sparksWeeklyURL = `https://mixer.com/api/v2/leaderboards/sparks-weekly/channels/${this.propLista.id}`;
      //const sparksMonthlyURL = `https://mixer.com/api/v2/leaderboards/sparks-monthly/channels/${this.propLista.id}`;
      //const sparksYearlyURL = `https://mixer.com/api/v2/leaderboards/sparks-yearly/${this.propLista.id}`;
      const sparksAlltimeURL = `https://mixer.com/api/v2/leaderboards/sparks-alltime/channels/${this.propLista.id}`;
      axios
        .get(sparksAlltimeURL)
        .then((response) => {
          // JSON responses are automatically parsed.
          this.leaderboard = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
  },
  data() {
    return {
      channelLink: 'http://mixer.com/',
      selectSpark: '',
      selectEmber: '',
      optionsSpark: [
        { 'key': 0, 'value': 'Sparks Semanal' },
        { 'key': 1, 'value': 'Sparks Mensal' },
        { 'key': 2, 'value': 'Sparks Anual' },
        { 'key': 3, 'value': 'Sparks Tempo todo' }
      ],
      optionsEmber: [
        { 'key': 0, 'value': 'Embers Semanal' },
        { 'key': 1, 'value': 'Embers Mensal' },
        { 'key': 2, 'value': 'Embers Anual' },
        { 'key': 3, 'value': 'Embers Tempo todo' }
      ],
      leaderboard: null,
    };
  },
  props: {
    propLista: {
      type: [Object],
      required: true,
    },
  },
  methods:{

  },
  computed: {
    video: {
      get: function() {
        return `https://mixer.com/embed/player/${this.propLista.token}?disableCostream=true&muted=true&hideChannel=true`
      }
    },
    chat: {
      get: function() {
        return `https://mixer.com/embed/chat/${this.propLista.token}?composer=false`
      }
    },
    gameStreamsLink: {
      get: function() {
        return `https://mixer.com/browse/games/${this.propLista.typeId}`
      }
    }
  },
};
</script>

<style scoped>

#aboutwho{
  font-family: industry, sans-serif;
  font-style: normal;
  color: rgba(255,255,255,0.6);
  font-weight: 600;

}

#principal-box{
    color: #ffffff;
    border-radius: 25px;
    box-shadow: 12px 9px 82px -12px #0075d5;
    padding: 20px;
    margin-bottom:  15px;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    border: 1px solid rgba(255,255,255,0.6);
    /* filter: contrast(45%) */
}


#avatar{
    border-radius: 100%;
    padding: 10px;
    padding-left: 0px;
    width: 100%;
    margin: 15px 0px 0px;
}

#game-image{
  padding: 0px;
  height: auto;
  border-radius: 5px;
}

#game-image img{
  height: 100%;
  width: 100%
}

#player{
  margin: 0;
}

#player img{
  height: 20px;
  width: 20px;
}

#playing{
  color: white;
  font-size: 30px;

}

#infos{
  padding: 10px
}

#textlive{
  background: #df158a;
  border-radius: 25px;
  border: 1px solid rgba(255,255,255,0.6);
  color: rgb(255, 255, 255);
  padding: 10px;
  margin: auto;
  margin-top: 10px;
}

#level, #xp, #sparks, #created {
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.747);
    line-height: 65px;
    padding: 10px 30px;
    white-space: nowrap;
    font-weight: bold;
}

#family{
  color: #14ab57;
}

#teen{
  color: #14ab57;
}

#eighteen{
  color: #fe5353;
}

#about-box{
    color: white;
    background: #151d28;
    border-radius: 25px;
    box-shadow: 12px 9px 82px -12px #0075d5;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.6);
}
#about-box >>> p {
    margin: 0 !important;
}

#about-box >>> img {
  max-width: 100%
}


#live-box{
    color: white;
    background: #151d28;
    border-radius: 25px;
    box-shadow: 12px 9px 82px -12px #0075d5;
    padding: 20px;
    margin-top: 15px;
    margin-bottom:  15px;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.6);
}

#analytics-box{
    color: white;
    background: #151d28;
    border-radius: 25px;
    box-shadow: 12px 9px 82px -12px #0075d5;
    padding: 20px;
    margin-top: 15px;
    margin-bottom:  15px;
    border: 1px solid rgba(255,255,255,0.6);
}
#embed-player {
    border: 0px;
    width: 100%;
    height: 397px;
    border-radius: 25px;
}

#embed-chat{
    border: 0px;
    width: 100%;
    height: 397px;
    border-radius: 25px;
}

table {
  margin-top: 20px;
  width: 100%;
}

td {
  text-align: center;
  height: 50px;
}

th {
  text-align: left;
  height: 50px;
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
  background: tomato;
}
.purple{
  background: purple;
}
.mixerbar-color{
  background: #29374a;
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 5px
}

.live-status{
  font-size: 12pt;
  padding-bottom: 10px;
  padding-top: 20px;
  text-align: left;
}

#live-couting{
  background: #212c3d;
  padding: 6px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
</style>
