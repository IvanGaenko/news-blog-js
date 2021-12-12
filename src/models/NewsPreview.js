import { timeAgo } from "../helpers";

class NewsPreview {
  constructor(fields, id) {
    this.fields = fields;
    this.headline = fields.headline;
    this.trailText = fields.trailText;
    this.firstPublicationDate = fields.firstPublicationDate;
    this.img = fields.img;
    this.haveSeen = fields.haveSeen;
    this.id = id;
  }

  render() {
    let div = document.createElement("li");
    this.img.className = "gu-image preview-page";
    div.appendChild(this.img);
    div.innerHTML += `
    <div class="preview-card-description">
      <p class="preview-card-title preview-page" value="${this.id}">
        ${this.headline}
      </p>
      <p class="preview-card-content">
        ${this.trailText}
      </p>
      <div class="preview-card-footer">
        <p class="preview-card-footer-time">${timeAgo(
          this.firstPublicationDate
        )}</p>
        <p class="preview-card-footer-read-more preview-page"
        value="${this.id}">Read more</p>
      </div>
      <p class="preview-card-footer-time">${
        this.haveSeen ? timeAgo(this.haveSeen) : "New post"
      }</p>
    </div>
    `;
    return div;
  }
}

export default NewsPreview;
