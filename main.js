const loadProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

const setAllMenu = async () => {
  // console.log(loadProducts());
  // loadProducts()
  // to resolve promise -1 method
  // .then(data=>console.log(data))

  // method - 2
  const data = await loadProducts();
  const allMenu = document.getElementById("all-menu");
  const uniqueArray = [];
  data.forEach((product) => {
    if (uniqueArray.indexOf(product.category) === -1) {
      uniqueArray.push(product.category);
      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${product.category}</a>`;
      allMenu.appendChild(li);
    }
  });
};

setAllMenu();



document
  .getElementById("search-field")
  .addEventListener("keypress", async (e) => {
    if (e.key == "Enter") {
      const searchField = document.getElementById("search-field");
      const searchText = searchField.value;
      console.log(searchText);

      const allProducts = await loadProducts();

      const foundProducts = allProducts.filter((product) =>
        product.category.includes(searchText)
      );

      const productsContainer = document.getElementById("products-container");
      productsContainer.textContent = '';
      foundProducts.forEach((product) => {
        const {category, title, description, price}= product;
        const div = document.createElement("div");
        div.classList.add('col');
        div.innerHTML = `
            <div class="card text-center">
                <img src="${product.image}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                <p class="card-title">${title}</p>
                <h5>${category}</h5>
                <p class="card-text">${description.length>20 ? description.slice(0, 20) + "...": title}</p>
                <h4>Price: ${price}</h4>
                <buttom class="btn btn-primary">Details</buttom>
                </div>
            </div>
            `;
            productsContainer.appendChild(div)
      });
    }
  });


  loadProducts()