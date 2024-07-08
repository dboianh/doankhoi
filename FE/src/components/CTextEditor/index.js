/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useRef } from "react";
import "./style.scss";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import openNotification from "../CNotification";

import { Editor } from "@tinymce/tinymce-react";
import { Spin } from "antd";

function CTextEditor({
  setValue,
  defaultValue,
//   checkWriteRead,
  loading,
  dataEditor,
}) {
  const editorRef = useRef(null);
  const dispatch = useDispatchRoot();
  const { refresh } = useSelectorRoot((state) => state.app);

  return (
    <div className="text_container">
      <div
        className={
          loading
            ? "position-absolute h-100 d-flex align-items-center justify-content-center"
            : "d-none"
        }
        style={{
          zIndex: 2,
          width: "75%",
          backgroundColor: "#fff",
          opacity: "0.5",
        }}
      >
        <Spin />
      </div>
      <Editor
        apiKey='i2pbsci3c6bckfz7upawg9yki4anm9i54szijhwcntx6w0cc'
        onInit={(evt, editor) => (editorRef.current = editor)}
        ref={editorRef}
        value={defaultValue == undefined ? "" : defaultValue}
        // disabled={checkWriteRead == true ? false : true}
        onEditorChange={(e) => {
          setValue(e);
        }}
        init={{
          plugins:
            "preview importcss searchreplace autolink save directionality code visualblocks visualchars fullscreen image link table charmap pagebreak nonbreaking insertdatetime advlist lists wordcount help charmap quickbars emoticons",
          menubar: "edit view insert format table help",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify fullscreen | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview print | insertfile image table link | ltr rtl",
          toolbar_sticky: true,
          font_size_formats:
            "8px 9px 10px 12px 14px 16px 20px 24px 32px 42px 54px 68px 84px 98px",
          // image_advtab: true,
          // content_css: "//www.tiny.cloud/css/codepen.min.css",
          importcss_append: true,
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function (e) {
              var file = e.target.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                var id = "blobid" + new Date().getTime();
                var blobCache = editorRef.current.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
          height: 1000,
          image_caption: true,
          elementpath: false,
          quickbars_insert_toolbar: "",
          quickbars_selection_toolbar: "",
          noneditable_noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          file_picker_types: "image",
          paste_data_images: true,
          branding: false,
          statusbar: true,
          image_dimensions: false, // Tắt kích thước mặc định
          content_style: `
            body {
                background: #fff;
            }

            ::-webkit-scrollbar-track
            {
              -webkit-box-shadow: inset 0 0 6px rgba(168, 168, 168, 0.3);
              border-radius: 10px;
              background-color: #F5F5F5;
            }

            ::-webkit-scrollbar
            {
              width: 10px;
              background-color: #F5F5F5;
            }

            ::-webkit-scrollbar-thumb
            {
              border-radius: 10px;
              -webkit-box-shadow: inset 0 0 6px rgba(168, 168, 168, 0.3);
              background-color: rgb(174, 174, 174);
            }

            @media (min-width: 840px) {
              html {
                background: #eceef4;
                min-height: 100%;
                padding: 0 .5rem
              }
              body {
                background-color: #fff;
                box-shadow: 0 0 4px rgba(0, 0, 0, .15);
                box-sizing: border-box;
                margin: 1rem auto 0;
                max-width: 950px;
                min-height: calc(100vh - 1rem);
                padding:4rem 4rem 6rem 4rem
              }
              img { max-width: 100%; height: auto; }
            }
          `,
        }}
      />
    </div>
  );
}

export default React.memo(CTextEditor);
