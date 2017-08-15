<template>

    <div class="book-container">
      <div class="row">
        <div class="col-lg-4">
          <a target="_blank" :href="url">
            <img alt="" :src="image" />
          </a>
        </div>
        <div class="col-lg-8">
          <h2 class="title"><a target="_blank" :href="url">{{title}} by {{author}}</a></h2>

          <div class="book-text">
            <p>
              {{promo}}
            </p>

          </div>

          <div class="book-button">
            <a class="amazon" target="_blank" :href="url">Check Book</i></a>
          </div>
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
      author: {
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
