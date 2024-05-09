

export const baseURL1="http://localhost:4000/api/v1"
export const baseURL="https://mern-ecommerce-749e.onrender.com/api/v1"
const url = `https://api.cloudinary.com/v1_1/djqmtxpds/image/upload`;

    export const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "mern-commercial"); 
        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
    
            return  response.json();
        } catch (error) {
            console.error('Error uploading image:', error.message);
            throw error;
        }
    };

