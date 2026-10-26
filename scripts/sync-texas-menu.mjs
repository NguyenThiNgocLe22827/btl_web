import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const MENU_URL =
  "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551";
const EDITORIAL_URL =
  "https://danangthanhkhe.aeonmall-vietnam.com/vi/da-nang-co-gi-hay/menu-texas-chicken.html";
const FALLBACK_URL =
  "https://ngoctu1806.github.io/TexasChickenWeb/thucdon.html";
const OUTPUT_FILE = resolve("data/products.js");
const IMAGE_DIRECTORY = resolve("assets/images/products/texas");
const MAX_PRODUCTS = 32;
const CLEAN_ITEM_IMAGE_IDS = new Set([13751538, 227148, 721535]);
const COMMONS_IMAGES = [
  {
    name: "commons-chicken-burger",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Fried_chicken_burger_.jpg/1280px-Fried_chicken_burger_.jpg",
  },
  {
    name: "commons-chicken-pasta",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Chicken%2C_Spaghetti_Sauce%2C_Pasta%2C_and_Fries.jpg/1280px-Chicken%2C_Spaghetti_Sauce%2C_Pasta%2C_and_Fries.jpg",
  },
];

const CATEGORIES = [
  { slug: "fried-chicken", name: "Gà rán", icon: "🍗" },
  { slug: "burger", name: "Burger & cuộn", icon: "🍔" },
  { slug: "rice", name: "Cơm", icon: "🍚" },
  { slug: "pasta", name: "Mì Ý", icon: "🍝" },
  { slug: "combo", name: "Combo", icon: "🎉" },
  { slug: "sides", name: "Đồ ăn kèm", icon: "🍟" },
  { slug: "drinks", name: "Nước uống", icon: "🥤" },
  { slug: "dessert", name: "Tráng miệng", icon: "🍪" },
];

const SIZE_OPTIONS = [
  { id: "small", name: "Nhỏ", price: 0 },
  { id: "medium", name: "Vừa", price: 12000 },
  { id: "large", name: "Lớn", price: 22000 },
];

const TOPPING_OPTIONS = [
  { id: "cheese", name: "Phô mai", price: 12000 },
  { id: "bacon", name: "Thịt xông khói", price: 18000 },
  { id: "egg", name: "Trứng ốp", price: 10000 },
  { id: "sauce", name: "Sốt Texas Chicken", price: 7000 },
];

const EXTRA_PRODUCTS = [
  {
    name: "Cơm Gà Giòn Original",
    category: "rice",
    description: "Cơm nóng, gà giòn không cay, rau tươi và sốt Texas Chicken đậm vị.",
    price: 69000,
  },
  {
    name: "Cơm Gà Sốt Bơ Tỏi",
    category: "rice",
    description: "Gà giòn phủ sốt bơ tỏi thơm béo, dùng cùng cơm trắng nóng.",
    price: 79000,
  },
  {
    name: "Cơm Gà Giòn Cay",
    category: "rice",
    description: "Cơm gà giòn cay vừa, thêm bắp cải trộn cho bữa ăn cân bằng.",
    price: 72000,
  },
];

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanName(value) {
  return value
    .replace(/\bTexas(?!\s+Chicken)\b/gi, "Texas Chicken")
    .replace(/\bTex\b/gi, "Texas Chicken")
    .replace(/Gà Rán Truyền Thống/gi, "Gà Giòn Original")
    .replace(/\s+/g, " ")
    .trim();
}

function fetchText(url) {
  return fetch(url, {
    headers: { "user-agent": "Texas Chicken demo menu sync/2.0" },
  }).then((response) => {
    if (!response.ok) throw new Error(`Không tải được ${url}: HTTP ${response.status}`);
    return response.text();
  });
}

function extractObject(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return "";
  const start = source.indexOf("{", markerIndex + marker.length);
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === "{") depth += 1;
    else if (char === "}" && --depth === 0) return source.slice(start, index + 1);
  }
  return "";
}

function parseBeFood(html) {
  const chunks = [];
  const scripts = html.matchAll(/self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g);
  for (const match of scripts) {
    try {
      const payload = JSON.parse(match[1]);
      if (typeof payload[1] === "string") chunks.push(payload[1]);
    } catch {
      // Ignore unrelated Next.js payloads.
    }
  }
  const raw = extractObject(chunks.join("\n"), '"initialMenuData":');
  if (!raw) throw new Error("Không tìm thấy initialMenuData trên beFood.");
  const menu = JSON.parse(raw);
  return menu.categories.flatMap((category) =>
    [...(category.items || []), ...(category.remaining_items || [])].map((item) => ({
      ...item,
      sourceCategory: category.category_name,
    })),
  );
}

function categoryFor(item) {
  const sourceCategory = slugify(item.sourceCategory || "");
  const value = slugify(`${item.sourceCategory || ""} ${item.item_name || item.name}`);
  if (/(thuc-uong|nuoc-ngot|nuoc-suoi|coca|dasani)/.test(value)) return "drinks";
  if (/banh-quy/.test(value)) return "dessert";
  if (/(my-y|pasta)/.test(value)) return "pasta";
  if (/(burger|banh-cuon|wrap)/.test(value) && !/combo-ga-ran/.test(value)) return "burger";
  if (
    /(an-kem|khoai|bap-cai|com-trang|tuong)/.test(value) ||
    /them-sot/.test(sourceCategory)
  )
    return "sides";
  if (/(combo|chicken-box|shake-shake|dai-tiec|cang-dong|mo-tiec)/.test(value)) return "combo";
  return "fried-chicken";
}

function uniqueItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = slugify(item.item_name);
    if (!item.item_name || !item.price || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function selectBalanced(items) {
  const buckets = Object.fromEntries(CATEGORIES.map(({ slug }) => [slug, []]));
  uniqueItems(items).forEach((item) => buckets[categoryFor(item)].push(item));
  const limits = {
    "fried-chicken": 6,
    burger: 5,
    pasta: 2,
    combo: 7,
    sides: 4,
    drinks: 2,
    dessert: 3,
  };
  const selected = [];
  Object.entries(limits).forEach(([category, limit]) => {
    selected.push(...buckets[category].slice(0, limit));
  });
  return selected.slice(0, MAX_PRODUCTS - EXTRA_PRODUCTS.length);
}

async function saveRemoteImage(url, stem) {
  const response = await fetch(url, {
    headers: { "user-agent": "Texas Chicken demo menu sync/2.0" },
  });
  if (!response.ok) throw new Error(`Không tải được ảnh: HTTP ${response.status}`);
  const type = response.headers.get("content-type") || "image/jpeg";
  const extension = type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
  const filename = `${stem}.${extension}`;
  const bytes = new Uint8Array(await response.arrayBuffer());
  await writeFile(resolve(IMAGE_DIRECTORY, filename), bytes);
  return { path: `assets/images/products/texas/${filename}`, bytes: bytes.length };
}

async function saveEditorialPhotos(html) {
  const matches = [...html.matchAll(/src="data:image\/(png|jpeg|webp);base64,([^"]+)"/g)];
  // Ba ảnh cận cảnh món ăn đã được kiểm tra: không logo, không watermark.
  const cleanIndexes = [3, 4, 7];
  const photos = [];
  for (const [position, sourceIndex] of cleanIndexes.entries()) {
    const match = matches[sourceIndex];
    if (!match) continue;
    const extension = match[1] === "jpeg" ? "jpg" : match[1];
    const filename = `editorial-${position + 1}.${extension}`;
    const bytes = Buffer.from(match[2], "base64");
    await writeFile(resolve(IMAGE_DIRECTORY, filename), bytes);
    photos.push({ path: `assets/images/products/texas/${filename}`, bytes: bytes.length });
  }
  return photos;
}

function imageFor(item, downloaded, editorial, commons, index) {
  if (downloaded.has(item.restaurant_item_id)) return downloaded.get(item.restaurant_item_id);
  const category = categoryFor(item);
  const candidates = {
    burger: [commons[0], editorial[2], ...downloaded.values()],
    sides: [editorial[2], editorial[0], ...downloaded.values()],
    dessert: [editorial[0], editorial[2], ...downloaded.values()],
    drinks: [editorial[2], ...downloaded.values()],
    pasta: [commons[1], editorial[0], ...downloaded.values()],
    "fried-chicken": [editorial[1], editorial[0], ...downloaded.values()],
    combo: [...downloaded.values(), editorial[2], commons[0]],
  }[category].filter(Boolean);
  return candidates[index % candidates.length];
}

function productFrom(item, index, image) {
  const category = categoryFor(item);
  const name = cleanName(item.item_name);
  const description = cleanName(item.item_details || "Phần ăn đậm vị, ngon nhất khi dùng nóng.");
  return {
    id: index + 1,
    slug: slugify(name),
    name,
    category,
    description,
    price: Number(item.price),
    originalPrice: Number(item.old_price) > Number(item.price) ? Number(item.old_price) : 0,
    image,
    rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
    calories: 310 + (index % 7) * 70,
    badge: item.old_price > item.price ? "Ưu đãi" : index < 4 ? "Nổi bật" : "",
    sold: Number(item.order_count) || 240 + (MAX_PRODUCTS - index) * 19,
    sizes: category === "drinks",
    toppings: ["fried-chicken", "burger", "rice", "pasta"].includes(category)
      ? ["sauce"]
      : [],
    source: MENU_URL,
  };
}

function toJavaScript(products) {
  return `/*
 * Dữ liệu tham khảo được tổng hợp từ các trang menu công khai, sau đó đổi tên
 * và phân loại lại cho thương hiệu demo Texas Chicken. Ảnh đã tải về local.
 * Nguồn menu: ${MENU_URL}
 * Nguồn ảnh bổ sung: ${EDITORIAL_URL}
 * Đồng bộ lúc: ${new Date().toISOString()}
 */
const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};
const SIZE_OPTIONS = ${JSON.stringify(SIZE_OPTIONS, null, 2)};
const TOPPING_OPTIONS = ${JSON.stringify(TOPPING_OPTIONS, null, 2)};
const PRODUCTS = ${JSON.stringify(products, null, 2)};
`;
}

async function main() {
  await mkdir(IMAGE_DIRECTORY, { recursive: true });
  const menuHtml = await fetchText(MENU_URL);
  const sourceItems = selectBalanced(parseBeFood(menuHtml));
  const editorial = await fetchText(EDITORIAL_URL)
    .then(saveEditorialPhotos)
    .catch(() => []);
  const commons = [];
  for (const image of COMMONS_IMAGES) {
    commons.push(await saveRemoteImage(image.url, image.name));
  }

  const downloaded = new Map();
  let totalBytes = [...editorial, ...commons].reduce((total, photo) => total + photo.bytes, 0);
  for (const item of sourceItems) {
    const imageUrl = item.item_image_compressed_cover || item.item_image_compressed_web;
    if (
      !imageUrl ||
      !CLEAN_ITEM_IMAGE_IDS.has(item.restaurant_item_id) ||
      downloaded.has(item.restaurant_item_id)
    )
      continue;
    const saved = await saveRemoteImage(imageUrl, `be-${item.restaurant_item_id}`);
    downloaded.set(item.restaurant_item_id, saved.path);
    totalBytes += saved.bytes;
  }
  if (!downloaded.size) throw new Error(`Nguồn ảnh chính trống. Nguồn dự phòng: ${FALLBACK_URL}`);

  const editorialPaths = editorial.map((photo) => photo.path);
  const commonsPaths = commons.map((photo) => photo.path);
  const products = sourceItems.map((item, index) =>
    productFrom(
      item,
      index,
      imageFor(item, downloaded, editorialPaths, commonsPaths, index),
    ),
  );
  for (const extra of EXTRA_PRODUCTS) {
    const index = products.length;
    products.push({
      ...extra,
      id: index + 1,
      slug: slugify(extra.name),
      originalPrice: 0,
      image: editorialPaths[index % editorialPaths.length] || [...downloaded.values()][0],
      rating: 4.8,
      calories: 590,
      badge: "Món mới",
      sold: 180 + index * 7,
      sizes: false,
      toppings: ["egg", "sauce"],
      source: EDITORIAL_URL,
    });
  }

  await writeFile(OUTPUT_FILE, toJavaScript(products), "utf8");
  console.log(`Đã đồng bộ ${products.length} món và ${totalBytes.toLocaleString("vi-VN")} byte ảnh.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
