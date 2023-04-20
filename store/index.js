export const state = () => ({
    add: false,
    edit: false,
    refresh: 0,
})

export const mutations = {
    setAdd(state, payload) {
        state.add = payload
    },
    setEdit(state, payload) {
        state.edit = payload
    },
    refreshData(state) {
        state.refresh += 1
    }
}