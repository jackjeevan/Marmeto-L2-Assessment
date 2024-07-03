document.addEventListener("DOMContentLoaded", () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
        .then(response => response.json())
        .then(data => {
            const productData = data;

            const addToCartBtn = document.getElementById("addToCartBtn");
            const confirmationMessage = document.getElementById("confirmationMessage");
            const colorSelector = document.getElementById("colorOptions");
            const sizeSelector = document.getElementById("sizeOptions");
            const quantityInput = document.getElementById("quantity");
            const increaseQuantityBtn = document.getElementById("increaseQuantity");
            const decreaseQuantityBtn = document.getElementById("decreaseQuantity");
            let selectedColor = '';
            let selectedSize = '';

            const fallbackImages = [
                './images/default1.jpg',
                './images/default2.jpg',
                './images/default3.jpg',
                './images/default4.jpg'
            ];
            const formatPrice = price => {
                return parseFloat(price.replace('$', '')).toFixed(2);
            };

            document.getElementById("vendor").textContent = productData.product.vendor;
            document.getElementById("title").textContent = productData.product.title;
            document.getElementById("price").textContent = `$${formatPrice(productData.product.price)}`;
            document.getElementById("originalPrice").textContent = `$${formatPrice(productData.product.compare_at_price)}`;
            document.getElementById("discount").textContent = `${Math.round(((parseFloat(productData.product.compare_at_price.replace('$', '')) - parseFloat(productData.product.price.replace('$', ''))) / parseFloat(productData.product.compare_at_price.replace('$', ''))) * 100)}% Off`;
            document.getElementById("description").innerHTML = productData.product.description;

            const mainImage = document.getElementById("mainImage");
            mainImage.src = productData.product.images[0]?.src || fallbackImages[0];
            mainImage.onerror = () => {
                mainImage.src = fallbackImages[0];
            };

            const thumbnailsContainer = document.getElementById("thumbnails");
            productData.product.images.forEach((image, index) => {
                const img = document.createElement("img");
                img.src = image.src || fallbackImages[index % fallbackImages.length];
                img.alt = `Thumbnail ${index + 1}`;
                img.onerror = () => {
                    img.src = fallbackImages[index % fallbackImages.length];
                };
                if (index === 0) {
                    img.classList.add("selected");
                }
                img.addEventListener("click", () => {
                    mainImage.src = image.src || fallbackImages[index % fallbackImages.length];
                    mainImage.onerror = () => {
                        mainImage.src = fallbackImages[index % fallbackImages.length];
                    };
                    document.querySelectorAll(".thumbnails img").forEach(thumbnail => thumbnail.classList.remove("selected"));
                    img.classList.add("selected");
                });
                thumbnailsContainer.appendChild(img);
            });

            productData.product.options[0].values.forEach(colorOption => {
                const colorName = Object.keys(colorOption)[0];
                const colorValue = colorOption[colorName];

                const colorContainer = document.createElement("div");
                colorContainer.classList.add("color-option-container");
                colorContainer.style.color = colorValue;

                const colorDiv = document.createElement("div");
                colorDiv.classList.add("color-option");
                colorDiv.style.backgroundColor = colorValue;
                colorDiv.dataset.color = colorName;

                const checkmark = document.createElement("div");
                checkmark.classList.add("checkmark");
                colorDiv.appendChild(checkmark);

                colorContainer.appendChild(colorDiv);

                colorContainer.addEventListener("click", () => {
                    document.querySelectorAll(".color-option-container").forEach(option => option.classList.remove("selected"));
                    colorContainer.classList.add("selected");
                    selectedColor = colorName;
                });

                colorSelector.appendChild(colorContainer);
            });

            productData.product.options[1].values.forEach(sizeOption => {
                const sizeId = `size_${sizeOption.replace(/\s+/g, '').toLowerCase()}`;
                const label = document.createElement("label");

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "size";
                radio.id = sizeId;
                radio.value = sizeOption;

                const span = document.createElement("span");
                span.textContent = sizeOption;

                label.appendChild(radio);
                label.appendChild(span);

                sizeSelector.appendChild(label);

                radio.addEventListener("change", () => {
                    selectedSize = sizeOption;
                    document.querySelectorAll(".size-options label").forEach(option => option.classList.remove("selected"));
                    label.classList.add("selected");
                });
            });

            increaseQuantityBtn.addEventListener("click", () => {
                let quantity = parseInt(quantityInput.value, 10);
                quantityInput.value = quantity + 1;
            });

            decreaseQuantityBtn.addEventListener("click", () => {
                let quantity = parseInt(quantityInput.value, 10);
                if (quantity > 1) {
                    quantityInput.value = quantity - 1;
                }
            });

            addToCartBtn.addEventListener("click", () => {
                const quantity = quantityInput.value;

                if (selectedColor === '') {
                    confirmationMessage.textContent = 'Please select a color.';
                    confirmationMessage.style.color = 'red';
                    confirmationMessage.style.backgroundColor = 'lightpink';
                    confirmationMessage.style.display = 'block';
                } else if (selectedSize === '') {
                    confirmationMessage.textContent = 'Please select a size.';
                    confirmationMessage.style.color = 'red';
                    confirmationMessage.style.backgroundColor = 'lightpink';
                    confirmationMessage.style.display = 'block';
                } else {
                    confirmationMessage.textContent = `Embrace Sideboard with Color ${selectedColor} and Size ${selectedSize} added to cart (Quantity: ${quantity}).`;
                    confirmationMessage.style.color = 'green';
                    confirmationMessage.style.backgroundColor = '#E7F9B7';
                    confirmationMessage.style.display = 'block';
                }
            });
        })
        .catch(error => console.error('Error fetching the product data:', error));
});


document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    container.scrollIntoView({ behavior: 'smooth' });
});