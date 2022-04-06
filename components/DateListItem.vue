<template>
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
</template>

<script>
import { DateTime } from 'luxon'
 
export default {
   props: {
     // date というプロパティを定義
     date: {
       // プロパティのデータ型を指定
       type: DateTime,
       // 必須項目の指定
       required: true
     }
   }
}
</script>
