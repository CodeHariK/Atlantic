package server

import (
	"bytes"
	"fmt"
	"image"
	"image/jpeg"
	"io"
	"net/http"

	"github.com/codeharik/Atlantic/inventory/utils"
	"github.com/google/uuid"
)

func (s InventoryServiceServer) uploadFile(w http.ResponseWriter, r *http.Request) {
	// Parse the form containing the file
	err := r.ParseMultipartForm(10 << 20) // Max size 10MB
	if err != nil {
		fmt.Println(fmt.Errorf("parse error : %v", err))
		http.Error(w, "Could not parse multipart form", http.StatusBadRequest)
		return
	}

	multifile, formFileErr := SaveImage(r)

	formfile, formerr := DownloadSaveImage(r)
	fmt.Println(formerr, formFileErr)

	if formerr == nil && formFileErr == nil {
		fmt.Fprintf(w, "Error file upload")
		return
	} else {

		uid := uuid.New().String()
		if formfile != nil {
			s.client.PutObject(s.cfg.Minio.Bucket.Products, uid, formfile)
		}
		if multifile != nil {
			s.client.PutObject(s.cfg.Minio.Bucket.Products, uid, multifile)
		}
	}
}

func SaveImage(r *http.Request) (*bytes.Buffer, error) {
	file, handler, err := r.FormFile("item")
	if err != nil {
		fmt.Println(fmt.Errorf("formfile error : %v", err))
		return nil, err
	} else {
		defer file.Close()

		fmt.Println(handler.Filename)

		var buf bytes.Buffer
		_, err := io.Copy(&buf, file)
		if err != nil {
			return nil, err
		}
		return &buf, nil

		// dst, err := os.Create("./uploads/" + handler.Filename)
		// if err != nil {
		// 	fmt.Println(fmt.Errorf("create file error : %v", err))
		// 	return nil, err
		// }
		// defer dst.Close()

		// _, err = io.Copy(dst, file)
		// if err != nil {
		// 	fmt.Println(fmt.Errorf("copy file error : %v", err))
		// 	return nil, err
		// }
		// return &file, nil
	}
}

func DownloadSaveImage(r *http.Request) (*bytes.Buffer, error) {
	url := r.FormValue("item")
	var img image.Image
	var err error

	if url != "" {
		img, err = utils.FetchImage(url)
		if err != nil {
			fmt.Println(fmt.Errorf("DownloadImage error: %v", err))
			return nil, err
		}
		if img != nil {
			// uid := uuid.New()

			buf := new(bytes.Buffer)

			// Encode the image as a JPEG (or PNG if you prefer)
			err := jpeg.Encode(buf, img, nil)
			if err != nil {
				fmt.Println("Failed to encode image:", err)
				return nil, err
			}
			return buf, nil

			// // Open the destination file
			// dst, err := os.Create("./uploads/" + uid.String() + ".png") // Save as PNG or change to ".jpg" if using JPEG
			// if err != nil {
			// 	fmt.Println(fmt.Errorf("Error creating destination file: %v", err))
			// 	return nil, err
			// }
			// defer dst.Close()

			// // Encode the image to PNG (you can also use jpeg.Encode for JPEG files)
			// err = png.Encode(dst, img)
			// if err != nil {
			// 	fmt.Println(fmt.Errorf("Error encoding image: %v", err))
			// 	return nil, err
			// }

			// fmt.Println("Image saved successfully")

			// return &img, nil
		}
	}

	return nil, fmt.Errorf("Invalid Url")
}
