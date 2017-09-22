<template>
  <div class="frame" ref="frame">
    <span v-bind:class="{current: letterCount == lc && focusIn,
                        correct: letterCount > lc && status[lc],
                        error: letterCount > lc && !status[lc],
                        'empty-error': letterCount > lc && !status[lc] && isSpace(letter)}" v-for="(letter, lc) in letters" :id="lc">{{letter}}</span>
  </div>
</template>

<script>

  export default {
    name: 'box',
    props: {
      letters: {
        type: Array,
        default: []
      },
      status: {
        type: Array,
        default: []
      },
      wordCount: {
        type: Number,
        default: 0
      },
      letterCount: {
        type: Number,
        default: 0
      },
      correct: {
        type: Boolean,
        default:false
      },
      focusIn: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      isSpace: function(l) {
        return l == ' ';
      }
    }
  }
</script>

<style scoped></style>
