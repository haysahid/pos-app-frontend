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
            class="table text-grey-100"
            v-else
            v-for="item in order.order_items"
          >
            <tbody>
              <tr class="table-divider">
                <td class="w-[70%]">
                  {{ item.quantity }} x
                  {{ item.product.name }}
                </td>
                <td class="text-right">
                  {{ $toCurrencyString(countPrice(item.quantity, item.price)) }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Sub Total</td>
                <td class="text-right font-semibold">
                  {{ $toCurrencyString(total_price) }}
                </td>
              </tr>
              <tr class="table-divider">
                <td class="">Shipping costs</td>
                <td class="text-right">
                  {{ $toCurrencyString(order.shipping_costs) }}
                </td>
              </tr>
            </tbody>
            <tfoot class="text-dark">
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
          <table class="table text-grey-100">
            <tbody>
              <tr v-if="!order.payments"></tr>
              <tr
                class="table-divider"
                v-else
                v-for="payment in order.payments"
              >
                <td class="w-[40%]">{{ payment.created_at }}</td>
                <td class="w-[25%]">{{ payment.information }}</td>
                <td class="text-right">
                  {{ $toCurrencyString(payment.amount) }}
                </td>
              </tr>
              <tr class="table-divider">
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
