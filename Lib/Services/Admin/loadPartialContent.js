async function loadPartialContent(htmlFilePath, jsFilePaths = null) {
  const response = await fetch(htmlFilePath);
  const html = await response.text();

  document.querySelector(".main").innerHTML = html;
  if(jsFilePaths){
    jsFilePaths.forEach(jsFilePath => {
      let scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.src = jsFilePath;
      document.querySelector(".main").append(scriptTag)
    });
  
  } 



}
//   Trong ví dụ trên, loadPartialContent được gọi khi thẻ <a> được bấm. Nó tạo một đối tượng XMLHttpRequest để tải nội dung từ tệp nameFile và sau đó thay thế nội dung của một phần trang web (được định nghĩa bằng một thẻ có id="partialContentContainer") với nội dung tải về.
  
//   Tạo tệp "partial-content.html" chứa nội dung bạn muốn hiển thị khi thẻ <a> được bấm.
//   Lưu ý rằng ví dụ trên chỉ là một bước xuất phát và có thể cần điều chỉnh tùy theo yêu cầu cụ thể của bạn. AJAX cho phép bạn tải nội dung từ máy chủ mà không cần tải lại trang web, giúp tạo trải nghiệm người dùng mượt mà hơn.
  




  
  
  