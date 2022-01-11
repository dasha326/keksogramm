import {utils} from './utils.js';
import {uploadImageScript} from './upload-image.js';
import {gallery} from './gallery.js';
import {arrayImages} from './data.js';

(() => {
  gallery(arrayImages);
  uploadImageScript();
})();
