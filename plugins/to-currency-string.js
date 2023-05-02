export default (context, inject) => {
    const toCurrencyString = (number) => {
        return (
            number.toLocaleString(
                'id',
                {
                    style: 'currency',
                    currency: 'IDR', maximumFractionDigits: 0
                }
            )
        )
    }

    inject('toCurrencyString', toCurrencyString)
}