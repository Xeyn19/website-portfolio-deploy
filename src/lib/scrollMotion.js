const defaultRevealEase = [0.22, 1, 0.36, 1]

export const getScrollRevealProps = (shouldReduceMotion, overrides = {}) => {
  if (shouldReduceMotion) {
    return {}
  }

  const {
    initial,
    whileInView,
    viewport,
    transition,
    ...rest
  } = overrides

  return {
    initial: {
      opacity: 0,
      y: 16,
      ...initial,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      ...whileInView,
    },
    viewport: {
      once: true,
      amount: 0.08,
      ...viewport,
    },
    transition: {
      duration: 0.38,
      ease: defaultRevealEase,
      ...transition,
    },
    ...rest,
  }
}
