// pointer sur la division ou on veux lister les produits dynamiquement

const divProd = document.getElementById('prods');



// Récupérer les produits du local storage

let products = JSON.parse(localStorage.getItem('products'));

let latestProducts = products.slice(-8); // Sélectionne les 8 derniers éléments du tableau


// Pour créer les cartes des produits dynamiquement 
let onecard = latestProducts.map(product => {
    return (
      `<div class="col-sm-6 col-md-4 col-lg-3 product-card" id="product${product.id}">
        <div class="box" id="${product.id}">
          <a href="">
            <div class="img-box">
              <img src="${product.images[0]}" alt="">
            </div>
            <div class="detail-box">
              <h6>${product.title.substring(0, 10)}</h6>
              <h6>Price <span>${product.price}</span></h6>
            </div>
            <div class="new">
              <span>New</span>
            </div>
          </a>
          <button class="add-to-cart-btn">Add to Card</button>
        </div>
      </div>`
    );
  });

// Maintenant, ajoutons le contenu généré (par le tableau) dans la div avec id 'prods'

divProd.innerHTML = onecard.join('');

// Configurer le Nombre de produit ajouter dans le panier

let bouttonsPanier = document.querySelectorAll('.add-to-cart-btn');   //pointer sur les bouttons add to card
let panierNumber = document.getElementById('panier-nmbr');  //Nombre afficher dans la puce de panier
let counterPanier = 0; 
let parentIds = [] ;
panierNumber.innerHTML = counterPanier //toujours la puce est initialisé avec un zero

bouttonsPanier.forEach(boutton => {
  boutton.addEventListener('click' , (event) => {
    counterPanier += 1; // Incrémente le compteur à chaque clic sur un bouton
    boutton.style.outline = 'none';
    panierNumber.innerHTML = counterPanier; // Affiche le compteur dans la puce du panier
  
  // Désactiver le bouton après le premier clic
    boutton.disabled = true;

    // Récupère l'ID de la division parente du bouton cliqué et l'ajouté au tableau
    let parentId = event.target.parentNode.id;
    parentIds.push(parentId);
    sessionStorage.setItem('panierPro', JSON.stringify(parentIds)) //j'ai stocker les products ajouter au panier dans la session storage
  });
});

// fin configuration



