export const state = () => ({
    settings: {},
})

export const mutations = {
    setAdd(state, payload) {
        state.add = payload
    },
    setEdit(state, payload) {
        state.edit = payload
    },

    // Set Settings
    setSettings(state, payload) {
        state.settings = payload
    }
}

export const actions = {
    // Get Settings
    async getSettings({ commit }) {
        const response = await this.$axios.get('/setting')

        let settings = {}

        response.data.result.forEach((item) => {
            settings[item.key] = item.value
        })

        commit('setSettings', settings)
    }
}