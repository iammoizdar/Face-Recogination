import React from "react"
import { useState, useEffect } from "react"

const Countdown = (props) => {
  const { initMinute = 0, initSeconds = 10 } = props
  const [minutes, setMinutes] = useState(initMinute)
  const [seconds, setSeconds] = useState(initSeconds)

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  return (
    <>
			
						<h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
				
				
		
    </>
  )
}


export default Countdown