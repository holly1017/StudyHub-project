import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './BoardContentStyle.css';
import { postMultiPartData } from '../../Api';

interface BoardContentProps {
    content: string;
    setContent: (content: string) => any;
}

const BoardContent: React.FC<BoardContentProps> = ({ content, setContent }) => {
    const quillRef = useRef<any>(null);

    const sendData = async (file?: File) => {
        const formData = new FormData();

        if (file != null) {
            formData.append("file", file);
        }

        try {
            const response = await postMultiPartData('/image/uploads', formData);
            return response;
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
            const file = input.files?.[0];
            const quillInstance: any = quillRef.current.getEditor();
            try {
                const url = await sendData(file);
                if (url) {
                    const range = quillInstance.getSelection();

                    const index = range ? range.index : 0;
                    quillInstance.insertEmbed(index, 'image', url);
                    quillInstance.setSelection(index + 1);
                } else {
                    console.error('이미지 업로드 실패');
                }
            } catch (error) {
                console.error(error);
            }
        });
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ font: [] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ color: [] }, { background: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    ['link', 'image'],
                    ['clean'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }
    }, []);

    const formats = [
        "font",
        "size",
        "header",
        "color",
        "background",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video"
    ];

    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            modules={modules}
            formats={formats}
            onChange={setContent}
            placeholder="내용을 입력하세요."
        />
    );
}

export default BoardContent;


