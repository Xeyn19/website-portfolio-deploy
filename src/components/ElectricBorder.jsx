import React from 'react'

const accentPalettes = {
  amber: {
    primary: 'rgba(251, 191, 36, 0.92)',
    secondary: 'rgba(56, 189, 248, 0.82)',
  },
  cyan: {
    primary: 'rgba(56, 189, 248, 0.92)',
    secondary: 'rgba(34, 197, 94, 0.78)',
  },
  rose: {
    primary: 'rgba(251, 113, 133, 0.9)',
    secondary: 'rgba(56, 189, 248, 0.78)',
  },
}

const ElectricBorder = ({
  as: Tag = 'div',
  accent = 'amber',
  variant = 'default',
  className = '',
  contentClassName = '',
  children,
  style,
  ...props
}) => {
  const palette = accentPalettes[accent] ?? accentPalettes.amber

  return (
    <Tag
      className={`electric-border electric-border--${variant} ${className}`.trim()}
      style={{
        '--eb-primary': palette.primary,
        '--eb-secondary': palette.secondary,
        ...style,
      }}
      {...props}
    >
      <div className={`electric-border__content ${contentClassName}`.trim()}>{children}</div>
    </Tag>
  )
}

export default ElectricBorder
