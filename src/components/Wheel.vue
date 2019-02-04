<template>
  <div>
    <canvas
      id="wheel"
      width="300"
      height="300"
      style="transform: rotateZ(0deg);"
      v-bind:style="{ transform: `rotateZ(${this.get_rotate_deg()}deg)` }"
    ></canvas>

    <font-awesome-icon icon="arrow-left" class="arrow" />
  </div>
</template>

<script>
export default {
  name: 'Wheel',
  props: {
    colors: Array,
    win_number: Number
  },
  data() {
    return {
      slices: 0,
      slice_deg: 0,
      deg: 0,
      speed: 1,
      slow_down_rand: 0,
      ctx: {},
      width: 300,
      center: 150,
      isStopped: false,
      lock: false
    }
  },
  mounted() {
    this.ctx = document.getElementById('wheel').getContext('2d')
    this.width = document.getElementById('wheel').width

    this.draw_canvas()
  },
  methods: {
    get_rotate_deg() {
      return 363 - (this.win_number * (360 / 54))
    },
    draw_canvas() {
      this.slices = this.colors.length
      this.slice_deg = 360 / this.slices

      this.draw_img()
    },
    draw_img() {
      this.ctx.clearRect(0, 0, this.width, this.width)
      for (let i = 0; i < this.slices; i++) {
        this.draw_slice(this.deg, this.colors[i])
        this.draw_text(this.deg + this.slice_deg / 2, i + 1)
        this.deg += this.slice_deg
      }
    },
    draw_text(deg, text) {
      this.ctx.save()
      this.ctx.translate(this.center, this.center)
      this.ctx.rotate(this.deg_to_rad(deg))
      this.ctx.textAlign = "right"
      this.ctx.fillStyle = "#fff"
      this.ctx.font = 'bold 18px sans-serif'
      this.ctx.fillText(text, 130, 10)
      this.ctx.restore()
    },
    draw_slice(deg, color) {
      this.ctx.beginPath()
      this.ctx.fillStyle = color
      this.ctx.moveTo(this.center, this.center)
      this.ctx.arc(this.center, this.center, this.width / 2, this.deg_to_rad(deg), this.deg_to_rad(deg + this.slice_deg))
      this.ctx.lineTo(this.center, this.center)
      this.ctx.fill()
    },
    deg_to_rad(deg) {
      return deg * Math.PI / 180
    },
    rand(min, max) {
      return Math.random() * (max - min) + min
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wheel {
  transition: 7s ease-in;
}

.arrow {
  position: absolute;

  left: 310px;
  top: 150px;
}
</style>
