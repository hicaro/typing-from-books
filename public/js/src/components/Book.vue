<template>
  <div class="book-container">
    <a target="_blank" :href="url">
      <img alt="" :src="image" />
    </a>

    <a target="_blank" :href="url">{{title}}</a>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <q>
          {{promo}}
        </q>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'book',
    props: {
      title: {
        type: String,
        default: ""
      },
      url: {
        type: String,
        default: ""
      },
      image: {
        type: String,
        default: ""
      },
      promo: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style scoped></style>
