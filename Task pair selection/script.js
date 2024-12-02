// Elements for total, add-to-cart button, and radio buttons
const totalElement = document.getElementById('total');
const addToCartButton = document.getElementById('add-to-cart');
const radioButtons = document.querySelectorAll('input[name="bundle"]');

// Function to apply discount for One-Pair bundle (50% OFF)
function applyOnePairDiscount() {
  const selectedOption = document.querySelector('input[name="bundle"]:checked');
  let totalPrice = parseFloat(selectedOption.value);
  totalPrice = applyDiscount(totalPrice, 50); // Apply 50% OFF
  totalElement.innerText = `DKK ${totalPrice.toFixed(2)}`;
}

// Function to apply discount for Two-Pair bundle (40% OFF)
function applyTwoPairDiscount() {
  const selectedOption = document.querySelector('input[name="bundle"]:checked');
  let totalPrice = parseFloat(selectedOption.value);
  totalPrice = applyDiscount(totalPrice, 40); // Apply 40% OFF
  totalElement.innerText = `DKK ${totalPrice.toFixed(2)}`;
}

// Function to apply discount for Three-Pair bundle (60% OFF)
function applyThreePairDiscount() {
  const selectedOption = document.querySelector('input[name="bundle"]:checked');
  let totalPrice = parseFloat(selectedOption.value);
  totalPrice = applyDiscount(totalPrice, 60); // Apply 60% OFF
  totalElement.innerText = `DKK ${totalPrice.toFixed(2)}`;
}

// Function to apply discount (common logic)
function applyDiscount(price, discountPercentage) {
  return price * (1 - discountPercentage / 100);
}

// Function to handle changes in the bundle selection
function handleBundleSelection(event) {
  const selectedOption = document.querySelector('input[name="bundle"]:checked').id;

  // Show or hide selectors based on selected option
  document.getElementById("selectors-one-pair").style.display = (selectedOption === "one-pair") ? "block" : "none";
  document.getElementById("selectors-two-pair").style.display = (selectedOption === "two-pair") ? "block" : "none";
  document.getElementById("selectors-three-pair").style.display = (selectedOption === "three-pair") ? "block" : "none";

  // Update the total price based on selected bundle
  if (selectedOption === "one-pair") {
    applyOnePairDiscount();
  } else if (selectedOption === "two-pair") {
    applyTwoPairDiscount();
  } else if (selectedOption === "three-pair") {
    applyThreePairDiscount();
  }
}

// Event listeners for radio buttons (bundle selection)
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', handleBundleSelection);
});

// Function to handle the "Add to Cart" button based on selected bundle
function handleAddToCart() {
  const selectedBundle = document.querySelector('input[name="bundle"]:checked').id;
  let cartMessage = `Added to cart:\nBundle: ${selectedBundle}\nTotal: ${totalElement.innerText}\n`;

  // Get the sizes and colors based on the selected bundle
  let size1 = document.getElementById('size1') ? document.getElementById('size1').value : "N/A";
  let color1 = document.getElementById('color1') ? document.getElementById('color1').value : "N/A";
  let size2 = document.getElementById('size2') ? document.getElementById('size2').value : "N/A";
  let color2 = document.getElementById('color2') ? document.getElementById('color2').value : "N/A";
  let size3 = document.getElementById('size3') ? document.getElementById('size3').value : "N/A";
  let color3 = document.getElementById('color3') ? document.getElementById('color3').value : "N/A";

  // Add details to the cart message based on the selected bundle
  if (selectedBundle === "one-pair") {
    cartMessage += `Size: ${size1}, Color: ${color1}`;
  } else if (selectedBundle === "two-pair") {
    cartMessage += `Size 1: ${size1}, Color 1: ${color1}\nSize 2: ${size2}, Color 2: ${color2}`;
  } else if (selectedBundle === "three-pair") {
    cartMessage += `Size 1: ${size1}, Color 1: ${color1}\nSize 2: ${size2}, Color 2: ${color2}\nSize 3: ${size3}, Color 3: ${color3}`;
  }

  // Show the message
  alert(cartMessage);
}

// Event listener for "Add to Cart" button
addToCartButton.addEventListener('click', handleAddToCart);

// Initial call to set the total on page load
updateTotal();

// Function to update the total on page load based on default selection
function updateTotal() {
  const selectedOption = document.querySelector('input[name="bundle"]:checked');
  let totalPrice = parseFloat(selectedOption.value);

  // Set the initial total price
  if (selectedOption.id === "one-pair") {
    applyOnePairDiscount();
  } else if (selectedOption.id === "two-pair") {
    applyTwoPairDiscount();
  } else if (selectedOption.id === "three-pair") {
    applyThreePairDiscount();
  }
}