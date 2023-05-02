<template>
  <div class="overflow-y-auto flex flex-col min-w-[50%] h-full print:my-0">
    <div class="flex flex-col gap-2">
      <!-- Card 1 -->
      <section
        class="w-full card form-container max-sm:print:px-12 print:py-8 print:my-0 flex-grow text-dark"
      >
        <div class="flex flex-col justify-between">
          <!-- Invoice Title -->
          <h1 class="font-bold text-5xl mt-2 mb-6">Invoice</h1>

          <!-- Summary -->
          <div
            class="flex flex-row gap-6 max-sm:gap-0 max-sm:flex-col max-sm:print:flex-row"
          >
            <div class="flex flex-col w-full">
              <table class="text-grey-100">
                <tbody>
                  <tr class="py-0">
                    <td class="w-[40%] align-top">Order ID</td>
                    <td class="align-top">{{ order.id }}</td>
                  </tr>
                  <tr class="py-0">
                    <td class="w-[40%] align-top">Order Type</td>
                    <td class="align-top">{{ order.order_type }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex flex-col w-full">
              <table class="text-grey-100">
                <tbody>
                  <tr class="py-0">
                    <td class="w-[40%] align-top">Order Created</td>
                    <td class="align-top">{{ order.created_at }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr class="mt-4 mb-1" />

          <!-- Bill -->
          <div
            class="flex flex-row gap-6 max-sm:gap-0 max-sm:flex-col max-sm:print:flex-row"
          >
            <!-- Billed to -->
            <div class="flex flex-col w-full">
              <h1 class="text-[16px] font-bold text-dark pt-4 pb-2">
                Billed to
              </h1>
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
            </div>

            <!-- Delivery -->
            <div class="flex flex-col w-full">
              <h1 class="text-[16px] font-bold text-dark pt-4 pb-2">
                Delivery
              </h1>
              <table class="text-grey-100">
                <tbody>
                  <tr class="py-0">
                    <td class="w-[40%] align-top">Address</td>
                    <td class="">{{ order.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr class="mt-4 mb-1" />

          <!-- Order Details -->
          <div class="flex flex-col justify-between">
            <!-- Pricing -->
            <h1 class="text-[16px] font-bold text-dark pt-4 pb-2">
              Order Details
            </h1>
            <p v-if="!order.order_items">Loading...</p>
            <table
              class="table text-grey-100 divide-y divide-gray-200"
              v-else
              v-for="item in order.order_items"
            >
              <thead class="">
                <tr class="">
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th class="w-[25%]">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr class="">
                  <td class="flex flex-col gap-1">
                    <div>{{ item.product.name }}</div>
                    <div class="text-grey-80">{{ item.color }}</div>
                  </td>
                  <td class="text-center">
                    {{ $toCurrencyString(item.price) }}
                  </td>
                  <td class="text-center">{{ item.quantity }}</td>
                  <td class="text-right">
                    {{
                      $toCurrencyString(countPrice(item.quantity, item.price))
                    }}
                  </td>
                </tr>
              </tbody>
              <tfoot class="text-dark">
                <tr>
                  <td class="font-semibold text-right" colspan="3">
                    Sub Total :
                  </td>
                  <td class="text-right font-semibold">
                    {{
                      $toCurrencyString(countPrice(item.quantity, item.price))
                    }}
                  </td>
                </tr>
                <tr class="">
                  <td class="text-right" colspan="3">Shipping costs :</td>
                  <td class="text-right">
                    {{ $toCurrencyString(order.shipping_costs) }}
                  </td>
                </tr>
                <tr class="">
                  <td
                    class="text-[16px] font-bold text-right max-sm:text-[14px]"
                    colspan="3"
                  >
                    Total Pricing :
                  </td>
                  <td
                    class="text-right text-[16px] font-bold max-sm:text-[14px]"
                  >
                    {{ $toCurrencyString(total_price) }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Payment Options -->
          <h1 class="text-[16px] font-bold text-dark pt-4 pb-2">
            Payment Options
          </h1>
          <div class="flex gap-12 max-sm:flex-wrap max-sm:gap-y-3">
            <table
              class="text-grey-100"
              v-for="payment_account in payment_accounts"
            >
              <tbody>
                <tr class="py-0">
                  <td class="">{{ payment_account.method }}</td>
                </tr>
                <tr class="py-0">
                  <td class="">{{ payment_account.account_name }}</td>
                </tr>
                <tr class="py-0">
                  <td class="">{{ payment_account.number }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Notes -->
          <h2 class="font-bold mt-6 mb-2">WAJIB DIBACA SEBELUM TANSFER‼️</h2>
          <ul
            class="list-disc pl-6 flex flex-col gap-2 text-sm text-justify text-grey-100"
          >
            <li>
              Kelengkapan dan kondisi barang yang kami terima dari store, itu
              yang kami kirim ke customer, tanpa ada dikurang-kurangi atau pun
              menambahkan (100% authentic).
            </li>
            <li>
              Pre-Order barang yang di-order kemungkinan tidak dapat itu pasti
              ada, jadi jangan BAPER jika barang PO-nya tidak mendapat estimasi
              bisa lebih cepat, bisa lebih lama tergantung pengiriman dari store
              masing-masing brand dan dari cargo pengiriman itu sendiri. (*Jika
              lewat dari estimasi dikarenakan kendala dalam pengiriman US/EU -
              Indonesia tidak ada refund dan tetap menunggu hingga barang sampai
              Indonesia).
            </li>
            <li>
              Kami tidak bisa memastikan kapan barang datang, yang bisa kami
              pastikan barang pasti akan sampai diterima customer.
            </li>

            <li>
              Jika barang hilang dalam pengiriman dari USA - Indonesia, kami
              akan 100% refund sesuai jumlah yang telah ditransfer.
            </li>
            <li>No return no exchange.</li>
            <li>Jika setuju silahkan mentransfer.</li>
            <li>Mohon konfirmasi setelah transfer.</li>
          </ul>
          <p class="mt-2">Terima kasih sebelumnya 💝</p>
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
  data() {
    return {
      payment_accounts: [],
    }
  },
  async fetch() {
    const response = await this.$axios.get('/payment_account')

    this.payment_accounts = response.data.result.filter(
      (item) => item.method != 'Refund'
    )
  },
  methods: {
    // Count Price
    countPrice(quantity, price) {
      return quantity * price
    },
  },
}
</script>
