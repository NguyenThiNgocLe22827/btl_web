window.showToast = function (message, type = "success") {
  let region = document.querySelector(".toast-region");
  if (!region) {
    region = document.createElement("div");
    region.className = "toast-region";
    region.setAttribute("aria-live", "polite");
    document.body.append(region);
  }
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  region.append(toast);
  setTimeout(() => toast.remove(), 3200);
};
function updateCartBadges() {
  document
    .querySelectorAll("[data-cart-count]")
    .forEach((el) => (el.textContent = Cart.count()));
}
function updateAuthNavigation() {
  const current = Auth.current();
  document.querySelectorAll("[data-account-link]").forEach((link) => {
    link.href = current ? getPagePath("profile") : getPagePath("login");
    const text = link.querySelector(".profile-text");
    if (text)
      text.textContent = current
        ? current.fullName.split(" ").pop()
        : "Đăng nhập";
  });
}
function initNav() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-nav-links]");
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  menu?.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      document.body.classList.remove("menu-open");
    }),
  );
}
function initCarousel() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  if (!slides.length) return;
  const dots = [...document.querySelectorAll(".hero-dot")];
  let current = 0;
  let timer;
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) =>
      slide.classList.toggle("active", i === current),
    );
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-current", i === current ? "true" : "false");
    });
  };
  const play = () => {
    clearInterval(timer);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      timer = setInterval(() => show(current + 1), 5000);
  };
  document.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
    show(current - 1);
    play();
  });
  document.querySelector("[data-hero-next]")?.addEventListener("click", () => {
    show(current + 1);
    play();
  });
  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      show(i);
      play();
    }),
  );
  play();
}
function hydrateHeroImages() {
  document.querySelectorAll("[data-hero-category]").forEach((image) => {
    const products = PRODUCTS.filter(
      (product) => product.category === image.dataset.heroCategory,
    );
    const product = products.find((item) => item.badge) || products[0];
    if (!product) return;
    image.src = getAssetPath(product.image);
    image.alt = `${product.name} tại Texas Chicken`;
    setProductImageFallback(image, product);
  });
}
function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card card";
  article.innerHTML = `<a class="product-image" href="${getPagePath("product")}?id=${product.id}" aria-label="Xem ${product.name}"><img src="${getAssetPath(product.image)}" alt="Minh họa ${product.name}" loading="lazy">${product.badge ? `<span class="badge">${product.badge}</span>` : ""}</a><div class="product-content"><h3>${product.name}</h3><p class="product-desc">${product.description}</p><div class="product-meta"><span>★ ${product.rating}</span><span>${product.calories} kcal</span></div><div class="product-price-row"><span class="price">${formatMoney(product.price)}</span>${product.originalPrice ? `<span class="old-price">${formatMoney(product.originalPrice)}</span>` : ""}</div><div class="product-actions"><button class="btn btn-primary" type="button" data-quick-add="${product.id}">Thêm giỏ</button><a class="btn btn-secondary" href="${getPagePath("product")}?id=${product.id}">Chi tiết</a></div></div>`;
  setProductImageFallback(article.querySelector("img"), product);
  article.querySelector("[data-quick-add]").addEventListener("click", () => {
    if (product.sizes || product.toppings.length)
      location.href = `${getPagePath("product")}?id=${product.id}`;
    else Cart.add(product);
  });
  return article;
}
function initHomeProducts() {
  const grid = document.querySelector("[data-featured-products]");
  if (!grid) return;
  PRODUCTS.filter((item) => item.category === "combo")
    .slice(0, 4)
    .forEach((item) => grid.append(createProductCard(item)));
}
function initHomeCategories() {
  const grid = document.querySelector("[data-categories]");
  if (!grid) return;
  CATEGORIES.forEach((category) => {
    const link = document.createElement("a");
    link.className = "category-card";
    link.href = `${getPagePath("menu")}?category=${category.slug}`;

    // Background image
    if (category.image) {
      const img = document.createElement("img");
      img.className = "category-bg";
      img.src = getAssetPath(category.image);
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.loading = "lazy";
      link.append(img);
    }

    // Overlay content
    const overlay = document.createElement("div");
    overlay.className = "category-overlay";

    const title = document.createElement("h3");
    title.textContent = category.name;

    const hint = document.createElement("span");
    hint.className = "category-hint";
    hint.textContent = "Khám phá →";

    overlay.append(title, hint);
    link.append(overlay);
    grid.append(link);
  });
}
function ensureFooter() {
  let footer = document.querySelector(".site-footer");
  if (!footer) footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<div class="container"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="${getPagePath("home")}"><img class="brand-logo" src="${getAssetPath("assets/logo-page.png")}" alt="" aria-hidden="true">TEXAS</a><p>Giòn ngon trong từng miếng. Website demo học tập.</p></div><div><h2 class="footer-title">Khám phá</h2><div class="footer-links"><a href="${getPagePath("menu")}">Menu</a><a href="${getPagePath("menu")}?category=combo">Combo</a><a href="${getPagePath("home")}#promotions">Khuyến mãi</a></div></div><div><h2 class="footer-title">Liên hệ &amp; giờ mở cửa</h2><div class="footer-links"><span>08:00 – 22:00</span><span>1900 2026 (demo)</span><span>hello@texaschicken.local</span></div></div></div><div class="copyright"><span>© 2026 Texas Chicken. Demo project.</span></div></div>`;
  if (!footer.isConnected)
    document.body.insertBefore(footer, document.body.querySelector("script"));
}
document.addEventListener("cart:changed", updateCartBadges);
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  updateCartBadges();
  updateAuthNavigation();
  hydrateHeroImages();
  initCarousel();
  initHomeProducts();
  initHomeCategories();
  ensureFooter();
  document
    .querySelectorAll("[data-logout]")
    .forEach((button) => button.addEventListener("click", () => Auth.logout()));
});
