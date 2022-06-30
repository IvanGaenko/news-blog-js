class Category {
  constructor() {
    this.list = ["sport", "world", "covid", "bussiness", "politics", "science", "religion", "health"];
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
      li.id = `${l}`;
      li.innerHTML = `${l.charAt(0).toUpperCase()}${l.slice(1)}`;
      ul.appendChild(li);
    });
    
    this.listHTML = ul;
  }
}

export default Category;