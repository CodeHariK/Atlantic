import { createSignal } from 'solid-js';

export const ImageUploader = () => {
    const [imageValid, setImageValid] = createSignal(true);
    const [imageCategories, setImageCategories] = createSignal({});
    const [imageSrc, setImageSrc] = createSignal('');
    const [isDragging, setIsDragging] = createSignal(false);
    const [fileInputRef, setFileInputRef] = createSignal<HTMLInputElement | null>(null);

    const uploadFile = async (file: File | string) => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('item', file);

        try {
            const response = await fetch('http://localhost:6543/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setImageValid(result.valid.valid)
            setImageCategories(result.class)
            console.log('File uploaded successfully:', result);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const displayImage = (src: string) => {
        setImageSrc(src);
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        setIsDragging(false);
        const items = event.dataTransfer?.items;

        if (items && items[0].kind === 'file') {
            const file = items[0].getAsFile();
            if (file && file.type.startsWith('image/')) {
                displayImage(URL.createObjectURL(file));
                uploadFile(file);
            } else {
                alert('Please drop a valid image file.');
            }
        } else {
            const url = event.dataTransfer?.getData('text/uri-list');
            if (url) {
                displayImage(url);
                uploadFile(url)
            }
        }
    };

    const handleFileInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                displayImage(reader.result as string);
                uploadFile(file);
            };

            // Reset the input value to allow the same file to be uploaded again
            target.value = '';
        }
    };

    return (
        <div class="inline-block">
            <div
                id="dropzone"
                class={`w-[300px] h-[250px] border-2 border-dashed flex items-center justify-center overflow-hidden text-center m-2 rounded-2xl
                    ${isDragging() ? 'border-black text-black' : 'border-gray-300 text-gray-500'}`}

                onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef()?.click()}
            >
                {!imageSrc() ?
                    "Drag and drop an image here"
                    :
                    <img
                        id="imagePreview"
                        class={`w-full h-auto flex-shrink-0 block mx-auto ${imageValid() ? '' : 'blur-lg'}`}
                        src={imageSrc()}
                    />}
                {(imageSrc() && !imageValid()) ? <div class='absolute text-white bg-black'>Image not valid</div> : <></>}
            </div>
            {JSON.stringify(imageCategories())}
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: 'none' }}
                ref={setFileInputRef}
                onChange={handleFileInputChange}
            />
            <button onClick={(event) => { event.preventDefault(); fileInputRef()?.click() }}>Upload</button>
        </div>
    );
};
