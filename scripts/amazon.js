let ProductsHTML = ``;
products.forEach((product) => {
  ProductsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${product.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
     ${product.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>

    <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-name = "${
      product.name
    }" data-product-id = "${product.id}">Add to Cart</button>
  </div>
  `;
});
document.querySelector(".js-products-grid").innerHTML = ProductsHTML;
let showAddedTimeoutId = 0;
let previousBtnId = "";
document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { productName, productId } = button.dataset;
    const cartProduct = findCartProduct(productId);
    const quantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );
    const addedToCart = document.querySelector(
      `.js-added-to-cart-${productId}`
    );
    if (!cartProduct) {
      cart.push({
        productId,
        productName,
        quantity,
      });
    } else {
      cartProduct.quantity += quantity;
    }

    addedToCart.classList.add("js-show-added");
    if (previousBtnId === productId) {
      clearTimeout(showAddedTimeoutId);
    }
    previousBtnId = productId;
    showAddedTimeoutId = setTimeout(() => {
      addedToCart.classList.remove("js-show-added");
    }, 1000);

    document.querySelector(".js-cart-quantity").innerHTML = countCartProduct();
    console.log(cart);
  });
});
