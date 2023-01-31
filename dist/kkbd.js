(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jszip'), require('file-saver')) :
  typeof define === 'function' && define.amd ? define(['jszip', 'file-saver'], factory) :
  (global = global || self, global.kkbd = factory(global.JSZip, global.saveAs));
}(this, (function (JSZip, saveAs) { 'use strict';

  JSZip = JSZip && Object.prototype.hasOwnProperty.call(JSZip, 'default') ? JSZip['default'] : JSZip;
  saveAs = saveAs && Object.prototype.hasOwnProperty.call(saveAs, 'default') ? saveAs['default'] : saveAs;

  /**
   * @author cll
   * @since 2023.01.30
   * zip 下载
   */
  var zip = (function (files, zipName) {
    if (!files.length) return false;
    var zip = new JSZip();
    Promise.all(files.map(function (file) {
      return new Promise(function (resolve) {
        var url = file.url,
          name = file.name;
        var urlName = url.split('/').pop();
        var fileName = name ? name + '.' + url.split('.').pop() : urlName;
        var ajax = new XMLHttpRequest();
        ajax.open('GET', url, true);
        ajax.responseType = 'blob';
        ajax.onload = function (e) {
          zip.file(fileName, e.target.response);
          resolve(e);
        };
        setTimeout(function () {
          return ajax.send();
        });
      });
    })).then(function () {
      zip.generateAsync({
        type: 'blob'
      }).then(function (content) {
        saveAs.saveAs(content, "".concat(zipName || 'download', ".zip"));
      });
    });
  });

  /**
   * @author cll
   * @since 2023.01.30
   */
  var kkbd = {
    zip: zip
  };

  return kkbd;

})));
