// Lắng nghe sự kiện click của nút upload
document.getElementById("uploadButton").addEventListener("click", function () {
    // Lấy file từ input
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    // Kiểm tra xem file có được chọn hay không
    if (!file) {
        document.getElementById("status").innerText = "Vui lòng chọn một file trước khi upload.";
        return;
    }

    // Hiển thị thông tin file
    document.getElementById("status").innerText = `Đang xử lý file: ${file.name} (${file.size} bytes)`;

    // Tạo đối tượng FormData để gửi file
    const formData = new FormData();
    formData.append("file", file);

    // Gửi request upload qua fetch API
    fetch("/upload", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("status").innerText = `File đã upload thành công: ${data}`;
        })
        .catch((error) => {
            document.getElementById("status").innerText = `Có lỗi xảy ra: ${error}`;
        });
});

// Hàm để tải danh sách file từ server
function loadFileList() {
    fetch("/files") // API trả về danh sách file
        .then((response) => response.json())
        .then((files) => {
            const fileList = document.getElementById("fileList");
            fileList.innerHTML = ""; // Xóa danh sách cũ
            files.forEach((file) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="/files/${file}" target="_blank">${file}</a>`;
                fileList.appendChild(listItem);
            });
        })
        .catch((error) => {
            document.getElementById("status").innerText = `Có lỗi khi tải danh sách file: ${error}`;
        });
}

// Tải danh sách file khi trang được tải
window.onload = loadFileList;
