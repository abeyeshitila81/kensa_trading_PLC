 const displayETBCurrency=(number)=>{
    const formatter=new Intl.NumberFormat("en-ET", {
        style:"currency",
        currency:"ETB",
        minimumFractionDigits:0
    })

    return formatter.format(number)
}
export default displayETBCurrency;