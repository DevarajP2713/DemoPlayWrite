import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://www.kaggle.com/");
  await expect(page).toHaveTitle(
    "Kaggle: Your Machine Learning and Data Science Community"
  );
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "Sign in with Email" }).click();
  await page
    .getByPlaceholder("Enter your email address")
    .fill("venkattest003@gmail.com");
  await page.getByPlaceholder("Enter password").fill("Sample@123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome, Test Lab!" })
  ).toBeVisible();
  await page.getByRole("link", { name: "Datasets", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Datasets", exact: true })
  ).toBeVisible();
  await page.getByLabel("Filters").click();
  await page.getByLabel("CSV").click();
  await page.getByLabel("Research").click();
  await page.getByRole("button", { name: "Apply" }).click();
  await page.getByLabel("COVID-19 Dataset", { exact: true }).click();

  const downloadPromise = page.waitForEvent("download");
  await page.getByLabel("Download").click();
  const download = await downloadPromise;
  await download.saveAs("download/samplefile.csv");

  await page.goto(
    "https://chandrudemo.sharepoint.com/sites/test-v/Test%20Folder/Forms/AllItems.aspx?npsAction=createList"
  );
  await page
    .getByPlaceholder("Email, phone, or Skype")
    .fill("venkat@chandrudemo.onmicrosoft.com");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByPlaceholder("Password").fill("Vudu898529");
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.getByLabel("Upload").click();

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    await page.getByLabel("Files", { exact: true }).click(),
  ]);
  await fileChooser.setFiles("download/samplefile.csv");
  await page.getByRole("button", { name: "Replace" }).click();
  await expect(
    page.getByText("Uploaded samplefile.csv to Test Folder")
  ).toBeVisible();
});
