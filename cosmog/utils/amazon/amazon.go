package amazon

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"os"
	"strconv"
	"strings"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
)

type Category struct {
	Lvl0 string `json:"lvl0,omitempty"`
	Lvl1 string `json:"lvl1,omitempty"`
}

type Product struct {
	ID       string   `json:"id,omitempty"`
	Title    string   `json:"title,omitempty"`
	Info     string   `json:"info,omitempty"`
	Price    float64  `json:"price,omitempty"`
	Rating   float64  `json:"rating,omitempty"`
	Reviews  int      `json:"reviews,omitempty"`
	Brand    string   `json:"brand,omitempty"`
	Age      string   `json:"age,omitempty"`
	Img      string   `json:"img,omitempty"`
	Src      string   `json:"src,omitempty"`
	Category Category `json:"category,omitempty"`
}

type CategoryMap map[string][]string

var amazon = CategoryMap{
	"baby": {
		"toys",
		"bike",
		"mat",
		"rompers",
		"rockers",
		"clothes",
		"jumpsuit",
		"shoes",
		"products",
		"foods",
	},
	"kids": {
		"backpacks",
		"books",
		"shoes",
	},
}

func main() {
	buf := bytes.NewBuffer(make([]byte, 0, 10*1024*1024))

	enc := json.NewEncoder(buf)
	enc.SetEscapeHTML(false)
	enc.SetIndent("", "  ")

	// Create a new context for the browser
	// opts := chromedp.DefaultExecAllocatorOptions[:]       // Get default options
	// opts = append(opts, chromedp.Flag("headless", false)) // Run in non-headless mode
	// allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	// defer cancel()

	// ctx, cancel := chromedp.NewContext(allocCtx)
	// defer cancel()

	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	for category := range amazon {
		if subcategories, exists := amazon[category]; exists {
			for _, subcat := range subcategories {

				var products []Product

				for page := 1; page < 20; page += 1 {
					url := fmt.Sprintf("https://www.amazon.in/s?k=%s+%s&page=%d", category, subcat, page)
					fmt.Println(page)

					extractedProducts := extractAmazon(ctx, url)

					uniqueProductIDs := make(map[string]bool)
					for _, product := range extractedProducts {
						if !uniqueProductIDs[product.Title] {
							uniqueProductIDs[product.Title] = true
							products = append(products, product)
						}
					}
				}

				// Step 4: Encode the processed data back to JSON
				err := enc.Encode(products)
				if err != nil {
					fmt.Println("Error encoding JSON:", err)
					return
				}

				path := fmt.Sprintf("data/%s+%s.json", category, subcat)

				err = os.WriteFile(path, buf.Bytes(), 0o644)
				if err != nil {
					fmt.Println("Error saving file:", err)
					return
				}

				buf.Reset()

				fmt.Printf("Data processed and saved to %s %d\n", path, len(products))
			}
		}
	}
}

func extractAmazon(ctx context.Context, url string) []Product {
	var products []Product

	// Run tasks
	err := chromedp.Run(ctx,
		// Navigate to the URL
		chromedp.Navigate(url),

		// Wait for the page to load

		chromedp.ActionFunc(func(ctx context.Context) error {
			// Find all product elements with the given data-component-type attributes
			var nodes []*cdp.Node
			err := chromedp.Run(ctx,
				chromedp.Nodes(`[data-component-type="s-search-result"], [data-component-type="s-impression-logger"], [data-component-type="sbv-video-single-product"]`, &nodes, chromedp.ByQueryAll, chromedp.AtLeast(0)),
			)
			if err != nil {
				return err
			}

			fmt.Println(url, len(nodes))

			// Process each entry
			for _, node := range nodes {
				product := Product{}

				product.ID = node.AttributeValue("data-uuid")

				var urlSrc string
				extractAttribute(ctx, product.ID, "href", &urlSrc, `div[data-cy="title-recipe"] h2 a`)
				product.Src = extractUrl(urlSrc)

				extract(ctx, product.ID, &product.Title, `div[data-cy="title-recipe"] > h2`)

				var priceStr string
				extract(ctx, product.ID, &priceStr, `div[data-cy="price-recipe"] .a-price span`)
				priceStr = strings.ReplaceAll(priceStr, "₹", "")
				priceStr = strings.ReplaceAll(priceStr, ",", "")
				if price, err := strconv.ParseFloat(priceStr, 64); err == nil {
					product.Price = price
				}

				var ratingStr string
				extract(ctx, product.ID, &ratingStr, `div[data-cy="reviews-block"] .a-icon-alt`)
				ratingStr = strings.Split(ratingStr, " ")[0]
				if rating, err := strconv.ParseFloat(ratingStr, 64); err == nil {
					product.Rating = rating
				}

				var reviewsStr string
				extract(ctx, product.ID, &reviewsStr, `div[data-cy="reviews-block"] .s-underline-text`)
				reviewsStr = strings.ReplaceAll(reviewsStr, ",", "")
				if reviews, err := strconv.Atoi(reviewsStr); err == nil {
					product.Reviews = reviews
				}

				extract(ctx, product.ID, &product.Brand, `div[data-cy="title-recipe"] div h2`)

				extract(ctx, product.ID, &product.Age, `div[data-cy="product-details-recipe"]`)

				extractAttribute(ctx, product.ID, "src", &product.Img, `img`)

				if product.ID != "" {
					products = append(products, product)
				}
			}
			return nil
		}),
	)
	if err != nil {
		log.Fatalf("Failed to scrape: %v", err)
	}

	return products
}

func extract(ctx context.Context, id string, source *string, query string) {
	err := chromedp.Run(ctx,
		chromedp.Text(
			fmt.Sprintf(`[data-uuid="%s"] %s`, id, query),
			source, chromedp.AtLeast(0)),
	)
	if err != nil {
		// fmt.Println(err)
	}
}

func extractAttribute(ctx context.Context, id string, attr string, source *string, query string) {
	var ok *bool
	err := chromedp.Run(ctx,
		chromedp.AttributeValue(
			fmt.Sprintf(`[data-uuid="%s"] %s`, id, query),
			attr, source, ok, chromedp.AtLeast(0)),
	)
	if err != nil {
		// fmt.Println(err)
	}
}

func extractUrl(rawUrl string) string {
	if !strings.HasPrefix(rawUrl, "/sspa") {
		return strings.Split(rawUrl, "/ref")[0]
	}
	// Parse the URL
	parsedURL, err := url.Parse(rawUrl)
	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return ""
	}

	queryParams := parsedURL.Query()

	// Get the "url" query parameter and decode it
	extractedURL := queryParams.Get("url")
	decodedURL, err := url.PathUnescape(extractedURL)
	if err != nil {
		fmt.Println("Error decoding URL:", err)
		return ""
	}

	parts := strings.Split(decodedURL, "/")

	return fmt.Sprintf("/" + parts[1] + "/dp/" + parts[3])
}
