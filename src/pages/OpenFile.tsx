import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataFromFO } from '../lib/db';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ArrowLeft } from 'lucide-react';

const OpenFile = () => {
    const { id } = useParams();
    const [fileData, setfileData] = useState<File | null | {}>(null);
    const [pdfUrl, setpdfUrl] = useState("");
    const imgRef = useRef(null);

    useEffect(() => {
        getDataFromFO()
            .then(data => {
                if (!id || !data) return;
                // console.log(data[id]);
                if (data[id] instanceof File) {
                    if (!data[id].type.includes("image")) {
                        // if file is not an image: then it's a pdf
                        setpdfUrl(URL.createObjectURL(data[id])); // setting pdf url from data[id]
                    }
                    setfileData(data[id]); /** for image or pdf files both */
                }
            })
    }, [])


    return (
        <div className='px-2 py-18 lg:pb-4'>
            <div className='hidden text-lg font-bold inderline lg:flex cursor-pointer items-center' onClick={() => { window.history.back() }}>
                <ArrowLeft className='text-primary' />
                <span>Back</span>
            </div>
            {fileData && "type" in fileData && fileData.type.includes("image") && <div className="bg-[#1f1e1e] p-2 h-[75vh] flex items-center rounded-2xl">
                <TransformWrapper>
                    <TransformComponent wrapperStyle={{ height: "60vh", backgroundColor: "#1f1e1e" }}>
                        <img ref={imgRef} src={URL.createObjectURL(fileData)} alt="test" />
                    </TransformComponent>
                </TransformWrapper>
            </div>}

            {fileData && pdfUrl && <div className="p-2 w-full h-[80vh] lg:h-[85vh] flex items-center rounded-2xl">
                <iframe src={`./pdfjs/web/viewer.html?file=${pdfUrl}`} className='h-[75vh] lg:h-[80vh] w-full rounded-xl'></iframe>
                {/* editor button is hedden in viewer.css */}
            </div>}
        </div>
    )
}

export default OpenFile