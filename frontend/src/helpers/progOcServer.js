import axios from 'axios'

const uri = process.env.REACT_APP_SERVER_URI

export const addData = async (path, p_oc) => {
  let isError = false

  try {
    const response = await axios.post(`${uri}${path}`, {
      p_oc,
      atn: 0,
    })
    return [response.data[0], isError]
  } catch (error) {
    isError = true
    return [error.message, isError]
  }
}
