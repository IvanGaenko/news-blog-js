export const DOM_ELEMENTS = {
  mainContainer: ".main",
  backToTopBtn: ".backToTop",
  burgerMenu: ".burger",
  imgClass: "gu-image",
  categoryBtn: ".category",
  newsPage: ".news-page",
  previewPage: ".preview-page",
  logo: ".header .title",
  input: "#input-search",
  dropDownMenu: ".drop-down-menu",
  menuList: ".menu-list",
  inputCancel: ".input-cancel",
};

class View {
  static clearAllCards() {
    const mainNode = document.querySelector(DOM_ELEMENTS.mainContainer);
    while (mainNode.firstChild) {
      mainNode.firstChild.remove();
    }
  }

  static initInterface() {}

  static displayCategory(data) {
    document.querySelector(".menu-list").appendChild(data);
  }

  static displayNewsList(data) {
    for (let i = 0; i < data.length; i++) {
      document.querySelector(DOM_ELEMENTS.mainContainer).appendChild(data[i]);
    }
  }

  static displayNewsPage(singlePage) {
    document.querySelector(DOM_ELEMENTS.mainContainer).appendChild(singlePage);
  }

  static clearInput() {
    document.querySelector(DOM_ELEMENTS.input).value = "";
  }

  static displayPreviewList(data) {
    this.clearPreviewList();
    for (let i = 0; i < data.length; i++) {
      document.querySelector(".input-container").appendChild(data[i]);
    }
  }

  static clearPreviewList() {
    const previewNode = document.querySelector(".drop-down-preview");
    if (previewNode !== null) previewNode.remove();
  }

  static scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.querySelector(DOM_ELEMENTS.backToTopBtn).style.display = "block";
    } else {
      document.querySelector(DOM_ELEMENTS.backToTopBtn).style.display = "none";
    }
  }

  static hideScrollFunction() {
    document.querySelector(DOM_ELEMENTS.backToTopBtn).style.display = "none";
  }

  static backToTop() {
    const rootElement = document.documentElement;
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  static hideLoader() {
    document.getElementById("loading").style.display = "none";
  }

  static toggleBurgerMenu(isOpened) {
    const span = document.querySelector(".burger span");
    const menu = document.querySelector(".menu");

    if (isOpened) {
      span.classList.add("active");
      menu.classList.add("animate");
    } else {
      span.classList.remove("active");
      menu.classList.remove("animate");
    }
  }

  static toggleCategoryMenu(isOpened) {
    const dropDownMenu = document.querySelector(DOM_ELEMENTS.dropDownMenu);
    if (isOpened) {
      dropDownMenu.classList.add("open");
    } else {
      dropDownMenu.classList.remove("open");
    }
  }

  static cancelInput(type) {
    document.querySelector(DOM_ELEMENTS.inputCancel).style.display = type
      ? "block"
      : "none";
  }
}

export default View;
