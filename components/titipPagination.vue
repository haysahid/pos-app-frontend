<template>
  <!-- Pagination -->
  <div class="flex flex-row gap-2">
    <!-- Previous Button -->
    <button type="submit" class="">
      <label for="previous-button" class="btn btn-secondary cursor-pointer">
        Previous
      </label>
      <input
        id="previous-button"
        type="radio"
        v-model="show.page"
        :value="show.page - 1"
        class="hidden"
      />
    </button>
    <p v-if="$fetchState.pending">Loading...</p>
    <div class="flex flex-row" v-for="page in page_list" v-else>
      <!-- Active Button -->
      <button type="button" class="" v-show="show.page == page" disabled>
        <label
          :for="'page-button' + page"
          class="btn btn-secondary bg-primary hover:bg-primary"
        >
          {{ page }}
        </label>
        <input
          :id="'page-button' + page"
          type="radio"
          v-model="show.page"
          :value="page"
          class="hidden"
        />
      </button>

      <!-- First Button -->
      <button type="submit" class="" v-show="page == 1 && show.page != page">
        <label
          :for="'page-button' + page"
          class="btn btn-secondary cursor-pointer"
        >
          {{ page }}
        </label>
        <input
          :id="'page-button' + page"
          type="radio"
          v-model="show.page"
          :value="page"
          class="hidden"
        />
      </button>

      <!-- Last Button -->
      <button
        type="submit"
        class=""
        v-show="page == page_list.length && show.page != page"
      >
        <label
          :for="'page-button' + page"
          class="btn btn-secondary cursor-pointer"
        >
          {{ page }}
        </label>
        <input
          :id="'page-button' + page"
          type="radio"
          v-model="show.page"
          :value="page"
          class="hidden"
        />
      </button>

      <!-- Inactive Button -->
      <button
        type="submit"
        class=""
        v-show="
          page > 1 &&
          page < page_list.length &&
          show.page != page &&
          page >= show.page - 1 &&
          page <= show.page + 1
        "
      >
        <label
          :for="'page-button' + page"
          class="btn btn-secondary cursor-pointer"
        >
          {{ page }}
        </label>
        <input
          :id="'page-button' + page"
          type="radio"
          v-model="show.page"
          :value="page"
          class="hidden"
        />
      </button>

      <!-- More Button -->
      <button
        type="button"
        class=""
        v-show="
          (page == show.page - 2 || page == show.page + 2) &&
          page != 1 &&
          page != pageList.length
        "
        disabled
      >
        <label
          :for="'page-button' + page"
          class="btn btn-secondary cursor-pointer"
        >
          ...
        </label>
        <input
          :id="'page-button' + page"
          type="radio"
          v-model="show.page"
          :value="page"
          class="hidden"
        />
      </button>
    </div>
    <!-- Next Button -->
    <button type="submit" class="">
      <label for="next-button" class="btn btn-secondary cursor-pointer">
        Next
      </label>
      <input
        id="next-button"
        type="radio"
        v-model="show.page"
        :value="show.page + 1"
        class="hidden"
      />
    </button>
  </div>
</template>
