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
    if (this.currentTest.state === "failed") {
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
});
