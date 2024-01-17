const concurrencyRequest = async (urls, maxNum) => {
    if (urls.length === 0) {
        // Nếu danh sách URLs trống, giải quyết ngay lập tức với mảng kết quả trống
        return Promise.resolve([]);
    }

    const results = []; // Mảng kết quả từ các yêu cầu
    let index = 0; // Chỉ số của URL đang được xử lý
    let count = 0; // Số lượng yêu cầu đã hoàn thành

    async function request() {
        if (index === urls.length) return; // Nếu đã xử lý tất cả các URL, thoát khỏi hàm

        const i = index; // Lưu chỉ số để sử dụng trong async function
        const url = urls[index++]; // Lấy URL và tăng chỉ số

        try {
            // Thực hiện yêu cầu fetch và lưu kết quả vào mảng
            results[i] = await fetch(url);
        } catch (err) {
            // Nếu có lỗi, lưu lỗi vào mảng kết quả
            results[i] = err;
        } finally {
            // Tăng biến đếm và kiểm tra hoàn thành tất cả các yêu cầu
            if (++count === urls.length) {
                console.log('Hoàn thành tất cả yêu cầu');
                resolve(results);
            }

            // Đặt thời gian chờ 1 giây và sau đó gọi lại hàm yêu cầu
            setTimeout(request, 1000);
        }
    }

    const times = Math.min(maxNum, urls.length); // Số lần yêu cầu tối đa có thể được thực hiện đồng thời
    console.log(`:::001::`, times);

    // Bắt đầu thực hiện yêu cầu đồng thời
    Array.from({ length: times }, () => setTimeout(request, 1000));
};

const urls = [];
for (let i = 1; i <= 21; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
}
concurrencyRequest(urls, 3)