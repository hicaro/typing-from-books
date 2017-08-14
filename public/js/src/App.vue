<template>
  <div id="app">
    <div class="container" >
      <div class="row">
        <div class="col-md-12">

          <div @click="returnFocus" class="excerpt-container">

            <box :letters="chars" :status="status" :focusIn="hasFocus" :wordCount="wordCount" :letterCount="charAt"></box>
            <input class="textarea" autofocus @keypress="onKeyPress" @focusout="onFocusOut" @focusin="onFocusIn" ref="textarea"/>

            <div class="stats-overlay" v-if="finished">
              <div class="text">
                <div class="row">
                  <div class="col-sm-4">
                    <p class="">WPM <i class="fa fa-check-square-o"></i></p>
                    <p class="">{{wpm}}</p>
                  </div>
                  <div class="col-sm-4">
                    <p class="">Time <i class="fa fa-clock-o"></i></p>
                    <p class="">{{timeReport}}</p>
                  </div>
                  <div class="col-sm-4">
                    <p class="">Accuracy <i class="fa fa-dot-circle-o"></i></p>
                    <p class="">{{accuracy}} %</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="button-container">
            <button title="reset" class="btn btn-default btn-circle btn-lg waves-effect" @click="reset">
              <i class="fa fa-arrow-left"></i>
            </button>
            <button title="Load new excerpt" class="btn btn-default btn-circle btn-lg waves-effect" @click="fetchExcerpt">
              <i class="fa fa-refresh"></i>
            </button>
          </div>

          <book :title="title" :url="url" :image="image" :promo="promo" :author="author"></book>
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
        status: [], // has typing status for each letter
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
        promo: "",
        author: ""
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
        axios.get('/book')
          .then((response) => {
              $this.chars   = response.data.letters;
              $this.length  = response.data.length;

              $this.title   = response.data.title;
              $this.author  = response.data.author;
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

<style scoped></style>
