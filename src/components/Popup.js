export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose.bind(this)); 
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const button = this._popup.querySelector('.popup__button_making_exit');
    button.addEventListener('click', () => this.close());
// закрытие на overlay
    this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target === this._popup) {
          this.close();
        };
      });
    };

  renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
      if (isLoading) {
        button.textContent = loadingText;
      } else {
        button.textContent = buttonText;
      }
    }

  handleSubmit(request, evt, loadingText = 'Сохранение...') {
      evt.preventDefault();
      const submitButton = evt.submitter;
      const initialText = submitButton.textContent;
      renderLoading(true, submitButton, initialText, loadingText);
      request()
        .then(() => {
          evt.target.reset();
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
          renderLoading(false, submitButton, initialText);
        });
    }
  }
