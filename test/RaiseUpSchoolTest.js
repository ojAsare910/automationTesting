const {Builder, By, Browser, until} = require ("selenium-webdriver");
const { beforeEach, afterEach, after, it } = require("mocha");
const assert = require("assert");

describe("RiseUp for Schools Test", function() {

    before(async function () {
        driver = await new Builder()
                            .forBrowser(Browser.CHROME)
                            .build();

        await driver.manage().setTimeouts({implicit:10000});
        await driver.manage().window().maximize();
    });

    beforeEach(async function() {
        await driver.get("https://explore.hubtel.com/schools/");
    });

    afterEach(async function() {
        await driver.sleep(5000);
    });

    after(async function() {
        await driver.quit();
    });

    it("successfully opens the INSTALL RAISEUP link", async function() {
        const targetElementClassName = "btn btn-primary px-4 rounded-3 text-white mb-5 mb-md-0";

        await driver.findElement(By.className(targetElementClassName)).click();

        const currentUrl = await driver.getCurrentUrl();
        console.log(currentUrl);
        assert.strictEqual(currentUrl, "https://app-raiseup.hubtel.com/", "Clicked element did not navigate to the expected URL");
        console.log(`Element at XPath '${targetElementClassName}' was clicked successfully`);

    });


    it("successfully opens the Get your child’s school to sign up link", async function(){
        const targetElementClassName = "btn btn-primary px-4 rounded-3 text-white mt-5 mb-2";

        const targetElement = await driver.wait(until.elementLocated(By.className(targetElementClassName)),5000);
        await driver.executeScript('window.scrollTo(0, arguments[0].offsetTop - window.innerHeight / 2);', targetElement);

        await driver.sleep(3000);
        await driver.executeScript("arguments[0].click();", targetElement);

        const currentUrl = await driver.getCurrentUrl();
        console.log(currentUrl);
        assert.strictEqual(currentUrl, "https://raiseup.hubtel.com/signup", "Clicked element did not navigate to the expected URL");
        console.log(`Element at XPath '${targetElementClassName}' was clicked successfully`);
    });


    it("successfully opens the Sign up your school now link", async function(){
        const targetElementXPath = "/html/body/div[5]/div/div[2]/div[2]/div/div[4]/a";
        const targetElement = await driver.wait(until.elementLocated(By.xpath(targetElementXPath)), 5000);

        await driver.executeScript('window.scrollTo(0, arguments[0].offsetTop - window.innerHeight / 2);', targetElement);

        await driver.sleep(3000);
        await driver.executeScript("arguments[0].click();", targetElement);

        const currentUrl = await driver.getCurrentUrl();
        console.log(currentUrl);
        assert.strictEqual(currentUrl, "https://raiseup.hubtel.com/signup", "Clicked element did not navigate to the expected URL");
        console.log(`Element at XPath '${targetElementXPath}' was clicked successfully`);
    });


    it("successfully opens the Send SMS link", async function(){
        const targetElementXPath = "//*[@id='navbarNavDropdown']/div/ul/li[4]/a";

        await driver.findElement(By.xpath(targetElementXPath)).click();

        const currentUrl = await driver.getCurrentUrl();
        console.log(currentUrl);
        assert.strictEqual(currentUrl, "https://explore.hubtel.com/bulk-sms-ghana/", "Clicked element did not navigate to the expected URL");
        console.log(`Element at XPath '${targetElementXPath}' was clicked successfully`);

    });


    it("validates the six images card in the Connecting early childhood schools to parents section", async function(){
        const sectionXPath = "/html/body/div[5]/div/div[2]/div[1]/div/div";
        const imageXPath = `${sectionXPath}/div/img`;

        const section = await driver.wait(until.elementLocated(By.xpath(sectionXPath)), 5000);
        await driver.executeScript('arguments[0].scrollIntoView(true);', section);

        const imageElements = await driver.findElements(By.xpath(imageXPath));

        for(const imgEle of imageElements) {
            const imageUrl = await imgEle.getAttribute('src');

            if (imageUrl) {
                const isDisplayed = await imgEle.isDisplayed();
                assert.ok(isDisplayed, `Image URL '${imageUrl}' is not displayed`);
                console.log(`Image URL '${imageUrl}' is displayed`)
            } else {
                console.warn("Image element does not have a valid 'src' attribute:", imgEle);
            }
            
        }  

    });

});