<template>
  <div class="relative">
    <input
      type="text"
      class="input-field w-full"
      :placeholder="items_title + ' Name'"
      :value="value"
      @input="searchByInput"
      @click="showOptions"
      @keydown.esc="closeOptions"
    />

    <div class="" @click="closeOptions" v-if="show_options == true">
      <div class="fixed inset-0"></div>
      <div
        class="absolute top-[40.5px] w-full max-h-[200px] overflow-y-auto z-[999] border-[1.5px] border-primary rounded-lg shadow-lg"
      >
        <ul class="input-options">
          <li v-for="item in listOption" class="" @click="setValue(item.name)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    items: [],
    items_title: null,
  },
  data() {
    return {
      show_options: false,
      search: '',
    }
  },
  computed: {
    listOption() {
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  },
  methods: {
    // Show Options
    showOptions() {
      this.show_options = true
    },

    // Close Options
    closeOptions() {
      this.show_options = false
    },

    // Set Input Value
    setValue(value) {
      // Set Value
      this.value = value

      // Emit Value
      this.$emit('input', value)

      // Set Search
      this.search = value

      // Close Options
      this.show_options = false
    },

    // Search by Input
    searchByInput(event) {
      // Emit Value
      this.$emit('input', event.target.value)

      // Set Search
      this.search = event.target.value
    },
  },
}
</script>
