const PRODUCTS = [
  { id: "p1", name: "상품1", price: 10000 },
  { id: "p2", name: "상품2", price: 20000 },
  { id: "p3", name: "상품3", price: 30000 },
];

const DISCOUNT_RATE = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
};

const MIN_DISCOUNT_QUANTITY = 10;
const MAX_DISCOUNT_QUANTITY = 30;
const MAX_DISCOUNT_RATE = 0.25;

const createDOMElement = (name, options) => {
  const newElement = document.createElement(name);

  if (options?.id) {
    newElement.id = options.id;
  }

  if (options?.className) {
    newElement.className = options.className;
  }

  if (options?.textContent) {
    newElement.textContent = options.textContent;
  }

  if (options?.value) {
    newElement.value = options.value;
  }

  if (options?.dataset) {
    Object.entries(options.dataset).forEach(([key, value]) => {
      newElement.dataset[key] = value;
    });
  }

  return newElement;
};

const appendChildElement = (parent, ...children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

const addSelectOptionList = (parent, options) => {
  options.forEach((option) => {
    const newOption = createDOMElement("option", {
      value: option.id,
      textContent: `${option.name} - ${option.price}원`,
    });
    appendChildElement(parent, newOption);
  });
};

const findProductById = (selectedProductId) => {
  return PRODUCTS.find(({ id }) => id === selectedProductId);
};

const getCartItemText = (cartItem, index) => {
  return cartItem.querySelector("span").textContent.split("x ")[index];
};

// const getQuantityByCartItem = (cartItem, index) => {
//   return parseInt(getCartItemText(cartItem, index));
// };

const getDiscountRateById = (productId, quantity) => {
  if (quantity < MIN_DISCOUNT_QUANTITY) {
    return 0;
  }

  return DISCOUNT_RATE[productId];
};

const calculateDiscountRate = (quantity, prevTotal, totalPrice) => {
  const bulkDiscount = totalPrice * MAX_DISCOUNT_RATE;
  const individualDiscount = prevTotal - totalPrice;

  return quantity >= MAX_DISCOUNT_QUANTITY && bulkDiscount > individualDiscount
    ? MAX_DISCOUNT_RATE
    : (prevTotal - totalPrice) / prevTotal;
};

function main() {
  const app = document.getElementById("app");
  const container = createDOMElement("div", { className: "bg-gray-100 p-8" });
  appendChildElement(app, container);

  const cartContainer = createDOMElement("div", {
    className:
      "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8",
  });
  appendChildElement(container, cartContainer);

  const title = createDOMElement("h1", {
    className: "text-2xl font-bold mb-4",
    textContent: "장바구니",
  });
  const cartItemsContainer = createDOMElement("div", { id: "cart-items" });
  const cartTotalContainer = createDOMElement("div", {
    id: "cart-total",
    className: "text-xl font-bold my-4",
  });
  const addButton = createDOMElement("button", {
    id: "add-to-cart",
    className: "bg-blue-500 text-white px-4 py-2 rounded",
    textContent: "추가",
  });
  const productSelect = createDOMElement("select", {
    id: "product-select",
    className: "border rounded p-2 mr-2",
  });
  appendChildElement(
    cartContainer,
    title,
    cartItemsContainer,
    cartTotalContainer,
    productSelect,
    addButton,
  );

  addSelectOptionList(productSelect, PRODUCTS);

  const updateCart = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    let prevTotal = 0;
    let discountRate = 0;

    const cartItems = cartItemsContainer.childNodes;

    cartItems.forEach((cartItem) => {
      const product = findProductById(cartItem.id);
      const quantity = parseInt(getCartItemText(cartItem, 1));
      const total = product.price * quantity;
      const discount = getDiscountRateById(product.id, quantity);

      totalQuantity += quantity;
      prevTotal += total;
      totalPrice += total * (1 - discount);
    });

    discountRate = calculateDiscountRate(totalQuantity, prevTotal, totalPrice);

    if (discountRate === MAX_DISCOUNT_RATE) {
      totalPrice = prevTotal * (1 - MAX_DISCOUNT_RATE);
    }

    cartTotalContainer.textContent = `총액: ${Math.round(totalPrice)}원`;

    if (discountRate > 0) {
      // totalPrice = prevTotal * (1 - discountRate);
      // cartTotalContainer.textContent = `총액: ${Math.round(totalPrice)}원`;

      const discountSpan = createDOMElement("span", {
        className: "text-green-500 ml-2",
        textContent: `(할인 ${(discountRate * 100).toFixed(1)}%)`,
      });

      appendChildElement(cartTotalContainer, discountSpan);
    }
  };

  addButton.onclick = () => {
    const selectedValue = productSelect.value;
    let selectedProduct;

    PRODUCTS.forEach((product) => {
      if (product.id === selectedValue) {
        selectedProduct = product;
      }
    });

    if (selectedProduct) {
      const element = document.getElementById(selectedProduct.id);
      if (element) {
        element.querySelector("span").textContent = `${
          selectedProduct.name
        } - ${selectedProduct.price}원 x ${
          parseInt(getCartItemText(element, 1)) + 1
        }`;
      } else {
        const divContainer = createDOMElement("div", {
          id: selectedProduct.id,
          className: "flex justify-between items-center mb-2",
        });
        appendChildElement(cartItemsContainer, divContainer);

        const spanContainer = createDOMElement("span", {
          textContent: `${selectedProduct.name} - ${selectedProduct.price}원 x 1`,
        });
        const buttonContainer = createDOMElement("div");
        appendChildElement(divContainer, spanContainer, buttonContainer);

        const decreaseButton = createDOMElement("button", {
          className:
            "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1",
          textContent: "-",
          dataset: {
            productId: selectedProduct.id,
            change: -1,
          },
        });
        const increaseButton = createDOMElement("button", {
          className:
            "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1",
          textContent: "+",
          dataset: {
            productId: selectedProduct.id,
            change: 1,
          },
        });
        const removeButton = createDOMElement("button", {
          className: "remove-item bg-red-500 text-white px-2 py-1 rounded",
          textContent: "삭제",
          dataset: {
            productId: selectedProduct.id,
          },
        });
        appendChildElement(
          buttonContainer,
          decreaseButton,
          increaseButton,
          removeButton,
        );
      }
      updateCart();
    }
  };

  cartItemsContainer.onclick = (event) => {
    const target = event.target;

    if (
      target.classList.contains("remove-item") ||
      target.classList.contains("quantity-change")
    ) {
      const productId = target.dataset.productId;
      const cartItem = document.getElementById(productId);

      if (target.classList.contains("quantity-change")) {
        const change = parseInt(target.dataset.change);
        const quantity = parseInt(getCartItemText(cartItem, 1)) + change;

        if (quantity > 0) {
          cartItem.querySelector("span").textContent = `${getCartItemText(
            cartItem,
            0,
          )} x ${quantity}`;
        } else {
          cartItem.remove();
        }
      } else if (target.classList.contains("remove-item")) {
        cartItem.remove();
      }

      updateCart();
    }
  };
}

main();
