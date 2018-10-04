<script>

const starChar = '★'

export default {
  name: 'Stars',
  props: {
    stars: Number,
    _id: String
  },
  data () {
    return {
      starsUpdate: 0
    }
  },
  created () {
    this.starsUpdate = this.stars
  },
  render: function (createElement) {
    let count = 1
    return createElement(
      'div',
      Array.apply(null, {length: 5}).map(() => {
        let el = createElement(
          'span',
          {
            attrs: {
              class: 'star-span',
              id: `star-${count++}`
            },
            on: {
              click: this.clickHandler,
              mouseover: this.hoverHandler
            }
          },
          starChar)

        if (count < this.starsUpdate + 2) {
          el.data.attrs.class = 'star-span star-on'
        }
        return el
      })
    )
  },
  methods: {
    clickHandler (ev) {
      let numStars = Number(ev.srcElement.id.slice(5)) // remove 'stars-'
      this.starsUpdate = numStars
      this.onStarsChanged(this._id, numStars)
    },

    hoverHandler (ev) {
      console.log('hovering!') // todo maybe indicate rating to be given if user were to click now?
    },

    onStarsChanged (id, newStars) {
      this.$emit('onStarsChanged', id, newStars)
    }
  }
}

</script>

<style scoped>

div {
  margin: 10px;
}

.star-span {
  font-size: 20;
  color: gray;
  padding: 4px;
  border-radius: 3px;
  margin: 3px;
}

.star-on {
  color: orange;
  background-color: lightgray;
}

</style>
