<template>
  <!-- Main -->
  <main class="flex justify-center px-[24px]">
    <!-- Content -->
    <section
      class="py-[60px] max-w-[450px] flex flex-col items-center flex-grow justify-center"
    >
      <!-- Logo -->
      <div class="h-[60px] flex items-center justify-between">
        <a href="#" class="flex justify-center items-center gap-3 px-[5.5px]">
          <div
            class="p-3 bg-primary rounded-full"
            v-if="!$store.state.settings.app_logo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              class="w-8 h-8"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              />
              <path
                d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"
              />
            </svg>
          </div>
          <img
            :src="imgUrl + $store.state.settings.app_logo"
            alt=""
            class="h-[50px]"
            v-else
          />
          <p class="text-2xl font-bold text-dark">
            {{ $store.state.settings.app_name }}
          </p>
        </a>
      </div>

      <!-- Login Form -->
      <form
        class="w-full card form-container mt-[40px]"
        @submit.prevent="userLogin"
      >
        <div class="text-3xl font-bold text-dark text-center">Log In</div>
        <p class="mt-1 leading-7 text-center mb-2 text-grey-80">
          Log in to start your session
        </p>

        <div
          class="bg-red-100 rounded-md p-6"
          v-if="validation.meta?.status == 'error'"
        >
          <p class="text-red-600 text-center">{{ validation.meta?.message }}</p>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="" class="input-label">Email Address*</label>
          <input
            type="email"
            class="input-field"
            placeholder="Email"
            v-model="login.email"
          />

          <!-- Validation -->
          <p
            class="text-red-500 text-xs italic"
            v-if="validation.errors?.email"
          >
            {{ validation.errors?.email[0] }}
          </p>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="" class="input-label">Password*</label>
          <input
            type="password"
            class="input-field"
            placeholder="Password"
            v-model="login.password"
          />

          <!-- Validation -->
          <p
            class="text-red-500 text-xs italic"
            v-if="validation.errors?.password"
          >
            {{ validation.errors?.password[0] }}
          </p>
        </div>

        <!-- Remember Me -->
        <div class="flex flex-row gap-2">
          <input
            type="checkbox"
            class="hover:text-primary-hover ease-in-out duration-200 focus:text-primary-hover"
          />
          <p class="input-label">Remember me</p>
        </div>

        <!-- Button -->
        <button type="submit" class="w-full btn btn-primary mt-[14px]">
          Log In
        </button>

        <!-- More -->
        <div class="mt-4 flex flex-row gap-1 justify-center">
          <p class="input-label">Forgot your password?</p>
          <a
            href=""
            class="text-primary font-semibold hover:text-primary-hover ease-in-out duration-200"
            >Reset</a
          >
        </div>
        <div class="flex flex-row gap-1 justify-center">
          <p class="input-label">Don’t have an account yet?</p>
          <NuxtLink
            :to="{ name: 'register' }"
            href=""
            class="text-primary font-semibold hover:text-primary-hover ease-in-out duration-200"
            >Register</NuxtLink
          >
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      imgUrl: process.env.imgUrl,
      login: {
        email: '',
        password: '',
      },
      validation: [],
    }
  },
  async fetch() {
    // Get Settings
    await this.$store.dispatch('getSettings')
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })

        this.$router.push({ name: 'admin-overview' })
      } catch (err) {
        this.validation = err.response.data
      }
    },
  },
}
</script>
