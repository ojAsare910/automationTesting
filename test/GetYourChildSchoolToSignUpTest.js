const {Builder, By, Browser, until} = require ("selenium-webdriver");


describe("Get your child’s school to sign up test", function(){

    
    it("successfully opens the Get your child’s school to sign up link", async function(){

        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        
        await driver.manage().setTimeouts({implicit:10000});
        driver.manage().window().maximize();
        
        await driver.get("https://explore.hubtel.com/schools/");


        const ele = await driver.wait(until.elementLocated(By.className("btn btn-primary px-4 rounded-3 text-white mt-5 mb-2")),5000);
        await driver.executeScript('arguments[0].scrollIntoView(false);', ele);

        await driver.executeScript("arguments[0].click();", ele);
        await driver.sleep(5000);

        await driver.quit();
    });

});
