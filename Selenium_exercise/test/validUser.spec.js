const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

const server_url = 'http://localhost:3000';

describe('Web App Tests', function () {
    this.timeout(10000);
    let driver;

    before(async function () {
        // Create a new instance of the Chrome driver
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    describe('Login', function () {
        it('should login successfully', async function () {
            // Navigate to the login page
            await driver.get(server_url);
            // Enter login credentials
            await driver.findElement(By.id('username')).sendKeys('user');
            await driver.findElement(By.id('password')).sendKeys('pass');
            await driver.findElement(By.id('login')).click();
            // Check if login was successful
            await driver.sleep(3000);
            await driver.wait(until.elementLocated(By.css('h2')), 20000);
        });
    });

    // THIS IS A NEW TEST
    describe('Navigating to home page', function () {
        it('should select the home tab', async function () {
            await driver.findElement(By.xpath('//*[@id="navbarSupportedContent"]/ul/li[1]/a')).click();
            await driver.sleep(1000);
        });
    });

    // THIS IS A NEW TEST
    describe('Navigating to products page', function () {
        it('should select the products tab', async function () {
            await driver.findElement(By.xpath('//*[@id="navbarSupportedContent"]/ul/li[2]/a')).click();
            await driver.sleep(1000);
        });
    });

    // THIS IS A NEW TEST
    describe('Trying to submit before making selections', function () {
        it('should select the submit button and remain on page', async function () {
            await driver.findElement(By.id('carSubmitButton')).click();
            await driver.sleep(1000);
            if(driver.findElement(By.id('carSubmitButton'))){
                console.log('\tRemained on products page');
            } else{
                console.log('\tLeft products page');
            }
        });
    });

    // now that the user is logged in select a car
    describe('Car Selection', function () {
        it('should select car make', async function () {
            const makeSelect = await driver.findElement(By.id('make'));
            await makeSelect.sendKeys('Honda', Key.RETURN);
            await driver.sleep(1000);
        });

        it('should select car model', async function () {
            const modelSelect = await driver.findElement(By.id('model'));
            await driver.wait(until.elementIsEnabled(modelSelect), 10000);
            await modelSelect.sendKeys('Civic', Key.RETURN);
            await driver.sleep(1000);
        });

        it('should select car year', async function () {
            const yearSelect = await driver.findElement(By.id('year'));
            await driver.wait(until.elementIsEnabled(yearSelect), 10000);
            await yearSelect.sendKeys('2020');
        });

        it('should submit car selection form', async function () {
            await driver.findElement(By.id('carSubmitButton')).click();
            await driver.sleep(1000);
        });
    });

    describe('Confirmation', function () {
        it('should confirm car selection', async function () {
            await driver.wait(until.elementLocated(By.css('h1')), 10000);
            let confirmationText = await driver.findElement(By.css('h1')).getText();
            console.log(confirmationText);
            if (confirmationText.includes('Honda') && confirmationText.includes('Civic') && confirmationText.includes('2020')) {
                logResults('Car selection confirmed: Honda Civic (2020)');
            } else {
                throw new Error('Car selection not confirmed');
            }
        });
    });
});

// Helper function to append test results to a file
function logResults(message) {
    const resultsPath = 'testResults.txt'; // Path to where you want to store the results
    fs.appendFileSync(resultsPath, message + '\n', 'utf8');
}
