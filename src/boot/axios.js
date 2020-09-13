import axios from 'axios'
import { Notify } from 'quasar'

const axiosInstance = axios.create({})

axiosInstance.defaults.baseURL = 'your API Address'
axiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (!error.response) {
    Notify.create(this.$t('errors.network'))
  }
  return Promise.reject(error)
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
  Vue.axios = Vue.prototype.$axios
}

export { axiosInstance }
