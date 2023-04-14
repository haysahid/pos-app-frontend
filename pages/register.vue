<template>
    <section class="py-[60px] flex flex-col items-center justify-center px-4">
      <img src="/assets/svgs/logo-type.svg" alt="" />
  
      <form class="w-full card mt-[40px] max-w-[35%]">
        <div class="text-3xl font-bold text-dark text-center">Register</div>
        <p class="mt-1 leading-7 text-center mb-2 text-grey-80">
          Register to create new account
        </p>
        <div class="form-group">
          <label for="" class="input-label">Full Name*</label>
          <input type="text" class="input-field" placeholder="Full Name" />
        </div>
        <div class="form-group">
          <label for="" class="input-label">Email Address*</label>
          <input type="email" class="input-field" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="" class="input-label">Password*</label>
          <input type="password" class="input-field" placeholder="Password" />
        </div>
        <div class="form-group">
          <label for="" class="input-label">Confirm Password*</label>
          <input type="password" class="input-field" placeholder="Confirm Password" />
        </div>
        <div class="flex flex-row gap-2">
          <input type="checkbox" class="hover:text-primary-hover ease-in-out duration-200 focus:text-primary-hover"/>
          <p class="input-label">I agree with the terms and conditions.</p>
        </div>
        <a href="index.html" class="w-full btn btn-primary mt-[14px]">
          Register
        </a>
        <div class="mt-4 flex flex-row gap-1 justify-center">
          <p class="input-label">Already have an account?</p>
          <a href="" class="text-primary font-semibold hover:text-primary-hover ease-in-out duration-200">Log In</a>
        </div>
  
        <!-- <button type="button" class="w-full btn btn-primary mt-[14px]">
              Sign In
          </button> -->
      </form>
    </section>
  </template>
  