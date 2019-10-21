<template>
  <div class="">
    <div id="principal-box" class="row" :style="{background: propLista.type ? `url(${propLista.type.backgroundUrl})` : '#151d28' }">
        <div class="col-md-3">
          <a id="player-image" :href="channelLink+propLista.token" target="_blank">
            <img v-if="propLista.user.avatarUrl != null" id="avatar" v-bind:src="propLista.user.avatarUrl" alt="Game Image">
            <img v-else id="avatar" src="https://mixer.com/_latest/assets/images/main/avatars/default.png" alt="Game Image">
          </a>
          <div v-if="propLista.user.social" class="row social-medias">
            <div v-if="propLista.user.social.facebook" class="col-md-3 socials">
              <a :href="propLista.user.social.facebook" id="btn-facebook" target="_blank"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook-f' }"/></a>
            </div>
            <div v-if="propLista.user.social.instagram"  class="col-md-3 socials">
              <a :href="propLista.user.social.instagram" id="btn-instagram" target="_blank"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"/></a>
            </div>
            <div v-if="propLista.user.social.twitter" class="col-md-3 socials">
              <a :href="propLista.user.social.twitter" id="btn-twitter" target="_blank"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"/></a>
            </div>
            <div v-if="propLista.user.social.youtube" class="col-md-3 socials">
              <a :href="propLista.user.social.youtube" id="btn-youtube" target="_blank"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'youtube' }"/></a>
            </div>
          </div>
        </div>
        <div class="col-md-9 info">
            <div class="row mixerbar-color">
              <div v-if="propLista.type" id="game-image" class="col-md-2">
                <a :href="gameStreamsLink" target="_blank">
                  <img :src="propLista.type.coverUrl" alt="">
                </a>
              </div>

              <div id="playing" class="col-md-10">
                  <div class="row">
                      <div id="player" class="col-md-8">
                          <i>{{propLista.token}} </i>
                          <img v-if="propLista.partnered" src="img/verified.png">
                      </div>

                      <div id="role-verified" class="col-md-2">
                          <i>VERIFICADO</i>
                      </div>

                      <div id="role-pro" class="col-md-2">
                          <i>PRO</i>
                      </div>
                  </div>

                  <div class="row">
                    <div v-if="propLista.type" id="playing" class="col-md-12">
                      <h5 v-if="propLista.online">Jogando atualmente {{propLista.type.name}}</h5>
                      <h5 v-else>Estava jogando {{propLista.type.name}}</h5>
                      <h5 id="followers">{{propLista.numFollowers.toLocaleString('pt-BR')}} SEGUIDORES  </h5>
                    </div>

                    <div v-else id="playing" class="col-md-12">
                      <h5 v-if="propLista.online">Currently playing {{propLista.type.name}}</h5>
                      <h5 v-else>Não iniciou uma Live ainda</h5>
                      <h5 id="followers">{{propLista.numFollowers.toLocaleString('pt-BR')}} SEGUIDORES  </h5>
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
                <span id="xp"><font-awesome-icon icon="hat-wizard" /> {{propLista.user.experience.toLocaleString('pt-BR')}} XP</span>
                <span id="sparks">
                <img src="img/spark-coin.svg" height="20px" width="20px" />
                <span> {{propLista.user.sparks.toLocaleString('pt-BR')}}</span>
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

    <div id="live-box" class="row green" v-if="propLista.online">
      <div class="col-md-8">
        <iframe id="embed-player" :src="video"></iframe>
      </div>
      <div class="col-md-4">
        <iframe id="embed-chat" :src="chat"></iframe>
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
                    <td>Apelido</td>
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
                <td>Apelido</td>
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


    <div id="aboutme-box" class="row tomato">
      <p>Se você tiver alguma dúvida ou sugestão, me envie um DM no <a href="https://instagram.com/felipecss" target="_blank" rel="noopener noreferrer">@Felipecss</a></p>
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
      type: [Object, Array, String],
      required: true,
    },
  },
  methods:{

  },
  computed: {
    video: {
      get: function() {
        return `https://mixer.com/embed/player/${this.propLista.token}?muted=true&hideChannel=true`
      }
    },
    chat: {
      get: function() {
        return `https://mixer.com/embed/chat/${this.propLista.token}?composer=false`
      }
    },
    gameStreamsLink: {
      get: function() {
        if(this.propLista.type){
          return `https://mixer.com/browse/games/${this.propLista.typeId}`
        }else{
          return ''
        }
      }
    }
  },
};
</script>

<style scoped>

#followers{
  font-family: 'Anton', sans-serif;
  text-align: center;
  font-size: 1.2rem;
}

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
    font-family: myriad-pro, sans-serif;
    /* filter: contrast(45%) */
}


#avatar{
    border-radius: 100%;
    /* padding: 10px; */
    padding-left: 0px;
    width: 100%;
    margin: 15px 0px 0px;
    border: 6px solid rgb(23, 30, 42);
}

.social-medias{
  padding-top: 15px;
  /* padding: 10px; */
}

.socials{
  margin: 0px;
  padding: 0px;
}

#btn-facebook{
  color: #fff;
  background-color: #255c95;
  border-radius: 100%;
  font-size: 25px;
  padding: 8px 18px;
}

#btn-instagram{
  color: #fff;
  background-color: #d93175;
  border-radius: 100%;
  font-size: 25px;
  padding: 8px 13px;
}

#btn-twitter{
  color: #fff;
  background-color: #00b4e0;
  border-radius: 100%;
  font-size: 25px;
  padding: 8px 13px;
}

#btn-youtube{
  color: #fff;
  background-color: #e52d27;
  border-radius: 100%;
  font-size: 25px;
  padding: 8px 13px;
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
  font-family: myriad-pro-condensed, sans-serif;
}

#player img{
  height: 20px;
  width: 20px;
}

#role-verified{
  margin: 0 -18px 0 0;
}

#role-verified i{
  color: #299fff;
  font-size: 20px;
  font-family: anton, sans-serif;
  font-weight: 400;
  font-style: normal;
}

#role-pro{
  color: #e175ff;
}

#role-pro i {
  font-size: 20px;
  font-family: anton, sans-serif;
  font-weight: 400;
  font-style: normal;
}

#playing{
  color: white;
  font-size: 30px;
  font-family: myriad-pro-condensed, sans-serif;
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

#aboutme-box{
  background: rgba(40, 40, 40, 0.8);
  color: white;
  border-radius: 25px;
  box-shadow: 12px 9px 82px -12px #df158a;
  padding: 20px;
  margin-top: 15px;
  margin-bottom:  15px;
  padding: 20px;
  border: 1px solid #df158a;
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
