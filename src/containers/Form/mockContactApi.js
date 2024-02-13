// mockContactApi.js
const mockContactApi = (shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('API call failed'))
      } else {
        resolve()
      }
    }, 1000)
  })

export default mockContactApi
