import { test, expect } from '@playwright/test';

test('프로젝트 목록 렌더', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByText('Todo App')).toBeVisible();
});

test('프로젝트 상세 이동', async ({ page }) => {
  await page.goto('/projects');
  await page.getByText('Todo App').first().click();
  await expect(page).toHaveURL(/\/projects\/todo-app/);
  await expect(page.getByRole('heading', { level: 1, name: 'Todo App' })).toBeVisible();
});
