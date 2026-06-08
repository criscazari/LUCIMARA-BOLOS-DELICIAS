import { db } from "./firebase.js";

import {
    collection,
    doc,
    setDoc,
    getDocs,
    onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const WHATSAPP_NUMBER = "5518981010315";
const DELIVERY_FEE = 6;
const PRODUCT_VERSION = "real-photos-2026-06-02";
const ADMIN_USERS = [
    { user: "adminLu", password: "senha26" },
    { user: "admin", password: "Cazaryh91!" },
];

const initialProducts = [
    {
        id: "mini-bolo-vulcao",
        name: "Mini Bolo Vulcão",
        description: "Bolo fofinho coberto com uma deliciosa e cremosa cobertura que transborda por todos os lados. Uma explosão de sabor em cada pedaço!.",
        price: 12,
        category: "Bolos",
        available: true,
        soldOut: false,
        desired: true,
        image: "assets/mini-bolo-vulcao.png",
    },
    {
        id: "bolo-fuba",
        name: "Bolo de Fubá",
        description: "Bolo alto, fofinho e perfeito para o cafe.",
        price: 25,
        category: "Bolos",
        available: true,
        soldOut: false,
        desired: true,
        image: "assets/bolo-fuba.png",
    },
    {
        id: "pao-caseiro",
        name: "Pão Caseiro",
        description: "Delicioso pão caseiro, muito macio.",
        price: 8,
        category: "Paes",
        available: true,
        soldOut: false,
        desired: false,
        image: "assets/pao-caseiro.png",
    },
    {
        id: "bolo-chocolate",
        name: "Bolo de Chocolate",
        description: "Bolo de chocolate caseirinho.",
        price: 30,
        category: "Bolos",
        available: true,
        soldOut: false,
        desired: true,
        image: "assets/bolo-chocolate.jpg",
    },
    {
        id: "bolo-cenoura-chocolate",
        name: "Bolo de Cenoura com Chocolate",
        description: "Bolo de cenoura com cobertura generosa de chocolate.",
        price: 10,
        category: "Bolos",
        available: true,
        soldOut: false,
        desired: true,
        image: "assets/bolo-cenoura-chocolate.jpg",
    },
    {
    id: "bolo-caseiro-leite-ninho",
    name: "Bolo Caseiro de Leite Ninho",
    description: "Bolo caseiro fofinho com o sabor irresistível de leite ninho.",
    price: 30,
    category: "Bolos",
    available: true,
    soldOut: false,
    desired: false,
    image: "assets/Bolo Caseiro de Leite Ninho.jpg",
},
{
    id: "bolo-mesclado",
    name: "Bolo Mesclado",
    description: "Massa fofinha combinando chocolate e baunilha.",
    price: 28,
    category: "Bolos",
    available: true,
    soldOut: false,
    desired: false,
    image: "assets/Bolo Mesclado.jpg",
},
{
    id: "bolo-de-fuba",
    name: "Bolo de Fubá Especial",
    description: "Tradicional bolo de fubá, perfeito para acompanhar um café.",
    price: 25,
    category: "Bolos",
    available: true,
    soldOut: false,
    desired: false,
    image: "assets/Bolo de Fuba.jpg",
},

{
    id: "copo-felicidade-dois-amores",
    name: "Copo da Felicidade Dois Amores com Morango",
    description: "Camadas cremosas de brigadeiro branco, chocolate e morangos.",
    price: 15,
    category: "Sobremesas",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/Copo da Felicidade Dois Amores com Morango.jpg",
},
{
    id: "bolo-cenoura",
    name: "Bolo de Cenoura",
    description: "Bolo de cenoura macio e saboroso.",
    price: 25,
    category: "Bolos",
    available: true,
    soldOut: false,
    desired: false,
    image: "assets/bolo-cenoura.jpg",
},
{
    id: "bolo-chocolate-brigadeiro",
    name: "Bolo de Chocolate com Brigadeiro",
    description: "Bolo de chocolate com cobertura cremosa de brigadeiro.",
    price: 35,
    category: "Bolos",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/bolo-chocolate-brigadeiro.png",
},
{
    id: "bolo-coco",
    name: "Bolo de Coco",
    description: "Bolo fofinho com delicioso sabor de coco.",
    price: 28,
    category: "Bolos",
    available: true,
    soldOut: false,
    desired: false,
    image: "assets/bolo-coco.jpg",
},
{
    id: "bolo-pacoca",
    name: "Bolo de Paçoca",
    description: "Bolo macio com sabor marcante de paçoca.",
    price: 32,
    category: "Bolos",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/bolo-pacoca.jpg",
},
{
    id: "bombom-morango",
    name: "Bombom de Morango",
    description: "Morango envolto em brigadeiro e cobertura de chocolate.",
    price: 8,
    category: "Doces",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/bombom-morango.jpg",
},
{
    id: "bombom-morangoninho",
    name: "Bombom Morangoninho",
    description: "Morango envolto em creme de leite ninho.",
    price: 8,
    category: "Doces",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/bombom-morangoninho.jpg",
},
{
    id: "brownie-ninho-nutella",
    name: "Brownie Ninho com Nutella",
    description: "Brownie recheado com leite ninho e Nutella.",
    price: 12,
    category: "Doces",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/brownie-ninhonutela.jpg",
},
{
    id: "cestinha-felicidade",
    name: "Cestinha da Felicidade",
    description: "Sobremesa especial em cestinha recheada.",
    price: 15,
    category: "Sobremesas",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/cestinha-felicidade.jpg",
},
{
    id: "copo-uva-duo",
    name: "Copo da Felicidade Uva Duo",
    description: "Combinação deliciosa de creme, chocolate e uvas.",
    price: 15,
    category: "Sobremesas",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/copo-uvaduo.jpg",
},
{
    id: "pudim-leite-ninho",
    name: "Pudim de Leite Ninho",
    description: "Pudim cremoso com sabor irresistível de leite ninho.",
    price: 12,
    category: "Sobremesas",
    available: true,
    soldOut: false,
    desired: true,
    image: "assets/pudim-leiteninho.jpg",
}
];

let products = [];
let cart = JSON.parse(localStorage.getItem("lucimaraCart")) || {};
let activeCategory = "Todos";

const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

const menuGrid = document.getElementById("menuGrid");
const featuredTrack = document.getElementById("featuredTrack");
const filters = document.getElementById("filters");
const adminGrid = document.getElementById("adminGrid");
const storePanel = document.getElementById("storePanel");
const storeToggle = document.getElementById("storeToggle");
const cartItems = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const deliveryFeeEl = document.getElementById("deliveryFee");
const grandTotalEl = document.getElementById("grandTotal");
const addressField = document.getElementById("addressField");
const whatsappFab = document.getElementById("whatsappFab");
const whatsappPanel = document.getElementById("whatsappPanel");
const adminModal = document.getElementById("adminModal");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminUser = document.getElementById("adminUser");
const adminPassword = document.getElementById("adminPassword");
const loginError = document.getElementById("loginError");

//function loadProducts() {
  //  const saved = localStorage.getItem("lucimaraProducts");
    //const savedVersion = localStorage.getItem("lucimaraProductVersion");
    //if (saved && savedVersion === PRODUCT_VERSION) return JSON.parse(saved);

    //localStorage.setItem("lucimaraProductVersion", PRODUCT_VERSION);
    //localStorage.setItem("lucimaraProducts", JSON.stringify(getInitialProducts()));
    //localStorage.removeItem("lucimaraCart");
    //return getInitialProducts();
//} 

function getInitialProducts() {
    return JSON.parse(JSON.stringify(initialProducts));
}

async function saveProducts() {
    for (const product of products) {
        await setDoc(
            doc(db, "produtos", product.id),
            product
        );
    }
}

async function initializeFirestore() {
    const snapshot = await getDocs(collection(db, "produtos"));

    if (snapshot.empty) {
        for (const product of initialProducts) {
            await setDoc(
                doc(db, "produtos", product.id),
                product
            );
        }
    }
}

//function saveProducts() {
  //  localStorage.setItem("lucimaraProductVersion", PRODUCT_VERSION);
    //localStorage.setItem("lucimaraProducts", JSON.stringify(products));
//}

function saveCart() {
    localStorage.setItem("lucimaraCart", JSON.stringify(cart));
}

function isProductBuyable(product) {
    return product.available && !product.soldOut;
}

function renderAll() {
    renderFilters();
    renderFeatured();
    renderMenu();
    renderAdmin();
    renderCart();
}

function isAdminAuthenticated() {
    return sessionStorage.getItem("lucimaraAdminAuth") === "true";
}

function openAdminModal() {
    adminModal.hidden = false;
    loginError.hidden = true;
    adminLoginForm.reset();
    setTimeout(() => adminUser.focus(), 0);
}

function closeAdminModal() {
    adminModal.hidden = true;
}

function showStorePanel() {
    storePanel.hidden = false;
    storeToggle.textContent = "Fechar modo loja";
    storePanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideStorePanel() {
    storePanel.hidden = true;
    storeToggle.textContent = "Modo loja";
}

function tryAdminLogin(user, password) {
    return ADMIN_USERS.some((admin) => admin.user === user && admin.password === password);
}

function renderFilters() {
    const categories = ["Todos", ...new Set(products.filter((product) => product.available).map((product) => product.category))];
    filters.innerHTML = categories.map((category) => {
        const active = category === activeCategory ? " active" : "";
        return `<button class="filter-btn${active}" type="button" data-category="${category}">${category}</button>`;
    }).join("");
}

function renderFeatured() {
    const featured = products.filter((product) => product.desired && isProductBuyable(product));
    if (featured.length === 0) {
        featuredTrack.innerHTML = '<p class="empty-state">Nenhum queridinho disponivel agora. Ative produtos no modo loja.</p>';
        return;
    }

    featuredTrack.innerHTML = featured.map((product) => `
        <article class="featured-card">
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p>${money.format(product.price)} - disponivel hoje</p>
            </div>
        </article>
    `).join("");
}

function renderMenu() {
    const visibleProducts = products.filter((product) => {
        const inCategory = activeCategory === "Todos" || product.category === activeCategory;
        return product.available && inCategory;
    });

    if (visibleProducts.length === 0) {
        menuGrid.innerHTML = '<p class="empty-state">Nenhum produto ativo nesta categoria.</p>';
        return;
    }

    menuGrid.innerHTML = visibleProducts.map((product) => {
        const buyable = isProductBuyable(product);
        const statusText = buyable ? "Tem hoje" : "Esgotado";
        const cardClass = buyable ? "" : " sold-out";
        const qty = cart[product.id] || 0;

        return `
            <article class="product-card${cardClass}">
                <div class="product-media">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="status-pill${buyable ? "" : " sold-out"}">${statusText}</span>
                </div>
                <div class="product-body">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price-line">
                        <span>${money.format(product.price)}</span>
                        <small>${product.category}</small>
                    </div>
                    <div class="qty-row" aria-label="Quantidade de ${product.name}">
                        <button type="button" data-action="decrease" data-id="${product.id}" ${buyable ? "" : "disabled"}>-</button>
                        <output>${qty}</output>
                        <button type="button" data-action="increase" data-id="${product.id}" ${buyable ? "" : "disabled"}>+</button>
                    </div>
                    <button class="add-btn" type="button" data-action="add" data-id="${product.id}" ${buyable ? "" : "disabled"}>
                        ${buyable ? "Adicionar ao pedido" : "Esgotado"}
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

function renderAdmin() {
    adminGrid.innerHTML = products.map((product) => `
        <article class="admin-item">
            <strong>${product.name}</strong>
            <label class="switch-row">
                <input type="checkbox" data-admin="available" data-id="${product.id}" ${product.available ? "checked" : ""}>
                Mostrar no cardapio do dia
            </label>
            <label class="switch-row">
                <input type="checkbox" data-admin="soldOut" data-id="${product.id}" ${product.soldOut ? "checked" : ""}>
                Marcar como esgotado
            </label>
            <label class="switch-row">
                <input type="checkbox" data-admin="desired" data-id="${product.id}" ${product.desired ? "checked" : ""}>
                Destacar nos mais desejados
            </label>
        </article>
    `).join("");
}

function renderCart() {
    const items = getCartItems();
    const totals = getTotals();

    if (items.length === 0) {
        cartItems.innerHTML = document.getElementById("emptyCartTemplate").innerHTML;
    } else {
        cartItems.innerHTML = items.map(({ product, qty }) => `
            <div class="cart-item">
                <div>
                    <strong>${product.name}</strong>
                    <span>${qty} un. - ${money.format(product.price * qty)}</span>
                </div>
                <button class="cart-remove" type="button" data-action="remove" data-id="${product.id}" aria-label="Remover ${product.name}">x</button>
            </div>
        `).join("");
    }

    subtotalEl.textContent = money.format(totals.subtotal);
    deliveryFeeEl.textContent = money.format(totals.delivery);
    grandTotalEl.textContent = money.format(totals.total);
}

function getCartItems() {
    return Object.entries(cart)
        .map(([id, qty]) => ({ product: products.find((product) => product.id === id), qty }))
        .filter((item) => item.product && item.qty > 0 && isProductBuyable(item.product));
}

function getDeliveryType() {
    return document.querySelector('input[name="deliveryType"]:checked')?.value || "retirada";
}

function getPaymentMethod() {
    return document.querySelector('input[name="paymentMethod"]:checked')?.value || "Dinheiro";
}

function getTotals() {
    const subtotal = getCartItems().reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const delivery = getDeliveryType() === "delivery" && subtotal > 0 ? DELIVERY_FEE : 0;
    return { subtotal, delivery, total: subtotal + delivery };
}

function changeCart(productId, amount) {
    const product = products.find((item) => item.id === productId);
    if (!product || !isProductBuyable(product)) return;

    cart[productId] = Math.max(0, (cart[productId] || 0) + amount);
    if (cart[productId] === 0) delete cart[productId];

    saveCart();
    renderMenu();
    renderCart();
}

function buildWhatsappMessage() {
    const items = getCartItems();
    const totals = getTotals();
    const customerName = document.getElementById("customerName").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const notes = document.getElementById("orderNotes").value.trim();
    const deliveryType = getDeliveryType();
    const paymentMethod = getPaymentMethod();

    if (!customerName) {
        alert("Informe o nome do cliente antes de enviar.");
        document.getElementById("customerName").focus();
        return "";
    }

    if (items.length === 0) {
        alert("Escolha pelo menos um produto para montar o pedido.");
        return "";
    }

    if (deliveryType === "delivery" && !address) {
        alert("Informe o endereco para delivery.");
        document.getElementById("customerAddress").focus();
        return "";
    }

    const orderLines = items.map(({ product, qty }) => `- ${qty}x ${product.name}: ${money.format(product.price * qty)}`);
    const deliveryLine = deliveryType === "delivery"
        ? `Entrega: Delivery (${money.format(DELIVERY_FEE)})\nEndereco: ${address}`
        : "Entrega: Retirada no local";

    return [
        "Ola, Lucimara Bolos e Delicias! Gostaria de fazer um pedido:",
        "",
        `Nome do cliente: ${customerName}`,
        deliveryLine,
        "",
        "Pedido:",
        ...orderLines,
        "",
        `Valor dos produtos: ${money.format(totals.subtotal)}`,
        `Taxa de entrega: ${money.format(totals.delivery)}`,
        `Valor total: ${money.format(totals.total)}`,
        `Forma de pagamento: ${paymentMethod}`,
        notes ? `Observacoes: ${notes}` : "",
    ].filter(Boolean).join("\n");
}

function openWhatsapp() {
    const message = buildWhatsappMessage();
    if (!message) return;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
}

filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderFilters();
    renderMenu();
});

menuGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const id = button.dataset.id;
    if (button.dataset.action === "increase" || button.dataset.action === "add") changeCart(id, 1);
    if (button.dataset.action === "decrease") changeCart(id, -1);
});

cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='remove']");
    if (!button) return;
    delete cart[button.dataset.id];
    saveCart();
    renderMenu();
    renderCart();
});

adminGrid.addEventListener("change", (event) => {
    const input = event.target.closest("[data-admin]");
    if (!input) return;

    const product = products.find((item) => item.id === input.dataset.id);
    if (!product) return;

    product[input.dataset.admin] = input.checked;

    if (!product.available) delete cart[product.id];
    if (product.soldOut) delete cart[product.id];

    saveProducts();
    saveCart();
});

document.getElementById("clearCart").addEventListener("click", () => {
    cart = {};
    saveCart();
    renderMenu();
    renderCart();
});

document.getElementById("sendOrder").addEventListener("click", openWhatsapp);
document.getElementById("quickWhatsapp").addEventListener("click", openWhatsapp);

document.getElementById("resetProducts").addEventListener("click", () => {
    if (!confirm("Restaurar a lista inicial de produtos?")) return;

    products = getInitialProducts();
    cart = {};

    saveProducts();
    saveCart();

    activeCategory = "Todos";
    renderAll();
});

document.getElementById("logoutAdmin").addEventListener("click", () => {
    sessionStorage.removeItem("lucimaraAdminAuth");
    hideStorePanel();
});

storeToggle.addEventListener("click", () => {
    if (!storePanel.hidden) {
        hideStorePanel();
        return;
    }

    if (isAdminAuthenticated()) {
        showStorePanel();
        return;
    }

    openAdminModal();
});

adminLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!tryAdminLogin(adminUser.value.trim(), adminPassword.value)) {
        loginError.hidden = false;
        adminPassword.value = "";
        adminPassword.focus();
        return;
    }

    sessionStorage.setItem("lucimaraAdminAuth", "true");
    closeAdminModal();
    showStorePanel();
});

document.getElementById("closeAdminModal").addEventListener("click", closeAdminModal);

adminModal.addEventListener("click", (event) => {
    if (event.target === adminModal) closeAdminModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !adminModal.hidden) closeAdminModal();
});

document.querySelectorAll('input[name="deliveryType"]').forEach((input) => {
    input.addEventListener("change", () => {
        const delivery = getDeliveryType() === "delivery";
        addressField.hidden = !delivery;
        renderCart();
    });
});

whatsappFab.addEventListener("click", () => {
    const isHidden = whatsappPanel.hidden;
    whatsappPanel.hidden = !isHidden;
    whatsappFab.setAttribute("aria-expanded", String(isHidden));
});

document.getElementById("prevFeatured").addEventListener("click", () => {
    featuredTrack.scrollBy({ left: -featuredTrack.clientWidth * 0.8, behavior: "smooth" });
});

document.getElementById("nextFeatured").addEventListener("click", () => {
    featuredTrack.scrollBy({ left: featuredTrack.clientWidth * 0.8, behavior: "smooth" });
});

initializeFirestore().then(() => {

    onSnapshot(
        collection(db, "produtos"),
        (snapshot) => {

            products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            renderAll();

        }
    );

});
