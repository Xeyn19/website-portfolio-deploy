import { useCallback } from 'react'

const ElectricBorder = ({
  as: Tag = 'div',
  className = '',
  contentClassName = '',
  children,
  style,
  onPointerMove,
  ...props
}) => {
  const handlePointerMove = useCallback(
    (event) => {
      if (event.pointerType !== 'touch') {
        const target = event.currentTarget
        const rect = target.getBoundingClientRect()

        target.style.setProperty('--hover-x', `${event.clientX - rect.left}px`)
        target.style.setProperty('--hover-y', `${event.clientY - rect.top}px`)
      }

      onPointerMove?.(event)
    },
    [onPointerMove],
  )

  return (
    <Tag
      className={`hover-reveal ${className}`.trim()}
      style={{
        '--hover-x': '50%',
        '--hover-y': '50%',
        ...style,
      }}
      onPointerMove={handlePointerMove}
      {...props}
    >
      <span className="hover-reveal__overlay" aria-hidden="true" />
      <div className={`electric-border__content hover-reveal__content ${contentClassName}`.trim()}>
        {children}
      </div>
    </Tag>
  )
}

export default ElectricBorder
