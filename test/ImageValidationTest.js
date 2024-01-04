const {Builder, By, Browser, Key, until} = require ("selenium-webdriver");
const axios = require("axios")
const assert = require("assert")


describe("six Cards Image Validation Test", function(){

    
    it("validates the six images card in the Connecting early childhood schools to parents section", async function(){

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.manage().setTimeouts({implicit:10000});
        driver.manage().window().maximize();
        
        await driver.get("https://explore.hubtel.com/schools/");

        let section = await driver.wait(until.elementLocated(By.xpath("/html/body/div[5]/div/div[2]/div[1]/div/div")), 5000);
        await driver.executeScript('arguments[0].scrollIntoView(true);', section);

        let imageElements = await driver.findElements(By.xpath("/html/body/div[5]/div/div[2]/div[1]/div/div/div/img"));

        for(const imgEle of imageElements) {
            const imageUrl = await imgEle.getAttribute('src');

            if (imageUrl) {
                let response = await axios.head(imageUrl);
                let statusCode = response.status;

                assert.ok(statusCode >= 200 && statusCode < 300, `Image URL '${imageUrl}' returned a non-successful status code: ${statusCode}`);
            } else {
                console.warn("Image element does not have a valid 'src' attribute:", imgEle);
            }
        }

        await driver.sleep(5000);

        await driver.quit();
        
    });

});