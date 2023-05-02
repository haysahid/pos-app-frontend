<template>
  <div class="w-full card form-container flex-grow">
    <div class="flex flex-col justify-between gap-4">
      <h1 class="text-[20px] font-bold text-dark">Order Details</h1>
      <table class="table text-grey-100">
        <tbody>
          <tr class="table-divider">
            <td class="w-[70%]">
              {{
                order_item.quantity && product.name
                  ? order_item.quantity + ' x ' + product.name
                  : '-'
              }}
            </td>
            <td class="text-right">
              {{ $toCurrencyString(totalPrice) }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold">Sub Total</td>
            <td class="text-right font-semibold">
              {{ $toCurrencyString(totalPrice) }}
            </td>
          </tr>
          <tr class="table-divider">
            <td class="">Shipping costs</td>
            <td class="text-right">Rp -</td>
          </tr>
        </tbody>
        <tfoot class="text-dark">
          <tr>
            <td class="text-[16px] font-bold">Total</td>
            <td class="text-right text-[16px] font-bold">
              {{ $toCurrencyString(totalPrice) }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {},
    order_item: {},
  },
  data() {
    return {
      total_price: null,
    }
  },
  computed: {
    totalPrice() {
      return this.order_item.price
        ? this.order_item.price.replaceAll('.', '') * this.order_item.quantity
        : 0
    },
  },
}
</script>
