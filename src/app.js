import News from "./models/News";
import Category from "./models/Category";
import View, { DOM_ELEMENTS } from "./View";

class Application {
  constructor() {
    this.news = new News();
    this.category = new Category();
    this.inputValue = "";
    this.switcher = "list";
    this.openMenu = false;
    this.openCategory = false;
  }

  init() {
    this.displayCategory();
    this.displayNewsList(this.category.current);
    this.setupEventListeners();
    console.log(document.documentElement.clientWidth);
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
        if (this.openMenu && this.openCategory) {
          this.toggleCategoryMenu();
        }
        this.toggleBurgerMenu();
      });

    document
      .querySelector(DOM_ELEMENTS.menuList)
      .addEventListener("click", () => {
        this.toggleCategoryMenu();
      });

    document
      .querySelector(DOM_ELEMENTS.menuList)
      .addEventListener("mouseenter", () => {
        this.toggleCategoryMenu();
      });

    document
      .querySelector(DOM_ELEMENTS.menuList)
      .addEventListener("mouseleave", () => {
        this.toggleCategoryMenu(false);
      });

    document.querySelectorAll(DOM_ELEMENTS.categoryBtn).forEach((category) => {
      category.addEventListener("click", (e) => {
        this.category.setCategory(e.target.id);
        this.displayNewsList(this.category.current);
        this.defaultMenu();
        e.stopPropagation();
      });
    });

    document.querySelector(DOM_ELEMENTS.logo).addEventListener("click", () => {
      View.clearInput();
      this.defaultMenu();
      this.displayNewsList(this.category.current);
    });

    document
      .querySelector(DOM_ELEMENTS.input)
      .addEventListener("input", (e) => {
        this.inputValue = e.target.value;
        if (this.inputValue.length > 0) {
          this.news.editNewsPage = true;
          View.cancelInput(true);
          if (this.switcher === "list") {
            this.filterNewsList(this.inputValue);
          } else {
            this.displayNewsPage(this.news.newsPage.id, this.inputValue);
          }
        } else {
          this.inputValue = "";
          this.news.editNewsPage = false;
          View.cancelInput(false);

          if (this.switcher === "list") {
            this.filterNewsList(this.inputValue);
          } else {
            this.displayNewsPage(this.news.newsPage.id, this.inputValue);
          }
        }
      });

    document
      .querySelector(DOM_ELEMENTS.inputCancel)
      .addEventListener("click", () => {
        View.clearPreviewList();
        View.clearInput();
        this.inputValue = "";
        View.cancelInput(false);
      });
  }

  displayCategory() {
    this.category.getCategoryList();
    View.displayCategory(this.category.listHTML);
  }

  toggleBurgerMenu(isOpened = !this.openMenu) {
    this.openMenu = isOpened;
    View.toggleBurgerMenu(this.openMenu);
  }

  toggleCategoryMenu(isOpened = !this.openCategory) {
    this.openCategory = isOpened;
    View.toggleCategoryMenu(this.openCategory);
  }

  defaultMenu() {
    this.toggleCategoryMenu(false);
    this.toggleBurgerMenu(false);
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
          View.clearInput();
          this.inputValue = "";
          View.cancelInput(false);
          this.displayNewsPage(e.target.attributes[1].value, this.inputValue);
        });
      }
      if (type === "remove") {
        page.removeEventListener("click", (e) => {
          View.clearPreviewList();
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
          View.cancelInput(false);
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
      this.defaultMenu();
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
