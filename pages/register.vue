<template>
  <!-- Main -->
  <main class="flex justify-center">
    <!-- Content -->
    <section
      class="py-[60px] min-w-[450px] flex flex-col items-center justify-center px-4"
    >
      <img src="/assets/svgs/logo-type.svg" alt="" />

      <!-- Register Form -->
      <form class="w-full card mt-[40px]" @submit.prevent="userRegister">
        <div class="text-3xl font-bold text-dark text-center">Register</div>
        <p class="mt-1 leading-7 text-center mb-2 text-grey-80">
          Register to create new account
        </p>

        <!-- Full Name -->
        <div class="form-group">
          <label for="" class="input-label">Full Name*</label>
          <input
            type="text"
            class="input-field"
            placeholder="Full Name"
            v-model="register.name"
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="" class="input-label">Email Address*</label>
          <input
            type="email"
            class="input-field"
            placeholder="Email"
            v-model="register.email"
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="" class="input-label">Password*</label>
          <input
            type="password"
            class="input-field"
            placeholder="Password"
            v-model="register.password"
          />
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="" class="input-label">Confirm Password*</label>
          <input
            type="password"
            class="input-field"
            placeholder="Confirm Password"
          />
        </div>

        <!-- Terms and Conditions -->
        <div class="flex flex-row gap-2">
          <input
            type="checkbox"
            class="hover:text-primary-hover ease-in-out duration-200 focus:text-primary-hover"
          />
          <p class="input-label">I agree with the terms and conditions.</p>
        </div>

        <!-- Button -->
        <button type="submit" class="w-full btn btn-primary mt-[14px]">
          Register
        </button>

        <!-- More -->
        <div class="mt-4 flex flex-row gap-1 justify-center">
          <p class="input-label">Already have an account?</p>
          <NuxtLink
            :to="{ name: 'login' }"
            href=""
            class="text-primary font-semibold hover:text-primary-hover ease-in-out duration-200"
            >Log In</NuxtLink
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
      register: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userRegister() {
      try {
        // Send Registration Data to Server
        let response = await this.$axios.post('/auth/register', this.register)

        // If Successful, Login User
        try {
          let login = await this.$auth.loginWith('local', {
            data: {
              email: this.register.email,
              password: this.register.password,
            },
          })

          console.log(login)
          this.$router.push({
            name: 'admin-overview',
          })
        } catch (err) {
          console.log(err)
        }

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
