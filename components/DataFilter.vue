<template>
  <div class="flex flex-col gap-4">
    <!-- Search Products -->
    <div class="w-full flex flex-row gap-4">
      <input
        type="text"
        class="input-field w-full"
        placeholder="Search here..."
        v-model="show.search"
      />
      <button
        type="submit"
        class="btn btn-secondary"
        @click="$emit('change', show)"
      >
        Search
      </button>
    </div>

    <!-- Date Filter -->
    <div class="flex gap-8" v-if="date">
      <div class="form-group flex-grow">
        <label for="date-start" class="input-label">From</label>
        <input
          id="date-start"
          type="date"
          class="input-field flex-grow"
          v-model="show.date_start"
        />
      </div>
      <div class="form-group flex-grow">
        <label for="date-start" class="input-label">To</label>
        <input
          id="date-start"
          type="date"
          class="input-field flex-grow"
          v-model="show.date_end"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: Boolean,
  },
  data() {
    return {
      show: {
        search: null,
        date_start: null,
        date_end: null,
      },
    }
  },
}
</script>
