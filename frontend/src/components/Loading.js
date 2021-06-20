import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = props => {
  return (
    <AiOutlineLoading3Quarters
      className='animate-spin'
      color='#1af00e'
      size={`${props.size}em`}
    />
  )
}

export default Loading
