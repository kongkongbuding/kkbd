/**
 * @author cll
 * @since 2023.01.30
 * zip 下载
 */
import JSZip from 'jszip'
import saveAs from 'file-saver'

export default (files, zipName) => {
  if (!files.length) return false
  const zip = new JSZip()
  Promise.all(
    files.map(file => {
      return new Promise(resolve => {
        const { url, name } = file
        const urlName = url.split('/').pop()
        const fileName = name ? name + '.' + url.split('.').pop() : urlName
        const ajax = new XMLHttpRequest()
        ajax.open('GET', url, true)
        ajax.responseType = 'blob'
        ajax.onload = function(e) {
          zip.file(fileName, e.target.response)
          resolve(e)
        }
        setTimeout(() => ajax.send())
      })
    })
  ).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs.saveAs(content, `${zipName || 'download'}.zip`)
    })
  })
}
