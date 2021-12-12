import News from "./models/News";
import View, { DOM_ELEMENTS } from "./View";

class Application {
  constructor() {
    this.news = new News();
    this.category = "trending";
    this.inputValue = "";
    this.switcher = "list";
  }

  init() {
    this.displayNewsList(this.category);
    this.setupEventListeners();
  }

  setupEventListeners() {
    document
      .querySelector(DOM_ELEMENTS.backToTopBtn)
      .addEventListener("click", () => {
        View.backToTop();
      });

    document
      .querySelector(DOM_ELEMENTS.burgerMenu)
      .addEventListener("click", () => {
        View.toggleBurgerMenu();
      });

    document.querySelectorAll(DOM_ELEMENTS.categoryBtn).forEach((category) => {
      category.addEventListener("click", (e) => {
        this.category = e.target.id;
        this.displayNewsList(this.category);
        View.toggleBurgerMenu();
      });
    });

    document.querySelector(DOM_ELEMENTS.logo).addEventListener("click", () => {
      View.clearInput();
      this.displayNewsList(this.category);
    });

    document
      .querySelector(DOM_ELEMENTS.input)
      .addEventListener("input", (e) => {
        this.inputValue = e.target.value;
        if (this.inputValue.length > 0) {
          this.news.editNewsPage = true;
          if (this.switcher === "list") {
            this.filterNewsList(this.inputValue);
          } else {
            this.displayNewsPage(this.news.newsPage.id, this.inputValue);
          }
        } else {
          this.inputValue = "";
          this.news.editNewsPage = false;
          if (this.switcher === "list") {
            this.filterNewsList(this.inputValue);
          } else {
            this.displayNewsPage(this.news.newsPage.id, this.inputValue);
          }
        }
      });
  }

  async displayNewsList(category) {
    const status = await this.news.getNewsList(category);
    if (status === "ok") {
      this.switcher = "list";
      this.eventScroll("add");
      this.eventsCards("remove");
      View.clearAllCards();
      View.displayNewsList(this.news.newsListHtml);
      this.eventsCards("add");
    }
  }

  eventsCards(type) {
    document.querySelectorAll(DOM_ELEMENTS.newsPage).forEach((page) => {
      if (type === "add") {
        page.addEventListener("click", (e) => {
          View.clearPreviewList();
          this.displayNewsPage(e.target.attributes[1].value, this.inputValue);
        });
      }
      if (type === "remove") {
        page.removeEventListener("click", (e) => {
          this.displayNewsPage(e.target.attributes[1].value, this.inputValue);
        });
      }
    });
  }

  eventsPreview(type) {
    document.querySelectorAll(DOM_ELEMENTS.previewPage).forEach((page) => {
      if (type === "add") {
        page.addEventListener("click", (e) => {
          View.clearPreviewList();
          View.clearInput();
          this.inputValue = "";
          this.displayNewsPage(e.target.attributes[1].value, this.inputValue);
        });
      }
      if (type === "remove") {
        page.removeEventListener("click", (e) => {
          this.displayNewsPage(e.target.attributes[1].value, this.inputValue);
        });
      }
    });
  }

  eventScroll(type = "add") {
    if (type === "add") {
      window.addEventListener("scroll", View.scrollFunction);
    }
    if (type === "remove") {
      window.removeEventListener("scroll", View.scrollFunction);
      View.hideScrollFunction();
    }
  }

  displayNewsPage(id, word) {
    const status = this.news.getNewsPage(id, word);
    if (status === "ok") {
      this.switcher = "page";
      this.eventScroll("remove");
      View.clearAllCards();
      View.displayNewsList(this.news.newsPageHtml);
      View.backToTop();
    }
  }

  filterNewsList(word) {
    if (this.inputValue === "") {
      View.clearPreviewList();
    } else {
      this.eventsPreview("remove");
      let data = this.news.filterNewsList(word);
      if (data.status === "ok") {
        View.displayPreviewList(this.news.newsPreviewHtml);
        this.eventsPreview("add");
      } else {
        View.displayPreviewList(data.errorMessage);
      }
    }
  }
}

const app = new Application();
export default app;
