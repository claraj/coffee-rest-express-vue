/*
TODO does this contain a AddCoffeeShop and a CoffeeShopList ?

// mock emit message rec'd from list and assert data updates
// mock emit message rec'd from add and assert data updates

// mock/spy the CoffeeShopService methods

*/

import Vue from 'vue'
import { mount } from '@vue/test-utils'
import CoffeeShops from '@/components/CoffeeShops'
import CoffeeShopList from '@/components/CoffeeShopList'
import AddCoffeeShop from '@/components/AddCoffeeShop'
import sinon from 'sinon'
import chai from 'chai'
import CoffeeShopService from '@/services/coffee_shop_service'


import Promise from 'promise-polyfill';

const stubAddNew = sinon.stub(CoffeeShopService, 'addNew')
const stubFetchAll = sinon.stub(CoffeeShopService, 'fetchAll')
const stubChangeStars = sinon.stub(CoffeeShopService, 'updateStars')

// stubFetchAll.resolves(exampleShops)   // returns a promise that resolves to exampleShops

describe('CoffeeShop', () => {

  beforeEach('reset stubs', () => {
    stubAddNew.reset()
    stubFetchAll.reset()
    stubChangeStars.reset()
  })

  it('should contain a list component and an add form component', () => {
    stubFetchAll.resolves([])
    const wrapper = mount(CoffeeShops)
    expect(wrapper.contains(CoffeeShopList)).to.be.true
    expect(wrapper.contains(AddCoffeeShop)).to.be.true
  })

  it('should fetch a list of coffee shops when launched', () => {

    const exampleShops = [
      {_id: '1', name: 'Launch Java Beans', stars: 3},
      {_id: '2', name: 'Launch Cakes and Coffee', stars: 5},
    ]

    stubFetchAll.resolves(exampleShops)   // returns a promise that resolves to exampleShops
    const wrapper = mount(CoffeeShops)
    console.log('fetching things', wrapper.vm.coffeeShops)
    expect(wrapper.vm.coffeeShops).to.be.equal(exampleShops)
  })

  it('should set an error flag if not possible to fetch coffee shop list', () => {

    stubFetchAll.rejects('error')
    const wrapper = mount(CoffeeShops)
    expect(wrapper.vm.coffeeShops).to.be.eql([])
    expect(wrapper.vm.errors.fetchAll).to.include('Error fetching coffee shops')

  })

  it('should request a new coffee shop created when addNew message received and update list of shops', () => {

    let newShop = {name: 'java beans', stars: 3}

    stubFetchAll.resolves( [newShop] )
    stubAddNew.resolves('whatever')

    const wrapper = mount(CoffeeShops)
    wrapper.vm.onAddNew(newShop)

    // was add new called?
    stubAddNew.should.have.been.calledWith(newShop)

    // was fetch all called?
    expect(stubFetchAll.called).to.be.true

    // Is the coffee shop list correct?
    expect(wrapper.vm.coffeeShops).to.be.eql( [newShop] )

  })

  it('should set an error flag if not possible to add new coffee shop', () => {

    let badNewShop = {stars: 3}  // no name

    stubFetchAll.resolves( [] )
    stubAddNew.rejects('nope')

    const wrapper = mount(CoffeeShops)
    wrapper.vm.onAddNew(badNewShop)

    expect(wrapper.vm.coffeeShops).to.be.eql( [] )   // Array empty
    expect(wrapper.vm.errors.addNew).to.be.equal('Error adding new coffee shop')

  })

  it('should request the number of stars are changed onStarsChanged message received and update list of shops', () => {

    const exampleShops = [
      {_id: '1', name: 'Change Stars Java Beans', stars: 3},
      {_id: '2', name: 'Change Stars Cakes and Coffee', stars: 5},
    ]

    const exampleShopsUpdated = [
      {_id: '1', name: 'Change Stars Java Beans', stars: 3},
      {_id: '2', name: 'Change Stars Cakes and Coffee', stars: 1},
    ]

    stubFetchAll.resolves(exampleShops)
    stubChangeStars.resolves('whatever')

    const wrapper = mount(CoffeeShops)

    stubFetchAll.resolves(exampleShopsUpdated)
    wrapper.vm.onStarsChanged({_id: 2, stars: 1})

    expect(wrapper.vm.coffeeShops).to.be.equal(exampleShopsUpdated)

  })

  it('should set an error flag if not possible to update coffee shop stars', () => {

    const exampleShops = [
      {_id: '1', name: 'Error Stars Java Beans', stars: 3},
      {_id: '2', name: 'Error Stars Cakes and Coffee', stars: 5},
    ]

    stubFetchAll.resolves(exampleShops)
    stubChangeStars.rejects('oops')

    const wrapper = mount(CoffeeShops)
    wrapper.vm.onStarsChanged('2', 3)  // whatever
    expect(wrapper.vm.errors.changeStars).to.be.equal('Error changing stars')

  })

})
