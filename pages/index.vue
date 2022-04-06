<template>
  <v-container>
    <event-editor v-model="event" />
    <v-btn
      fixed
      elevation="2"
      fab
      large
      bottom
      right
      color="primary"
      :disabled="!event.dates.length"
      @click="submit"
    >
      Go!
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      event: {
        title: '',
        description: '',
        dates: []
      }
    }
  },
  head () {
    return {
      title: 'New Event'
    }
  },
  methods: {
    submit () {
      this.$store
        .dispatch('createEvent', {
          title: this.event.title.trim(),
          description: this.event.description.trim(),
          dates: this.event.dates
        })
        .then((id) => {
          this.$router.push(`/${id}`)
        })
    }
  }
}
</script>
