let carts = document.querySelectorAll('.add-cart')

let product = [
  {
    name: 'Esspresso',
    tag: 'img1',
    price: 20000,
    inCart: 0
  },
  {
    name: 'Sweet Mocacino',
    tag: 'img2',
    price: 25000,
    inCart: 0
  },
  {
    name: 'Cerry Cake',
    tag: 'img6',
    price: 15000,
    inCart: 0
  },
  {
    name: 'Tempe Mendoan',
    tag: 'img9',
    price: 10000,
    inCart: 0
  }
]

for (let i=0; i<carts.length; i++) {
  carts[i].addEventListener('click', () => {
    numbersCart(product[i])
    totalRupiah(product[i])
  })
}

function loadNumberCart() {
  let productNumber = localStorage.getItem('numbersCart')

  if ( productNumber ) {
    document.querySelector('.cart span').textContent = productNumber;
  }
}

const numbersCart = (product) => {

  let productNumber = localStorage.getItem('numbersCart')
  productNumber = parseInt(productNumber) // konversi to integer

  if ( productNumber ) {
    localStorage.setItem('numbersCart', productNumber + 1)
    document.querySelector('.cart span').textContent = productNumber + 1
  } else {
    localStorage.setItem('numbersCart', 1)
    document.querySelector('.cart span').textContent = 1
  }

  setItems(product)
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems)
  if ( cartItems != null ) {
    if ( cartItems[product.tag] == undefined ) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1
  } else {
    product.inCart = 1
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

function totalRupiah(product) {

  // localStorage.setItem("totalRupiah", product.price)

  let price = localStorage.getItem('totalRupiah')

  // console.log(price)
  // console.log(typeof price)

  if (price != null) {
    const costRp = price.split('').join('')
    const count = Number(costRp)

    localStorage.setItem("totalRupiah", count + product.price)
    // console.log("Jumlah : ",count)
  } else {
    localStorage.setItem("totalRupiah", product.price)
  }
}

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems)

  let productContainer = document.querySelector(".item-list")
  let basket = document.querySelector(".basketTotal")
  let total = localStorage.getItem('totalRupiah')

  console.log(cartItems)

  if ( cartItems && productContainer ) {
    
    productContainer.innerHTML = ''
    basket.innerHTML = ''

      Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <tr>
        <td><img src="img/`+ item.tag +`.png" alt="food" width="100px"></td>
        <td>`+ item.name +`</td>
        <td>Rp.`+ item.price +`</td>
        <td>
        <a href="" class="btn-min"><i class="fas fa-minus-circle"></i></a>
        `+ item.inCart +`
        <a href="" class="btn-plus"><i class="fas fa-plus-circle"></i></a>
        </td>
        <td>Rp.`+ item.inCart * item.price +`</td>
        <td>
          <a href="" class="btn-delete"><i class="far fa-times-circle"></i></a>
        </td>
      </tr>
      `
    })

    basket.innerHTML += `
    <h4 class="basket-title">Basket Total <span class="Total">Rp.`+ total +`</span></h4>
    `

  } else {
    productContainer.innerHTML += `
    <tr>
      <td>No Items</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    `
  }
}

loadNumberCart()
displayCart()