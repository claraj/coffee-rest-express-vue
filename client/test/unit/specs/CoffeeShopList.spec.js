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
      {_id: '2', name: 'Cakes and Coffee', stars: 5}
    ]
    const Constructor = Vue.extend(CoffeeShopList)
    const vm = new Constructor({
      propsData: {
        coffeeShops: exampleShops,
        errors: {
          fetchAll: '',
          changeStars: ''
        }
      }
    }).$mount()

    const shopListElements = Array.from(vm.$el.querySelectorAll('li'))

    for (let i = 0; i < exampleShops.length; i++) {
      expect(shopListElements[i].textContent).to.include(exampleShops[i].name)
      expect(shopListElements[i].textContent).to.include(exampleShops[i].stars)
    }
  })

  it('should display a No Shops message if the list of shops is empty', () => {
    const exampleShops = []
    const Constructor = Vue.extend(CoffeeShopList)
    const vm = new Constructor({
      propsData: {
        coffeeShops: exampleShops,
        errors: {
          fetchAll: '',
          changeStars: ''
        }
      }
    }).$mount()

    const shopListElements = Array.from(vm.$el.querySelectorAll('li'))
    expect(shopListElements.length).to.be.equal(0)
    const noShopMessage = vm.$el.querySelector('#no-shops')
    expect(noShopMessage.textContent).to.include('No Coffee Shops')
  })

  it('should emit an event when a star rating is changed', () => {
    const exampleShops = [
      {_id: '1', name: 'Java Beans', stars: 3},
      {_id: '2', name: 'Cakes and Coffee', stars: 5}
    ]

    const spyUpddateStars = sinon.spy()

    const wrapper = mount(CoffeeShopList, {
      propsData: {
        coffeeShops: exampleShops,
        errors: {fetchAll: '', changeStars: ''}
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
