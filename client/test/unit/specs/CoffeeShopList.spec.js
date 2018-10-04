/*

Does it display a list of shops with correct name and stars?
Does it emit an event when a star rating is changed?

*/

import Vue from 'vue'
import { mount } from '@vue/test-utils'
import CoffeeShopList from '@/components/CoffeeShopList'
import sinon from 'sinon'

describe('CoffeeShopList. vue', () => {
  it('should display a list of coffee shops', () => {
    const exampleShops = [
      {_id: '1', name: 'Java Beans', stars: 3},
      {_id: '2', name: 'Cakes and Coffee', stars: 5},
    ]
    const Constructor = Vue.extend(CoffeeShopList)
    const vm = new Constructor({propsData: {coffeeShops: exampleShops}}).$mount()

    const shopListElements = Array.from(vm.$el.querySelectorAll('li'))

    // console.log('shop els', shopListElements)

    for (let i = 0 ; i < exampleShops.length ; i++) {
      expect(shopListElements[i].textContent).to.include(exampleShops[i].name)
      expect(shopListElements[i].textContent).to.include(exampleShops[i].stars)
    }
  })

  it('should emit an event when a star rating is changed', () => {
    const exampleShops = [
      {_id: '1', name: 'Java Beans', stars: 3},
      {_id: '2', name: 'Cakes and Coffee', stars: 5},
    ]

    const spyUpddateStars = sinon.spy()

    const wrapper = mount(CoffeeShopList, {
      propsData: {
        coffeeShops: exampleShops
      },
      methods: {
        onStarsChanged: spyUpddateStars
      }
    })

    const javaBeansEl = wrapper.find('#shop-1')
    let star4 = javaBeansEl.find('#star-4')
    star4.trigger('click')
    spyUpddateStars.should.have.been.calledWith('1', 4)

    // Click on another star rating
    const cakesCoffeeEl = wrapper.find('#shop-2')
    let star1 = cakesCoffeeEl.find('#star-1')
    star1.trigger('click')
    spyUpddateStars.should.have.been.calledWith('2', 1)

    let star5 = cakesCoffeeEl.find('#star-5')
    star5.trigger('click')
    spyUpddateStars.should.have.been.calledWith('2', 5)

  })
})
