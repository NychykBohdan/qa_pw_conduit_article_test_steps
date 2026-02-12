import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  article = {
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    tag: [faker.lorem.word(), faker.lorem.word()],
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Create an article with all required and optional fields', async () => {

  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleBodyField(article.body);
  await createArticlePage.fillArticleTagField(article.tag);
  
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertArticleTitleIsVisible(article.title);
});

test(`Create an article without 'tags' field`, async () => {

  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleBodyField(article.body);
  
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertArticleTitleIsVisible(article.title);
});