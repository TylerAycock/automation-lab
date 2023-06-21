const {Builder, Browser, By, Key, until} = require(`selenium-webdriver`)

let driver;

beforeEach(async ()=>{
    driver = new Builder().forBrowser(Browser.CHROME).build();
})

afterAll(async ()=>{
    await driver.quit();
})


describe(`Testing Movie App`,()=>{

    test('ensure check button works', async ()=>{
        await driver.get(`http://localhost:3000/`);
        await driver.findElement(By.name('movieTitle')).sendKeys(`Shrek`,Key.RETURN);
        await driver.wait(until.elementLocated(By.css('#movies-list li input')),1000).click();

        const message = await driver.findElement(By.css('aside[id="message"]')).getText();
        console.log(message)
        expect(await message).toBe('Watched Shrek')

    })

    test('deleteMovie delets movie', async ()=>{
        await driver.get('http:localhost:3000')
        await driver.findElement(By.id(`add-movie-input`)).sendKeys(`Shrek\n`)
        let deleteMovie = await driver.findElement(By.className('delete-btn'))
        await deleteMovie.click()
        await driver.sleep(3000)
        let isDeleted = await driver.findElements(By.xpath('//ul/li')) //this is collecting ALL of the list elements on our page 

        console.log(isDeleted)

        expect(isDeleted.length ===0).toBe(true)


    })



})

