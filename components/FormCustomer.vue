<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] overflow-y-auto h-full"
      @submit.prevent="addOrEditCustomer"
    >
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
          {{ customer_id ? 'Edit' : 'Add' }} Customer
        </h1>
      </div>

      <!-- Full Name -->
      <div class="form-group">
        <label for="" class="input-label">Full Name*</label>
        <input
          type="text"
          class="input-field"
          placeholder="Full Name"
          v-model="customer.name"
        />
      </div>

      <!-- Address -->
      <div class="form-group">
        <label for="" class="input-label">Address</label>
        <textarea
          class="input-field"
          placeholder="Address"
          v-model="customer.address"
        ></textarea>
      </div>

      <!-- Phone -->
      <div class="form-group">
        <label for="" class="input-label">Phone*</label>
        <input
          type="text"
          class="input-field"
          placeholder="Phone"
          v-model="customer.phone"
        />
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">
            {{ customer_id ? 'Save Changes' : 'Add Customer' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary self-start"
            @click="
              customer_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <button
          class="btn btn-danger self-end"
          type="button"
          @click="deleteCustomer"
        >
          Delete
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    customer_id: null,
  },
  data() {
    return {
      customer_edit: [],
      customer: {
        name: null,
        address: null,
        phone: null,
      },
    }
  },
  async fetch() {
    if (this.customer_id) {
      // For Edit
      this.customer_edit = await this.$axios.get(
        `/customer/${this.customer_id}`
      )

      this.customer.name = this.customer_edit.data.result.customer.name
      this.customer.address = this.customer_edit.data.result.customer.address
      this.customer.phone = this.customer_edit.data.result.customer.phone
    } else {
      // For Add
      this.customer.name = null
      this.customer.address = null
      this.customer.phone = null
    }
  },
  watch: {
    // Re-Fetch Data
    customer_id() {
      this.$fetch()
    },
  },
  methods: {
    // Add or Edit Customer
    async addOrEditCustomer() {
      // Add Customer
      if (!this.customer_id) {
        let data = new FormData()

        for (const [key, value] of Object.entries(this.customer)) {
          if (value) {
            data.append(key, value)
          }
        }

        try {
          let response = await this.$axios.post('/customer', data)
        } catch (error) {
          console.log(error.message)
        }
      }

      // Edit Customer
      if (this.customer_id) {
        let data = {}
        for (const [key, value] of Object.entries(this.customer)) {
          if (key == 'address' || key == 'phone') {
            data[key] = value
          }
          if (value) {
            data[key] = value
          }
        }

        try {
          let response = await this.$axios.put(
            `/customer/${this.customer_id}`,
            data
          )
        } catch (error) {
          console.log(error.message)
        }
      }

      this.customer_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Delete Customer
    async deleteCustomer() {
      await this.$axios.delete(`/product/${this.customer_id}`)

      this.customer_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Refresh Data
    refreshData() {
      this.$store.commit('refreshData')
    },
  },
}
</script>
