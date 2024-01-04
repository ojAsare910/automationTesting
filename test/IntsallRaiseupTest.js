const {Builder, By, Browser} = require ("selenium-webdriver");


describe("INSTALL RAISEUP link test", function(){

    it("successfully opens the INSTALL RAISEUP link", async function(){

        let driver = await new Builder().forBrowser(Browser.CHROME).build();


        await driver.manage().setTimeouts({implicit:10000});
        driver.manage().window().maximize();
        
        await driver.get("https://explore.hubtel.com/schools/")

        await driver.findElement(By.className("btn btn-primary px-4 rounded-3 text-white mb-5 mb-md-0")).click();
        await driver.sleep(5000);

        await driver.quit();
    });

});
