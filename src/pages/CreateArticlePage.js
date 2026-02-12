import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.bodyField = page.getByPlaceholder(`Write your article (in markdown)`);
    this.tagField = page.getByPlaceholder('Enter tags');
    this.articleTitle = page.locator('h1');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill Article title field with ${title}`, async () => {
      await this.titleField.fill(title);
    })
  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill Article about field with ${description}`,
       async () => {
        await this.descriptionField.fill(description);
    })
  }

  async fillArticleBodyField(body) {
    await test.step(`Fill Article body 
      field with ${body}`, async () => {
        await this.bodyField.fill(body);
    })
  }

  async fillArticleTagField(tags) {
    const tagArray = Array.isArray(tags) ? tags : [tags];
    
    await test.step(`Fill Article tag field with 
      ${tagArray.join(', ')}`, async () => {
        for (const tag of tagArray) {
          await this.tagField.fill(tag);
          await this.page.keyboard.press('Enter');
        }      
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert Article title ${title} is Visible`, async () => {
      await expect(this.articleTitle.filter({ hasText: title })).toBeVisible();
    })
  }
}
