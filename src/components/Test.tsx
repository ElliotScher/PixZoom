import { useState } from 'react'

export default function Test() {
  const [test, setTest] = useState('test')
  window.ipcRenderer.invoke('test', 'world').then(
    function (value) {
      setTest(value)
    },
    function (error) {
      setTest(error)
    }
  )

  return <>{test}</>
}
