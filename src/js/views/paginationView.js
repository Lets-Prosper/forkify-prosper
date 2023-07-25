import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPageEl = document.querySelector('.current-page');
  #currentPage = 1;
  #pages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    this.#currentPage = this._data.page;
    console.log(this._currentPage);

    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    this.#pages = numPages;

    // Render Current page
    this._renderCurPage.bind(this)(curPage, numPages);

    // Page 1 and other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      `;
    }

    // Other pages
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Page 1 and there are NO other pages
    return ``;
  }

  _renderCurPage(curPage, numPage) {
    this._curPageEl.innerHTML = '';
    const html = `
    <button class="btn--inline btn-new pagination__btn--prev">
      <span>Page ${curPage} of ${numPage}</span>
    </button>
    `;
    this._curPageEl.insertAdjacentHTML('afterbegin', html);
  }
}

export default new PaginationView();
