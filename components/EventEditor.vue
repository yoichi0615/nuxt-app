<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="4"
        lg="4"
        align="center"
      >
        <!-- タイトル入力 -->
        <v-text-field
          v-model="title"
          label="Title"
          required
          counter
          maxlength="25"
          :rules="[val => (val || '').length > 0 || 'This field is required']"
        />
        <!-- 詳細入力 -->
        <v-textarea
          v-model="description"
          label="Description"
          counter
          maxlength="200"
        />
      </v-col>
      <v-col
        cols="12"
        xl="4"
        lg="4"
        align="center"
      >
        <v-row>
          <v-col>
            <!-- 時刻選択 -->
            <v-time-picker
              v-model="time"
              format="24hr"
              :allowed-minutes="m => m % 5 === 0"
            />
          </v-col>
          <v-col>
            <!-- 日付選択 -->
            <v-date-picker
              no-title
              bottom
              color="primary"
              :allowed-dates="v => !dates.map(d => d.from.toFormat('yyyy-MM-dd')).includes(v)"
              :min="minDate"
              @change="addDate"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        xl="4"
        lg="4"
        align="center"
      >
        <!-- 日時選択解除 -->
        <v-list
          class="overflow-y-auto"
          max-height="75vh"
        >
          <div v-if="dates.length === 0">
            Click Calendar to add date!
          </div>
          <date-list-item
            v-for="v in dates"
            :key="v.id"
            :date="v.from"
            :on-remove="() => removeDate(v.id)"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      title: '',
      description: '',
      time: '19:00',
      minDate: DateTime.now().toFormat('yyyy-MM-dd'),
      dates: []
    }
  },
  watch: {
    value () {
      this.title = this.value.title
      this.description = this.value.description
    },
    title () {
      this.changeEvent()
    },
    description () {
      this.changeEvent()
    }
  },
  methods: {
    changeEvent () {
      this.$emit('change', {
        title: this.title,
        description: this.description,
        dates: this.dates
      })
    },
    addDate (d) {
      const time = DateTime.fromFormat(this.time, 'HH:mm')
      const date = DateTime.fromISO(d).set({
        hour: time.hour,
        minute: time.minute
      })
      this.dates = [
        ...this.dates,
        {
          id: +new Date(),
          from: date
        }
      ]
      this.changeEvent()
    },
    removeDate (id) {
      this.dates = this.dates.filter(d => d.id !== id)
      this.changeEvent()
    }
  }
}
</script>

<style scoped>
</style>
