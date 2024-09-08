package utils

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"net/http"
	"os"
	"strings"
)

func FetchImage(url string) (image.Image, error) {
	var img image.Image
	var err error

	if strings.HasPrefix(url, "data:image") {
		// Handle base64 image data
		base64Data := strings.Split(url, ",")[1]
		decoded, err := base64.StdEncoding.DecodeString(base64Data)
		if err != nil {
			return nil, fmt.Errorf("failed to decode base64 image: %v", err)
		}
		img, _, err = image.Decode(bytes.NewReader(decoded))
		if err != nil {
			return nil, fmt.Errorf("failed to decode image from base64 data: %v", err)
		}
	} else {
		return DownloadImage(url)
	}

	return img, err
}

func DownloadImage(url string) (image.Image, error) {
	// Fetch the image from a URL
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch image from url: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch image: status code %d", resp.StatusCode)
	}

	img, _, err := image.Decode(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to decode image from response body: %v", err)
	}

	return img, err
}

func SaveImage(img image.Image, filename string) error {
	outFile, err := os.Create("./uploads/" + filename)
	if err != nil {
		return fmt.Errorf("failed to create output file: %v", err)
	}
	defer outFile.Close()

	switch strings.ToLower(filename[len(filename)-3:]) {
	case "jpg", "jpeg":
		err = jpeg.Encode(outFile, img, nil)
	case "png":
		err = png.Encode(outFile, img)
	default:
		return fmt.Errorf("unsupported image format")
	}

	if err != nil {
		return fmt.Errorf("failed to encode and save image: %v", err)
	}

	fmt.Printf("Image saved as %s\n", outFile.Name())
	return nil
}
