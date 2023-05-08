<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] overflow-y-auto h-full"
      @submit.prevent="addOrEditBrand"
    >
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
          {{ brand_id ? 'Edit' : 'Add' }} Brand
        </h1>
      </div>

      <!-- Brand Name -->
      <div class="form-group">
        <label for="" class="input-label required">Brand Name</label>
        <input
          type="text"
          class="input-field"
          placeholder="Brand Name"
          v-model="brand.name"
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
            {{ brand_id ? 'Save Changes' : 'Add Brand' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary max-sm:w-full"
            @click="
              brand_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <!-- <button
          class="btn btn-danger"
          type="button"
          @click="deleteBrand"
          v-if="brand_id"
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
    brand_id: null,
  },
  data() {
    return {
      brand_edit: [],
      brand: {
        name: null,
      },

      // Validation
      validation: [],
    }
  },
  async fetch() {
    if (this.brand_id) {
      // For Edit
      this.brand_edit = await this.$axios.get(`/api/brand/${this.brand_id}`)

      this.brand.name = this.brand_edit.data.result.brand.name
    } else {
      // For Add
      this.brand.name = null
    }
  },
  watch: {
    // Re-Fetch Data
    brand_id() {
      this.$fetch()
    },
  },
  methods: {
    // Add or Edit Brand
    async addOrEditBrand() {
      // Add Brand
      if (!this.brand_id) {
        let data = new FormData()

        for (const [key, value] of Object.entries(this.brand)) {
          if (value) {
            data.append(key, value)
          }
        }

        try {
          let response = await this.$axios.post('/api/brand', data)

          // Passing Value
          let brand = response.data.result.brand
          this.$emit('get-brand', brand)

          this.brand_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          const validation = error.response.data.errors
          this.validation = validation
        }
      }

      // Edit Brand
      if (this.brand_id) {
        let data = {}
        for (const [key, value] of Object.entries(this.brand)) {
          if (value) {
            data[key] = value
          }
        }

        try {
          let response = await this.$axios.put(`/api/brand/${this.brand_id}`, data)

          this.brand_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          const validation = error.response.data.errors
          this.validation = validation
        }
      }
    },

    // Delete Brand
    async deleteBrand() {
      await this.$axios.delete(`/api/brand/${this.brand_id}`)

      this.brand_id = null
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
