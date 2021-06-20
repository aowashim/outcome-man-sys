import axios from 'axios'

const uri = process.env.REACT_APP_SERVER_URI

export const addData = async (path, c_oc, c_code) => {
  let isError = false

  try {
    const response = await axios.post(`${uri}${path}`, {
      c_oc,
      c_code,
      atn: 0,
    })
    return [response.data[0], isError]
  } catch (error) {
    isError = true
    return [error.message, isError]
  }
}
