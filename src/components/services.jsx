import React, { useState } from "react";
import Swal from 'sweetalert2';

export const Services = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!selectedImage) {
        throw new Error("Please select an image before submitting.");
      }
      const base64Image = await convertImageToBase64(selectedImage);
    
      // Make the API request
      //http://127.0.0.1:5000/api/Model/PostImage/
      const response = await fetch("http://127.0.0.1:5000/api/Model/PostImage/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: base64Image }),
      });

      if (response.ok) {
        const result = await response.text();
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: "Bệnh trong hình là: "+result,
        });
      } else {

        throw new Error("Lổi khi tiến hành thực thi.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Có lỗi xảy ra trong quá trình xử lí hình ảnh.',
      });
    } finally {
      setIsSubmitting(false);
    };
  };
  
  // Function to convert an image to base64
  
  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(image);
    });
  };
  

  return (
    <div id="services" className="text-center">
      <div className="container" style={styles.container}>
        <div className="section-title">
          <h2>Thực thi</h2>
          <p>Cần nhập hình để trả về kết quả chuẩn đoán bệnh.</p>
        </div>

        <div style={styles.contentContainer}>
          <input accept="image/*" type="file" onChange={imageChange} />

          {selectedImage && (
            <div style={styles.preview}>
              <img
                src={URL.createObjectURL(selectedImage)}
                style={styles.image}
                alt="Thumb"
              />
              <button onClick={removeSelectedImage} className="btn btn-danger mt-2">
                Remove This Image
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="btn btn-success mt-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: 600,
    margin: "auto",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
};
