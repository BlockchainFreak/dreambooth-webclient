import { fileState } from "@/state"
import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"

export default function FilePicker() {

    const [images, setImages] = useRecoilState(fileState)
    const [urls, setUrls] = useState([] as string[])
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const images = files.filter(f => 
                (f.type === "image/jpeg" && f.name.endsWith(".jpg") ||
                (f.type === "image/png" && f.name.endsWith(".png"))
            ))
            setImages(pimg => [...pimg, ...images])
        }
    }

    const handleUpload = async () => {
        
    }

    useEffect(() => {
        urls.forEach(url => URL.revokeObjectURL(url))
        setUrls(images.map(img => URL.createObjectURL(img)))
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url))
        }
    }, [images])

    return (
        <div className="flex flex-col gap-2 bg-blue-200 rounded-lg p-4">
            <div className="flex gap-2">
                <input 
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    ref={inputRef}
                    className="hidden"
                />
                <button
                    onClick={() => inputRef.current?.click()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Select Images
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpload}>
                    Upload Images
                </button>
            </div>
            <div className="flex gap-2 w-full overflow-x-scroll">
                {images.map((img, i) => (
                    <div key={i} className="w-[200px] h-[200px] relative">
                        <img className="absolute" src={URL.createObjectURL(img)} width={200} height={200} alt="" />
                        <span className="top-0 right-0">x</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
