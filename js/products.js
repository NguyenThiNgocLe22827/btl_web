function initMenuPage() {
  const grid = document.querySelector("[data-menu-grid]");
  if (!grid) return;
  const search = document.querySelector("#menu-search"),
    sort = document.querySelector("#menu-sort"),
    price = document.querySelector("#price-filter"),
    count = document.querySelector("[data-result-count]");
  const total = document.querySelector("[data-menu-total]");
  if (total) total.textContent = PRODUCTS.length;
  const params = new URLSearchParams(location.search);
  let activeCategory = params.get("category") || "all";
  const tabs = document.querySelector("[data-category-tabs]");
  [{ slug: "all", name: "Tất cả" }, ...CATEGORIES].forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pill${category.slug === activeCategory ? " active" : ""}`;
    button.textContent = category.name;
    button.addEventListener("click", () => {
      activeCategory = category.slug;
      tabs
        .querySelectorAll(".pill")
        .forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      render();
    });
    tabs.append(button);
  });
  function render() {
    let items = [...PRODUCTS];
    const query = search.value.trim().toLocaleLowerCase("vi");
    if (query)
      items = items.filter((item) =>
        `${item.name} ${item.description}`
          .toLocaleLowerCase("vi")
          .includes(query),
      );
    if (activeCategory !== "all")
      items = items.filter((item) => item.category === activeCategory);
    if (price.value === "under-50")
      items = items.filter((item) => item.price < 50000);
    if (price.value === "50-100")
      items = items.filter(
        (item) => item.price >= 50000 && item.price <= 100000,
      );
    if (price.value === "over-100")
      items = items.filter((item) => item.price > 100000);
    if (sort.value === "price-asc") items.sort((a, b) => a.price - b.price);
    if (sort.value === "price-desc") items.sort((a, b) => b.price - a.price);
    if (sort.value === "rating") items.sort((a, b) => b.rating - a.rating);
    if (sort.value === "popular") items.sort((a, b) => b.sold - a.sold);
    grid.replaceChildren();
    count.textContent = `${items.length} món`;
    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state card";
      empty.style.gridColumn = "1/-1";
      empty.innerHTML =
        '<div class="empty-icon">🔎</div><h2>Chưa tìm thấy món</h2><p>Thử từ khóa khác hoặc thay đổi bộ lọc nhé.</p>';
      grid.append(empty);
      return;
    }
    items.forEach((item) => grid.append(createProductCard(item)));
  }
  search.addEventListener("input", render);
  sort.addEventListener("change", render);
  price.addEventListener("change", render);
  const filterToggle = document.querySelector("[data-filter-toggle]");
  const filterPanel = document.querySelector(".filter-panel");
  filterToggle?.addEventListener("click", () => {
    const isOpen = filterPanel.classList.toggle("open");
    filterToggle.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelector("[data-filter-reset]")?.addEventListener("click", () => {
    search.value = "";
    price.value = "all";
    sort.value = "default";
    activeCategory = "all";
    tabs.querySelectorAll(".pill").forEach((item, index) => {
      item.classList.toggle("active", index === 0);
    });
    render();
    search.focus();
  });
  render();
}
function initProductPage() {
  const root = document.querySelector("[data-product-detail]");
  if (!root) return;
  const id = Number(new URLSearchParams(location.search).get("id"));
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) {
    root.innerHTML = `<div class="empty-state card" style="grid-column:1/-1"><div class="empty-icon">?</div><h2>Không tìm thấy sản phẩm</h2><p>Món ăn có thể đã thay đổi hoặc đường dẫn chưa chính xác.</p><a class="btn btn-primary" href="${getPagePath("menu")}">Về menu</a></div>`;
    return;
  }
  document.title = `${product.name} | TEXAS CHICKEN`;
  const toppingSuggestions = {
    "fried-chicken": ["sauce", "cheese"],
    burger: ["cheese", "bacon", "egg", "sauce"],
    rice: ["egg", "cheese", "sauce"],
    pasta: ["cheese", "bacon", "sauce"],
    combo: ["sauce"],
  };
  const toppingIds = new Set([
    ...(product.toppings || []),
    ...(toppingSuggestions[product.category] || []),
  ]);
  const allowedToppings = TOPPING_OPTIONS.filter((item) =>
    toppingIds.has(item.id),
  );
  const category = CATEGORIES.find((item) => item.slug === product.category);
  const savedAmount = Math.max(0, product.originalPrice - product.price);
  root.innerHTML = `
    <div class="detail-breadcrumbs breadcrumbs">
      <a href="${getPagePath("home")}">Trang chủ</a><span>›</span>
      <a href="${getPagePath("menu")}">Menu</a><span>›</span>
      <a href="${getPagePath("menu")}?category=${product.category}">${category?.name || "Món ăn"}</a>
    </div>
    <section class="detail-media" aria-label="Hình ảnh ${product.name}">
      <div class="detail-image card">
        <img src="${getAssetPath(product.image)}" alt="${product.name}">
        ${product.badge ? `<span class="detail-badge badge">${product.badge}</span>` : ""}
      </div>
      <div class="detail-promises" aria-label="Cam kết món ăn">
        <span><strong>🔥 Phục vụ nóng</strong><small>Chuẩn bị khi đặt</small></span>
        <span><strong>✓ Nguyên liệu mới</strong><small>Chế biến trong ngày</small></span>
        <span><strong>⚡ Giao nhanh</strong><small>Đóng gói cẩn thận</small></span>
      </div>
    </section>
    <section class="detail-info card" aria-labelledby="product-title">
      <div class="detail-heading">
        <span class="detail-category">${category?.icon || "🍗"} ${category?.name || "Món ngon"}</span>
        <h1 id="product-title">${product.name}</h1>
        <div class="detail-meta product-meta">
          <span class="rating-chip">★ ${product.rating}</span>
          <span>${product.calories} kcal</span>
          <span>Đã bán ${product.sold}</span>
        </div>
      </div>
      <p class="detail-description">${product.description} Nguyên liệu được chuẩn bị trong ngày và phục vụ nóng để giữ trọn độ giòn.</p>
      <div class="detail-price">
        <span class="price">${formatMoney(product.price)}</span>
        ${product.originalPrice ? `<span class="old-price">${formatMoney(product.originalPrice)}</span>` : ""}
        ${savedAmount ? `<span class="saving-chip">Tiết kiệm ${formatMoney(savedAmount)}</span>` : ""}
      </div>
      <div class="detail-divider"></div>
      <fieldset class="option-section">
        <legend><span>1</span> Chọn kích cỡ <small>Bắt buộc</small></legend>
        <div class="choice-grid size-choice-grid" data-size-options></div>
      </fieldset>
      ${
        allowedToppings.length
          ? `<fieldset class="option-section">
              <legend><span>2</span> Thêm topping <small>Không bắt buộc</small></legend>
              <div class="topping-list" data-topping-options></div>
            </fieldset>`
          : ""
      }
      <section class="quantity-section" aria-labelledby="quantity-title">
        <div><h2 id="quantity-title">Số lượng</h2><p>Tối đa 20 phần mỗi món</p></div>
        <div class="qty-control detail-qty">
          <button type="button" data-qty-minus aria-label="Giảm số lượng">−</button>
          <output data-quantity aria-live="polite">1</output>
          <button type="button" data-qty-plus aria-label="Tăng số lượng">+</button>
        </div>
      </section>
      <div class="detail-buy">
        <div class="detail-total-copy"><span>Tổng cộng</span><strong data-detail-total></strong></div>
        <button class="btn btn-primary detail-add-button" type="button" data-add-detail>
          <span aria-hidden="true">🛒</span> Thêm vào giỏ
        </button>
      </div>
    </section>`;
  setProductImageFallback(root.querySelector(".detail-image img"), product);
  const sizeBox = root.querySelector("[data-size-options]");
  const sizeDescriptions = {
    small: "Phần vừa ăn",
    medium: "Lựa chọn phổ biến",
    large: "No lâu hơn",
  };
  SIZE_OPTIONS.forEach((option, index) => {
    const choice = document.createElement("div");
    choice.className = "choice size-choice";
    choice.innerHTML = `<input type="radio" name="size" id="size-${option.id}" value="${option.id}" ${index === 1 ? "checked" : ""}><label for="size-${option.id}"><span class="size-name">${option.name}</span><small>${sizeDescriptions[option.id]}</small><strong>${option.price ? `+${formatMoney(option.price)}` : "Giá gốc"}</strong></label>`;
    sizeBox.append(choice);
  });
  const toppingBox = root.querySelector("[data-topping-options]");
  allowedToppings.forEach((option) => {
    const row = document.createElement("label");
    row.className = "topping-row";
    row.innerHTML = `<span class="topping-check"><input type="checkbox" value="${option.id}"><span aria-hidden="true">✓</span></span><span class="topping-copy"><strong>${option.name}</strong><small>Thêm vào phần ăn</small></span><strong class="topping-price">+${formatMoney(option.price)}</strong>`;
    toppingBox?.append(row);
  });
  let quantity = 1;
  const output = root.querySelector("[data-quantity]");
  const totalOut = root.querySelector("[data-detail-total]");
  const minusButton = root.querySelector("[data-qty-minus]");
  const plusButton = root.querySelector("[data-qty-plus]");
  function selected() {
    const size =
      root.querySelector('input[name="size"]:checked')?.value || null;
    const toppings = [
      ...root.querySelectorAll("[data-topping-options] input:checked"),
    ].map((input) => input.value);
    return { size, toppings };
  }
  function update() {
    const options = selected();
    const sizePrice =
      SIZE_OPTIONS.find((item) => item.id === options.size)?.price || 0;
    const toppingPrice = TOPPING_OPTIONS.filter((item) =>
      options.toppings.includes(item.id),
    ).reduce((sum, item) => sum + item.price, 0);
    output.textContent = quantity;
    totalOut.textContent = formatMoney(
      (product.price + sizePrice + toppingPrice) * quantity,
    );
    minusButton.disabled = quantity === 1;
    plusButton.disabled = quantity === 20;
  }
  root.addEventListener("change", update);
  minusButton.addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    update();
  });
  plusButton.addEventListener("click", () => {
    quantity = Math.min(20, quantity + 1);
    update();
  });
  const addButton = root.querySelector("[data-add-detail]");
  addButton.addEventListener("click", () => {
    Cart.add(product, { ...selected(), quantity });
    addButton.classList.add("added");
    addButton.innerHTML = '<span aria-hidden="true">✓</span> Đã thêm vào giỏ';
    setTimeout(() => {
      addButton.classList.remove("added");
      addButton.innerHTML = '<span aria-hidden="true">🛒</span> Thêm vào giỏ';
    }, 1400);
  });
  update();
}
function renderCartPage() {
  const list = document.querySelector("[data-cart-list]");
  if (!list) return;
  const items = Cart.get();
  const content = document.querySelector("[data-cart-content]");
  const empty = document.querySelector("[data-cart-empty]");
  content.hidden = !items.length;
  empty.hidden = Boolean(items.length);
  list.replaceChildren();
  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "cart-item card";
    const optionText =
      [item.size?.name, item.toppings?.map((t) => t.name).join(", ")]
        .filter(Boolean)
        .join(" · ") || "Phần tiêu chuẩn";
    article.innerHTML = `<img class="cart-thumb" src="${getAssetPath(item.image)}" alt="Minh họa ${item.name}"><div><h3>${item.name}</h3><p class="cart-options"></p><div class="cart-controls"><div class="qty-control"><button type="button" data-minus aria-label="Giảm ${item.name}">−</button><output>${item.quantity}</output><button type="button" data-plus aria-label="Tăng ${item.name}">+</button></div><span>${formatMoney(item.unitPrice)} / phần</span></div></div><div class="cart-side"><strong>${formatMoney(item.unitPrice * item.quantity)}</strong><button class="remove-btn" type="button" data-remove>Xóa</button></div>`;
    setProductImageFallback(article.querySelector("img"), item);
    article.querySelector(".cart-options").textContent = optionText;
    article
      .querySelector("[data-minus]")
      .addEventListener("click", () =>
        Cart.update(item.cartItemId, item.quantity - 1),
      );
    article
      .querySelector("[data-plus]")
      .addEventListener("click", () =>
        Cart.update(item.cartItemId, item.quantity + 1),
      );
    article
      .querySelector("[data-remove]")
      .addEventListener("click", () => Cart.remove(item.cartItemId));
    list.append(article);
  });
  renderSummary();
}
function renderSummary() {
  const totals = Cart.totals();
  const values = {
    subtotal: totals.subtotal,
    shipping: totals.shippingFee,
    discount: -totals.discount,
    total: totals.total,
  };
  Object.entries(values).forEach(([key, value]) =>
    document
      .querySelectorAll(`[data-summary-${key}]`)
      .forEach((el) => (el.textContent = formatMoney(value))),
  );
  const applied = document.querySelector("[data-applied-voucher]");
  if (applied)
    applied.textContent = Cart.voucher()
      ? `Đang dùng: ${Cart.voucher().code}`
      : "";
}
function initCartPage() {
  if (!document.querySelector("[data-cart-list]")) return;
  document.addEventListener("cart:changed", renderCartPage);
  document.querySelector("[data-clear-cart]")?.addEventListener("click", () => {
    if (confirm("Xóa toàn bộ món trong giỏ?")) Cart.clear();
  });
  document
    .querySelector("[data-voucher-form]")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = event.currentTarget.querySelector("input");
      const result = Cart.applyVoucher(input.value);
      showToast(result.message, result.ok ? "success" : "error");
      renderSummary();
    });
  renderCartPage();
}
function setFormMessage(form, message, type = "error") {
  let box = form.querySelector("[data-form-message]");
  if (!box) {
    box = document.createElement("div");
    box.dataset.formMessage = "";
    form.prepend(box);
  }
  box.className = `notice ${type}`;
  box.textContent = message;
}
function initAuthPages() {
  const register = document.querySelector("[data-register-form]");
  register?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(register);
    const fullName = data.get("fullName").trim(),
      email = data.get("email").trim(),
      phone = data.get("phone").trim(),
      password = data.get("password"),
      confirmPassword = data.get("confirmPassword");
    if (fullName.length < 2 || !Auth.patterns.fullName.test(fullName))
      return setFormMessage(
        register,
        "Họ tên cần ít nhất 2 ký tự và chỉ gồm chữ cái.",
      );
    if (!Auth.patterns.email.test(email))
      return setFormMessage(register, "Email chưa đúng định dạng.");
    if (!Auth.patterns.phone.test(phone))
      return setFormMessage(register, "Số điện thoại chưa hợp lệ.");
    if (!Auth.patterns.password.test(password))
      return setFormMessage(
        register,
        "Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường, ký tự đặc biệt và không có khoảng trắng.",
      );
    if (password !== confirmPassword)
      return setFormMessage(register, "Mật khẩu xác nhận chưa khớp.");
    const result = Auth.register({ fullName, email, phone, password });
    if (!result.ok) return setFormMessage(register, result.message);
    sessionStorage.setItem(
      "texas_chicken_auth_message",
      "Đăng ký thành công. Hãy đăng nhập!",
    );
    location.href = "login.html";
  });
  const login = document.querySelector("[data-login-form]");
  if (login) {
    const message = sessionStorage.getItem("texas_chicken_auth_message");
    if (message) {
      setFormMessage(login, message, "success");
      sessionStorage.removeItem("texas_chicken_auth_message");
    }
    login.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(login);
      if (!Auth.patterns.email.test(data.get("email").trim()))
        return setFormMessage(login, "Email chưa đúng định dạng.");
      if (!data.get("password"))
        return setFormMessage(login, "Vui lòng nhập mật khẩu.");
      const result = Auth.login(data.get("email"), data.get("password"));
      if (!result.ok) return setFormMessage(login, result.message);
      const next = new URLSearchParams(location.search).get("next");
      location.href =
        next && /^[a-z-]+\.html$/.test(next) ? next : "profile.html";
    });
  }
}
function initProfilePage() {
  const form = document.querySelector("[data-profile-form]");
  if (!form) return;
  const user = Auth.current();
  if (!user) {
    location.replace("login.html?next=profile.html");
    return;
  }
  form.elements.fullName.value = user.fullName;
  form.elements.email.value = user.email;
  form.elements.phone.value = user.phone;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fullName = form.elements.fullName.value.trim(),
      phone = form.elements.phone.value.trim();
    if (
      fullName.length < 2 ||
      !Auth.patterns.fullName.test(fullName) ||
      !Auth.patterns.phone.test(phone)
    )
      return setFormMessage(form, "Vui lòng kiểm tra họ tên và số điện thoại.");
    Auth.updateProfile({ fullName, phone });
    setFormMessage(form, "Đã cập nhật thông tin.", "success");
    updateAuthNavigation();
  });
}
function initOrdersPage() {
  const list = document.querySelector("[data-order-list]");
  if (!list) return;
  const user = Auth.current();
  if (!user) {
    location.replace("login.html?next=orders.html");
    return;
  }
  const orders = Storage.get(KEYS.orders, [])
    .filter((order) => order.userId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const empty = document.querySelector("[data-orders-empty]");
  empty.hidden = Boolean(orders.length);
  orders.forEach((order) => {
    const card = document.createElement("article");
    card.className = "order-card card";
    const head = document.createElement("div");
    head.className = "order-card-head";
    head.innerHTML = `<div><div class="order-id">${order.id}</div><small class="muted">${new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.createdAt))}</small></div><span class="order-status">${order.status}</span>`;
    const items = document.createElement("div");
    items.className = "order-mini-items";
    order.items.forEach((item) => {
      const row = document.createElement("div");
      row.textContent = `${item.quantity} × ${item.name}`;
      items.append(row);
    });
    const foot = document.createElement("div");
    foot.className = "order-card-foot";
    foot.innerHTML = `<span>${order.deliveryType === "pickup" ? "Nhận tại cửa hàng" : "Giao tận nơi"}</span><strong>${formatMoney(order.total)}</strong>`;
    card.append(head, items, foot);
    list.append(card);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initMenuPage();
  initProductPage();
  initCartPage();
  initAuthPages();
  initProfilePage();
  initOrdersPage();
});
