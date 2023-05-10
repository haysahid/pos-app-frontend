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

      <!-- Payment Method -->
      <div class="form-group">
        <label for="" class="input-label required">Payment Method</label>
        <select v-if="$fetchState.pending" class="input-field text-grey-40">
          <option value="">Loading...</option>
        </select>

        <div class="" v-else>
          <!-- Empty Payment Method -->
          <select
            name=""
            id=""
            class="input-field w-full"
            v-model="payment.payment_account_id"
            @input="setPaymentAccount($event.target.value)"
            v-if="!payment.payment_account_id && !payment_account"
          >
            <option value="null" selected disabled>
              - Select Payment Method -
            </option>
            <option
              :value="payment_account.id"
              v-for="payment_account in listPaymentMethod"
            >
              {{ payment_account.method }}
            </option>
          </select>

          <!-- Selected Payment Method -->
          <div
            class="flex flex-row gap-4 card p-0 bg-white input-field border-grey-60 hover:border-grey-60"
            v-else
          >
            <CardPaymentAccount class="" :payment_account="payment_account" />
            <button
              type="button"
              class="btn btn-secondary p-2.5 self-center m-4"
              @click="changePaymentAccount"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                />
                <path
                  d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                />
              </svg>
            </button>
          </div>

          <!-- Validation -->
          <p
            class="text-red-500 text-xs italic"
            v-if="validation.payment_account_id"
          >
            {{
              validation.payment_account_id[0].replace(
                'payment account id',
                'payment method'
              )
            }}
          </p>
        </div>
      </div>

      <!-- Information -->
      <div class="form-group">
        <label for="" class="input-label required">Information</label>
        <InputOptions
          v-model="payment.information"
          :items="info_options"
          items_title="Information"
          :validation="validation.information"
          @input="setAmount"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.information">
          {{ validation.information[0] }}
        </p>
      </div>

      <!-- Amount -->
      <div class="form-group">
        <label for="" class="input-label required">Amount</label>
        <div class="flex flex-row p-0">
          <div
            class="input-field rounded-l-[6px] rounded-r-none border-[1.5px] border-grey-40 bg-grey-40 text-white py-[10px] px-[11px]"
          >
            Rp
          </div>
          <input
            type="text"
            class="input-field rounded-l-none flex-grow min-w-0 text-right"
            placeholder="-"
            @input="toCurreny"
            v-model="payment.amount"
          />

          <p class="hidden" v-if="validation.amount"></p>
        </div>

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.amount">
          {{ validation.amount[0] }}
        </p>
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
    total_price: null,
    total_paid: null,
    to_pay: null,
  },
  data() {
    return {
      payment_edit: [],
      payment_accounts: [],
      payment_account: null,

      payment: {
        information: null,
        payment_account_id: null,
        amount: null,
      },

      // Information Options
      info_options: [
        { name: 'DP 50%' },
        { name: 'Cicilan' },
        { name: 'Pelunasan' },
      ],

      // Validation
      validation: [],
    }
  },
  async fetch() {
    // Set Order Id
    this.order_id = this.$route.params.id

    // Get Payment Accounts
    const resPaymentAccounts = await this.$axios.get('/api/payment_account')
    this.payment_accounts = resPaymentAccounts.data.result

    if (this.payment_id) {
      // For Edit
      const resPaymentAccount = await this.$axios.get(
        `/api/order/${this.order_id}/payment/${this.payment_id}`
      )

      this.payment_edit = resPaymentAccount.data.result.payment

      this.payment.information = this.payment_edit.information
      this.payment.payment_account_id = this.payment_edit.payment_account_id
      this.payment.amount = parseInt(this.payment_edit.amount).toLocaleString(
        'id'
      )

      this.setPaymentAccount(this.payment_edit.payment_account_id)
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
      return this.payment_accounts.filter((item) => item.method != 'REFUND')
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
            `/api/order/${this.order_id}/payment`,
            data
          )

          // Passing Value
          let payment = response.data.result.payment
          this.$emit('get-payment', payment)

          this.payment_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          const validation = error.response.data.errors
          this.validation = validation
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
            `/api/order/${this.order_id}/payment/${this.payment_id}`,
            data
          )

          this.payment_id = null
          this.$emit('close-form')
          this.refreshData()
        } catch (error) {
          const validation = error.response.data.errors
          this.validation = validation
        }
      }
    },

    // Delete Payment
    async deletePayment() {
      await this.$axios.delete(
        `/api/order/${this.order_id}/payment/${this.payment_id}`
      )

      this.payment_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Set Payment Account
    setPaymentAccount(payment_account_id) {
      this.payment.payment_account_id = payment_account_id

      const payment_account = this.payment_accounts.find(
        ({ id }) => id == this.payment.payment_account_id
      )

      this.payment_account = payment_account
    },

    // Change Payment Account
    changePaymentAccount() {
      this.payment_account = null
      this.payment.payment_account_id = null
    },

    // Set Amount
    setAmount(information) {
      this.payment.information = information
      let amount = 0

      // If empty then do nothing
      if (information == '') {
        return
      }

      if (this.total_price || this.total_paid || this.to_pay) {
        if (information == 'DP 50%') {
          amount = this.total_price * 0.5
        }

        if (information == 'Pelunasan') {
          amount = this.to_pay
        }
      }

      // Cast value to string
      let value = amount.toString()

      // Replace '.'
      value = value.replaceAll('.', '')

      // Set payment value
      this.payment.amount = parseInt(value).toLocaleString('id')
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
