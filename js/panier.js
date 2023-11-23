let panierDiv = document.getElementById('panier-product');

let panierProductId = JSON.parse(sessionStorage.getItem('panierPro'));

let products = JSON.parse(localStorage.getItem('products'));

let NumericId = panierProductId.map(id => parseInt(id, 10));

let filteredProducts = products.filter(product => NumericId.includes(product.id));

let Quantité = 1; // Initialisation de la quantité

let quantities = {}; // Stocker les quantités de chaque produit dans un objet

let totalGlobal = 0 ;


// Créez une seule chaîne HTML pour tout le panier
let contentPanier = `
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card panier_card">
          <div class="card-body">
            <h2 class="card-title text-center">Votre Panier</h2>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Insérez vos produits ici -->
`;

// Ajoutez chaque produit au contenu du panier
filteredProducts.forEach(product => {
  let total = product.price; 
  totalGlobal += total
  contentPanier += `
    <tr>
      <td><img src="${product.image}" alt="${product.nom}" width="80"></td>
      <td>${product.nom}</td>
      <td>${product.price} $</td>
      <td style="text-align: center">
        <span id="dim" onclick="dimQuan(${product.id})">-</span>
        <span class="quantityDisplay" id="quantityDisplay${product.id}">${Quantité}</span>
        <span id="aug" onclick="augQuan(${product.id})">+</span>
      </td>
      <td id="totalDisplay${product.id}">${total} $
</td>
    </tr>
  `;
});

// Terminez la création du contenu du panier
contentPanier += `
                <!-- Ajoutez plus de lignes pour d'autres produits -->
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" class="text-right"><strong>Total :</strong></td>
                    <td>${totalGlobal} $</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-block btn-panier" onclick = "redirectToHomePage()">Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;


panierDiv.innerHTML = contentPanier;


function augQuan(productId) {
    if (!quantities[productId]) {
        quantities[productId] = 1;
    }
    quantities[productId]++;
    updateQuantityDisplay(productId);
    updateTotal(productId);
    updateTotalGlobal();
}

function dimQuan(productId) {
    if (!quantities[productId]) {
        quantities[productId] = 1;
    }
    if (quantities[productId] > 1) {
        quantities[productId]--;
    }
    updateQuantityDisplay(productId);
    updateTotal(productId);
    updateTotalGlobal();
}

function updateTotal(productId) {
    let quantity = quantities[productId];
    let product = filteredProducts.find(product => product.id === productId);

    let total = (quantity * product.price) + " $";
    document.getElementById(`totalDisplay${productId}`).innerText = total;
}

function updateQuantityDisplay(productId) {
    let boutton = document.getElementById(`quantityDisplay${productId}`);
    boutton.innerText = quantities[productId];
    sessionStorage.setItem('quantities', JSON.stringify(quantities));
}

function updateTotalGlobal() {
    totalGlobal = 0; // Réinitialiser le total global à 0 à chaque mise à jour

    filteredProducts.forEach(product => {
        totalGlobal += product.price * (quantities[product.id] || 1);
        
        console.log(quantities[product.id]) // Calculer le total global en fonction des quantités modifiées
    });

    // Mettre à jour le total global affiché dans le footer
    document.querySelector('tfoot td:last-child').innerText = totalGlobal + " $";
}

function redirectToHomePage() {
    window.location.href = "index.html";
    sessionStorage.clear();
}