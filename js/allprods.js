// Fonction pour filtrer les produits par catégorie
function filterProductsByCategory() {
    let selectedCategory = document.getElementById('category').value;
    let products = getProductsFromLocalStorage();
  
    // Filtrer les produits par catégorie sélectionnée
    let filteredProducts = filterByCategory(products, selectedCategory);
  
    displayFilteredProducts(filteredProducts);
  }
  
  // Fonction pour filtrer les produits par nom de produit
  function filterProductsByName() {
    let searchInput = document.getElementById('productName').value.toLowerCase();
    let products = getProductsFromLocalStorage();
  
    // Filtrer les produits par nom de produit
    let filteredProducts = filterByName(products, searchInput);
  
    displayFilteredProducts(filteredProducts);
  }
  
  // Fonction pour filtrer les produits par catégorie
  function filterByCategory(products, category) {
    if (category === 'all') {
      return products; // Retourner tous les produits si 'Toutes les catégories' sont sélectionnées
    } else {
      return products.filter(product => product.category === category);
    }
  }
  
  // Fonction pour filtrer les produits par nom de produit
  function filterByName(products, searchInput) {
    return products.filter(product =>
      product.nom.toLowerCase().includes(searchInput)
    );
  }
  
  // Fonction pour récupérer les produits depuis le localStorage
  function getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }
  
  // Fonction pour afficher les produits
  function displayFilteredProducts(products) {
    let divAllProd = document.getElementById('AllProds');
    let productCards = products.map(product => {
      return (
        `<div class="col-sm-6 col-md-4 col-lg-3 product-card" id="product${product.id}">
          <div class="box" id="${product.id}">
            <a href="">
              <div class="img-box">
                <img src="${product.image}" alt="">
              </div>
              <div class="detail-box">
                <h6>${product.nom}</h6>
                <h6>Price <span>${product.price}</span></h6>
              </div>
            </a>
            <button class="add-to-cart-btn">Add to Card</button>
          </div>
        </div>`
      );
    });
  
    divAllProd.innerHTML = productCards.join('');
  }
  
  // Appel initial pour afficher tous les produits
  displayFilteredProducts(getProductsFromLocalStorage());
  