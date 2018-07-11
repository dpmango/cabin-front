const isProduction = () => {
  return process.env.NODE_ENV === 'production' ? true : false
}

export default isProduction
