<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- タイトル入力 -->
        {{ title }}
        <v-text-field
          label="Title"
          required
          counter
          maxlength="25"
          :value="title"
          @change="(value) => {
            title = value
          }"
        />
        <!-- 詳細入力 -->
        <v-textarea
          label="Description"
          counter
          maxlength="200"
          :value="description"
          @change="(value) => {
            description = value
          }"
        />
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <!-- 時刻選択 -->
            <v-time-picker
              format="24hr"
              :value="time"
              @change="(value) => {
                time = value
              }"
            />
          </v-col>
          <v-col>
            <!-- 日付選択 -->
            <v-date-picker
              no-title
              bottom
              color="primary"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <!-- 日時選択解除 -->
        <v-list
          class="overflow-y-auto"
          max-height="75vh"
        >
          <v-list-item align="start">
            <v-list-item-content>
              <v-list-item-title>
                2021/01/01
              </v-list-item-title>
              <v-list-item-subtitle>
                19:00 ~
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="accent">
                mdi-delete
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      time: '19:00'
    }
  }
}
</script>
