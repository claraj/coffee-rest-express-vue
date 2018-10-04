<template>
  <div>

    <h1>Coffee Shops</h1>

    <b-container fluid>
      <b-row>
        <b-col>
          <AddCoffeeShop @onAddNew="onAddNew"></AddCoffeeShop>
          <img src="../assets/coffee.jpg">
        </b-col>

        <b-col>
          <CoffeeShopList
            v-bind:coffeeShops="coffeeShops"
            @onStarsChanged="onStarsChanged">
          </CoffeeShopList>
        </b-col>
      </b-row>

    </b-container>

  </div>
</template>

<script>

import CoffeeShopService from '../services/coffee_shop_service'
import CoffeeShopList from './CoffeeShopList'
import Stars from './Stars'
import AddCoffeeShop from './AddCoffeeShop'

export default {
  name: 'CoffeeShops',
  components: { AddCoffeeShop, CoffeeShopList, Stars },
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

img {
  border-radius: 10px;
  margin: 20px;
}

h1 {
  margin: 20px;
}

</style>
