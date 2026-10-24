const products = [
    // 1. OLD MONEY CASUAL OUTFIT
    { name: "Old Money Casual Outfit", category: "Old Money Casual Outfit", gender: "Men", color: "Beige", price: 2499, image: "old-money-1.jpg" },
    { name: "Old Money Casual Outfit", category: "Old Money Casual Outfit", gender: "Men", color: "White", price: 2299, image: "old-money-2.jpg" },
    { name: "Old Money Casual Outfit", category: "Old Money Casual Outfit", gender: "Women", color: "Brown", price: 2199, image: "old-money-3.jpg" },
    { name: "Old Money Casual Outfit", category: "Old Money Casual Outfit", gender: "Women", color: "Beige", price: 2399, image: "old-money-4.jpg" },

    // 2. LUXURY DRESSES
    { name: "Men's Luxury Outfit", category: "Luxury Dresses", gender: "Men", color: "Black", price: 3999, image: "luxury-dress-1.jpg" },
    { name: "Men's Luxury Outfit", category: "Luxury Dresses", gender: "Men", color: "Blue", price: 4299, image: "luxury-dress-2.jpg" },
    { name: "Women's Luxury Bodycon Dress", category: "Luxury Dresses", gender: "Women", color: "Red", price: 3499, image: "luxury-dress-3.jpg" },
    { name: "Women's Luxury Bodycon Dress", category: "Luxury Dresses", gender: "Women", color: "Black", price: 3799, image: "luxury-dress-4.jpg" },

    // 3. PERFUMES
    { name: "Luxury Perfume", category: "Perfumes", color: "White", price: 1999, image: "lily-fragrance.jpg" },
    { name: "Premium Perfume", category: "Perfumes", color: "Pink", price: 2499, image: "jasmine-fragrance.jpg" },
    { name: "Classic Perfume", category: "Perfumes", color: "Red", price: 1799, image: "rose-fragrance.jpg" },
    { name: "Signature Perfume", category: "Perfumes", color: "Brown", price: 2299, image: "woody-fragrance.jpg" },

    // 4. LUXURY BAGS
    { name: "Luxury Handbag", category: "Bags", gender: "Women", color: "Black", price: 2999, image: "classic-handbag.jpg" },
    { name: "Classic Handbag", category: "Bags", gender: "Women", color: "Brown", price: 3499, image: "shoulder-bag.jpg" },
    { name: "Premium Shoulder Bag", category: "Bags", gender: "Women", color: "White", price: 2799, image: "tote-bag.jpg" },
    { name: "Elegant Tote Bag", category: "Bags", gender: "Women", color: "Beige", price: 3199, image: "mini-bag.jpg" },

    // 5. LUXURY JEWELLERY
    { name: "Gold Necklace", category: "Jewellery", gender: "Women", color: "Silver", price: 1999, image: "jewellery-1.jpg" },
    { name: "Elegant Bracelet", category: "Jewellery", gender: "Women", color: "Gold", price: 1499, image: "jewellery-2.jpg" },
    { name: "Luxury Earrings", category: "Jewellery", gender: "Women", color: "Silver", price: 999, image: "jewellery-3.jpg" },
    { name: "Classic Ring", category: "Jewellery", gender: "Women", color: "Gold", price: 1299, image: "jewellery-4.jpg" },







];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const genderFilter = document.getElementById("genderFilter");
const colorFilter = document.getElementById("colorFilter");
const sortFilter = document.getElementById("sortFilter");
const clearButton = document.getElementById("clearButton");
const productCount = document.getElementById("productCount");
const noProducts = document.getElementById("noProducts");

if (
    productList && searchInput && categoryFilter &&
    genderFilter && colorFilter && sortFilter && clearButton
) {
    function fillOptions(select, values, label) {
        const oldValue = select.value;
        select.innerHTML = "";

        const first = document.createElement("option");
        first.value = "";
        first.textContent = label;
        select.appendChild(first);

        values.forEach(function (value) {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });

        if (values.includes(oldValue)) {
            select.value = oldValue;
        }
    }

    const categories = [...new Set(products.map(p => p.category))];
    const colors = [...new Set(products.map(p => p.color))];

    fillOptions(categoryFilter, categories, "All Categories");
    fillOptions(colorFilter, colors, "All Colours");

    function displayProducts() {
        const search = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        const gender = genderFilter.value;
        const color = colorFilter.value;
        const sort = sortFilter.value;

        let filtered = products.filter(function (product) {
            const searchableText =
                product.name + " " +
                product.category + " " +
                product.color + " " +
                product.gender;

            const matchesSearch =
                searchableText.toLowerCase().includes(search);

            const matchesCategory =
                !category || product.category === category;

const matchesGender =
    !gender ||
    product.gender === gender ||
    product.gender === "All" ||
    (!product.gender && product.category === "Perfumes");


            
            const matchesColor =
                !color || product.color === color;

            return matchesSearch && matchesCategory &&
                matchesGender && matchesColor;
        });

        if (sort === "lowToHigh") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === "highToLow") {
            filtered.sort((a, b) => b.price - a.price);
        }

        productList.innerHTML = "";

        filtered.forEach(function (product) {
            const card = document.createElement("div");
            card.className = "product-card";

            const image = document.createElement("img");
            image.src = "./images/" + product.image;
            image.alt = product.name;

            const name = document.createElement("h3");
            name.textContent = product.name;

            const description = document.createElement("p");
            description.className = "description";
            description.textContent = product.category;

            const price = document.createElement("p");
            price.className = "product-price";
            price.textContent = "₹" + product.price.toLocaleString("en-IN");

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(price);

            productList.appendChild(card);
        });

        if (productCount) {
            productCount.textContent = filtered.length + " Products";
        }

        if (noProducts) {
            noProducts.style.display =
                filtered.length === 0 ? "block" : "none";
        }
    }

    searchInput.addEventListener("input", displayProducts);
    categoryFilter.addEventListener("change", displayProducts);
    genderFilter.addEventListener("change", displayProducts);
    colorFilter.addEventListener("change", displayProducts);
    sortFilter.addEventListener("change", displayProducts);

    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        categoryFilter.value = "";
        genderFilter.value = "";
        colorFilter.value = "";
        sortFilter.value = "";

        displayProducts();
    });

    displayProducts();
}






const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});