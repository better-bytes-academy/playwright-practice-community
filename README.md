# 🚀 Dự án Thực hành Playwright E-Commerce (Cộng đồng) - hello

Chào mừng các bạn đến với sân chơi thực hành kiểm thử tự động (Automation Testing) sử dụng **Playwright**!

Dự án này được tạo ra nhằm giúp các thành viên trong cộng đồng có cơ hội rèn luyện, nâng cao kỹ năng viết code test với Playwright trên một website thực tế.

🔗 **Website thực hành:** [https://e-commerce-dev.betterbytesvn.com/](https://e-commerce-dev.betterbytesvn.com/)

---

## 📌 Giới thiệu dự án
Đây là một website e-commerce bán các khoá học trực tuyến được thiết kế riêng phục vụ cho mục đích thực hành viết kịch bản kiểm thử tự động. Bạn sẽ được tiếp cận các bài toán thực tế như:
- Đăng ký, đăng nhập, bảo mật tài khoản.
- Tìm kiếm, lọc và xem thông tin khoá học.
- Quy trình thêm khoá học vào giỏ hàng và thanh toán.
- Quản lý thông tin cá nhân, lịch sử giao dịch.

---

## 📂 Cấu trúc thư mục (Folder Structure)

Dự án được tổ chức theo cấu trúc chuẩn như sau:

```text
├── participants/             # Chứa mã nguồn của từng học viên tham gia
│   ├── template/             # Thư mục mẫu (nguồn gốc để tạo workspace mới)
│   │   ├── src/              # Page Objects & Fixtures mẫu
│   │   └── tests/            # Test Specs mẫu
│   └── <ten_hoc_vien>/       # Workspace riêng của từng học viên (ví dụ: participants/alex/)
│       ├── src/              # Page Objects, Fixtures riêng của học viên
│       │   ├── fixtures/
│       │   └── pages/
│       ├── tests/            # Test Specs riêng của học viên
│       └── tsconfig.json     # Cấu hình TypeScript riêng (path alias @<ten_hoc_vien>)
├── scripts/              # Scripts tiện ích của dự án
├── playwright.config.ts  # Cấu hình Playwright
└── tsconfig.json         # Cấu hình TypeScript & Path Aliases
```

---

## 🤝 Cách thức tham gia đóng góp (Contribute)

Để tham gia viết test và đóng góp vào dự án, bạn hãy thực hiện theo các bước sau:

1. **Fork dự án**: Nhấn nút **Fork** ở góc trên bên phải trang repository này để sao chép dự án về tài khoản GitHub cá nhân của bạn.
2. **Clone dự án**: Tải mã nguồn từ repository bạn vừa fork về máy tính cá nhân.
   ```bash
   git clone https://github.com/better-bytes-academy/playwright-practice-community
   cd playwright-practice-community
   ```
3. **Cài đặt thư viện**:
   ```bash
   npm install
   ```
4. **Tạo Branch mới**: Hãy tạo một nhánh (branch) mới để bắt đầu viết test code (xem chi tiết quy tắc đặt tên ở phần [Git Convention](#-git-convention) dưới đây).
5. **Khởi tạo thư mục làm việc cá nhân** bằng lệnh sau:
   ```bash
   npm run participate
   ```
   Script sẽ tự động:
   - Hỏi **GitHub username** của bạn.
   - Tạo thư mục `participants/<username>/` từ template có sẵn.
   - Cập nhật tất cả các import alias `@template/` → `@<username>/` trong toàn bộ file.
   - Thêm path alias `@<username>/*` vào `tsconfig.json` gốc.

   Sau khi script chạy xong, cấu trúc thư mục của bạn sẽ là:
   ```text
   participants/<username>/
   ├── src/
   │   ├── fixtures/
   │   └── pages/
   ├── tests/
   └── tsconfig.json
   ```
   Bạn có thể sử dụng alias `@<username>` để import từ thư mục của mình. Ví dụ:
   ```typescript
   import { HomePage } from '@alex/src/pages/home/home.page';
   ```
6. **Viết test & kiểm tra lại**: Chạy test locally để đảm bảo code hoạt động ổn định.
   - Để chạy riêng các test của bạn:
     ```bash
     npx playwright test participants/alex/tests
     ```
   - Hoặc chạy toàn bộ test trong dự án:
     ```bash
     npx playwright test
     ```
7. **Tạo Pull Request (PR)**: Đẩy code lên repo cá nhân của bạn và tạo PR gửi về repo gốc.

> [!IMPORTANT]
> **Lưu ý quan trọng khi contribute:**
> - **Chỉ tạo/sửa đổi** code trong thư mục cá nhân của bạn ở `participants/<your_name>/`. Tránh sửa đổi các file dùng chung trong `src/` hoặc `tests/` trừ khi có hướng dẫn cụ thể.
> - **Không tự ý thay đổi** cấu hình trong file `playwright.config.ts`.
> - **Không cài đặt thêm** bất kỳ thư viện/package bên ngoài nào khác.

---

## 🔍 Quy trình Review Pull Request (PR)

- **Gemini Bot (Tự động)**: Mặc định, mọi PR/MR gửi lên sẽ được **Gemini bot** tự động review, đưa ra nhận xét và gợi ý tối ưu.
- **Admin Review**: Nếu bạn muốn được admin review trực tiếp và nhận feedback chi tiết:
  - Hãy copy link PR/MR của bạn.
  - Gửi bình luận (comment) chứa link PR này vào thread thảo luận của tuần đó trên cộng đồng.

---

## 📐 Coding Conventions

Để giữ cho mã nguồn luôn sạch sẽ, dễ đọc và dễ bảo trì, vui lòng tuân thủ các quy định đặt tên sau:

### 1. File & Folder Names
- Sử dụng dạng **`kebab-case`** (viết thường, ngăn cách bằng dấu gạch ngang).
- *Ví dụ:* `login-page.ts`, `checkout-flow.spec.ts`, `user-fixtures.ts`.

### 2. Variables & Functions Names
- Sử dụng dạng **`camelCase`** (chữ cái đầu viết thường, các từ sau viết hoa chữ cái đầu).
- *Ví dụ:* `const loginButton = ...`, `function clickSubmitButton() {}`.

### 3. Class Names
- Sử dụng dạng **`PascalCase`** (viết hoa chữ cái đầu của tất cả các từ).
- *Ví dụ:* `class LoginPage`, `class DashboardPage`.

### 4. Constants Names
- Sử dụng dạng **`SCREAMING_SNAKE_CASE`** (viết hoa toàn bộ, ngăn cách bằng dấu gạch dưới).
- *Ví dụ:* `const BASE_URL = ...`, `const MAX_TIMEOUT = 5000`.

---

## 🌿 Git Convention

### 1. Quy tắc đặt tên Branch
Trước khi đẩy code, vui lòng đặt tên nhánh (branch) theo định dạng:

```text
QA-{ten-ban}-{challenge-number}
```

*Ví dụ:*
- `QA-alex-challenge-1`
- `QA-hoang-challenge-2`

### 2. Quy tắc viết Commit Message
Sử dụng các tiền tố chuẩn sau cho commit message:
- **`feat:`** Thêm test case mới hoặc viết thêm tính năng.
- **`fix:`** Sửa lỗi, cập nhật locator, sửa logic test.
- **`chore:`** Cập nhật tài liệu (README, docs), file cấu hình hoặc dọn dẹp code.

*Ví dụ:*
- `feat: add sample verification test`
- `fix: refactor locator of homepage`
- `chore: update readme with git convention`

---

## 🛠️ Hướng dẫn Chạy Test locally

Trong thư mục dự án, bạn có thể thực hiện các câu lệnh sau để chạy test:

```bash
# Chạy toàn bộ test
npx playwright test

# Chạy test với giao diện người dùng (UI Mode)
npx playwright test --ui

# Chạy test trong chế độ debug
npx playwright test --debug

# Hiển thị báo cáo kết quả kiểm thử (Report)
npx playwright show-report
```

---

*Chúc các bạn có những trải nghiệm thực hành viết test thú vị và nâng cao tay nghề test automation!*
