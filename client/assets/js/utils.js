import axios from 'axios'

//TODO: add to configuration file.
const baseUrl = 'http://localhost:3000'

export default {
  ajax: (url, data, method = 'POST') => {
    return new Promise((resolve, reject) => {
        axios({
          url: `${baseUrl}/${url}`,
          method,
          withCredentials: false,
          data: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then( response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error);
        })
      }
    )

  },
  localStorage: {
    set: (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
    get: (key) => {
      return JSON.parse(localStorage.getItem(key));
    }
  },
  redirect: (url) => {
      window.location.replace(`/#/${url}`)
  },

}