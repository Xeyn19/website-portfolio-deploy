const ElectricBorder = ({
  as: Tag = 'div',
  className = '',
  contentClassName = '',
  children,
  style,
  ...props
}) => {
  return (
    <Tag
      className={`hover-reveal ${className}`.trim()}
      style={style}
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
