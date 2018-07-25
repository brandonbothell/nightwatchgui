export default {
  state: {
    usersOpened: [],
    usersOpen: [],
    guildsOpened: [],
    guildsOpen: [],
    referralsOpened: [],
    referralsOpen: [],
    giveawaysOpened: [],
    giveawaysOpen: []
  },
  mutations: {
    addUsersOpen (state: any, id: string) {
      state.usersOpen.push(id)
    },
    removeUsersOpen (state: any, id: string) {
      state.usersOpen.splice(state.usersOpen.indexOf(id), 1)
    },
    addUsersOpened (state: any, id: string) {
      state.usersOpened.push(id)
    },
    removeUsersOpened (state: any, id: string) {
      state.usersOpened.splice(state.usersOpened.indexOf(id), 1)
    },
    addGuildsOpen (state: any, id: string) {
      state.guildsOpen.push(id)
    },
    removeGuildsOpen (state: any, id: string) {
      state.guildsOpen.splice(state.guildsOpen.indexOf(id), 1)
    },
    addGuildsOpened (state: any, id: string) {
      state.guildsOpened.push(id)
    },
    removeGuildsOpened (state: any, id: string) {
      state.guildsOpened.splice(state.guildsOpened.indexOf(id), 1)
    },
    addReferralsOpen (state: any, id: string) {
      state.referralsOpen.push(id)
    },
    removeReferralsOpen (state: any, id: string) {
      state.referralsOpen.splice(state.referralsOpen.indexOf(id), 1)
    },
    addReferralsOpened (state: any, id: string) {
      state.referralsOpened.push(id)
    },
    removeReferralsOpened (state: any, id: string) {
      state.referralsOpened.splice(state.referralsOpened.indexOf(id), 1)
    },
    addGiveawaysOpen (state: any, id: string) {
      state.giveawaysOpen.push(id)
    },
    removeGiveawaysOpen (state: any, id: string) {
      state.giveawaysOpen.splice(state.giveawaysOpen.indexOf(id), 1)
    },
    addGiveawaysOpened (state: any, id: string) {
      state.giveawaysOpened.push(id)
    },
    removeGiveawaysOpened (state: any, id: string) {
      state.giveawaysOpened.splice(state.giveawaysOpened.indexOf(id), 1)
    }
  },
  actions: {
  }
}
