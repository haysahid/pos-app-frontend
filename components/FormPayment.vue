<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] overflow-y-auto h-full"
      @submit.prevent="addOrEditPayment"
    >
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
          {{ payment_id ? 'Edit' : 'Add' }} Payment
        </h1>
      </div>

      <!-- Information -->
      <div class="form-group">
        <label for="" class="input-label required">Information</label>
        <input
          type="text"
          class="input-field"
          placeholder="Information"
          v-model="payment.information"
        />
      </div>

      <!-- Payment Method -->
      <div class="form-group">
        <label for="" class="input-label required">Payment Method</label>
        <select v-if="$fetchState.pending" class="input-field text-grey-40">
          <option value="">Loading...</option>
        </select>
        <select
          name=""
          id=""
          class="input-field"
          v-else
          v-model="payment.payment_account_id"
        >
          <option
            :value="payment_account.id"
            v-for="payment_account in listPaymentMethod"
          >
            {{ payment_account.method }}
          </option>
        </select>
      </div>

      <!-- Amount -->
      <div class="form-group">
        <label for="" class="input-label required">Amount</label>
        <div class="flex flex-row p-0">
          <div
            class="rounded-l-[6px] border-[1.5px] border-grey-40 bg-grey-40 text-white py-[10px] px-[11px]"
          >
            Rp
          </div>
          <input
            type="text"
            class="input-field rounded-l-none flex-grow min-w-0"
            placeholder="-"
            @input="toCurreny"
            v-model="payment.amount"
          />
        </div>
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">
            {{ payment_id ? 'Save Changes' : 'Add Payment' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary self-start"
            @click="
              payment_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <button
          class="btn btn-danger self-end"
          type="button"
          @click="deletePayment"
          v-if="payment_id"
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
    payment_id: null,
  },
  data() {
    return {
      payment_edit: [],
      payment_accounts: [],
      payment: {
        information: null,
        payment_account_id: null,
        amount: null,
      },
    }
  },
  async fetch() {
    // Set Order Id
    this.order_id = this.$route.params.id

    // Get Payment Accounts
    this.payment_accounts = await this.$axios.get('/payment_account')

    if (this.payment_id) {
      // For Edit
      this.payment_edit = await this.$axios.get(
        `/order/${this.order_id}/payment/${this.payment_id}`
      )

      this.payment.information =
        this.payment_edit.data.result.payment.information
      this.payment.payment_account_id =
        this.payment_edit.data.result.payment.payment_account_id
      this.payment.amount = parseInt(
        this.payment_edit.data.result.payment.amount
      ).toLocaleString('id')
    } else {
      // For Add
      this.payment.information = null
      this.payment.payment_account_id = null
      this.payment.amount = null
    }
  },
  watch: {
    // Re-Fetch Data
    payment_id() {
      this.$fetch()
    },
  },
  computed: {
    listPaymentMethod() {
      return this.payment_accounts.data.result.filter(
        (item) => item.method != 'Refund'
      )
    },
  },
  methods: {
    // Add or Edit Payment
    async addOrEditPayment() {
      // Add Payment
      if (!this.payment_id) {
        let data = new FormData()

        for (const [key, value] of Object.entries(this.payment)) {
          if (value) {
            data.append(
              key,
              key == 'amount' ? value.replaceAll('.', '') : value
            )
          }
        }

        try {
          let response = await this.$axios.post(
            `/order/${this.order_id}/payment`,
            data
          )

          // Passing Value
          let payment = response.data.result.payment
          this.$emit('get-payment', payment)
        } catch (error) {
          console.log(error.message)
        }
      }

      // Edit Payment
      if (this.payment_id) {
        let data = {}
        for (const [key, value] of Object.entries(this.payment)) {
          if (value) {
            data[key] = key == 'amount' ? value.replaceAll('.', '') : value
          }
        }

        try {
          let response = await this.$axios.put(
            `/order/${this.order_id}/payment/${this.payment_id}`,
            data
          )
        } catch (error) {
          console.log(error.message)
        }
      }

      this.payment_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Delete Payment
    async deletePayment() {
      await this.$axios.delete(
        `/order/${this.order_id}/payment/${this.payment_id}`
      )

      this.payment_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Refresh Data
    refreshData() {
      this.$nuxt.refresh()
    },

    // To Currency
    toCurreny(event) {
      // If empty then do nothing
      if (event.target.value == '' || event.target.value == '-') {
        return
      }

      // Cast value to string
      let value = event.target.value.toString()

      // Replace '.'
      value = value.replaceAll('.', '')

      // Set payment value
      this.payment.amount = parseInt(value).toLocaleString('id')
    },
  },
}
</script>
