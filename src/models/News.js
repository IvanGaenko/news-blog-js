import NewsCard from "./NewsCard";
import NewsPage from "./NewsPage";
import NewsPreview from "./NewsPreview";
import { textContent } from "../helpers";

class News {
  constructor() {
    this.newsList = [];
    this.newsListHtml = [];
    this.newsPage = {};
    this.newsPageHtml = "";
    this.category = "";
    this.editNewsPage = false;
    this.newsPreviewHtml = [];
  }

  getUrl(category) {
    return `https://content.guardianapis.com/search?q=${category}&show-tags=all&page-size=7&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`;
  }

  async fetchNews(category) {
    const response = await fetch(this.getUrl(category));
    const data = await response.json();
    const { status, results } = data.response;
    this.newsList = results.sort(
      (a, b) => new Date(b.webPublicationDate) - new Date(a.webPublicationDate)
    );
    return status;
  }

  async getNewsList(category) {
    let status = "ok";
    const shouldUpdate = this.category !== category;
    if (shouldUpdate || this.newsList.length === 0) {
      status = await this.fetchNews(category);
    }
    if (status === "ok") {
      this.category = category;
      const recentNews = document.createElement("section");
      const newsList = document.createElement("section");
      recentNews.className = "recent-news";
      newsList.className = "news-list";

      for (let i = 0; i < this.newsList.length; i++) {
        let { fields, id } = this.newsList[i];
        let img = this.imageParser(fields, id);
        fields.img = img;
        fields.textContent = textContent;
        let card = new NewsCard(fields, id, category).render();
        if (i === 0) {
          card.className = `news-card recent-card-${i}`;
          recentNews.appendChild(card);
        } else {
          card.className = `news-card news-card-${i}`;
          newsList.appendChild(card);
        }
      }
      this.newsListHtml = [];
      this.newsListHtml.push(recentNews);
      this.newsListHtml.push(newsList);

      return "ok";
    } else {
      return "false";
    }
  }

  getNewsPage(id, word) {
    if (id !== undefined) {
      const page = this.newsList
        .map((list) => {
          if (list.id === id) {
            list.haveSeen = new Date();
          }
          return list;
        })
        .filter((a) => a.id === id);
      if (page.length > 0) {
        this.newsPage = page[0];
      }
      this.newsPage.fields.haveSeen = new Date();

      const singlePage = new NewsPage(
        this.editNewsPage === true
          ? this.filterNewsPage(word).fields
          : this.newsPage.fields
      ).render();
      singlePage.className = "single-page";
      this.newsPageHtml = [singlePage];
      return "ok";
    }
  }

  filterNewsList(word) {
    const copyNewsList = this.newsList.filter((a) =>
      a.fields.headline.includes(word)
    );
    if (copyNewsList.length > 0) {
      const previewList = document.createElement("ul");
      previewList.className = "drop-down-preview";
      for (let i = 0; i < copyNewsList.length; i++) {
        let { fields, id } = copyNewsList[i];
        let card = new NewsPreview(fields, id).render();
        card.className = `preview-card news-card-${i}`;
        previewList.appendChild(card);
      }

      this.newsPreviewHtml = [];
      this.newsPreviewHtml.push(previewList);
      return { status: "ok" };
    } else {
      const errorMessage = document.createElement("div");
      errorMessage.classList = "drop-down-preview";
      errorMessage.innerHTML = "No exact matches found";
      return { status: "false", errorMessage: [errorMessage] };
    }
  }

  filterNewsPage(word) {
    const copyNewsPage = JSON.parse(JSON.stringify(this.newsPage));
    let { fields, id } = copyNewsPage;
    let img = this.imageParser(fields, id);
    fields.img = img;
    let re = new RegExp(word, "g");
    const arr = ["headline", "byline", "textContent"];
    for (let i = 0; i < arr.length; i++) {
      let temp = fields[arr[i]];
      let temp2 = temp.replace(re, `<mark>${word}</mark>`);
      fields[arr[i]] = temp2;
    }
    return copyNewsPage;
  }

  imageParser(str, id, className = "news-page") {
    let img;
    let elem = str.main === "" ? str.body : str.main;
    let parser = new DOMParser();
    let figure = parser.parseFromString(elem, "text/html");
    if (figure.body.firstChild.children[0].children.length === 0) {
      img = figure.body.firstChild.children[0];
    } else {
      img = figure.body.firstChild.children[0].children[0].children[0];
    }
    if (img === undefined) {
      img = document.createElement("img");
      img.src =
        "https://via.placeholder.com/1000x600?text=Picture+Is+Not+Found";
    }
    img.className = `gu-image ${className}`;
    img.alt = id;

    return img;
  }
}

export default News;
