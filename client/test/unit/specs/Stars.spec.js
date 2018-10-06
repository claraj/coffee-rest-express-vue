import Vue from 'vue'
import Stars from '@/components/Stars'
import { mount } from '@vue/test-utils'

describe('Stars.vue', () => {
  it('should render five stars', () => {
    const Constructor = Vue.extend(Stars)
    const vm = new Constructor().$mount()

    const starEls = vm.$el.querySelectorAll('.star-span')

    // Expect there to be 5 stars
    expect(starEls.length).to.equal(5)

    const els = Array.from(starEls)
    els.forEach(el => {
      expect(el.textContent).to.equal('★')
    })

    // And with ids star-1, star-2 ...
    const ids = els.map(el => { return el.id })
    const expectedIds = ['star-1', 'star-2', 'star-3', 'star-4', 'star-5']
    expectedIds.forEach(id => { expect(ids).to.include(id) })
  })

  it('should render 3 on stars and 2 off stars if the rating is 3', () => {
    const Constructor = Vue.extend(Stars)
    const vm = new Constructor({propsData: {stars: 3}}).$mount()
    const starsOn = Array.from(vm.$el.querySelectorAll('.star-on'))
    // stars-on should have ids star-1, star-2, star-3
    const starsOnIds = starsOn.map(el => el.id).sort()
    expect(starsOnIds).to.eql(['star-1', 'star-2', 'star-3'])
  })

  it('should change the number of stars on when the stars prop is changed', () => {
    const Constructor = Vue.extend(Stars)
    // launch with 3 stars
    const vm = new Constructor({propsData: {stars: 3}}).$mount()
    // change to two stars
    vm.$props.stars = 2
    console.log(vm.$props)
    const starsOn = Array.from(vm.$el.querySelectorAll('.star-on'))
    // stars-on should have ids star-1, star-2, star-3
    const starsOnIds = starsOn.map(el => el.id).sort()
    expect(starsOnIds).to.eql(['star-1', 'star-2'])
  })

  it('should change the number of stars on when stars are clicked', () => {
    const wrapper = mount(Stars, {
      propsData: {
        stars: 1
      }
    })

    // TODO bump JS version so this works? Array.prototype.keys errors
    // let starsElIds = [...Array(5).keys()].map(i => 'star-' + (i+1))
    let starsElIds = ['star-1', 'star-2', 'star-3', 'star-4', 'star-5']

    function clickOnStar (starNum) {
      wrapper.find(`#star-${starNum}`).trigger('click')
      const starsOn = Array.from(wrapper.vm.$el.querySelectorAll('.star-on'))
      const starsOnIds = starsOn.map(el => el.id).sort()
      expect(starsOnIds).to.eql(starsElIds.slice(0, starNum))
    }

    // Click on each star
    starsElIds.forEach(el => {
      clickOnStar(el.slice(5))
    })

    // And in reverse...
    let reversedStars = []
    starsElIds.forEach(el => reversedStars.unshift(el))
    reversedStars.forEach(el => {
      clickOnStar(el.slice(5))
    })
  })
})
