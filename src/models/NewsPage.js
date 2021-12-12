import { timeAgo } from "../helpers";

class NewsPage {
  constructor(fields) {
    this.img = fields.img;
    this.headline = fields.headline;
    this.byline = fields.byline;
    this.firstPublicationDate = fields.firstPublicationDate;
    this.textContent = fields.textContent;
    this.fields = fields;
  }

  render() {
    let div = document.createElement("div");
    div.appendChild(this.img);
    div.innerHTML += `
    <div class="single-page-container">
      <h2 class="single-page-title">
        ${this.headline}
      </h2>
      <div class="single-page-description">
        <p class="written-by">
          Writen by ${this.byline}
        </p>
        <p class="single-page-time">${timeAgo(this.firstPublicationDate)}</p>
      </div>
      <div class="single-page-content">${this.textContent}</div>
    </div>
    `;
    return div;
  }
}

export default NewsPage;
