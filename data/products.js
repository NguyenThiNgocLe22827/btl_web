
const CATEGORIES = [
  {
    "slug": "fried-chicken",
    "name": "Gà rán",
    "icon": "🍗",
    "image": "assets/images/categories/fried-chicken.jpg"
  },
  {
    "slug": "burger",
    "name": "Burger & bánh cuộn",
    "icon": "🍔",
    "image": "assets/images/categories/burger.jpg"
  },
  {
    "slug": "rice",
    "name": "Cơm",
    "icon": "🍚",
    "image": "assets/images/categories/rices.jpg"
  },
  {
    "slug": "pasta",
    "name": "Mì Ý",
    "icon": "🍝",
    "image": "assets/images/categories/pasta.jpg"
  },
  {
    "slug": "combo",
    "name": "Combo",
    "icon": "🎉",
    "image": "assets/images/categories/combo.jpg"
  },
  {
    "slug": "sides",
    "name": "Đồ ăn kèm",
    "icon": "🍟",
    "image": "assets/images/categories/sides.jpg"
  },
  {
    "slug": "drinks",
    "name": "Nước uống",
    "icon": "🥤",
    "image": "assets/images/categories/drinks.jpg"
  },
  {
    "slug": "dessert",
    "name": "Tráng miệng",
    "icon": "🍪",
    "image": "assets/images/categories/dessert.jpg"
  }
];
const SIZE_OPTIONS = [
  {
    "id": "small",
    "name": "Nhỏ",
    "price": 0
  },
  {
    "id": "medium",
    "name": "Vừa",
    "price": 12000
  },
  {
    "id": "large",
    "name": "Lớn",
    "price": 22000
  }
];
const TOPPING_OPTIONS = [
  {
    "id": "cheese",
    "name": "Phô mai",
    "price": 12000
  },
  {
    "id": "bacon",
    "name": "Thịt xông khói",
    "price": 18000
  },
  {
    "id": "egg",
    "name": "Trứng ốp",
    "price": 10000
  },
  {
    "id": "sauce",
    "name": "Sốt Texas Chicken",
    "price": 7000
  }
];
const PRODUCTS = [
  {
    "id": 1,
    "slug": "ga-gion-original-khong-cay-1-mieng",
    "name": "Gà Giòn Original Không Cay - 1 Miếng",
    "category": "fried-chicken",
    "description": "- 1 Miếng Gà Giòn Original (Không Cay) - 1 Tương ớt",
    "price": 39000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/be-227148.jpg",
    "rating": 4.6,
    "calories": 310,
    "badge": "Nổi bật",
    "sold": 1646,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 2,
    "slug": "1-mieng-ga-sot-bo-toi-va-thao-moc",
    "name": "1 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc",
    "category": "fried-chicken",
    "description": "- 1 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc - 1 Tương ớt",
    "price": 49000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/be-721535.jpg",
    "rating": 4.7,
    "calories": 380,
    "badge": "Nổi bật",
    "sold": 1201,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 3,
    "slug": "06-mieng-ga-popcorn-lac-lua",
    "name": "06 Miếng Gà Popcorn Lắc Lửa",
    "category": "fried-chicken",
    "description": "06 Miếng gà popcorn lắc lửa 01 Tương ớt + 01 tương cà",
    "price": 49000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/be-13751538.jpg",
    "rating": 4.8,
    "calories": 450,
    "badge": "Nổi bật",
    "sold": 1,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 4,
    "slug": "11-mieng-ga-sot-bo-toi-va-thao-moc",
    "name": "11 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc",
    "category": "fried-chicken",
    "description": "- 11 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc - 7 Tương ớt + 4 tương cà",
    "price": 479000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/texas-08.jpg",
    "rating": 4.9,
    "calories": 520,
    "badge": "Nổi bật",
    "sold": 791,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 5,
    "slug": "3-mieng-ga-sot-bo-toi-va-thao-moc",
    "name": "3 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc",
    "category": "fried-chicken",
    "description": "- 3 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc - 2 Tương ớt + 1 tương cà",
    "price": 139000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/texas-07.jpg",
    "rating": 4.6,
    "calories": 590,
    "badge": "",
    "sold": 772,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 6,
    "slug": "7-mieng-ga-sot-bo-toi-va-thao-moc",
    "name": "7 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc",
    "category": "fried-chicken",
    "description": "- 7 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc - 5 Tương ớt + 2 tương cà",
    "price": 319000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/texas-08.jpg",
    "rating": 4.7,
    "calories": 660,
    "badge": "",
    "sold": 753,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 7,
    "slug": "01-burger-bong-em",
    "name": "01 Burger Bóng Đêm",
    "category": "burger",
    "description": "01 Burger bóng đêm (vị cay/ không cay) 01 Tương ớt",
    "price": 69000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/commons-chicken-burger.jpg",
    "rating": 4.8,
    "calories": 730,
    "badge": "",
    "sold": 734,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  
  {
    "id": 12,
    "slug": "combo-my-y-ga-gion-original",
    "name": "Combo Mỳ Ý Gà Giòn Original",
    "category": "pasta",
    "description": "- 1 Mỳ ý sốt cà chua kèm Gà Giòn Original - 1 Chai Coca-Cola Zero Sugar 390ml - 1 Tương ớt",
    "price": 89000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/texas-04.jpg",
    "rating": 4.9,
    "calories": 590,
    "badge": "",
    "sold": 639,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 13,
    "slug": "combo-my-y-ga-gion-khong-xuong",
    "name": "Combo Mỳ Ý Gà Giòn Không Xương",
    "category": "pasta",
    "description": "- 1 Mỳ ý sốt cà chua kèm gà giòn không xương - 1 Chai Coca-Cola Zero Sugar 390ml - 1 Tương ớt",
    "price": 69000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/texas-03.jpg",
    "rating": 4.6,
    "calories": 660,
    "badge": "",
    "sold": 620,
    "sizes": false,
    "toppings": [
      "sauce"
    ],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 14,
    "slug": "chicken-box-5-mieng-ga-ran",
    "name": "Chicken Box - 5 Miếng Gà Rán",
    "category": "combo",
    "description": "5 Miếng gà rán có xương - 4 Tương ớt + 2 tương cà",
    "price": 189000,
    "originalPrice": 195000,
    "image": "assets/images/products/texas/be-227143.png",
    "rating": 4.7,
    "calories": 730,
    "badge": "Ưu đãi",
    "sold": 577,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 15,
    "slug": "combo-02-mieng-ga-sot-bo-toi-va-thao-moc",
    "name": "Combo 02 Miếng Gà Sốt Bơ Tỏi Và Thảo Mộc",
    "category": "combo",
    "description": "- 2 Miếng gà sốt bơ tỏi và thảo mộc - 1 Bánh quy bơ mật ong - 1 Món ăn kèm tiêu chuẩn tùy chọn (Bắp cải trộn/ Khoai tây nghiền/ Khoai tây chiên) - 1 Chai Coca-Cola Zero Sugar 390ml t - 1 Tương ớt + 1 tương cà.",
    "price": 129000,
    "originalPrice": 156000,
    "image": "assets/images/products/texas/be-721539.jpg",
    "rating": 4.8,
    "calories": 310,
    "badge": "Ưu đãi",
    "sold": 2050,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 16,
    "slug": "combo-99k",
    "name": "COMBO 99K",
    "category": "combo",
    "description": "- 01 Miếng gà sốt bơ tỏi và thảo mộc - 01 Bánh cuộn gà không xương sốt chua ngọt - 06 Miếng gà popcorn vị truyền thống - 01 Khoai tây nghiền cỡ tiêu chuẩn hoặc 01 Bắp cải trộn cỡ tiêu chuẩn - 01 Tương ớt + 01 Tương cà",
    "price": 99000,
    "originalPrice": 166000,
    "image": "assets/images/products/texas/texas-05.png",
    "rating": 4.9,
    "calories": 380,
    "badge": "Ưu đãi",
    "sold": 1142,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 17,
    "slug": "combo-rom-ra",
    "name": "COMBO RÔM RẢ",
    "category": "combo",
    "description": "- 02 Miếng gà bơ tỏi và thảo mộc - 02 Miếng Gà Giòn Original (vị cay/không cay) - 01 Bánh quy bơ mật ong - 01 Chai Coca-Cola Zero Sugar 390ml - 03 Tương ớt + 01 Tương cà",
    "price": 179000,
    "originalPrice": 215000,
    "image": "assets/images/products/texas/be-13751392.jpg",
    "rating": 4.6,
    "calories": 450,
    "badge": "Ưu đãi",
    "sold": 123,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 18,
    "slug": "shake-shake-combo",
    "name": "Shake Shake Combo",
    "category": "combo",
    "description": "\"02 Miếng Gà Giòn Original (vị cay/không cay) 06 Miếng gà popcorn lắc lửa 01 Thức ăn kèm cỡ tiêu chuẩn tùy chọn (khoai tây chiên/bắp cải trộn/khoai tây nghiền) 01 Chai Coca-Cola Zero Sugar 390ml 02 Tương ớt + 01 tương cà\"",
    "price": 139000,
    "originalPrice": 173000,
    "image": "assets/images/products/texas/texas-06.png",
    "rating": 4.7,
    "calories": 520,
    "badge": "Ưu đãi",
    "sold": 1,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 19,
    "slug": "combo-ga-popcorn-lac-lua",
    "name": "Combo Gà Popcorn Lắc Lửa",
    "category": "combo",
    "description": "06 Miếng gà popcorn lắc lửa 01 Thức ăn kèm cỡ tiêu chuẩn tùy chọn (khoai tây chiên/bắp cải trộn/khoai tây nghiền) 01 Chai Coca-Cola Zero Sugar 390ml 01 Tương ớt + 01 tương cà",
    "price": 79000,
    "originalPrice": 95000,
    "image": "assets/images/products/texas/be-13751345.jpg",
    "rating": 4.8,
    "calories": 590,
    "badge": "Ưu đãi",
    "sold": 1,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 20,
    "slug": "combo-bong-em",
    "name": "Combo Bóng Đêm",
    "category": "combo",
    "description": "02 Miếng gà sốt bơ tỏi và thảo mộc 01 Burger bóng đêm (vị cay/ không cay) 02 Thanh cá 01 Thức ăn kèm cỡ tiêu chuẩn tùy chọn (khoai tây chiên/bắp cải trộn/khoai tây nghiền) 02 Chai Coca-Cola Zero Sugar 390ml 02 Tương ớt + 01 tương cà",
    "price": 199000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/be-10250559.jpg",
    "rating": 4.9,
    "calories": 660,
    "badge": "",
    "sold": 487,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 21,
    "slug": "com-trang",
    "name": "Cơm trắng",
    "category": "sides",
    "description": "Phần ăn đậm vị, ngon nhất khi dùng nóng.",
    "price": 10000,
    "originalPrice": 0,
    "image": "assets/images/products/web/white-rice.jpg",
    "rating": 4.6,
    "calories": 730,
    "badge": "",
    "sold": 468,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 22,
    "slug": "khoai-tay-chien-pho-mai",
    "name": "Khoai tây chiên phô mai",
    "category": "sides",
    "description": "- Khoai tây chiên phô mai - 1 Tương ớt",
    "price": 49000,
    "originalPrice": 0,
    "image": "assets/images/products/texas/texas-09.png",
    "rating": 4.7,
    "calories": 310,
    "badge": "",
    "sold": 449,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 23,
    "slug": "khoai-tay-chien-co-lon",
    "name": "Khoai tây chiên - cỡ lớn",
    "category": "sides",
    "description": "- Khoai tây chiên - cỡ lớn - 1 Tương ớt",
    "price": 45000,
    "originalPrice": 0,
    "image": "assets/images/products/web/french-fries.jpg",
    "rating": 4.8,
    "calories": 380,
    "badge": "",
    "sold": 430,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 24,
    "slug": "khoai-tay-chien-co-vua",
    "name": "Khoai tây chiên - cỡ vừa",
    "category": "sides",
    "description": "- Khoai tây chiên - cỡ vừa - 1 Tương ớt",
    "price": 29000,
    "originalPrice": 0,
    "image": "assets/images/products/web/french-fries.jpg",
    "rating": 4.9,
    "calories": 450,
    "badge": "",
    "sold": 411,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 25,
    "slug": "nuoc-ngot-coca-cola-zero-sugar",
    "name": "Nước ngọt Coca-Cola Zero Sugar",
    "category": "drinks",
    "description": "- Chai 390ml",
    "price": 27000,
    "originalPrice": 0,
    "image": "assets/images/products/web/coca-cola-zero.jpg",
    "rating": 4.6,
    "calories": 520,
    "badge": "",
    "sold": 392,
    "sizes": true,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 26,
    "slug": "nuoc-suoi-dasani",
    "name": "Nước suối (DASANI)",
    "category": "drinks",
    "description": "Chai 500ml",
    "price": 22000,
    "originalPrice": 0,
    "image": "assets/images/products/web/dasani.jpg",
    "rating": 4.7,
    "calories": 590,
    "badge": "",
    "sold": 373,
    "sizes": true,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 27,
    "slug": "banh-quy-bo-mat-ong-5-cai",
    "name": "Bánh quy bơ mật ong - 5 cái",
    "category": "dessert",
    "description": "Phần ăn đậm vị, ngon nhất khi dùng nóng.",
    "price": 49000,
    "originalPrice": 0,
    "image": "assets/images/products/web/honey-butter-biscuit.jpg",
    "rating": 4.8,
    "calories": 660,
    "badge": "",
    "sold": 354,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 28,
    "slug": "banh-quy-bo-mat-ong-3-cai",
    "name": "Bánh quy bơ mật ong - 3 cái",
    "category": "dessert",
    "description": "Phần ăn đậm vị, ngon nhất khi dùng nóng.",
    "price": 29000,
    "originalPrice": 0,
    "image": "assets/images/products/web/honey-butter-biscuit.jpg",
    "rating": 4.9,
    "calories": 730,
    "badge": "",
    "sold": 335,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "id": 29,
    "slug": "banh-quy-bo-mat-ong-1-cai",
    "name": "Bánh quy bơ mật ong - 1 cái",
    "category": "dessert",
    "description": "Phần ăn đậm vị, ngon nhất khi dùng nóng.",
    "price": 12000,
    "originalPrice": 0,
    "image": "assets/images/products/web/honey-butter-biscuit.jpg",
    "rating": 4.6,
    "calories": 310,
    "badge": "",
    "sold": 316,
    "sizes": false,
    "toppings": [],
    "source": "https://food.be.com.vn/ho-chi-minh/ga-ran-texas-chicken-le-van-viet-7551"
  },
  {
    "name": "Cơm Gà Giòn Original",
    "category": "rice",
    "description": "Cơm nóng, gà giòn không cay, rau tươi và sốt Texas Chicken đậm vị.",
    "price": 69000,
    "id": 30,
    "slug": "com-ga-gion-original",
    "originalPrice": 0,
    "image": "assets/images/products/texas/editorial-3.png",
    "rating": 4.8,
    "calories": 590,
    "badge": "Món mới",
    "sold": 383,
    "sizes": false,
    "toppings": [
      "egg",
      "sauce"
    ],
    "source": "https://danangthanhkhe.aeonmall-vietnam.com/vi/da-nang-co-gi-hay/menu-texas-chicken.html"
  },
  {
    "name": "Cơm Gà Sốt Bơ Tỏi",
    "category": "rice",
    "description": "Gà giòn phủ sốt bơ tỏi thơm béo, dùng cùng cơm trắng nóng.",
    "price": 79000,
    "id": 31,
    "slug": "com-ga-sot-bo-toi",
    "originalPrice": 0,
    "image": "assets/images/products/texas/editorial-1.png",
    "rating": 4.8,
    "calories": 590,
    "badge": "Món mới",
    "sold": 390,
    "sizes": false,
    "toppings": [
      "egg",
      "sauce"
    ],
    "source": "https://danangthanhkhe.aeonmall-vietnam.com/vi/da-nang-co-gi-hay/menu-texas-chicken.html"
  },
  {
    "name": "Cơm Gà Giòn Cay",
    "category": "rice",
    "description": "Cơm gà giòn cay vừa, thêm bắp cải trộn cho bữa ăn cân bằng.",
    "price": 72000,
    "id": 32,
    "slug": "com-ga-gion-cay",
    "originalPrice": 0,
    "image": "assets/images/products/texas/editorial-2.png",
    "rating": 4.8,
    "calories": 590,
    "badge": "Món mới",
    "sold": 397,
    "sizes": false,
    "toppings": [
      "egg",
      "sauce"
    ],
    "source": "https://danangthanhkhe.aeonmall-vietnam.com/vi/da-nang-co-gi-hay/menu-texas-chicken.html"
  }
];
