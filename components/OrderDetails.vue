<template>
  <div class="overflow-y-auto flex flex-col min-w-[50%] h-full">
    <div class="flex flex-col gap-2">
      <!-- Card 1 -->
      <section class="w-full card p-[20px] flex-grow">
        <div class="flex flex-col justify-between">
          <!-- Summary -->
          <table class="text-grey-100">
            <tbody>
              <tr class="py-0">
                <td class="w-[40%] align-top">Status</td>
                <td class="font-bold">{{ status }}</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Order ID</td>
                <td class="">{{ order.id }}</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Customer Type</td>
                <td class="">{{ order.customer_type }}</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Order Type</td>
                <td class="">{{ order.order_type }}</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Date Created</td>
                <td class="">{{ order.created_at }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Customer -->
          <h1 class="text-[16px] font-bold text-dark pt-4 pb-2">Customer</h1>
          <p v-if="!order.customer">Loading...</p>
          <table class="text-grey-100" v-else>
            <tbody>
              <tr class="py-0">
                <td class="w-[40%] align-top">Name</td>
                <td class="">{{ order.customer.name }}</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Phone</td>
                <td class="">{{ order.customer.phone }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Delivery -->
          <h1 class="text-[16px] font-bold text-dark pt-4 pb-2">
            Delivery Details
          </h1>
          <table class="text-grey-100">
            <tbody>
              <tr class="py-0">
                <td class="w-[40%] align-top">Address</td>
                <td class="align-top">
                  {{ order.address }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Card 2 -->
      <section class="w-full card px-[20px] pt-[20px] pb-[14px] flex-grow">
        <div class="flex flex-col justify-between">
          <!-- Pricing -->
          <h1 class="text-[16px] font-bold text-dark pb-2">Pricing Details</h1>
          <p v-if="!order.order_items">Loading...</p>
          <table
            class="table text-grey-100 divide-y divide-gray-200"
            v-else
            v-for="item in order.order_items"
          >
            <tbody class="divide-y divide-gray-200">
              <tr class="">
                <td class="flex flex-col gap-1 w-[70%]">
                  <div>
                    {{ item.quantity + ' x ' + item.product.name }}
                  </div>
                  <div class="">
                    {{ item.color }}
                  </div>
                </td>
                <td class="text-right">
                  {{ $toCurrencyString(countPrice(item.quantity, item.price)) }}
                </td>
              </tr>
            </tbody>
            <tfoot class="text-dark">
              <tr>
                <td class="font-semibold">Sub Total</td>
                <td class="text-right font-semibold">
                  {{ $toCurrencyString(total_price - order.shipping_costs) }}
                </td>
              </tr>
              <tr class="">
                <td class="">Shipping costs</td>
                <td class="text-right">
                  {{ $toCurrencyString(order.shipping_costs) }}
                </td>
              </tr>
              <tr>
                <td class="text-[16px] font-bold">Total Pricing</td>
                <td class="text-right text-[16px] font-bold">
                  {{ $toCurrencyString(total_price) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <!-- Card 3 -->
      <section class="w-full card px-[20px] pt-[20px] pb-[14px] flex-grow">
        <div class="flex flex-col justify-between">
          <!-- Payment Details -->
          <h1 class="text-[16px] font-bold text-dark pb-2">Payment Details</h1>
          <table class="table text-grey-100 divide-y divide-gray-200">
            <tbody class="divide-y divide-gray-200">
              <tr v-if="!order.payments"></tr>
              <tr class="" v-else v-for="payment in order.payments">
                <td class="w-[40%]">
                  <div class="flex flex-wrap gap-x-1 items-center">
                    <div class="whitespace-nowrap">
                      {{ payment.created_at.split(' ')[0] }}
                    </div>
                    <div class="whitespace-nowrap">
                      {{ payment.created_at.split(' ')[1] }}
                    </div>
                  </div>
                </td>
                <td class="w-full flex gap-1 justify-between items-center">
                  <div class="">{{ payment.information }}</div>
                  <button
                    type="button"
                    class="p-2"
                    @click="$emit('edit-payment', payment.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5 fill-grey-60 hover:fill-grey-80"
                    >
                      <path
                        d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
                      />
                      <path
                        d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
                      />
                    </svg>
                  </button>
                </td>
                <td class="text-right whitespace-nowrap">
                  {{ $toCurrencyString(payment.amount) }}
                </td>
              </tr>
              <tr class="">
                <td class="font-semibold">Total Paid</td>
                <td></td>
                <td class="text-right font-semibold">
                  {{ $toCurrencyString(total_paid) }}
                </td>
              </tr>
            </tbody>
            <tfoot class="text-dark">
              <tr>
                <td class="text-[16px] font-bold">To Pay</td>
                <td></td>
                <td class="text-right text-[16px] font-bold">
                  {{ $toCurrencyString(to_pay) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: [],
    total_price: 0,
    total_paid: 0,
    to_pay: 0,
    status: null,
  },
  methods: {
    // Count Price
    countPrice(quantity, price) {
      return quantity * price
    },
  },
}
</script>
