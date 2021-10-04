import { MDCSelect } from '@material/select'
import $ from 'jquery'

require('../../styles/layout/footer.scss')

$(() => {
  initLocaleSelection()
})

function initLocaleSelection () {
  const select = new MDCSelect(document.querySelector('.mdc-select--locale'))

  select.listen('MDCSelect:change', () => {
    document.cookie = `hl= ${select.value}; path=/`
    window.location.reload()
  })
}
