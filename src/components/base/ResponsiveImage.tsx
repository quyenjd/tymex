import type { ImageProps } from 'next/image'
import Image from 'next/image'

const ResponsiveImage = (props: ImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      height={0}
      width={0}
      sizes="100vw"
      style={{ height: props.height, width: props.width }}
    />
  )
}

export default ResponsiveImage
