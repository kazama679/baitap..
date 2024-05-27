import React, { useContext } from 'react'
import {Context} from './UseContext'

export default function E() {
    const result = useContext(Context);
  return (
    <div>
      {result}
    </div>
  )
}