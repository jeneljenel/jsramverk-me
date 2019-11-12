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
            .setFirefoxOptions(firefoxOptions)
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

    async function assertH1(target) {
        const headline = await browser.findElement(By.css("h1")).getText();
        assert.equal(headline, target);
    }

    async function findElementById(target) {
        const element = await browser.findElement(By.id(target));
        return element;
    }

    async function findElementByName(target) {
        const element = await browser.findElement(By.name(target));
        return element;
    }

    async function findElementByClassName(target) {
        const element = await browser.findElement(By.className(target));
        return element;
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
        // const headline = await browser.findElement(By.css("h1")).getText();
        // assert.equal(headline, "REPORTS");
        // console.log("headline <h1> is: ", headline);
        await assertH1("REPORTS");

    });

    it("Test register", async function () {
        await goToNavLink("Register");
        await assertURL("register");
        await assertH1("REGISTER NEW USER");
    });

    it("Test register form - field-error color", async function () {
        await goToNavLink("Register");

        // enter value in name. - is not really tested.
        const name = await findElementByName("name");
        await name.sendKeys("Not a valid name");

        //submit the form.        
        const button = await findElementById("submit-form");
        await button.click();

        //get values from error message.
        const msg = await findElementByClassName("field-error-form");
        const msgtxt = await msg.getText();
        const msgcolor = await msg.getCssValue("background-color");

        //assert.
        await assert.equal(msgtxt, "Oops! Something went wrong.");
        await assert.equal(msgcolor, "rgba(243, 74, 32, 0.22)");

    });

    it("Test login", async function () {
        await goToNavLink("Login");
        await assertURL("login");
        await assertH1("LOGIN BELOW!");
    });



});