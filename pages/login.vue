<template>
  <section class="py-[60px] flex flex-col items-center justify-center px-4">
    <img src="/assets/svgs/logo-type.svg" alt="" />

    <form class="w-full card mt-[40px] max-w-[35%]">
      <div class="text-3xl font-bold text-dark text-center">Log In</div>
      <p class="mt-1 leading-7 text-center mb-2 text-grey-80">
        Log in to start your session
      </p>
      <div class="form-group">
        <label for="" class="input-label">Email Address*</label>
        <input type="email" class="input-field" placeholder="Email" />
      </div>
      <div class="form-group">
        <label for="" class="input-label">Password*</label>
        <input type="password" class="input-field" placeholder="Password" />
      </div>
      <div class="flex flex-row gap-2">
        <input type="checkbox" class="hover:text-primary-hover ease-in-out duration-200 focus:text-primary-hover"/>
        <p class="input-label">Remember me</p>
      </div>
      <a href="index.html" class="w-full btn btn-primary mt-[14px]">
        Log In
      </a>
      <div class="mt-4 flex flex-row gap-1 justify-center">
        <p class="input-label">Forgot your password?</p>
        <a href="" class="text-primary font-semibold hover:text-primary-hover ease-in-out duration-200">Reset</a>
      </div>
      <div class="flex flex-row gap-1 justify-center">
        <p class="input-label">Don’t have an account yet?</p>
        <a href="" class="text-primary font-semibold hover:text-primary-hover ease-in-out duration-200">Register</a>
      </div>

      <!-- <button type="button" class="w-full btn btn-primary mt-[14px]">
            Sign In
        </button> -->
    </form>
  </section>
</template>
