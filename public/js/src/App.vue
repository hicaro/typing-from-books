<template>
  <div id="app">
    <div class="container" >
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <h1>Typing From Books</h1>
          <p>
             Learn new facts and make your ming wander while practicing your typing!
          </p>

          <div @click="returnFocus" class="excerpt-container">

            <box :letters="chars" :status="status" :focusIn="hasFocus" :wordCount="wordCount" :letterCount="charAt"></box>
            <input class="textarea" autofocus @keypress="onKeyPress" @focusout="onFocusOut" @focusin="onFocusIn" ref="textarea"/>

            <div class="stats-overlay" v-if="finished">
              <div class="text">
                <div class="row">
                  <div class="col-md-4">
                    <p class="">WPM</p>
                    <p class="">{{wpm}}</p>
                  </div>
                  <div class="col-md-4">
                    <p class="">Time</p>
                    <p class="">{{timeReport}}</p>
                  </div>
                  <div class="col-md-4">
                    <p class="">Accuracy</p>
                    <p class="">{{accuracy}} %</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="row">
            <button class="btn btn-primary pull-right" @click="fetchExcerpt">Practice new excerpt</button>
            <button class="btn btn-primary pull-right" @click="reset">Reset</button>
          </div>

          <div class="row">
            <book :title="title" :url="url" :image="image" :promo="promo"></book>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Box from './components/Box.vue';
  import Book from './components/Book.vue';

  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      Box, Book
    },
    data () {
      return {
        chars: [],
        length: 0,
        status: [], // has type status for each letter
        wordCount: 0,
        charAt: 0,
        startTime: 0,
        totalTime: 0,
        hasFocus: true,
        finished: false,
        errorCount: 0,
        accuracy: 0,
        wpm: 0,
        title: "",
        url: "",
        image: "",
        promo: ""
      }
    },
    computed: {
      timeReport: function () {
        let minutes = parseInt(this.totalTime / 60);
        let seconds = this.totalTime % 60;

        return ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2);
      }
    },
    methods: {
      reset: function () {
        this.status     = new Array(this.length).fill(false);

        this.wordCount  = 0;
        this.charAt     = 0;
        this.errorCount = 0;
        this.finished   = false;

        this.returnFocus();
      },
      fetchExcerpt: function () {
        const $this = this;
        axios.get('/excerpt')
          .then((response) => {
              $this.chars   = response.data.letters;
              $this.length  = response.data.length;

              $this.title   = response.data.title;
              $this.url     = response.data.url;
              $this.image   = response.data.image;
              $this.promo   = response.data.promo;

              this.reset();
          })
          .catch(() => {

          });
      },
      onKeyPress: function (event) {
        let id = this.charAt;
        let element = document.getElementById(id);

        // disconsider shift key
        if(event.keyCode != 16 && id < this.length) {
          // get started time
          if (this.charAt == 0) {
            this.startTime = new Date();
          }
          // verify if typed key was correct
          if(element.innerHTML == event.key) {
            this.status[id] = true;
          } else {
            this.errorCount++;
          }

          this.charAt++;
          // spacebar was hit - signal of new word
          if(element.innerHTML == ' ') {
            this.wordCount++;
          }
          // typing reached end of sentence
          if(this.charAt == this.length) {
            this.wordCount++;

            // total time - in seconds
            this.totalTime = parseInt((new Date().getTime() - this.startTime.getTime()) / 1000);
            // words per minute
            this.wpm = parseInt(this.wordCount / (this.totalTime / 60), 10);
            // accuracy
            this.accuracy = Math.round((this.length - this.errorCount) * 100 / this.length);
            // marked as finished
            this.finished = true;
          }

        }
      },
      onFocusIn: function () {
        this.hasFocus = true;
      },
      onFocusOut: function () {
        this.hasFocus = false;
      },
      returnFocus: function () {
        this.$refs.textarea.focus();
      }
    },
    created: function (){
      this.fetchExcerpt();
    },
    mounted() {
      this.returnFocus();

      var $this = this;
      window.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        // if typing was finished and enter was pressed, fetch another excerpt
        if ($this.finished && key === 13) {
          $this.fetchExcerpt();
        }
      });
    }
  }
</script>

<style scoped>
  #app {
    height: 100vh;
    width: 100vw;
    background-color: #f8f8f8;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  h1{
    text-align: center;
  }
  p{
    text-align: center;
  }
</style>
