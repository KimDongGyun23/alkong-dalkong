import type { PropsWithChildren } from 'react'

type ContainerProps = {
  direction?: 'row' | 'col'
}

export const Container = ({ direction = 'col', children }: PropsWithChildren<ContainerProps>) => {
  const layoutStyle = direction === 'row' ? 'flex-between-align' : 'flex-column gap-2'
  return <div className={layoutStyle}>{children}</div>
}
