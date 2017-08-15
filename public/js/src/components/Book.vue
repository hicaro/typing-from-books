<template>

    <div class="book-container">

      <a target="_blank" :href="url">
        <img alt="" :src="image" />
      </a>

      <div class="book-details">

        <h2 class="title"><a target="_blank" :href="url">{{title}} by {{author}}</a></h2>

        <div class="book-text">
          <p>
            {{promo}}
          </p>
          <a class="amazon" target="_blank" :href="url">Check Book Now</i></a>
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
