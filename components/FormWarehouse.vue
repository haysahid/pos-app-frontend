<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] overflow-y-auto h-full"
      @submit.prevent="addOrEditWarehouse"
    >
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
          {{ warehouse_id ? 'Edit' : 'Add' }} Warehouse
        </h1>
      </div>

      <!-- Warehouse Name -->
      <div class="form-group">
        <label for="" class="input-label required">Warehouse Name</label>
        <input
          type="text"
          class="input-field"
          placeholder="Warehouse Name"
          v-model="warehouse.name"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.name">
          {{ validation.name[0] }}
        </p>
      </div>

      <!-- Warehouse Address -->
      <div class="form-group">
        <label for="" class="input-label">Warehouse Address</label>
        <textarea
          class="input-field"
          placeholder="Warehouse Address"
          v-model="warehouse.address"
        ></textarea>
      </div>

      <!-- Warehouse Phone -->
      <div class="form-group">
        <label for="" class="input-label">Warehouse Phone</label>
        <input
          type="text"
          class="input-field"
          placeholder="Warehouse Phone"
          v-model="warehouse.phone"
        />
      </div>

      <!-- Button -->
      <div
        class="flex flex-row w-full justify-between gap-4 mt-[14px] max-sm:flex-col max-sm:gap-8"
      >
        <div class="flex flex-row w-full gap-4 max-sm:flex-col">
          <button type="submit" class="btn btn-primary max-sm:w-full">
            {{ warehouse_id ? 'Save Changes' : 'Add Warehouse' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary max-sm:w-full"
            @click="
              warehouse_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <!-- <button
          class="btn btn-danger"
          type="button"
          @click="deleteWarehouse"
          v-if="warehouse_id"
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
    warehouse_id: null,
  },
  data() {
    return {
      warehouse_edit: [],
      warehouse: {
        name: null,
        address: null,
        phone: null,
      },

      // Validation
      validation: [],
    }
  },
  async fetch() {
    if (this.warehouse_id) {
      // For Edit
      this.warehouse_edit = await this.$axios.get(
        `/api/warehouse/${this.warehouse_id}`
      )

      this.warehouse.name = this.warehouse_edit.data.result.warehouse.name
      this.warehouse.address = this.warehouse_edit.data.result.warehouse.address
      this.warehouse.phone = this.warehouse_edit.data.result.warehouse.phone
    } else {
      // For Add
      this.warehouse.name = null
    }
  },
  watch: {
    // Re-Fetch Data
    warehouse_id() {
      this.$fetch()
    },
  },
  methods: {
    // Add or Edit Warehouse
    async addOrEditWarehouse() {
      // Add Warehouse
      if (!this.warehouse_id) {
        let data = new FormData()

        for (const [key, value] of Object.entries(this.warehouse)) {
          if (value) {
            data.append(key, value)
          }
        }

        try {
          let response = await this.$axios.post('/api/warehouse', data)

          // Passing Value
          let warehouse = response.data.result.warehouse
          this.$emit('get-warehouse', warehouse)

          this.warehouse_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          const validation = error.response.data.errors
          this.validation = validation
        }
      }

      // Edit Warehouse
      if (this.warehouse_id) {
        let data = {}
        for (const [key, value] of Object.entries(this.warehouse)) {
          if (key == 'address' || key == 'phone') {
            data[key] = value
          }
          if (value) {
            data[key] = value
          }
        }

        try {
          let response = await this.$axios.put(
            `/api/warehouse/${this.warehouse_id}`,
            data
          )

          this.warehouse_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          const validation = error.response.data.errors
          this.validation = validation
        }
      }
    },

    // Delete Warehouse
    async deleteWarehouse() {
      await this.$axios.delete(`/api/warehouse/${this.warehouse_id}`)

      this.warehouse_id = null
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
