export default (context, inject) => {
    // const imageCompress = (event) => {
    //     const image_id = Math.floor(Math.random() * (1000000 - 1000 + 1) + 1000);
    //     const name = "image_" + image_id;

    //     let imageData = null
    //     const maxWidth = 1024
    //     const maxHeight = 768
    //     let width = maxWidth
    //     let height = maxHeight

    //     let vm = this

    //     let img = document.createElement('img')
    //     let canvas = document.createElement('canvas')
    //     // let canvas = $("<canvas />").get(0)

    //     let reader = new FileReader()

    //     reader.onload = (image) => {
    //         img.src = event.target.result
    //     }

    //     reader.readAsDataURL(event.target.files[0])


    //     img.onload = () => {
    //         // Draw
    //         let context = canvas.getContext('2d')
    //         context.drawImage(img, 0, 0)

    //         if (img.width > maxWidth || img.height > maxHeigt) {
    //             width = maxWidth
    //             height = maxHeight

    //             if (img.width > maxWidth) {
    //                 width = maxWidth
    //                 let ration = maxWidth / img.width
    //                 height = Math.round(img.height * ration)
    //             }

    //             if (img.height > maxHeight) {
    //                 height = maxHeight
    //                 let ration = maxHeight / img.height
    //                 width = Math.round(img.width * ration)
    //             }
    //         } else {
    //             width = img.width
    //             height = img.height
    //         }

    //         canvas.width = width
    //         canvas.height = height

    //         context.drawImage(img, 0, 0, width, height)
    //         imageData = canvas.toDataURL('image/jpeg')
    //         imageData.replace('data:image/jpeg;base64,', '')

    //         let blobToFile = vm.dataURItoBlob(imageData)

    //         const cfile = new File([blobToFile], name + '.jpg', {
    //             type: 'image/jpeg', lastModified: Date.now()
    //         })

    //         return cfile
    //     }
    // }

    // const dataURItoBlob = (dataURI) => {
    //     // convert base64 to raw binary data held in a string
    //     var byteString = atob(dataURI.split(',')[1]);
    //     // separate out the mime component
    //     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //     // write the bytes of the string to an ArrayBuffer
    //     var arrayBuffer = new ArrayBuffer(byteString.length);
    //     var _ia = new Uint8Array(arrayBuffer);
    //     for (var i = 0; i < byteString.length; i++) {
    //         _ia[i] = byteString.charCodeAt(i);
    //     }
    //     var dataView = new DataView(arrayBuffer);
    //     var blob = new Blob([dataView], { type: mimeString });
    //     return blob;
    // }

    // inject('imageCompress', imageCompress)

    const MAX_WIDTH = 320;
    const MAX_HEIGHT = 180;
    const MIME_TYPE = "image/jpeg";
    const QUALITY = 0.7;

    const image_id = Math.floor(Math.random() * (1000000 - 1000 + 1) + 1000);
    const name = "image_" + image_id;

    const imageCompress = function (ev) {
        const file = ev.target.files[0]; // get the file
        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            // Handle the failure properly
            console.log("Cannot load image");
        };
        img.onload = function () {
            URL.revokeObjectURL(this.src);
            const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            canvas.toBlob(
                (blob) => {
                    // Handle the compressed image. es. upload or save in local state

                    // displayInfo('Original file', file);
                    // displayInfo('Compressed file', blob);

                    // return blob

                    // return new File([blob], 'kjahskjh.jpg', { type: "image/jpeg", lastModified: Date.now() })

                    const myFile = new File([blob], 'image.jpeg', {
                        type: "image/jpeg",
                    });

                    return myFile

                },
                MIME_TYPE,
                QUALITY
            );



            // document.getElementById("root").append(canvas);
        };
    };

    function calculateSize(img, maxWidth, maxHeight) {
        let width = img.width;
        let height = img.height;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
            }
        }
        return [width, height];
    }

    // Utility functions for demo purpose

    function displayInfo(label, file) {
        const p = document.createElement('p');
        p.innerText = `${label} - ${readableBytes(file.size)}`;
        document.getElementById('root').append(p);
    }

    function readableBytes(bytes) {
        const i = Math.floor(Math.log(bytes) / Math.log(1024)),
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    }

    inject('imageCompress', imageCompress)
}