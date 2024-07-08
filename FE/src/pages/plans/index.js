import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/index'
import './plan.css'
const Plan = () => {
    return (
        <React.Fragment>
            < Navbar />
            <img className='thongbao' src='images/upload/trungtam.png' />
<div className='tongthe'>
 
    <div className="thongbao1">
    <h2 className='h22'>Thông báo</h2>
    <p style={{ borderBottom: '3px solid red',width: '161px',    marginTop: '-2px' }}>  </p>
</div>
<div className='header-title'> Thông tin kế hoạch lựa chọn nhà thầu</div>
<div className='kehoach'>
<div className="row-fluid "> <div className="asset-publish-date"> Thứ sáu, 03/02/2023, 09:40 SA </div>  </div>


<div className='kehoach1'>
<div className='event-show-avatar'> <img className='luachon' src='images/icon/kehoach.png' alt='thông báo'/></div>
<div className='.event-show-content' style={{alignSelf: 'center'}}>
<div className="event-from-content-child"> <span className="event-from-content-child-lable">Thông báo: </span> <span style={{fontWeight: 'bold', color: 'red '}}>THÔNG TIN KẾ HOẠCH LỰA CHỌN NHÀ THẦU</span> </div>
<div className="event-from-content-child"> <span className="fas fa-map-marker-alt"> </span> <span className="event-from-content-child-lable">Bên mời thầu:</span> <span className='span1'>Trung tâm Công nghệ thông tin và Truyền thông tỉnh Bạc Liêu</span> </div>
<div className="event-from-content-child"> <span className="fas fa-map-marker-alt"> </span> <span className="event-from-content-child-lable">Địa chỉ:</span> <span className='span1'> Số 16,Đường Cù Chính Lan, Phường 1, thành phố Bạc Liêu, tỉnh Bạc Liêu</span> </div>
<div className="event-from-content-child"> <span className="fas fa-calendar"> </span> <span className="event-from-content-child-lable">Tên dự án:</span> <span className='span1'>Thuê phần mềm Cổng tiếp nhận và giải đáp thông tin cho người dân, doanh nghiệp và tổ chức trên địa bàn tỉnh bạc liêu</span> </div>
<div className="event-from-content-child"> <span className="fa-sharp fa-solid fa-copy"></span> <span className="event-from-content-child-lable">Nội dung chi tiết:</span> <span className='xemct'> <a  style={{color:'red ', textDecoration:' none'}} href=""> Xem chi tiết tại đây. </a> </span> </div>

</div>

</div>
<p style={{ borderBottom: '2px solid #0072FF',width: '100%',    marginTop: '-2px' }}>  </p>
<div className="row-fluid row-bottom-panel">
     <style scoped="">   </style> 
     <div className="pull-right"> </div> </div>
</div>
{/* đây là thông báo kết quả  */}
<div className='header-title'> Thông báo kết quả lựa chọn nhà thầu</div>
<div className='kehoach'>
<div className="row-fluid "> <div className="asset-publish-date"> Thứ sáu, 03/02/2023, 09:40 SA </div>  </div>


<div className='kehoach1'>
<div className='event-show-avatar'> <img className='luachon' src='images/icon/thongbao.png' alt='thông báo'/></div>
<div className='.event-show-content' style={{alignSelf: 'center'}}>
<div className="event-from-content-child"> <span className="event-from-content-child-lable">Thông báo: </span> <span style={{fontWeight: 'bold', color: 'red '}}>THÔNG BÁO KẾT QUẢ CHỌN NHÀ THẦU</span> </div>
<div className="event-from-content-child"> <span className="fas fa-map-marker-alt"> </span> <span className="event-from-content-child-lable">Bên mời thầu:</span> <span className='span1'>Trung tâm Công nghệ thông tin và Truyền thông tỉnh Bạc Liêu</span> </div>
<div className="event-from-content-child"> <span className="fas fa-map-marker-alt"> </span> <span className="event-from-content-child-lable">Địa chỉ:</span> <span className='span1'> Số 16,Đường Cù Chính Lan, Phường 1, thành phố Bạc Liêu, tỉnh Bạc Liêu</span> </div>
<div className="event-from-content-child"> <span className="fas fa-calendar"> </span> <span className="event-from-content-child-lable">Tên dự án:</span> <span className='span1'>Thuê phần mềm Cổng tiếp nhận và giải đáp thông tin cho người dân, doanh nghiệp và tổ chức trên địa bàn tỉnh bạc liêu</span> </div>
<div className="event-from-content-child"> <span className="fa-sharp fa-solid fa-copy"></span> <span className="event-from-content-child-lable">Nội dung chi tiết:</span> <span className='xemct'> <a  style={{color:'red ', textDecoration:' none'}} href=""> Xem chi tiết tại đây. </a> </span> </div>

</div>

</div>
<p style={{ borderBottom: '2px solid #0072FF',width: '100%',    marginTop: '-2px' }}>  </p>
<div className="row-fluid row-bottom-panel">
     <style scoped="">   </style> 
     <div className="pull-right"> </div> </div>
</div>
<ul className="pagination pagination-lg">
              <li><a href="#"><i className="fa fa-long-arrow-left"></i>Previous Page</a></li>
              <li className="active"><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#">Next Page<i className="fa fa-long-arrow-right"></i></a></li>
            </ul>
</div>
            < Footer />
        </React.Fragment>
    )
}

export default Plan