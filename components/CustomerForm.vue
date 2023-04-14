<template>
  <div class="overflow-y-auto flex flex-col min-w-[40%] h-full mr-[24px] mt-[24px]">
    <form class="w-full card pt-[24px] flex-grow px-[40px]">
      <div class="flex justify-between">
        <h1 class="text-[20px] font-bold text-dark pt-4 pb-2">Add Customer</h1>
      </div>
      <div class="form-group">
        <label for="" class="input-label">Full Name*</label>
        <input type="text" class="input-field" placeholder="Full Name" />
      </div>
      <div class="form-group">
        <label for="" class="input-label">Address</label>
        <textarea class="input-field" placeholder="Address"> </textarea>
      </div>
      <div class="form-group">
        <label for="" class="input-label">Phone*</label>
        <input type="text" class="input-field" placeholder="Phone" />
      </div>
      <div class="flex flex-row gap-4">
        <a href="index.html" class="btn btn-primary mt-[14px] self-start">
          Add Customer
        </a>
        <a href="index.html" class="btn btn-danger mt-[14px] self-start">
          Cancel
        </a>
      </div>

      <!-- <button type="button" class="w-full btn btn-primary mt-[14px]">
              Sign In
          </button> -->
    </form>
  </div>
</template>
