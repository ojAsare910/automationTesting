const {Builder, By, Browser, until} = require ("selenium-webdriver");


describe("Sign up your school now link test", function(){

    it("successfully opens the Sign up your school now link", async function(){

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.manage().setTimeouts({implicit:10000});
        driver.manage().window().maximize();
        
        await driver.get("https://explore.hubtel.com/schools/");

        const ele = await driver.wait(until.elementLocated(By.xpath("/html/body/div[5]/div/div[2]/div[2]/div/div[4]/a")), 5000);
        await driver.executeScript('window.scrollTo(0, arguments[0].offsetTop - window.innerHeight / 2);', ele);

        await driver.sleep(3000);
        await driver.executeScript("arguments[0].click();", ele);
        await driver.sleep(5000);

        await driver.quit();
    });

});
