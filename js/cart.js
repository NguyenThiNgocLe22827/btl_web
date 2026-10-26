const Cart = {
  get() {
    return Storage.get(KEYS.cart, []);
  },
  save(items) {
    Storage.set(KEYS.cart, items);
    document.dispatchEvent(new CustomEvent("cart:changed"));
  },
  makeId(productId, size, toppings) {
    return [
      productId,
      size || "default",
      ...toppings.map((item) => item.id).sort(),
    ].join("-");
  },
  add(product, { size = null, toppings = [], quantity = 1 } = {}) {
    const sizeOption = size
      ? SIZE_OPTIONS.find((item) => item.id === size)
      : null;
    const toppingOptions = TOPPING_OPTIONS.filter((item) =>
      toppings.includes(item.id),
    );
    const unitPrice =
      product.price +
      (sizeOption?.price || 0) +
      toppingOptions.reduce((sum, item) => sum + item.price, 0);
    const cartItemId = this.makeId(product.id, size, toppingOptions);
    const items = this.get();
    const existing = items.find((item) => item.cartItemId === cartItemId);
    if (existing) existing.quantity += quantity;
    else
      items.push({
        cartItemId,
        productId: product.id,
        name: product.name,
        image: product.image,
        basePrice: product.price,
        size: sizeOption
          ? {
              id: sizeOption.id,
              name: sizeOption.name,
              price: sizeOption.price,
            }
          : null,
        toppings: toppingOptions,
        quantity,
        unitPrice,
      });
    this.save(items);
    window.showToast?.(`Đã thêm ${product.name} vào giỏ.`, "success");
  },
  update(cartItemId, quantity) {
    const items = this.get();
    const item = items.find((entry) => entry.cartItemId === cartItemId);
    if (!item) return;
    if (quantity <= 0) return this.remove(cartItemId);
    item.quantity = quantity;
    this.save(items);
  },
  remove(cartItemId) {
    this.save(this.get().filter((item) => item.cartItemId !== cartItemId));
  },
  clear() {
    this.save([]);
    Storage.remove(KEYS.voucher);
  },
  count() {
    return this.get().reduce((sum, item) => sum + item.quantity, 0);
  },
  subtotal() {
    return this.get().reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
  },
  voucher() {
    return Storage.get(KEYS.voucher, null);
  },
  applyVoucher(code) {
    const normalized = code.trim().toUpperCase();
    const subtotal = this.subtotal();
    const vouchers = {
      TEXAS_NUM1: { type: "percent", value: 0.1, max: 50000 },
      TEXAS_NUM2: { type: "shipping" },
      TEXAS_NUM3: { type: "percent", value: 0.2, max: Infinity, min: 250000 },
      TEXAS_NUM4: { type: "fixed", value: 30000, min: 199000 },
      TEXAS_NUM5: { type: "percent", value: 0.25, max: 100000, min: 399000 },
    };
    const offer = vouchers[normalized];
    if (offer?.min && subtotal < offer.min)
      return {
        ok: false,
        message: `Đơn hàng cần tối thiểu ${formatMoney(offer.min)}.`,
      };
    const voucher = offer ? { code: normalized, ...offer } : null;
    if (!voucher) return { ok: false, message: "Mã voucher không hợp lệ." };
    Storage.set(KEYS.voucher, voucher);
    return { ok: true, message: `Đã áp dụng ${normalized}.` };
  },
  totals() {
    const subtotal = this.subtotal();
    let shippingFee = subtotal >= 199000 || subtotal === 0 ? 0 : 20000;
    let discount = 0;
    const voucher = this.voucher();
    if (voucher?.type === "percent")
      discount = Math.min(subtotal * voucher.value, voucher.max);
    if (voucher?.type === "fixed")
      discount = Math.min(subtotal, voucher.value);
    if (voucher?.type === "shipping") shippingFee = 0;
    return {
      subtotal,
      shippingFee,
      discount,
      total: Math.max(0, subtotal + shippingFee - discount),
    };
  },
};
