<template>
  <div class="flex flex-col gap-4">
    <!-- Search Products -->
    <div class="w-full flex flex-row gap-4">
      <!-- Search -->
      <input
        type="text"
        class="input-field bg-white border-white w-full"
        placeholder="Search here..."
        v-model="show.search"
      />

      <!-- Limit -->
      <select
        name=""
        id=""
        class="input-field bg-white border-white"
        v-model="show.limit"
        v-if="limiter"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <!-- Search Button -->
      <button
        type="submit"
        class="btn btn-secondary"
        @click="$emit('change', show)"
      >
        Search
      </button>
    </div>

    <!-- Date Filter -->
    <div class="flex gap-8 max-sm:gap-4" v-if="date">
      <div class="form-group flex-grow">
        <label for="" class="input-label">From</label>
        <input
          id=""
          type="date"
          class="input-field flex-grow bg-white border-white"
          v-model="show.date_start"
        />
      </div>
      <div class="form-group flex-grow">
        <label for="" class="input-label">To</label>
        <input
          id=""
          type="date"
          class="input-field flex-grow bg-white border-white"
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
    limiter: true,
  },
  data() {
    return {
      show: {
        search: null,
        date_start: null,
        date_end: null,
        limit: 10,
      },
    }
  },
}
</script>
