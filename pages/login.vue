<template>
  <section class="py-[60px] flex flex-col items-center justify-center px-4">
    <img src="/assets/svgs/logo-type.svg" alt="" />

    <form class="w-full card mt-[40px] max-w-[35%]" @submit.prevent="userLogin">
      <div class="text-3xl font-bold text-dark text-center">Log In</div>
      <p class="mt-1 leading-7 text-center mb-2 text-grey-80">
        Log in to start your session
      </p>
      <div class="form-group">
        <label for="" class="input-label">Email Address*</label>
        <input
          type="email"
          class="input-field"
          placeholder="Email"
          v-model="login.email"
        />
      </div>
      <div class="form-group">
        <label for="" class="input-label">Password*</label>
        <input
          type="password"
          class="input-field"
          placeholder="Password"
          v-model="login.password"
        />
      </div>
      <div class="flex flex-row gap-2">
        <input
          type="checkbox"
          class="hover:text-primary-hover ease-in-out duration-200 focus:text-primary-hover"
        />
        <p class="input-label">Remember me</p>
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Log In
      </button>
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
        <a
          href=""
          class="text-primary font-semibold hover:text-primary-hover ease-in-out duration-200"
          >Register</a
        >
      </div>
    </form>
  </section>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)

        this.$router.push({
          name: 'admin-overview',
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
