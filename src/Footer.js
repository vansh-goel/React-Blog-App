import React from 'react'
import { format } from 'date-fns'

const Footer = () => {
  const [date, setDate] = React.useState(format(new Date(), "MMMM dd, yyyy pp"));
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(format(new Date(), "MMMM dd, yyyy pp"))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>{date}</div>
  )
}

export default Footer