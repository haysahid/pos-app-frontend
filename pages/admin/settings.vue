<template>
  <!-- Main -->
  <main
    class="ml-[220px] max-lg:ml-[88px] max-md:ml-0 max-w-[100%] flex justify-center my-[60px] p-[24px] ease-in-out duration-200 max-md:flex-col max-md:mb-[88px]"
  >
    <section
      class="flex flex-row justify-between gap-6 flex-grow max-md:max-w-none items-start overflow-y-auto max-w-[700px]"
    >
      <div class="flex flex-col flex-grow gap-8">
        <!-- Title -->
        <div class="flex justify-between">
          <h1 class="text-[24px] font-bold text-dark self-center">Settings</h1>
        </div>

        <!-- Preferences -->
        <form
          @submit.prevent="updateSettings"
          class="flex flex-col card form-container"
        >
          <!-- Headline -->
          <h2 class="text-[20px] font-bold text-dark">Preferences</h2>

          <!-- App Name -->
          <div class="form-group">
            <label for="" class="input-label required">App Name</label>
            <input
              type="text"
              class="input-field"
              placeholder="App Name"
              v-model="settings.app_name"
            />
          </div>

          <!-- App Description -->
          <div class="form-group">
            <label for="" class="input-label">App Description</label>
            <textarea
              class="input-field"
              placeholder="App Description"
              v-model="settings.app_description"
            ></textarea>
          </div>

          <!-- App Logo -->
          <div class="form-group">
            <label for="" class="input-label">App Logo</label>

            <!-- App Logo Preview -->
            <div
              class="flex justify-center w-full input-field bg-gray-50 gap-4 p-5"
              v-if="settings.app_logo && !change_image"
            >
              <img
                :src="
                  preview_image ? preview_image : image_path + settings.app_logo
                "
                alt=""
                class="w-[100px] rounded-[6px] object-cover aspect-square self-center"
              />
              <div class="self-center">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="
                    change_image = true
                    preview_image = false
                  "
                >
                  Change Logo
                </button>
              </div>
            </div>

            <!-- Drop Image -->
            <div
              class="flex items-center justify-center w-full"
              v-if="(change_image || settings.app_logo == '') && !preview_image"
            >
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-36 border-[1.45px] border-grey-60 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    PNG or JPG
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  v-on:change="updateImage"
                />
              </label>
            </div>
          </div>

          <!-- Button -->
          <div class="flex flex-row gap-4 justify-between mt-[14px]">
            <div class="flex flex-row gap-4 self-start">
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
              <button
                class="btn btn-secondary self-start"
                type="button"
                @click="refreshData"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        <!-- Brands -->
        <div class="flex flex-col card form-container">
          <!-- Headline -->
          <div class="flex justify-between items-center">
            <h2 class="text-[20px] font-bold text-dark">Brands</h2>
            <button
              type="button"
              class="btn btn-primary self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
              @click="showModal('brandForm', null)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p class="max-sm:hidden">Add Brand</p>
            </button>
          </div>

          <table class="table text-grey-100 divide-y divide-gray-200">
            <thead>
              <tr class="text-left">
                <th class="pl-4 w-[50px]">ID</th>
                <th class="pr-4">Name</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="$fetchState.pending">
                <td>Loading...</td>
                <td></td>
              </tr>
              <tr
                class="hover:bg-secondary"
                v-else
                v-for="brand in listBrand"
                :key="brand.id"
              >
                <td class="pl-4">{{ brand.id }}</td>
                <td class="flex justify-between items-center pr-4">
                  <p>{{ brand.name }}</p>
                  <button
                    type="button"
                    class="p-2"
                    @click="showModal('brandForm', brand.id)"
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
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Warehouses -->
        <div class="flex flex-col card form-container">
          <!-- Headline -->
          <div class="flex justify-between items-center">
            <h2 class="text-[20px] font-bold text-dark">Warehouses</h2>
            <button
              type="button"
              class="btn btn-primary self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
              @click="showModal('warehouseForm', null)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p class="max-sm:hidden">Add Warehouse</p>
            </button>
          </div>

          <table class="table text-grey-100 divide-y divide-gray-200">
            <thead>
              <tr class="table-divider text-left">
                <th class="pl-4 w-[50px]">ID</th>
                <th class="pr-4">Name</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="$fetchState.pending">
                <td>Loading...</td>
                <td></td>
              </tr>
              <tr
                class="hover:bg-secondary"
                v-else
                v-for="warehouse in listWarehouse"
                :key="warehouse.id"
              >
                <td class="pl-4">{{ warehouse.id }}</td>
                <td>{{ warehouse.name }}</td>
                <td>{{ warehouse.address }}</td>
                <td class="flex justify-between items-center pr-4">
                  <p>{{ warehouse.phone }}</p>
                  <button
                    type="button"
                    class="p-2"
                    @click="showModal('warehouseForm', warehouse.id)"
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
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Categories -->
        <div class="flex flex-col card form-container">
          <!-- Headline -->
          <div class="flex justify-between items-center">
            <h2 class="text-[20px] font-bold text-dark">Categories</h2>
            <button
              type="button"
              class="btn btn-primary self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
              @click="showModal('categoryForm', null)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p class="max-sm:hidden">Add Category</p>
            </button>
          </div>

          <table class="table text-grey-100 divide-y divide-gray-200">
            <thead>
              <tr class="table-divider text-left">
                <th class="pl-4 w-[50px]">ID</th>
                <th class="pr-4">Name</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="$fetchState.pending">
                <td>Loading...</td>
                <td></td>
              </tr>
              <tr
                class="hover:bg-secondary"
                v-else
                v-for="category in listCategory"
                :key="category.id"
              >
                <td class="pl-4">{{ category.id }}</td>
                <td class="flex justify-between items-center pr-4">
                  <p>{{ category.name }}</p>
                  <button
                    type="button"
                    class="p-2"
                    @click="showModal('categoryForm', category.id)"
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
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Payment Account -->
        <div class="flex flex-col card form-container overflow-x-auto">
          <!-- Headline -->
          <div class="flex justify-between items-center">
            <h2 class="text-[20px] font-bold text-dark">Payment Accounts</h2>
            <button
              type="button"
              class="btn btn-primary self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
              @click="showModal('paymentAccountForm', null)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p class="max-sm:hidden">Add Payment Account</p>
            </button>
          </div>

          <div class="flex flex-col gap-4">
            <div v-if="$fetchState.pending">Loading...</div>
            <div
              class="flex flex-row border-[1.5px] border-grey-40 hover:border-grey-60 rounded-lg items-center gap-4 flex-grow p-[16px] justify-between"
              v-else
              v-for="payment_account in listPaymentMethod"
              :key="payment_account.id"
            >
              <div class="flex flex-col gap-1">
                <p class="text-grey-80">{{ payment_account.method }}</p>
                <div class="font-bold text-dark text-[16px] mb-2 line-clamp-1">
                  {{ payment_account.account_name }}
                </div>
                <p class="text-grey-60 line-clamp-1">
                  {{ payment_account.number }}
                </p>
              </div>
              <button
                type="button"
                class="p-2"
                @click="showModal('paymentAccountForm', payment_account.id)"
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]"
      v-if="modal"
      @click="closeModal"
    >
      <aside
        class="w-[450px] max-md:w-[90%] card p-4 bg-white overflow-y-auto shadow-lg"
        @click.stop
      >
        <!-- Brand Form Modal -->
        <FormBrand
          :brand_id="brand_id"
          @close-form="closeModal"
          v-if="modal_type == 'brandForm'"
        />

        <!-- Warehouse Form Modal -->
        <FormWarehouse
          :warehouse_id="warehouse_id"
          @close-form="closeModal"
          v-if="modal_type == 'warehouseForm'"
        />

        <!-- Category Form Modal -->
        <FormCategory
          :category_id="category_id"
          @close-form="closeModal"
          v-if="modal_type == 'categoryForm'"
        />

        <!-- Payment Account Form Modal -->
        <FormPaymentAccount
          :payment_account_id="payment_account_id"
          @close-form="closeModal"
          v-if="modal_type == 'paymentAccountForm'"
        />
      </aside>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'LayoutDashboard',
  middleware: 'superadmin',
  data() {
    return {
      modal: false,
      modal_type: null,
      image_path: 'http://localhost:8000/storage/',
      brands: [],
      warehouses: [],
      categories: [],
      payment_accounts: [],
      settings: {
        app_name: null,
        // currency_symbol: null,
        app_description: '',
        app_logo: null,
      },
      change_image: false,
      preview_image: null,

      // For Form Modal
      brand_id: null,
      warehouse_id: null,
      category_id: null,
      payment_account_id: null,
    }
  },
  async fetch() {
    // Get Settings
    await this.$store.dispatch('getSettings')

    // Set Settings
    this.settings.app_name = this.$store.state.settings.app_name
    // this.settings.currency_symbol = this.$store.state.settings.currency_symbol
    this.settings.app_description = this.$store.state.settings.app_description
    this.settings.app_logo = this.$store.state.settings.app_logo

    // Get Brands
    this.brands = await this.$axios.get('/brand')

    // Get Warehouses
    this.warehouses = await this.$axios.get('/warehouse')

    // Get Categories
    this.categories = await this.$axios.get('/category')

    // Get Payment Accounts
    this.payment_accounts = await this.$axios.get('/payment_account')
  },
  computed: {
    listBrand() {
      return this.brands.data.result.filter((item) => item.name != '-')
    },
    listWarehouse() {
      return this.warehouses.data.result.filter((item) => item.name != '-')
    },
    listCategory() {
      return this.categories.data.result.filter((item) => item.name != '-')
    },
    listPaymentMethod() {
      return this.payment_accounts.data.result.filter(
        (item) => item.method != 'Refund'
      )
    },
  },
  methods: {
    // Update Image
    updateImage(event) {
      this.settings.app_logo = event.target.files[0]

      // Preview image
      let reader = new FileReader()
      reader.onload = (event) => {
        this.preview_image = event.target.result
      }

      reader.readAsDataURL(event.target.files[0])

      this.preview_image = true
      this.change_image = false
    },

    // Update Settings
    async updateSettings() {
      for (const [key, value] of Object.entries(this.settings)) {
        let data = new FormData()

        if (value) {
          data.append('key', key)
          data.append('value', value)
          data.append('_method', 'PUT')

          try {
            let response = await this.$axios.post('/setting/1', data, {
              'content-type': 'multipart/form-data',
            })
          } catch (error) {
            console.log(error.message)
          }
        }
      }

      this.refreshData()
    },

    // Show Modal
    showModal(modal_type, id) {
      this.closeModal()
      this.modal_type = modal_type
      this.modal = true

      if (modal_type == 'brandForm') {
        this.brand_id = id
      }

      if (modal_type == 'warehouseForm') {
        this.warehouse_id = id
      }

      if (modal_type == 'categoryForm') {
        this.category_id = id
      }

      if (modal_type == 'paymentAccountForm') {
        this.payment_account_id = id
      }
    },

    // Close Modal
    closeModal() {
      this.modal_type = null
      this.modal = false

      this.brand_id = null
      this.warehouse_id = null
      this.category_id = null
      this.payment_account_id = null
    },

    // Refresh Data
    refreshData() {
      this.$nuxt.refresh()
    },
  },
}
</script>
