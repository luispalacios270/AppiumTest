import {
  AppiumDriver,
  createDriver,
  SearchOptions
} from "nativescript-dev-appium";
import { assert } from "chai";

describe("sample scenario", () => {
  const defaultWaitTime = 5000;
  let driver: AppiumDriver;

  before(async () => {
    driver = await createDriver();
  });

  after(async () => {
    await driver.quit();
    console.log("Quit driver!");
  });

  afterEach(async function() {
    if (this.currentTest.state !== "failed") {
      await driver.logScreenshot(this.currentTest.title);
    }
  });

  it("Should add an 5 every click", async () => {
    const btnTap = await driver.findElementByAccessibilityId("btnToClick");
    const label = await driver.findElementByAccessibilityId("labelToShow");
    const textWithoutChange = await label.text();

    await btnTap.click();
    assert.equal(await label.text(), `${textWithoutChange}5`);

    await btnTap.click();
    assert.equal(await label.text(), `${textWithoutChange}55`);
  });

  it("Should hide an element", async () => {
    const btnTap = await driver.findElementByAccessibilityId(
      "btnToClickVanish"
    );
    await btnTap.click();

    assert.isFalse(await btnTap.isDisplayed(), "Item shouldn't be visible");
  });

  it("Should work form", async () => {
    const btnNavigate = await driver.findElementByAccessibilityId("btnToForm");
    await btnNavigate.click();

    const formPage = await driver.findElementByAccessibilityId("formForSubmit");
    const submitBtn = await driver.findElementByAccessibilityId("btnToSubmit");
    const inputs = await driver.findElementsByAccessibilityId("input");

    let succesWasFound = false;
    let successMessage;

    try {
      successMessage = await driver.findElementByAccessibilityId("success");
      succesWasFound = true;
    } catch (e) {}

    assert.isFalse(
      succesWasFound,
      "The congrats message shouldn't be visible at this moment"
    );

    await inputs[0].sendKeys("10000");

    await inputs[1].sendKeys("Esta es una descripcion cualquiera");

    await inputs[2].sendKeys("15000");

    await inputs[3].sendKeys("16000");

    await submitBtn.tap();

    successMessage = await driver.findElementByAccessibilityId("success");
    assert.isTrue(await successMessage.isDisplayed());

    // await successMessage
  });
});
