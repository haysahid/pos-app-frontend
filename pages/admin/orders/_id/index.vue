<template>
  <main class="ml-[250px] max-w-[100%] flex justify-start mt-[72px]">
    <section
      class="flex felx-row justify-between gap-6 px-[24px] pt-[24px] flex-grow items-start overflow-y-auto max-w-full"
    >
      <div class="flex flex-col flex-grow">
        <div class="flex justify-between mb-4">
          <div class="flex flex-row gap-4">
            <span class="self-center text-[24px]">&#8592;</span>
            <h1 class="text-[24px] font-bold text-dark self-center">
              Order Details
            </h1>
          </div>
          
        </div>
        <div class="flex flex-row flex-grow gap-[24px]">
          <div class="flex flex-col w-full self-start gap-4">
            <StepBar />
            <OrderDetails />
          </div>

          <!-- Update Order Detail Form -->
          <div class="overflow-y-auto flex flex-col min-w-[50%] h-full w-full">
            <div class="w-full card pt-[24px] flex-grow px-[40px] mb-[40px]">
              <div class="flex justify-between">
                <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">
                  Update Order Details
                </h1>
              </div>
              <div class="form-group mb-2">
                <label for="" class="input-label">Order Item*</label>
                <div
                  class="flex flex-col justify-center w-full border-l-[1.45px] border-primary rounded-r-lg bg-page"
                >
                  <!-- Order Item Component -->
                  <div class="card px-4 py-6 bg-secondary">
                    <div class="card p-0 bg-white">
                      <ProductCard class="bg-none" />
                      <!-- <div class="h-0.5 bg-gray-200 mx-4"></div> -->
                      <div class="flex flex-col px-4 pb-4 gap-4">
                        <div class="form-group">
                          <label for="" class="input-label">Color*</label>
                          <input
                            type="text"
                            class="input-field"
                            placeholder="Color"
                          />
                        </div>
                        <div class="form-group">
                          <div class="form-group">
                            <label for="" class="input-label">Price*</label>
                            <div class="flex flex-row p-0">
                              <p
                                class="rounded-l-[6px] outline outline-[1.45px] outline-grey-60 bg-grey-60 text-white py-[10px] px-[11px]"
                              >
                                Rp
                              </p>
                              <input
                                type="text"
                                class="input-field rounded-l-none flex-grow"
                                placeholder="-"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="" class="input-label">Quantity*</label>
                          <input
                            type="text"
                            class="input-field"
                            placeholder="Quantity"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="input-label">Product Availability</label>
                <select name="" id="" class="input-field">
                  <option value="">-</option>
                  <option value="">Available</option>
                  <option value="">Not Available</option>
                </select>
              </div>
              <div class="form-group">
                <label for="" class="input-label">Product Arrival</label>
                <input
                  type="date"
                  class="input-field placeholder:text-grey-60"
                />
              </div>
              <div class="form-group">
                <label for="" class="input-label">Total Weight</label>
                <div class="flex flex-row p-0">
                  <input
                    type="text"
                    class="input-field rounded-r-none flex-grow"
                    placeholder="Total Weight"
                  />
                  <p
                    class="rounded-r-[6px] outline outline-[1.45px] outline-grey-60 bg-grey-60 text-white py-[10px] px-[11px]"
                  >
                    Kg
                  </p>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="input-label">Notes</label>
                <textarea class="input-field" placeholder="Notes"></textarea>
              </div>
              <div class="flex flex-row gap-4">
                <a
                  href="index.html"
                  class="btn btn-primary mt-[14px] self-start"
                >
                  Save Changes
                </a>
                <a
                  href="index.html"
                  class="btn btn-danger mt-[14px] self-start"
                >
                  Cancel
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
