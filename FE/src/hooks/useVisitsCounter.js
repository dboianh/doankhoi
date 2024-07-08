import axios from 'axios';
import AppAPI from '../api/app/app.api'

export const getTotalVisits = async () => {
  try {
    const response = await AppAPI.getVisits(); // Địa chỉ API để lấy số lượt truy cập từ backend
    return response.data; // Trả về số lượt truy cập từ kết quả của API
  } catch (error) {
    console.error('Error fetching total visits:', error);
    return 0; // Trả về 0 nếu có lỗi
  }
};