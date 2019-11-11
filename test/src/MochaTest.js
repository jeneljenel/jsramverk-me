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
const URL = "http://192.168.1.99:3000/#";

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
});