<template>
  <div class="hello">

    <h1>Coffee Shops</h1>


    <b-container fluid>
      <b-row>
        <b-col>
          <AddCoffeeShop @onAddNew="onAddNew"></AddCoffeeShop>
          <img src="../assets/coffee.jpg">
        </b-col>

        <b-col>
          <h2>Coffee Shop Ratings</h2>
          <p>Change star rating by clicking on the stars for a coffee shop</p>

          <ul>
            <li v-for="shop in coffeeShops" :key="shop._id">

              {{shop.name}}, {{shop.stars}} <span v-if="shop.stars==1">star</span> <span v-else>stars</span>

              <Stars
                v-bind:stars="shop.stars"
                v-bind:_id="shop._id"
                @onStarsChanged="onStarsChanged">
              </Stars>

            </li>
          </ul>


        </b-col>
      </b-row>

    </b-container>

  </div>
</template>

<script>

import CoffeeShopService from '../services/coffee_shop_service'
import Stars from './Stars'
import AddCoffeeShop from './AddCoffeeShop'

export default {
  name: 'CoffeeShops',
  components: { AddCoffeeShop, Stars },
  data () {
    return {
      msg: 'Coffee',
      coffeeShops: []
    }
  },
  mounted () {
    this.fetchShops()
  },
  methods: {
    fetchShops () {
      console.log(CoffeeShopService.base)
      CoffeeShopService.fetchAll().then(data => {
        this.coffeeShops = data
        this.coffeeShops.forEach(shop => {
          if (!shop.stars) { shop.stars = 0 }
        })
      })
    },

    onStarsChanged (id, stars) {
      console.log(`todo update ${stars} for ${id}`)
      CoffeeShopService.updateStars(id, stars).then(data => {
        this.fetchShops()
      })
    },

    onAddNew () {
      this.fetchShops()
    }
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
a {
  color: #42b983;
}

img {
  border-radius: 10px;
  margin: 20px;
}

h1 {
  margin: 20px;
}
</style>
