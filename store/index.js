import { DateTime } from 'luxon'

export const state = () => ({
  isLoading: false,
  eventId: '',
  title: '',
  description: '',
  dates: [],
  votes: []
})

export const getters = {
  isLoading (state) {
    return state.isLoading
  },
  eventId (state) {
    return state.eventId
  },
  title (state) {
    return state.title
  },
  description (state) {
    return state.description
  },
  dates (state) {
    return state.dates
  },
  votes (state) {
    return state.votes
  }
}

export const mutations = {
  setLoadingState (state, isLoading) {
    state.isLoading = !!isLoading
  },
  setEventId (state, eventId) {
    state.eventId = eventId
  },
  setTitle (state, title) {
    state.title = title
  },
  setDescription (state, description) {
    state.description = description
  },
  setDates (state, dates) {
    state.dates = dates
  },
  setVotes (state, votes) {
    state.votes = votes
  }
}

export const actions = {
  startLoading (ctx) {
    ctx.commit('setLoadingState', true)
  },
  finishLoading (ctx) {
    ctx.commit('setLoadingState', false)
  },
  clearEvent (ctx) {
    ctx.commit('setEventId', '')
    ctx.commit('setTitle', '')
    ctx.commit('setDescription', '')
    ctx.commit('setDates', [])
    ctx.commit('setVotes', [])
  },
  setEvent (ctx, { id, title, description, dates, votes }) {
    const event = {}

    // IDが不足していた場合拒否する (Firebaseも勝手に拒否してくれるので省略可)
    if (!id) {
      return Promise.reject(new Error('empty id'))
    }

    // おかしなものが入らないようにする (省略可)
    if (typeof title === 'string') {
      event.title = title
    }
    if (typeof description === 'string') {
      event.description = description
    }
    if (dates instanceof Array) {
      event.dates = dates.map(date => ({
        ...date,
        from: date.from.toJSDate()
      }))
    }
    if (votes instanceof Array) {
      event.votes = votes
    }

    return this.$fire.firestore
      .collection('events')
      .doc(id)
      .update(event)
      .then(() => {
        ctx.commit('setEventId', id)
        title && ctx.commit('setTitle', title)
        description && ctx.commit('setDescription', description)
        dates && ctx.commit('setDates', dates)
        votes && ctx.commit('setVotes', votes)
      })
  },
  createEvent (_, { title, description, dates }) {
    return this.$fire.firestore
      .collection('events')
      .add({
        title,
        description,
        dates: dates.map(date => ({
          ...date,
          // アプリケーション内ではLuxonのDateTimeを使っているので、Firestoreに渡すときには標準のDateに変換しておく
          from: date.from.toJSDate()
        })),
        votes: []
      })
      .then((doc) => {
        return doc.id
      })
  },
  fetchEvent (ctx, eventId) {
    return this.$fire.firestore
      .collection('events')
      .doc(eventId)
      .get()
      .then((doc) => {
        // ドキュメントの存在確認
        if (doc.exists) {
          const event = doc.data()
          ctx.commit('setEventId', doc.id)
          ctx.commit('setTitle', event.title)
          ctx.commit('setDescription', event.description)
          ctx.commit('setDates', event.dates.map(date => ({
            ...date,
            from: DateTime.fromJSDate(date.from.toDate())
          })))
          ctx.commit('setVotes', event.votes)
        } else {
          throw new Error('not found')
        }
      })
  }
}
