/* eslint-disable */
export function getPosition(el) {
  let scale = 1
  const SIDE_PADDING = 200

  const rect = el.getBoundingClientRect()

  const { top, left, width, height } = rect
  const { naturalWidth: nw, naturalHeight: nh } = el
  const { innerWidth: iw, innerHeight: ih } = window

  if (iw > nw) {
    if (ih > nh) {
      scale = 1
    }
    if ((iw - nw) < 200) {
      scale = (nw - SIDE_PADDING) / width
    } else {
      scale = nw / width
    }
  }

  const translateX = (iw / 2) - (width / 2 + left)
  const translateY = (ih / 2) - (height / 2 + top)
  const transform = `transform: translate(${translateX}px, ${translateY + 30}px) scale(${scale});`

  return transform
}
