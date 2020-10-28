// /* eslint-disable */
export function getPosition(el) {
  let scale = 1
  const SIDE_PADDING = 100

  const rect = el.getBoundingClientRect()

  const { top, left, width, height } = rect
  const { naturalWidth: nw, naturalHeight: nh } = el
  const { innerWidth: iw, innerHeight: ih } = window

  if (iw > nw) {
    if ((ih - nh) < 100) {
      scale = 1
    }
    if ((iw - nw) < 200) {
      scale = (nw - SIDE_PADDING) / width
    } else {
      scale = nw / width
    }
  } else {
    if ((iw - SIDE_PADDING) > width) {
      scale = (iw - SIDE_PADDING) / width
    }
    scale = 1
  }

  const translateX = (iw / 2) - (width / 2 + left)
  const translateY = (ih / 2) - (height / 2 + top)
  const transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
  // const transform = `transform: translate(${translateX}px, ${translateY}px) scale(${scale});`

  return transform
}
