function initCheckout() {
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return;
  const items = Cart.get();
  if (!items.length) {
    location.replace("cart.html");
    return;
  }
  const user = Auth.current();
  if (user) {
    form.elements.fullName.value = user.fullName;
    form.elements.phone.value = user.phone;
  }
  const list = document.querySelector("[data-checkout-items]");
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "checkout-item";
    row.innerHTML = `<img src="${getAssetPath(item.image)}" alt=""><div><strong>${item.name}</strong><p>${item.quantity} × ${formatMoney(item.unitPrice)}</p></div><strong>${formatMoney(item.unitPrice * item.quantity)}</strong>`;
    setProductImageFallback(row.querySelector("img"), item);
    list.append(row);
  });
  const deliveryInputs = [
      ...form.querySelectorAll('input[name="deliveryType"]'),
    ],
    paymentInputs = [
      ...form.querySelectorAll('input[name="paymentMethod"]'),
    ],
    addressBox = document.querySelector("[data-address-fields]"),
    storeBox = document.querySelector("[data-store-fields]"),
    paymentSection = document.querySelector("[data-payment-section]"),
    cardFields = document.querySelector("[data-card-fields]"),
    qrFields = document.querySelector("[data-qr-fields]");
  function checkoutTotals() {
    const totals = Cart.totals();
    if (form.elements.deliveryType.value !== "pickup") return totals;
    return {
      ...totals,
      shippingFee: 0,
      total: Math.max(0, totals.subtotal - totals.discount),
    };
  }
  function renderCheckoutSummary() {
    const totals = checkoutTotals();
    const values = {
      subtotal: totals.subtotal,
      shipping: totals.shippingFee,
      discount: -totals.discount,
      total: totals.total,
    };
    Object.entries(values).forEach(([key, value]) => {
      form.querySelector(`[data-summary-${key}]`).textContent =
        formatMoney(value);
    });
  }
  function togglePayment() {
    const isDelivery = form.elements.deliveryType.value === "delivery";
    const method = isDelivery ? form.elements.paymentMethod.value : "";
    const showCard = method === "card";
    const showQr = method === "qr";
    cardFields.hidden = !showCard;
    qrFields.hidden = !showQr;
    cardFields.querySelectorAll("input").forEach((input) => {
      input.disabled = !showCard;
      input.required = showCard;
    });
  }
  function toggleDelivery() {
    const deliveryType = form.elements.deliveryType.value;
    const delivery = deliveryType === "delivery";
    const pickup = deliveryType === "pickup";
    addressBox.hidden = !delivery;
    storeBox.hidden = !pickup;
    paymentSection.hidden = !delivery;
    form.elements.address.disabled = !delivery;
    form.elements.address.required = delivery;
    form.elements.store.disabled = !pickup;
    form.elements.store.required = pickup;
    paymentInputs.forEach((input) => {
      input.disabled = !delivery;
      input.required = delivery && input.value === "cod";
    });
    togglePayment();
    renderCheckoutSummary();
  }
  deliveryInputs.forEach((input) =>
    input.addEventListener("change", toggleDelivery),
  );
  paymentInputs.forEach((input) =>
    input.addEventListener("change", togglePayment),
  );
  form.elements.cardNumber.addEventListener("input", (event) => {
    event.target.value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  });
  form.elements.expiry.addEventListener("input", (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 4);
    event.target.value = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
  });
  form.elements.cvv.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
  });
  toggleDelivery();
  renderCheckoutSummary();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const deliveryType = data.get("deliveryType");
    const paymentMethod =
      deliveryType === "pickup" ? "store" : data.get("paymentMethod");
    if (!/^(0|\+84)\d{9,10}$/.test(data.get("phone").trim()))
      return setFormMessage(form, "Số điện thoại chưa hợp lệ.");
    if (paymentMethod === "card") {
      const number = data.get("cardNumber").replace(/\s/g, "");
      if (
        !/^\d{16}$/.test(number) ||
        !/^\d{2}\/\d{2}$/.test(data.get("expiry")) ||
        !/^\d{3,4}$/.test(data.get("cvv"))
      )
        return setFormMessage(form, "Thông tin thẻ demo chưa đúng định dạng.");
    }
    const totals = checkoutTotals();
    const order = {
      id: createOrderId(),
      userId: user?.id || null,
      customer: {
        fullName: data.get("fullName").trim(),
        phone: data.get("phone").trim(),
        address:
          deliveryType === "pickup"
            ? data.get("store")
            : data.get("address").trim(),
      },
      items: Cart.get(),
      subtotal: totals.subtotal,
      discount: totals.discount,
      shippingFee: totals.shippingFee,
      total: totals.total,
      deliveryType,
      paymentMethod,
      note: data.get("note").trim(),
      status: "Đã tiếp nhận",
      createdAt: new Date().toISOString(),
    };
    const orders = Storage.get(KEYS.orders, []);
    orders.push(order);
    if (!Storage.set(KEYS.orders, orders))
      return setFormMessage(
        form,
        "Không thể lưu đơn hàng. Hãy kiểm tra bộ nhớ trình duyệt.",
      );
    Cart.clear();
    location.href = `order-success.html?id=${encodeURIComponent(order.id)}`;
  });
}
function initOrderSuccess() {
  const root = document.querySelector("[data-order-success]");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const order = Storage.get(KEYS.orders, []).find((item) => item.id === id);
  if (!order) {
    root.innerHTML = `<div class="empty-state"><div class="empty-icon">?</div><h2>Không tìm thấy đơn hàng</h2><p>Mã đơn không tồn tại trên trình duyệt này.</p><a class="btn btn-primary" href="menu.html">Tiếp tục mua</a></div>`;
    return;
  }
  root.querySelector("[data-order-id]").textContent = order.id;
  root.querySelector("[data-order-total]").textContent = formatMoney(
    order.total,
  );
  root.querySelector("[data-order-payment]").textContent = {
    cod: "Thanh toán khi nhận",
    card: "Thẻ",
    qr: "QR",
    store: "Thanh toán tại cửa hàng",
  }[order.paymentMethod];
  root.querySelector("[data-order-address]").textContent =
    order.customer.address;
  const historyLink = root.querySelector("[data-history-link]");
  historyLink.hidden = !order.userId;
}
document.addEventListener("DOMContentLoaded", () => {
  initCheckout();
  initOrderSuccess();
});
