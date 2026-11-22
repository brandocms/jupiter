/** Read all row measurements before writing minimum heights. */
export default function equalizeRows(elements, measure, mark = false) {
  const rows = []
  let row
  for (const el of elements) {
    const rect = el.getBoundingClientRect()
    if (!row || rect.top !== row.top) {
      row = { top: rect.top, height: 0, elements: [] }
      rows.push(row)
    }
    row.height = Math.max(row.height, measure(el, rect))
    row.elements.push(el)
  }
  for (const { elements, height } of rows) {
    for (const el of elements) {
      el.style.minHeight = height + 'px'
      if (mark) el.setAttribute('data-eq-height-elements-adjusted', 'true')
    }
  }
}
