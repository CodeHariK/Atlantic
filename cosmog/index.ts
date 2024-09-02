import puppeteer, { Page } from 'puppeteer';
import fs from 'fs';

interface Item {
    title: string | undefined;
    price: string | undefined;
    rating: string | undefined;
    reviews: string | undefined;
    brand: string | undefined;
    age: string | undefined;
    img: string | undefined;
    src: string;
}

(async () => {

    let amazon = new Map<string, string[]>([
        [
            "baby", [
                "toys",
                "bike",
                "mat",
                "rompers",
                "rockers",
                "clothes",
                "jumpsuit",
                "shoes"
            ]
        ],
        [
            "kids", [
                "backpacks"
            ]
        ]
    ]);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (const [cat, subcats] of amazon) {
        console.log(cat, subcats)
        for (const s of subcats) {
            console.log(s)
            let items: Item[] = [];
            let search = `${cat}+${s}`;
            console.log(search)

            for (let pageNumber = 1; pageNumber < 2; pageNumber++) {
                let newItems = await amazonExtract(page, search, pageNumber);
                items = items.concat(newItems);
                console.log('Scraping complete. Data saved to scraped_data.json: ' + search + ' Page: ' + pageNumber);
            }

            fs.writeFileSync(`./data/${search}.json`, JSON.stringify(items, null, 2));
            console.log('Saved items : ' + items.length)
        }
    }

    await browser.close();
})();

async function amazonExtract(page: Page, search: string, pageNumber: number): Promise<Item[]> {

    await page.goto(`https://www.amazon.in/s?k=${search}&page=${pageNumber}`, { waitUntil: 'networkidle2' });

    const items = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('[data-component-type="s-search-result"], [data-component-type="s-impression-logger"], [data-component-type="sbv-video-single-product"]')).map((e) => {

            return {
                title: e.querySelector('div[data-cy="title-recipe"]>h2')?.textContent?.trim(),
                price: e.querySelector('div[data-cy="price-recipe"] .a-price span')?.textContent?.trim(),
                rating: e.querySelector('div[data-cy="reviews-block"] .a-icon-alt, span.a-icon-alt')?.textContent?.split(" ")[0],
                reviews: e.querySelector('div[data-cy="reviews-block"] span.a-size-base.s-underline-text')?.textContent?.trim(),
                brand: e.querySelector('div[data-cy="title-recipe"] div h2')?.textContent?.trim(),
                age: e.querySelector('div[data-cy="product-details-recipe"]')?.textContent?.trim(),
                img: e.querySelector('img')?.src,
                src: (e.querySelector('div[data-cy="title-recipe"] h2 a') as HTMLAnchorElement)?.href,
            };
        });
    });

    return items
}

async function smartprix() {
    const button = document.querySelector('.sm-load-more') as HTMLButtonElement;

    function clickButtonWithDelay(times: number) {
        if (times > 0) {
            button.click();
            setTimeout(() => clickButtonWithDelay(times - 1), 200);
        }
    }

    clickButtonWithDelay(100);

    //mobile
    Array.from(document.querySelectorAll('.sm-product.has-features')).map((e) => {
        return {
            "title": e.querySelector('a h2')?.textContent?.trim(),
            "price": Number(e.querySelector('.price')?.textContent?.trim().replace('₹', '').replace(',', '')),
            "score": Number(e.querySelector('.score b')?.textContent?.trim()),
            "rating": Number((e.querySelector('.rating span') as HTMLElement)?.style.getPropertyValue('--rating')),
            "brand": e.querySelector('a h2')?.textContent?.trim().split(' ')[0],
            "img": e.querySelector('img')?.src,
            "src": (e.querySelector('a'))?.href,
            "sim": e.querySelector('ul li:nth-child(1)')?.textContent,
            "processor": e.querySelector('ul li:nth-child(2)')?.textContent,
            "ram": Number(e.querySelector('ul li:nth-child(3)')?.textContent?.split(',')[0]?.trim()?.split(" ")[0]),
            "storage": Number(e.querySelector('ul li:nth-child(3)')?.textContent?.split(',')[1]?.trim()?.split(" ")[0]),
            "battery": e.querySelector('ul li:nth-child(4)')?.textContent,
            "display": e.querySelector('ul li:nth-child(5)')?.textContent,
            "camera": e.querySelector('ul li:nth-child(6)')?.textContent,
            "memory": e.querySelector('ul li:nth-child(7)')?.textContent,
            "os": e.querySelector('ul li:nth-child(8)')?.textContent,
        };
    })

    //cpu
    Array.from(document.querySelectorAll('.sm-product.has-features')).map((e) => {
        return {
            "title": e.querySelector('a h2')?.textContent?.trim(),
            "price": Number(e.querySelector('.price')?.textContent?.trim().replace('₹', '').replace(',', '')),
            "score": Number(e.querySelector('.score b')?.textContent?.trim()),
            "rating": Number((e.querySelector('.rating span') as HTMLElement)?.style.getPropertyValue('--rating')),
            "brand": e.querySelector('a h2')?.textContent?.trim().split(' ')[0],
            "img": e.querySelector('img')?.src,
            "src": (e.querySelector('a'))?.href,
            "processor": e.querySelector('ul li:nth-child(1)')?.textContent + " " + e.querySelector('ul li:nth-child(2)')?.textContent,
            "ram": e.querySelector('ul li:nth-child(3)')?.textContent,
            "storage": e.querySelector('ul li:nth-child(4)')?.textContent,
            "gpu": e.querySelector('ul li:nth-child(5)')?.textContent,
            "display": e.querySelector('ul li:nth-child(6)')?.textContent,
            "os": e.querySelector('ul li:nth-child(7)')?.textContent,
        };
    })
}