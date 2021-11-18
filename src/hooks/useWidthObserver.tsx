import { RefObject, useEffect, useState } from 'react'

// updates width with respect to another element or to the window width itself
export const useWidthObserver = (ref: RefObject<HTMLDivElement> | null) => {
  const [width, setWidth] = useState(ref?.current?.offsetWidth ?? 1000)
  useEffect(() => {
    // timeout to prevent edge case of resize being triggered multiple times
    let timeoutId: any = null
    const handleWindowResize = () => {
      clearTimeout(timeoutId)
      console.log('window resize')
      timeoutId = setTimeout(() => {
        setWidth(ref?.current?.offsetWidth ?? window.innerWidth)
      }, 300)
    }
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return { width, setWidth }
}
