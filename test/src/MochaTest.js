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

describe("Test Me-app", function() {
    beforeEach(function(done) {
        this.timeout(20000);
        browser = new Builder(Firefox)
            .forBrowser('firefox')
            .setFirefoxOptions(firefoxOptions)
            .build();

        browser.get(URL);
        done()
    });
    
    afterEach(function(done) {
        browser.quit();
        done();
    });

    it("Test index", function(done){
        //check title
        browser.getTitle().then(function (title) {
            assert.equal(title, "Me-Me-Me");
        });

        done();
    });
});


//TEST NOW WORKING?
// // Test suite
// describe("Test Me-app", () => {

//     beforeEach(async function() {
//         this.timeout(20000);

//         browser = await new Builder(Firefox)
//             .forBrowser('firefox')
//             .setFirefoxOptions(firefoxOptions)
//             .build();

//         await browser.get(URL);

//     });
    
//     afterEach(() => {
//         browser.quit();
//     });

//     async function matchUrl(target) {
//         try {
//             // const url = await browser.getCurrentUrl();

//             // console.log(url.endsWith())
//             assert.ok(await browser.getCurrentUrl().endsWith("/" + target));
//             // assert.ok(url.endsWith("/" + target));
//         } catch (error) {
//             console.log("Something went wrong with matchUrl: ", error.message)
//         }
//     }

//     async function assertH1(target) {
//         try {
//             const text = await browser.findElement(By.css("h1")).getText();

//             assert.equal(text, target);
//         } catch (error) {
//             console.log(error.message);
//         }
//     }

//     // Test case
//     // of index. You will land in about page.
//     it("Test index", async () => {

//         await assertH1("ABOUT ME").catch(console.error);
        
//     });

//     // Test Reports
//     it("Test click on reports", async () => {
//         const link = await browser.findElement(By.linkText("Reports"));
//         await link.click();

//         await assertH1("REPORTS").catch(console.error);
//         const url = await browser.getCurrentUrl();
//         console.log(url.endsWith());
//         assert.ok(url.endsWith("/" + "reports"));


//     })

// });
