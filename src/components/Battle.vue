<template>
  <div>
    <Wheel
      v-if="!loading"
      :colors="colors"
      :win_number="win_number"
    />

    <h3>Hash: {{ hash }}</h3>
    <h3 v-if='win_number !== 0'>Win number: {{ win_number }}</h3>
    <h4 v-if="time_left_next == 0">Time: {{ time_left }}</h4>
    <h4 v-else>Time to start: {{ time_left_next }}</h4>
  </div>
</template>

<script>
import Wheel from './Wheel'

export default {
  name: 'Battle',
  components: {
    Wheel
  },
  data() {
    return {
      loading: false,
      colors: [],
      win_number: 0,
      time_left: -1,
      time_left_next: -1,
      hash: ''
    }
  },
  mounted() {
    this.get_battle()

    this.$options.sockets.onmessage = (event) => {
      if (event.type == 'message') {
        const message = JSON.parse(event.data)

        if (message.Event == 'winNumber') {
          this.time_left = 0
          this.win_number = Math.floor(message.Data.WinNum)
        }

        if (message.Event == 'winNumberHash') {
          this.hash = message.Data.WinNumHash
          this.get_battle()
        }
      }
    }
  },
  methods: {
    async get_battle() {
      this.loading = true

      const response = await this.$http.get('http://rocket.pelidev.com/api/game/current')
      const { body } = response

      this.colors = body.Colors.split('').reverse()
      this.hash = body.WinNumHash
      this.time_left_next = body.TimeLeftNext
      this.time_left = body.TimeLeft
      
      for (let i = 0; i < this.colors.length; i++) {
        switch(this.colors[i]) {
          case '1':
            this.colors[i] = 'green'
            break
          case '2':
            this.colors[i] = 'red'
            break
          case '3':
            this.colors[i] = 'black'
            break
          case '4':
            this.colors[i] = 'yellow'
            break
          default:
            this.colors[i] = 'white'
        }
      }

      if (body.WinNum !== '') {
        this.win_number = Math.floor(body.WinNum)
        this.start_timer('second')
      } else {
        this.start_timer('default')
      }

      this.loading = false
    },
    start_timer(type) {
      const timer = setInterval(() => {
        if (type == 'default') {
          if (this.time_left == 0) {
            this.time_left_next = 15
            this.start_timer('second')
            return clearInterval(timer)
          }

          this.time_left -= 1
        }

        if (type == 'second') {
          if (this.time_left_next == 0) {
            return clearInterval(timer)
          }

          this.time_left_next -= 1
        }
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
