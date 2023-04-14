<template>
  <div class="overflow-y-auto flex flex-col min-w-[50%] h-full mb-[40px]">
    <div class="flex flex-col gap-2">
      <div class="w-full card p-[20px] flex-grow">
        <div class="flex flex-col justify-between">
          <table class="text-grey-100">
            <tbody>
              <tr class="py-0">
                <td class="w-[40%] align-top">Status</td>
                <td class="">Waiting for payment</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Order ID</td>
                <td class="">2</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Customer Type</td>
                <td class="">Regular</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Order Type</td>
                <td class="">Pre-Order</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Date Created</td>
                <td class="">19-03-2023 08:30</td>
              </tr>
            </tbody>
          </table>
          <h1 class="text-[16px] font-bold text-dark pt-4 pb-2">Customer</h1>
          <table class="text-grey-100">
            <tbody>
              <tr class="py-0">
                <td class="w-[40%] align-top">Name</td>
                <td class="">Bu Fulanah</td>
              </tr>
              <tr class="py-0">
                <td class="w-[40%] align-top">Phone</td>
                <td class="">081234567890</td>
              </tr>
            </tbody>
          </table>
          <h1 class="text-[16px] font-bold text-dark pt-4 pb-2">
            Delivery Details
          </h1>
          <table class="text-grey-100">
            <tbody>
              <tr class="py-0">
                <td class="w-[40%] align-top">Address</td>
                <td class="align-top">
                  Jl. Ring Road Utara, Condongcatur, Sleman, DIY
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="w-full card px-[20px] pt-[20px] pb-[14px] flex-grow">
        <div class="flex flex-col justify-between">
          <h1 class="text-[16px] font-bold text-dark pb-2">Pricing Details</h1>
          <table class="table text-grey-100">
            <tbody>
              <tr class="table-divider">
                <td class="w-[70%]">
                  1 x Tas Branded dikirim langsung dari USA
                </td>
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
                <td class="text-[16px] font-bold">Total Pricing</td>
                <td class="text-right text-[16px] font-bold">Rp 3.000.000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="w-full card px-[20px] pt-[20px] pb-[14px] flex-grow">
        <div class="flex flex-col justify-between">
          <h1 class="text-[16px] font-bold text-dark pb-2">Payment Details</h1>
          <table class="table text-grey-100">
            <tbody>
              <tr class="table-divider">
                <td class="w-[40%]">25-04-2023 12:34</td>
                <td class="w-[25%]">DP 50%</td>
                <td class="text-right">Rp 3.000.000</td>
              </tr>
              <tr class="table-divider">
                <td class="w-[40%]">25-04-2023 12:34</td>
                <td class="w-[25%]">DP 50%</td>
                <td class="text-right">Rp 3.000.000</td>
              </tr>
            </tbody>
            <tfoot class="text-dark">
              <tr>
                <td class="text-[16px] font-bold">To Pay</td>
                <td></td>
                <td class="text-right text-[16px] font-bold">Rp 3.000.000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <div class="flex flex-row mt-2 w-full justify-between">
      <div class="flex flex-row w-full gap-4">
        <a href="index.html" class="btn btn-primary mt-[14px] self-start">
          + Add Payment
        </a>
        <a href="index.html" class="btn btn-danger mt-[14px] self-start">
          Refund
        </a>
      </div>
      <button class="btn btn-secondary mt-[14px] shrink-0">Create Invoice</button>
    </div>

    <!-- <button type="button" class="w-full btn btn-primary mt-[14px]">
              Sign In
          </button> -->
  </div>
</template>
