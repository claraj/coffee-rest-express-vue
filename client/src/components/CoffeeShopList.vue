<template>
  <div>

          <h2>Coffee Shop Ratings</h2>
          <p>Change star rating by clicking on the stars for a coffee shop</p>

          <ul>
            <li v-for="shop in coffeeShops" :key="shop._id" v-bind:id="`shop-${shop._id}`">

              {{shop.name}}, {{shop.stars}} <span v-if="shop.stars==1">star</span> <span v-else>stars</span>

              <Stars
                v-bind:stars="shop.stars"
                v-bind:_id="shop._id"
                @onStarsChanged="onStarsChanged">
              </Stars>

            </li>
          </ul>
  </div>
</template>

<script>

import Stars from './Stars'

export default {
  name: 'CoffeeShops',
  components: { Stars },
  props: {
    coffeeShops: Array
  },
  methods: {
    onStarsChanged (id, stars) {
      CoffeeShopService.updateStars(id, stars).then(data => {
        this.fetchShops()
      })
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  padding: 0;
}
li {
  margin: 0 10px;
  list-style-type: none;
}

</style>
