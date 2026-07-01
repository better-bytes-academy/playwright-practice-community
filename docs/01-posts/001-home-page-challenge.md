# HOME_20260701: Tìm kiếm sản phẩm
Ở test case này, mong muốn bạn thực hiện code automation cho chức năng tìm kiếm. Thực hiện tìm kiếm với sản phẩm "ISTQB"

## Test case information
- **ID**: HOME_20260701
- **Description**: Kiểm tra tính năng search sản phẩm của trang chủ (thanh search trên cùng)
- **Pre-condition**:
    - Đứng tại trang chủ: https://e-commerce-dev.betterbytesvn.com/; 
    - Có sẵn các sản phẩm:
        - ISTQB Test Manager
        - Playwright TypeScript BDD tiếng Việt
        - FullStack Automation QA với Playwright Typescript
        - Regular Expression cho Tester tiếng Việt
        - API automation Testing với Playwright TypeScript
        - ISTQB – Test Automation Engineer (CTAL-TAE) Tiếng Việt
        - ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt
        - ISTQB Testing with Generative AI (CT-GenAI) tiếng Việt
        - ISTQB Foundation Tiếng Việt

## Steps
|STT | Tên step | expectation |
|----|----------|-------------|
| 1 | Thực hiện search sản phẩm với từ khóa "ISTQB", sử dụng thanh search tại trang chủ; category để mặc định ("All category") | Thanh URL xuất hiện thêm param `?post_type=product&s=ISTQB&product_cat=`; Tìm kiếm ra 5 sản phẩm;
|2 | Click vào từng sản phẩm | Verify được chuyển tới trang chi tiết sản phẩm; Tên hoặc mô tả sản phẩm có chứa từ "ISTQB"