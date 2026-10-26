# TEXAS CHICKEN

Texas Chicken là website bán đồ ăn nhanh frontend tĩnh phục vụ demo và học tập. Thiết kế dùng neumorphism hiện đại, light mode và bảng màu trắng / đen / vàng. Toàn bộ nội dung và hình minh họa SVG được dùng cho mục đích demo.

## Công nghệ

- HTML5 semantic
- CSS3 thuần, responsive
- Vanilla JavaScript
- `localStorage` cho tài khoản, đăng nhập, giỏ hàng, voucher và đơn hàng
- Không backend, API, database hay framework

## Cấu trúc

- `index.html`: trang chủ duy nhất ở root
- `pages/`: tất cả trang con
- `css/`: reset, design tokens, layout và responsive
- `data/`: dữ liệu danh mục, tùy chọn và 32 sản phẩm
- `js/`: storage, auth, cart, product, checkout và tương tác giao diện
- `assets/`: hình minh họa SVG và ảnh món đã tải về local

## Chạy dự án

Dùng VS Code Live Server, hoặc tại thư mục dự án chạy:

```bash
python -m http.server 5500
```

Sau đó mở `http://localhost:5500`.

## Tài khoản demo

- Email: `demo@texaschicken.local`
- Password: `123456`

Tài khoản chỉ được seed nếu email demo chưa tồn tại; dữ liệu hiện có không bị ghi đè.

## localStorage

- `texas_chicken_users`: danh sách tài khoản
- `texas_chicken_current_user`: người dùng hiện tại, không chứa password
- `texas_chicken_cart`: các biến thể món trong giỏ
- `texas_chicken_orders`: lịch sử đơn hàng
- `texas_chicken_voucher`: voucher đang áp dụng

### Mã ưu đãi

- `TEXAS_NUM1`: giảm 10%, tối đa 50.000đ
- `TEXAS_NUM2`: miễn phí giao hàng
- `TEXAS_NUM3`: giảm 20% cho đơn từ 250.000đ
- `TEXAS_NUM4`: giảm 30.000đ cho đơn từ 199.000đ
- `TEXAS_NUM5`: giảm 25%, tối đa 100.000đ, cho đơn từ 399.000đ

## Đồng bộ dữ liệu menu

Nguồn chính thức `texaschickenvn.com` hiện yêu cầu mật khẩu. Script tổng hợp tên
món, giá và mô tả từ menu Texas Chicken công khai trên beFood, sau đó đổi tên,
phân loại và bổ sung món mới cho thương hiệu demo Texas Chicken. Ảnh cận cảnh không
logo được chọn từ bài menu công khai của AEON MALL; hai ảnh bổ sung lấy từ
Wikimedia Commons theo giấy phép CC0.

Chạy lệnh sau để tải lại dữ liệu và ảnh:

```bash
node scripts/sync-texas-menu.mjs
```

Script sẽ sinh lại `data/products.js`, tải ảnh về
`assets/images/products/texas/` và lưu toàn bộ đường dẫn ảnh ở dạng local.

Nguồn ảnh CC0:

- `Fried chicken burger.jpg` — Kurt Kaiser, Wikimedia Commons
- `Chicken, Spaghetti Sauce, Pasta, and Fries.jpg` — PagesAndPathsPH, Wikimedia Commons

Các ảnh và dữ liệu từ bên thứ ba chỉ dùng cho demo/học tập. Cần kiểm tra lại
quyền sử dụng trước khi triển khai thương mại.

## Quy tắc đường dẫn

`index.html` dùng đường dẫn như `pages/menu.html`, `css/global.css`. Các file trong `pages/` dùng `../css/global.css`, `../js/main.js`, `../assets/...`. Dữ liệu sản phẩm chỉ lưu đường dẫn trung lập `assets/...`; helper `getAssetPath()` tự thêm `../` khi chạy trong `pages/`.

## Cảnh báo bảo mật

Auth chỉ để demo. Password được lưu plain text trong `localStorage` để minh họa luồng đăng ký/đăng nhập. Không áp dụng cách này trong production. Thông tin thẻ trong checkout không được lưu.
