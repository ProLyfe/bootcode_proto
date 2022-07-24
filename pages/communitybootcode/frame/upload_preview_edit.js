import BootCodeComponent from "../../../components/BootCodeCommponent";
import { useContext, useEffect, useState } from 'react';
import { BootCodeContext } from '../../_app'; 

const UploadPreviewEdit = ({ data }) => {

    const { bootCodePreview } = useContext(BootCodeContext)
    const [htmlCode, setHtmlCode] = useState();
    const [cssCode, setCssCode] = useState();
    const [jsCode, setJsCode] = useState();
    const [dataCodeSender, setDataCodeSender] = useState();

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const html =  localStorage.getItem("html");
            const css =  localStorage.getItem("css");
            const js =  localStorage.getItem("js");
            setHtmlCode(html);
            setCssCode(css);
            setJsCode(js);
          } else {
          };
    });

    const dataCode = { html: htmlCode, css: cssCode, js: jsCode };

    setInterval(() => {
        setCounter(prev => prev + 1);
    }, 1000);

    useEffect(() => {
        setDataCodeSender(dataCode);
    }, [counter])

    return (     
        <div>
            {dataCodeSender ? <BootCodeComponent bootcode={dataCodeSender}/> : <h1></h1>}
        </div>
    );
};

export default UploadPreviewEdit;

