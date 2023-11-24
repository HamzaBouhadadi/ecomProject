
// const products = [
//     {
//         id : 1,
//         nom : "Engagement ring",
//         image : "../images/p1.png",
//         category : "rings",
//         price : 200
//     },
//     {
//         id : 2,
//         nom : "Analogue Watch",
//         image : "../images/p2.png",
//         category : "watch",
//         price : 300
//     },
//     {
//         id : 3,
//         nom : "Marionetta",
//         image : "../images/p3.png",
//         category : "bear",
//         price : 110
//     },
//     {
//         id : 4,
//         nom : "Weeding bouquet",
//         image : "../images/p4.png",
//         category : "flower",
//         price : 45
//     },
//     {
//         id : 5,
//         nom : "Fluffy",
//         image : "../images/p5.png",
//         category : "bear",
//         price : 95
//     },
//     {
//         id : 6,
//         nom : "Gift bouquet",
//         image : "../images/p6.png",
//         category : "flower",
//         price : 70
//     },
//     {
//         id : 7,
//         nom : "Digital watch",
//         image : "../images/p7.png",
//         category : "watch",
//         price : 400
//     },
//     {
//         id : 8,
//         nom : "Diamond ring",
//         image : "../images/p8.png",
//         category : "rings",
//         price : 450
//     }
// ];

// console.log(products)






let products ;
        
  fetch('https://fakestoreapi.com/products')
.then(response => {
    if (!response.ok) {
      throw new Error('Problème lors de la récupération du fichier JSON : ' + response.status);
    }
    return response.json();
  })
.then( 
    data => {
     products = data
     console.log(products)
     localStorage.setItem('products' , JSON.stringify(products))

    })
    
.catch(error => {
    console.error('Erreur lors de la récupération du fichier JSON :', error);
  });

