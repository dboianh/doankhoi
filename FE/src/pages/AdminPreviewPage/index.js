import React from "react"
import { Editor } from "@tinymce/tinymce-react";
import { Spin } from "antd";
import { id } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import NewsAPI from '../../api/news/news.api'
import { useParams } from "react-router-dom";
import './style.scss'
// import { useSelectorRoot } from "~/redux/store";

function PreviewPage() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const editorRef= useRef();
  const { id } = useParams();

  useEffect(() => {
      setLoading(true);
      NewsAPI.findOne(id).then((res) => {
        var newsData = ""
        newsData = newsData + `<h1>${res.data.title}</h1>`
        newsData = newsData + `<div style="width: 50%;
            height: 1px;
            background-color: #d1d1d3;
            margin: 0 auto;
            border-radius: 20px;"></div>`
        newsData = newsData + `<div></div>`

        newsData = newsData + `<p style="font-size: 20px; font-family: 'Times New Roman', Times, serif;">${res.data.description}</p>`

        newsData = newsData + `${res.data.content}`

        setData(newsData);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
      
    });
  }, [id]);

  return (
    <React.Fragment>
      {loading ? (
        <div className="spin-container">
           <Spin /> 
        </div>
      ) : (
        <Editor
          apiKey='i2pbsci3c6bckfz7upawg9yki4anm9i54szijhwcntx6w0cc'
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={data}
          ref={editorRef}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
           }}
          init={{
            height: 620,
            object_resizing: false,
            readonly: true,
            menubar: false,
            elementpath: false,
            branding: false,
            plugins: "fullscreen",
            fullscreen_native: true,
            toolbar: "print fullscreen",
            resize: false,
            content_style: `
              body {
                background-color: #fff;
              }

              @media (min-width: 840px) {
                html {
                    background: #eceef4;
                    height: 500px;
                    padding: 0 .5rem
                }
                body {
                    background-color: #fff;
                    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
                    box-sizing: border-box;
                    margin: 1rem auto 0;
                    max-width: 1000px;
                    min-height: calc(100vh - 1rem);
                    padding:4rem 4rem 6rem 4rem
                }
                img { max-width: 100%; height: auto; }
              }
            `,
          }}
        />
      )}
    </React.Fragment>
  );
}

export default PreviewPage;
