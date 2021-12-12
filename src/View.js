export const DOM_ELEMENTS = {
  mainContainer: ".main .container",
  backToTopBtn: ".backToTop",
  burgerMenu: ".burger",
  imgClass: "gu-image",
  categoryBtn: ".category",
  newsPage: ".news-page",
  previewPage: ".preview-page",
  logo: ".logo",
  input: "#input-search",
};

class View {
  static clearAllCards() {
    const mainNode = document.querySelector(DOM_ELEMENTS.mainContainer);
    while (mainNode.firstChild) {
      mainNode.firstChild.remove();
    }
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

  static toggleBurgerMenu() {
    document.querySelector(".burger span").classList.toggle("active");
    document.querySelector(".menu").classList.toggle("animate");
  }
}

export default View;
