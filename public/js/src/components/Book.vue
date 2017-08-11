<template>
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <div class="book-container">
        <div class="book-details">

          <div class="book-thumb">
            <a target="_blank" :href="url">
              <img alt="" :src="image" />
            </a>
          </div>

          <div class="book-text">

            <h2><a target="_blank" :href="url">{{title}}</a></h2>
            <h4>{{author}}</h4>
            <p>
              {{promo}}
            </p>
            <div class="amazon">
              <a target="_blank" :href="url">See Book</a>
            </div>
          </div>

          <div class="clearfix"></div>
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
