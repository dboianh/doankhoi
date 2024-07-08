import React, { useState } from 'react';
import { Tag, Button, Image, Space, Modal } from 'antd';
import useFormatBytes from '../../hooks/useFormatBytes';
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { PrinterOutlined, 
    DownloadOutlined, 
    CloseOutlined, 
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined 
} from '@ant-design/icons';

import './style.scss';

const AttachmentTag = ({ attachment }) => {
  const { originalname, file_size, file_path, filename, file_type } = attachment;
  const [pdfVisible, setPdfVisible] = useState(false);
  const maxLength = 30;
  const extension = originalname.split('.').pop();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  let shortenedName = originalname;

  const [imageVisible, setImageVisible] = React.useState(false);


  
  if (originalname.length > maxLength) {
    const startLength = Math.floor((maxLength - extension.length) / 2);
    shortenedName =
      originalname.substring(0, startLength) + '...' + extension;
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


    const openPdfViewer = () => {
        setPdfVisible(true);
    };

    const closePdfViewer = () => {
        setPdfVisible(false);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const closeImageViewer = () => {
        setImageVisible(false);
    };
    



    const openViewer = () => {
        if (file_type === 'pdf') {
            setPdfVisible(true);
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(file_type)) {
            setImageVisible(true);
        }
        // Các loại file khác có thể thêm các xử lý khác ở đây
    };

    
  const onDownload = () => {
    const pdfUrl = `${import.meta.env.VITE_API_URL}/${file_path}/${filename}`;
    
    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = originalname;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    
  };


  const customToolbar = (
    <React.Fragment>
      <Button onClick={onDownload} icon={<DownloadOutlined />} />
      <Button icon={<SwapOutlined />} />
      <Button icon={<SwapOutlined />} />
      <Button icon={<RotateLeftOutlined />} />
      <Button icon={<RotateRightOutlined />} />
      <Button icon={<ZoomOutOutlined />} />
      <Button icon={<ZoomInOutlined />} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Tag className="mt-4 tag" onClick={openViewer}>
        <span title={originalname}>{shortenedName}</span>
        <span style={{ marginLeft: '8px' }}>
          [{useFormatBytes(file_size)}]
        </span>
      </Tag>
      {/* PDF Viewer */}
      {pdfVisible && (
        <div className="pdf-modal">
          <div className="pdf-container">
            <div className="modal-header mb-3">
                <div className="actions d-flex gap-2">
                    <Button size="medium" className="d-flex align-items-center" onClick={onDownload}>
                        <DownloadOutlined /> Tải về
                    </Button>
                </div>
                <Button icon={<CloseOutlined style={{ fontSize: '20px'}} />} onClick={closePdfViewer} style={{border: 'none'}} />
            </div>
            <Document
              file={`${import.meta.env.VITE_API_URL}/${file_path}/${filename}`} onLoadSuccess={onDocumentLoadSuccess}
              
            >
              {[...Array(numPages)].map((_, index) => (
                <div key={`page_${index + 1}`} className="pdf-page-container">
                    <Page
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    className="pdf-page"
                    width={null}
                    scale={1.3}
                    />
                    {index < numPages - 1 && <hr className="page-divider" />}
                </div>

              ))}
            </Document>
          </div>
        </div>
      )}

      {/* Image viewer */}
      <Modal open={imageVisible} onCancel={closeImageViewer} footer={null}>
        <Image src={`${import.meta.env.VITE_API_URL}/${file_path}/${filename}`} alt="Your Image Alt Text" 
        preview={{
            toolbarRender: (
                _,
                {
                  transform: { scale },
                  actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                },
              ) => (
                <Space size={12} className="toolbar-wrapper">
                  <DownloadOutlined onClick={onDownload} />
                  <SwapOutlined rotate={90} onClick={onFlipY} />
                  <SwapOutlined onClick={onFlipX} />
                  <RotateLeftOutlined onClick={onRotateLeft} />
                  <RotateRightOutlined onClick={onRotateRight} />
                  <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                  <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                </Space>
              ),
        }} />
      </Modal>
    </React.Fragment>
  );
};

export default AttachmentTag;
