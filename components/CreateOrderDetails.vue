<template>
  <div
    class="overflow-y-auto flex flex-col min-w-[40%] h-full mr-[24px] mt-[24px]"
  >
    <div class="w-full card pt-[24px] flex-grow px-[40px]">
      <div class="flex flex-col justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-4">Order Detail</h1>
        <table class="table text-grey-100">
          <tbody>
            <tr class="table-divider">
              <td class="w-[70%]">1 x Tas Branded dikirim langsung dari USA</td>
              <td class="text-right">Rp 3.000.000</td>
            </tr>
            <tr>
              <td class="font-semibold">Sub Total</td>
              <td class="text-right font-semibold">Rp 3.000.000</td>
            </tr>
            <tr class="table-divider">
              <td class="">Shipping costs</td>
              <td class="text-right">Rp 30.000</td>
            </tr>
          </tbody>
          <tfoot class="text-dark">
            <tr>
              <td class="text-[16px] font-bold">Total</td>
              <td class="text-right text-[16px] font-bold">Rp 3.000.000</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="flex flex-row-reverse gap-4 mt-2">
      <a href="index.html" class="btn btn-primary mt-[14px] self-start">
        Create Order
      </a>
      <a href="index.html" class="btn btn-danger mt-[14px] self-start">
        Cancel
      </a>
    </div>

    <!-- <button type="button" class="w-full btn btn-primary mt-[14px]">
              Sign In
          </button> -->
  </div>
</template>
