<template></template>

<script>
export default {
  middleware: 'auth',
  fetch() {
    this.$router.push({ name: 'admin-overview' })
  },
}
</script>
