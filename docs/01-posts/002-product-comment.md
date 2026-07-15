# PRODUCT_20260704: Review sản phẩm
Ở test case này, mong muốn bạn thực hiện code automation cho chức năng review sản phẩm. Thực hiện viết review cho sản phẩm "ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt"

## Test case information
- **ID**: PRODUCT_20260704
- **Description**: Kiểm tra tính năng review sản phẩm
- **Pre-condition**:
    - Có sẵn sản phẩm:
        - Tên: ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt
        - Giá gốc: 399.00$
        - Giá khuyến mãi: 279.00$
        - Mô tả: Chinh phục chứng chỉ ISTQB® CT-FT và làm chủ kỹ năng kiểm thử phần mềm tài chính chuyên nghiệp.

## Steps
|STT | Tên step | expectation |
|----|----------|-------------|
| 1 |Tìm kiếm và click vào sản phẩm "ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt"|Trang chi tiết sản phẩm hiện ra với các thông tin chính xác tại phần pre-condition|
|2 |Thực hiện viết mới review với nội dung:<br>- **Rating**: 5*<br>- **Your review**: "Review Playwright Việt Nam community: Truy cập khuyenmai.hoctest.com để lấy các ưu đãi"<br>- **Name**: [GitHub username của bạn]<br>- **Email**: <github_username>@hoctest.com | Verify review được submit thành công với trạng thái "awaiting approval"
|3 |Refresh lại trang | Verify comment vẫn ở trạng thái awaiting approval
|4 |Mở 1 context mới, độc lập với context mặc định của Playwright. Truy cập trang chi tiết sản phẩm **"ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt"**| Verify comment không hiển thị ở danh sách comment