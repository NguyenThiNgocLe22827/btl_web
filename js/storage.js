const KEYS = {
  users: "texas_chicken_users",
  currentUser: "texas_chicken_current_user",
  cart: "texas_chicken_cart",
  orders: "texas_chicken_orders",
  voucher: "texas_chicken_voucher",
};
const Storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.warn("Không thể đọc localStorage:", key, error);
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("Không thể lưu localStorage:", key, error);
      window.showToast?.("Không thể lưu dữ liệu trên trình duyệt.", "error");
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn("Không thể xóa localStorage:", key, error);
      return false;
    }
  },
};
const isInsidePages = window.location.pathname.includes("/pages/");
const BASE_PATH = isInsidePages ? "../" : "";
const getAssetPath = (path) => `${BASE_PATH}${path}`;
const PRODUCT_IMAGE_FALLBACKS = {
  "fried-chicken": "assets/images/products/chicken.svg",
  burger: "assets/images/products/burger.svg",
  rice: "assets/images/products/rice.svg",
  pasta: "assets/images/products/pasta.svg",
  combo: "assets/images/products/combo.svg",
  sides: "assets/images/products/sides.svg",
  drinks: "assets/images/products/drink.svg",
  dessert: "assets/images/products/dessert.svg",
};
function setProductImageFallback(image, product) {
  if (!image) return;
  const category =
    product?.category ||
    PRODUCTS.find((item) => item.id === product?.productId)?.category ||
    "fried-chicken";
  image.addEventListener(
    "error",
    () => {
      if (image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.src = getAssetPath(
        PRODUCT_IMAGE_FALLBACKS[category] || PRODUCT_IMAGE_FALLBACKS["fried-chicken"],
      );
      image.classList.add("image-fallback");
    },
    { once: true },
  );
}
function getPagePath(page) {
  if (page === "home") return isInsidePages ? "../index.html" : "index.html";
  return isInsidePages ? `${page}.html` : `pages/${page}.html`;
}
const formatMoney = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value,
  );
function createOrderId() {
  const date = new Date();
  const day = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  return `TXC-${day}-${Math.floor(10000 + Math.random() * 90000)}`;
}
