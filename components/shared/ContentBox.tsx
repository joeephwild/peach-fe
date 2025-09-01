type ContentBoxProps = {
  children: React.ReactNode
  className?: string
  showBackground?: boolean
  hideBorder?: boolean
  hidePadding?: boolean
}

const ContentBox = ({
  children,
  className = '',
  showBackground = false,
  hideBorder = false,
  hidePadding = false,
}: ContentBoxProps) => {
  return (
    <div
      className={`${hideBorder ? '' : 'border border-th-bkg-3'} ${
        showBackground ? 'bg-th-card-bkg' : ''
      } ${hidePadding ? '' : 'p-6'} ${className}`}
    >
      {children}
    </div>
  )
}

export default ContentBox
