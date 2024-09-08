package server

import (
	"fmt"
	"image"
	"image/png"
	"io"
	"net/http"
	"os"

	"github.com/codeharik/Atlantic/inventory/utils"
	"github.com/google/uuid"
)

func uploadFile(w http.ResponseWriter, r *http.Request) {
	// Parse the form containing the file
	err := r.ParseMultipartForm(10 << 20) // Max size 10MB
	if err != nil {
		fmt.Println(fmt.Errorf("parse error : %v", err))
		http.Error(w, "Could not parse multipart form", http.StatusBadRequest)
		return
	}

	formFileErr := SaveImage(r)

	formerr := DownloadSaveImage(r)

	if formerr == nil || formFileErr == nil {
		fmt.Fprintf(w, "File uploaded successfully")
	}
}

func SaveImage(r *http.Request) error {
	file, handler, formFileErr := r.FormFile("item")
	if formFileErr != nil {
		fmt.Println(fmt.Errorf("formfile error : %v", formFileErr))
	} else {
		defer file.Close()

		fmt.Println(handler.Filename)

		dst, err := os.Create("./uploads/" + handler.Filename)
		if err != nil {
			fmt.Println(fmt.Errorf("create file error : %v", err))
			return err
		}
		defer dst.Close()

		_, err = io.Copy(dst, file)
		if err != nil {
			fmt.Println(fmt.Errorf("copy file error : %v", err))
			return err
		}
	}
	return formFileErr
}

func DownloadSaveImage(r *http.Request) error {
	url := r.FormValue("item")
	var img image.Image
	var err error

	if url != "" {
		img, err = utils.FetchImage(url)
		if err != nil {
			fmt.Println(fmt.Errorf("DownloadImage error: %v", err))
			return err
		}
	}

	if img != nil {
		uid := uuid.New()

		// Open the destination file
		dst, err := os.Create("./uploads/" + uid.String() + ".png") // Save as PNG or change to ".jpg" if using JPEG
		if err != nil {
			fmt.Println(fmt.Errorf("Error creating destination file: %v", err))
			return err
		}
		defer dst.Close()

		// Encode the image to PNG (you can also use jpeg.Encode for JPEG files)
		err = png.Encode(dst, img)
		if err != nil {
			fmt.Println(fmt.Errorf("Error encoding image: %v", err))
			return err
		}

		fmt.Println("Image saved successfully")
	}

	return nil
}
