import axios from 'axios'

const uri = process.env.REACT_APP_SERVER_URI

export const postData = async (path, user, password) => {
  let isError = false

  try {
    const response = await axios.post(`${uri}${path}`, {
      u_name: user,
      u_pwd: password,
    })
    return [response.data[0], isError]
  } catch (error) {
    isError = true
    return [error.message, isError]
  }
}

export const getData = async path => {
  let isError = false

  try {
    const response = await axios.get(`${uri}${path}`)
    return [response.data, isError]
  } catch (error) {
    isError = true
    return [error.message, isError]
  }
}

export const getDataById = async (path, id) => {
  let isError = false

  try {
    const response = await axios.get(`${uri}${path}/${id}`, {
      params: { id },
    })
    return [response.data, isError]
  } catch (error) {
    isError = true
    return [error.message, isError]
  }
}

export const deleteData = async (path, id) => {
  let isError = false

  try {
    const response = await axios.delete(`${uri}${path}`, {
      data: { id },
    })
    return [response.data[0], isError]
  } catch (error) {
    isError = true
    return [error.message, isError]
  }
}

export const updateData = async (path, id, oc, atn) => {
  let isError = false

  try {
    const response = await axios.put(`${uri}${path}`, {
      id,
      oc,
      atn,
    })
    return [response.data[0], isError]
  } catch (error) {
    isError = true
    return [error.message, isError]
  }
}
