import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";
import sleep from "@/Tools/Sleep";
import puppeteer from "puppeteer";
import { PassThrough } from "stream";

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            // "--proxy-server=socks5://23.19.244.109:1080"
        ]
    });

    const context = browser.defaultBrowserContext();
    await context.overridePermissions("https://www.google.com", ["geolocation"]);

    const page = await browser.newPage();
    page.setDefaultTimeout(0);
    await page.setUserAgent("com.google.GoogleMobile/111.0 iPhone/13.5.1 hw/iPhone10_3");
    await page.setViewport({ width: 1024, height: 780 });
    await page.setGeolocation({ latitude: -13.067464, longitude: -55.930092 });

    const recorder = new PuppeteerScreenRecorder(page)

    try {
        const kjdfd = new PassThrough()

        kjdfd.on("data", data => console.log(data))
        await recorder.startStream(kjdfd);
        await page.goto("about:blank");
        await sleep(5000);
        await page.goto("https://www.google.com/");
        await recorder.stop();
    } catch (error) {
        console.error("Error during recording:", error);
    } finally {
        await browser.close();
    }

    console.log("The test completed successfully 🧪 ");
}
