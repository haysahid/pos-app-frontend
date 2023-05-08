export default (context, inject) => {
    const toastStatus = (status, message) => {
        this.$swal({
            toast: true,
            title: message,
            type: status,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
          })
    }

    inject('toastStatus', toastStatus)
}