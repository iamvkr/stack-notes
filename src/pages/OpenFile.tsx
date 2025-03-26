import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataFromFO } from '../lib/db';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ArrowLeft } from 'lucide-react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = '/build/pdf.worker.min.mjs';

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const OpenFile = () => {
    const { id } = useParams();
    const [fileData, setfileData] = useState<File | null | {}>(null);
    const [pdfUrl, setpdfUrl] = useState<Uint8Array<ArrayBuffer> | undefined>(undefined);
    const containerWidth = document.documentElement.clientWidth <= 768 ? 400 : 800;
    const imgRef = useRef(null);
    const [totalPages, settotalPages] = useState(0);
    const [currentpage, setcurrentPage] = useState(0);

    const file = useMemo(() => ({ data: pdfUrl }), [pdfUrl]);

    useEffect(() => {
        getDataFromFO()
            .then(data => {
                if (!id || !data) return;
                // console.log(data[id]);
                if (data[id] instanceof File) {
                    if (!data[id].type.includes("image")) {
                        // if file is not an image: then it's a pdf
                        const fileReader = new FileReader();
                        fileReader.readAsArrayBuffer(data[id]);
                        fileReader.onload = () => {
                            if (fileReader.result && typeof (fileReader.result) !== "string") {
                                const typedArray = new Uint8Array(fileReader.result);
                                setpdfUrl(typedArray)
                            }
                        }
                    }
                    setfileData(data[id]); /** for image or pdf files both */
                }
            })
    }, [])


    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        settotalPages(nextNumPages);
    }


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

            {fileData && pdfUrl && <div className="p-2 w-full h-[80vh] lg:h-[85vh] flex flex-col items-center justify-center rounded-2xl">

                <TransformWrapper>
                    <TransformComponent wrapperStyle={{ height: "80vh", width: "100%", backgroundColor: "#1f1e1e" }}>
                        <Document file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                            options={options}>
                            <Page
                                pageNumber={currentpage + 1}
                                width={containerWidth}
                            />
                            {/* {Array.from(new Array(numPages), (_el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    width={containerWidth}
                                // width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                                />
                            ))} */}
                        </Document>
                    </TransformComponent>
                </TransformWrapper>

                <div className="nextBtns">
                    {totalPages} / {currentpage +1} page
                </div>
                <div className="w-full nextBtns flex gap-2 justify-between lg:justify-center">
                    <button className='bg-primary px-8 py-2 flex items-center text-black rounded-2xl disabled:bg-primary/50' 
                    disabled={currentpage === 0}
                    onClick={() => {
                        if (currentpage > 0) {
                            setcurrentPage(currentpage - 1)
                        }
                    }}>prev</button>
                    <button className='bg-primary px-8 py-2 flex items-center text-black rounded-2xl disabled:bg-primary/50' 
                    disabled={currentpage === totalPages - 1}
                    onClick={() => {
                        if (currentpage < totalPages - 1) {
                            setcurrentPage(currentpage + 1)
                        }
                    }}>next</button>
                </div>




                {/* <a href={`/pdfjs/web/viewer.html?file=${pdfUrl}`} target="_blank"
                className='bg-primary px-8 py-2 text-black rounded-2xl'>View Pdf</a>

                <iframe src={`/pdfjs/web/viewer.html?file=${pdfUrl}`} className='h-[75vh] lg:h-[80vh] w-full rounded-xl'></iframe> */}
                {/* editor button is hedden in viewer.css */}
            </div>}
        </div>
    )
}

export default OpenFile