<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] overflow-y-auto h-full"
      @submit.prevent="addOrEditPaymentAccount"
    >
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
          {{ payment_account_id ? 'Edit' : 'Add' }} Payment Account
        </h1>
      </div>

      <!-- Method -->
      <div class="form-group">
        <label for="" class="input-label required">Method</label>
        <input
          type="text"
          class="input-field"
          placeholder="Method"
          v-model="payment_account.method"
        />
      </div>

      <!-- Account Name -->
      <div class="form-group">
        <label for="" class="input-label required">Account Name</label>
        <input
          type="text"
          class="input-field"
          placeholder="Account Name"
          v-model="payment_account.account_name"
        />
      </div>

      <!-- Number -->
      <div class="form-group">
        <label for="" class="input-label required">Number</label>
        <input
          type="text"
          class="input-field"
          placeholder="Number"
          v-model="payment_account.number"
        />
      </div>

      <!-- Button -->
      <div
        class="flex flex-row w-full justify-between gap-4 mt-[14px] max-sm:flex-col max-sm:gap-8"
      >
        <div class="flex flex-row w-full gap-4 max-sm:flex-col">
          <button type="submit" class="btn btn-primary max-sm:w-full">
            {{ payment_account_id ? 'Save Changes' : 'Add Payment Account' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary max-sm:w-full"
            @click="
              payment_account_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <button
          class="btn btn-danger"
          type="button"
          @click="deletePaymentAccount"
          v-if="payment_account_id"
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
    payment_account_id: null,
  },
  data() {
    return {
      payment_account_edit: [],
      payment_account: {
        method: null,
        account_name: null,
        number: null,
      },
    }
  },
  async fetch() {
    if (this.payment_account_id) {
      // For Edit
      this.payment_account_edit = await this.$axios.get(
        `/payment_account/${this.payment_account_id}`
      )

      this.payment_account.method =
        this.payment_account_edit.data.result.payment_account.method

      this.payment_account.account_name =
        this.payment_account_edit.data.result.payment_account.account_name

      this.payment_account.number =
        this.payment_account_edit.data.result.payment_account.number
    } else {
      // For Add
      this.payment_account.name = null
    }
  },
  watch: {
    // Re-Fetch Data
    payment_account_id() {
      this.$fetch()
    },
  },
  methods: {
    // Add or Edit Payment Account
    async addOrEditPaymentAccount() {
      // Add Payment Account
      if (!this.payment_account_id) {
        let data = new FormData()

        for (const [key, value] of Object.entries(this.payment_account)) {
          if (value) {
            data.append(key, value)
          }
        }

        try {
          let response = await this.$axios.post('/payment_account', data)

          // Passing Value
          let payment_account = response.data.result.payment_account
          this.$emit('get-payment_account', payment_account)
        } catch (error) {
          console.log(error.message)
        }
      }

      // Edit Payment Account
      if (this.payment_account_id) {
        let data = {}
        for (const [key, value] of Object.entries(this.payment_account)) {
          if (value) {
            data[key] = value
          }
        }

        try {
          let response = await this.$axios.put(
            `/payment_account/${this.payment_account_id}`,
            data
          )
        } catch (error) {
          console.log(error.message)
        }
      }

      this.payment_account_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Delete Payment Account
    async deletePaymentAccount() {
      await this.$axios.delete(`/payment_account/${this.payment_account_id}`)

      this.payment_account_id = null
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
