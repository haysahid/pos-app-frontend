<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] overflow-y-auto h-full"
      @submit.prevent="addOrEditCategory"
    >
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
          {{ category_id ? 'Edit' : 'Add' }} Category
        </h1>
      </div>

      <!-- Category Name -->
      <div class="form-group">
        <label for="" class="input-label required">Category Name</label>
        <input
          type="text"
          class="input-field"
          placeholder="Category Name"
          v-model="category.name"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.name">
          {{ validation.name[0] }}
        </p>
      </div>

      <!-- Button -->
      <div
        class="flex flex-row w-full justify-between gap-4 mt-[14px] max-sm:flex-col max-sm:gap-8"
      >
        <div class="flex flex-row w-full gap-4 max-sm:flex-col">
          <button type="submit" class="btn btn-primary max-sm:w-full">
            {{ category_id ? 'Save Changes' : 'Add Category' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary max-sm:w-full"
            @click="
              category_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <!-- <button
          class="btn btn-danger"
          type="button"
          @click="deleteCategory"
          v-if="category_id"
        >
          Delete
        </button> -->
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    category_id: null,
  },
  data() {
    return {
      category_edit: [],
      category: {
        name: null,
      },

      // Validation
      validation: [],
    }
  },
  async fetch() {
    if (this.category_id) {
      // For Edit
      this.category_edit = await this.$axios.get(
        `/api/category/${this.category_id}`
      )

      this.category.name = this.category_edit.data.result.category.name
    } else {
      // For Add
      this.category.name = null
    }
  },
  watch: {
    // Re-Fetch Data
    category_id() {
      this.$fetch()
    },
  },
  methods: {
    // Add or Edit Category
    async addOrEditCategory() {
      // Add Category
      if (!this.category_id) {
        let data = new FormData()

        for (const [key, value] of Object.entries(this.category)) {
          if (value) {
            data.append(key, value)
          }
        }

        try {
          let response = await this.$axios.post('/api/category', data)

          // Passing Value
          let category = response.data.result.category
          this.$emit('get-category', category)

          this.category_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          const validation = error.response.data.errors
          this.validation = validation
        }
      }

      // Edit Category
      if (this.category_id) {
        let data = {}
        for (const [key, value] of Object.entries(this.category)) {
          if (value) {
            data[key] = value
          }
        }

        try {
          let response = await this.$axios.put(
            `/api/category/${this.category_id}`,
            data
          )

          this.category_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          const validation = error.response.data.errors
          this.validation = validation
        }
      }
    },

    // Delete Category
    async deleteCategory() {
      await this.$axios.delete(`/api/category/${this.category_id}`)

      this.category_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Refresh Data
    refreshData() {
      this.$nuxt.refresh()
    },
  },
}
</script>
