const RoundButton = ({
  color = 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  size,
  textColor = 'text-white',
  handleClick = f => f,
  className,
  children,
  ...rest
}) => {
  const sharedClasses = `inline-flex items-center justify-center rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`
  const sizeClasses = getSizeClasses(size)
  const classNames = `${sharedClasses} ${color} ${textColor} ${sizeClasses} ${className}`

  return (
    <button onClick={handleClick} className={classNames} {...rest}>
      {children}
    </button>
  )
}

function getSizeClasses(size) {
  if (!size) return ''

  let sizeClasses

  switch (size) {
    case 'xs':
      sizeClasses = 'px-3 py-1.5 text-xs font-medium'
      break
    case 'sm':
      sizeClasses = 'px-3.5 py-2 text-sm leading-4 font-medium'
      break
    case 'md':
      sizeClasses = 'px-4 py-2 text-sm font-medium'
      break
    case 'lg':
      sizeClasses = 'px-5 py-2 text-base font-medium'
      break
    case 'xl':
      sizeClasses = 'px-6 py-3 text-base font-medium'
    default:
      sizeClasses = 'px-3.5 py-2 text-sm leading-4 font-medium'
      break
  }

  return sizeClasses
}

export default RoundButton
