import { timeAgo } from "../helpers";

class NewsCard {
  constructor(fields, id, category) {
    this.fields = fields;
    this.headline = fields.headline;
    this.trailText = fields.trailText;
    this.firstPublicationDate = fields.firstPublicationDate;
    this.img = fields.img;
    this.haveSeen = fields.haveSeen;
    this.id = id;
    this.category = category;
  }

  render() {
    let div = document.createElement("article");
    div.appendChild(this.img);
    div.innerHTML += `
    <article class="news-card-description">
      <header class="news-card-title news-page" value="${this.id}">
        ${this.headline}
      </header>
      <p class="news-card-content">
        ${this.trailText}
      </p>
      <footer class="card-footer">
        <p class="card-footer-time">${timeAgo(this.firstPublicationDate)}</p>
        <p class="card-footer-read-more news-page"
        value="${this.id}">Read more</p>
      </footer>
      <p class="card-footer-time">${
        this.haveSeen ? timeAgo(this.haveSeen) : "New post"
      }</p>
    </article>
    `;
    return div;
  }
}

export default NewsCard;
