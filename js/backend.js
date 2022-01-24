const SUCCESS = 200;
const NOT_FOUND = 404;

const loadData = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  const url = 'https://21.javascript.pages.academy/kekstagram/data';
  xhr.responseType = `json`;
  xhr.timeout = 10000;

  xhr.open('GET', url);

  xhr.send();

  xhr.addEventListener(`load`, function () {
    let error;
    switch (xhr.status) {
      case SUCCESS:
        onLoad(xhr.response);
        break;
      case NOT_FOUND:
        error = `Файл не найден`;
        break;
      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;

    }
    if (error) {
      onError(error)
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(xhr.status);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
};

const uploadForm = (formData, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  const url = 'https://21.javascript.pages.academy/kekstagram';
  xhr.timeout = 10000;

  xhr.open('POST', url);

  xhr.send(formData);
  xhr.addEventListener(`load`, function () {
    if (xhr.status === SUCCESS) {
      onLoad();
    } else {
      onError();
    }
  });
  xhr.addEventListener(`error`, function () {
    onError();
  });
};

export {loadData, uploadForm}
