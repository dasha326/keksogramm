import {utils} from './utils.js';
import {uploadImageScript} from './upload-image.js';
import {gallery} from './gallery.js';
import {loadData} from './backend.js';

(() => {
  uploadImageScript();
  loadData(gallery, utils.errorMessage)
})();
