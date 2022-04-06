<template>
  <!-- Vuetifyのボタン -->
  <v-container>
    <event-editor />
    <v-btn>
      Go!
    </v-btn>
  </v-container>
</template>

<script>
export default {
  head () {
    return {
      title: 'New Event'
    }
  }
}
</script>
