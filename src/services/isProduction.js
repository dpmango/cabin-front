const isProduction = () => {
  const host = window.location.href
  const productionHost = "cabin.com.sg"
  return host.indexOf(productionHost) >= 0 ? true : false
  // return process.env.NODE_ENV === 'production' ? true : false
}

export default isProduction
