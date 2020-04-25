export function getPosition(el) {
  let scale = '1'
  const SIDE_PADDING = 100

  const rect = el.getBoundingClientRect()
  const { top, width, height } = rect
  const { naturalWidth: nw, naturalHeight: nh } = el
  const { innerWidth: iw, innerHeight: ih } = window

  if (iw > nw) {
    scale = (nw - SIDE_PADDING) / width
  }
  if (ih > nh) {
    scale = (nh - SIDE_PADDING) / height
  }

  const translateY = (window.innerHeight / 2) - (height * scale / 2 + top)
  const transform = `transform: scale(${scale}) translate(0, ${translateY}px);`
  return transform
}
