<template>

  <div>
    <h2>Add new Coffee Shop</h2>
    <b-form>
      <b-form-input label="Name" v-model="name" placeholder="Name" id="new-name"/>
      <span>How many stars?</span><Stars @onStarsChanged="onStarsChanged"></Stars>
      <p v-if="errors">{{errors}}</p>
      <b-button v-on:click="addNewCoffeeShop">Add</b-button>
    </b-form>
  </div>
</template>

<script>

import CoffeeShopService from '../services/coffee_shop_service'
import Stars from './Stars'

export default {
  name: 'NewCoffeeShop',
  components: { Stars },
  data () {
    return {
      name: '',
      stars: 0,
      errors: ''
    }
  },
  methods: {
    onStarsChanged (id, stars) {
      console.log(`stars changed to ${stars}`)
      this.stars = stars
    },
    addNewCoffeeShop () {
      if (!this.name) {
        this.errors = 'You must enter a name.'
        return
      }
      CoffeeShopService.addNew({name: this.name, stars: this.stars}).then(() => {
        this.$emit('onAddNew')
        this.name = ''
        this.errors = ''
      })
    }
  }
}

</script>
