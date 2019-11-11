/**
 * Test for getting with mocha and Selenium
 * MochaTest.js
 */
"use strict";



const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");
const Firefox = require('selenium-webdriver/firefox');
const firefoxOptions = new Firefox.Options().headless();

const URL = "http://localhost:3000/#";

let browser;

// Test suite
describe("Test Me-app", () => {

    beforeEach(async function () {
        this.timeout(30000);

        browser = await new Builder()
            .forBrowser('firefox')
            .build();

        await browser.get(URL);

    });

    afterEach(function (done) {
        browser.quit();
        done();
    });

    function assertTitle(target) {
        browser.getTitle().then(function(title) {
            assert.equal(title, target, "== Title is the same.")
        });
    };




    it("Test index", function (done) {
        assertTitle("Me-Me-Me");
        done();
    });

    it("Test reports", async function () {
        //find link and click.
        const link = await browser.findElement(By.linkText("Reports"));
        link.click();

        //test url
        const currurl = await browser.getCurrentUrl();
        assert.ok(currurl.endsWith("/reports"));
        console.log("url: ", currurl, "| url ends with /reports: ", currurl.endsWith("/reports"));

        //test headline
        const headline = await browser.findElement(By.css("h1")).getText();
        console.log("headline <h1> is: ", headline);
        assert.equal(headline, "REPORTS");
    });


});