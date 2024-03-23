const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

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
    describe('Navigating to services page', function () {
        it('should select the services tab', async function () {
            await driver.findElement(By.xpath('//*[@id="navbarSupportedContent"]/ul/li[3]/a')).click();
            await driver.sleep(1000);

            try {
                await driver.wait(until.elementLocated(By.xpath('/html/body/pre')), 10000);
                console.log('Error message for services page found');
            } catch (err) {
                throw new Error('Expected error message for services page not found');
            }
        });
    });
});
