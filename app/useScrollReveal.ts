'use client'

import { useEffect, useRef } from 'react'

/**
 * Observes all elements with the `.reveal` class and adds `.revealed`
 * when they enter the viewport. Re-runs whenever `trigger` changes
 * (e.g. a filter value), so dynamically-rendered elements get observed.
 */
export function useScrollReveal(trigger?: unknown) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'))
      return
    }

    // Disconnect any previous observer before setting up a new one
    observerRef.current?.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    )
    observerRef.current = observer

    // Use rAF to ensure the DOM has settled after React render
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
        observer.observe(el)
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [trigger])
}
