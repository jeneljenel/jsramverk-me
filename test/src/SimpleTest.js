// /**
//  * Test me-app with selenium
//  * SimpleTest.js
//  */
// "use strict";


// const { Builder } = require('selenium-webdriver');
// const Firefox = require('selenium-webdriver/firefox');
// // const URL = "http://localhost:3000/#";
// const URL = "http://192.168.1.99:3000/#";

// let browser;


// async function main() {
//     const builder = await new Builder().forBrowser('firefox');
//     builder.setFirefoxOptions(new Firefox.Options().headless());

//     browser = await builder.build();
//     await browser.get(URL);

//     try {
//         const title = await browser.getTitle();
//         console.log("Result from SimpleTest.js. The title: ", title);
//     } catch (ex) {
//         console.log("Something went wrong at SimpleTest.js: ", ex.message);
//     } finally {
//         browser.quit();
//     }
   
// }


// main().catch(console.error);