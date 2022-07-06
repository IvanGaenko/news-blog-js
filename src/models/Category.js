export const VALUES = {
  title: "News App",
  placeholder: "Type something to start search",
  categoriesTitle: "Categories",
  categories: {
    sport: "Sport",
    world: "World",
    covid: "Covid",
    bussiness: "Bussiness",
    politics: "Politics",
    science: "Science",
    religion: "Religion",
    health: "Health",
  },
  trendingNews: "Trending News",
  copyrights: "2021 copyright all rights reserved",
};

class Category {
  constructor() {
    this.list = Object.keys(VALUES.categories);
    this.current = "trending";
    this.listHTML = "";
  }

  setCategory(category) {
    this.current = category;
  }

  getCategoryList() {
    const ul = document.createElement("ul");
    ul.className = "drop-down-menu";

    this.list.forEach((l) => {
      const li = document.createElement("li");
      li.className = "drop-down-content category";
      li.id = l;
      li.innerHTML = VALUES.categories[l];
      ul.appendChild(li);
    });

    this.listHTML = ul;
  }
}

export default Category;
