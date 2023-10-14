function loadPartialContent(nameFile) {
    // Tạo một đối tượng XMLHttpRequest
    var xhr = new XMLHttpRequest();
  
    // Xác định phương thức và URL bạn muốn tải nội dung từ
    xhr.open("GET", nameFile, true);
  
    // Xử lý sự kiện khi yêu cầu đã hoàn thành
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Nếu yêu cầu thành công, thay thế nội dung của một phần trang web với nội dung tải về
        document.querySelector(".main").innerHTML = xhr.responseText;
      }
    };
  
    // Gửi yêu cầu
    xhr.send();
  
    // Ngăn chặn mặc định của thẻ <a>
    return false;
  }
//   Trong ví dụ trên, loadPartialContent được gọi khi thẻ <a> được bấm. Nó tạo một đối tượng XMLHttpRequest để tải nội dung từ tệp nameFile và sau đó thay thế nội dung của một phần trang web (được định nghĩa bằng một thẻ có id="partialContentContainer") với nội dung tải về.
  
//   Tạo tệp "partial-content.html" chứa nội dung bạn muốn hiển thị khi thẻ <a> được bấm.
//   Lưu ý rằng ví dụ trên chỉ là một bước xuất phát và có thể cần điều chỉnh tùy theo yêu cầu cụ thể của bạn. AJAX cho phép bạn tải nội dung từ máy chủ mà không cần tải lại trang web, giúp tạo trải nghiệm người dùng mượt mà hơn.
  




  
  
  