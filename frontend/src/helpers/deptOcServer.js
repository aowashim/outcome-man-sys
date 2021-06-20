import axios from 'axios'

const uri = process.env.REACT_APP_SERVER_URI

export const addData = async (path, d_oc, d_name) => {
  let isError = false

  try {
    const response = await axios.post(`${uri}${path}`, {
      d_oc,
      d_name,
      atn: 0,
    })
    return [response.data[0], isError]
  } catch (error) {
    isError = true
    return [error.message, isError]
  }
}
