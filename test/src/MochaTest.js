/**
 * Test for getting with mocha and Selenium
 * MochaTest.js
 */
"use strict";



const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");

const Firefox = require('selenium-webdriver/firefox');
const firefoxOptions = new Firefox.Options().headless();

// const URL = "http://localhost:3000/#";
const URL = "http://192.168.1.99:3000/#!/";

let browser;

// Test suite
describe("Test Me-app", () => {

    beforeEach(async function() {
        this.timeout(20000);

        browser = await new Builder(Firefox)
            .forBrowser('firefox')
            .setFirefoxOptions(firefoxOptions)
            .build();

        await browser.get(URL);

    });
    
    afterEach(() => {
        browser.quit();
    });

    // async function matchUrl(target) {
    //     try {
    //         const url = await browser.getCurrentUrl();
    //         await assert.ok(url.endsWith("/" + target));
    //     } catch (error) {
    //         console.log("Something went wrong with matchUrl", error.message)
    //     }
    // }

    async function assertH1(target) {
        try {
            const text = await browser.findElement(By.css("h1")).getText();

            assert.equal(text, target);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Test case
    // of index. You will land in about page.
    it("Test index", async () => {

        await assertH1("ABOUT ME").catch(console.error);
        
    });

    // Test Reports
    it("Test Reports", async () => {
        await assertH1("REPORTS").catch(console.error)
        const link = await browser.findElement(By.linkText("Reports"))
        console.log(link);
    //         await link.click();
    //     describe("Click", async () => {
    //         const link = await browser.findElement(By.linkText("Reports"))
    //         await link.click();


    //         //test h1 title
    //         const element = await browser.findElement(By.css("h1"));
    //         const text = await element.getText();
    //         await assert.equal(text, "REPORTS");

    //         //test url
    //         const url = await browser.getCurrentUrl();
    //         await assert.ok(url.endsWith("/" + "reports"));


    //     })



    })

});
