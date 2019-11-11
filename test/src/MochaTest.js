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

    async function goToNavLink(target) {
        await browser.findElement(By.linkText(target))
        .then(async function(link) {
            await link.click();
        })
        .catch(function(error) {
            console.log(error.message);
        });
    };

    async function assertURL(target) {
        const currurl = await browser.getCurrentUrl();
        assert.ok(currurl.endsWith("/" + target));
    }


    it("Test index", function (done) {
        assertTitle("Me-Me-Me");
        done();
    });

    it("Test reports", async function () {
        //find link and click.
        await goToNavLink("Reports");

        //test url
        // const currurl = await browser.getCurrentUrl();
        // assert.ok(currurl.endsWith("/reports"));
        // console.log("url: ", currurl, "| url ends with /reports: ", currurl.endsWith("/reports"));
        await assertURL("reports");

        //test headline
        const headline = await browser.findElement(By.css("h1")).getText();
        assert.equal(headline, "REPORTS");
        console.log("headline <h1> is: ", headline);
    });


});