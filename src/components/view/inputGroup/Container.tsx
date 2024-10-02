'use client'
import type { PropsWithChildren } from 'react'

type ContainerProps = {
  direction?: 'row' | 'col'
  onClick?: VoidFunction
}

export const Container = ({
  direction = 'col',
  onClick,
  children,
}: PropsWithChildren<ContainerProps>) => {
  const layoutStyle = direction === 'row' ? 'flex-between-align w-full' : 'flex-column gap-2'

  return (
    <div className={layoutStyle}>
      {onClick ? (
        <button type="button" className={layoutStyle} onClick={onClick}>
          {children}
        </button>
      ) : (
        children
      )}
    </div>
  )
}
