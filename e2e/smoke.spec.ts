import { test, expect } from '@playwright/test';

const MOCK_PROJECTS = [
  {
    id: '3',
    title: '쇼핑몰 리뉴얼',
    type: 'company',
    description: '레거시 쇼핑몰의 UI·UX 전면 개편 및 프론트엔드 성능 최적화 프로젝트',
    techStack: ['Vue.js', 'JavaScript', 'SCSS', 'Webpack'],
    startDate: '2023-06',
    endDate: '2023-12',
    createdAt: '2023-06-01T00:00:00.000Z',
  },
];

test.beforeEach(async ({ page }) => {
  await page.route('http://localhost:3001/projects', (route) =>
    route.fulfill({ json: MOCK_PROJECTS })
  );
});

test('프로젝트 목록 렌더', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByText('쇼핑몰 리뉴얼')).toBeVisible();
});

test('프로젝트 상세 이동', async ({ page }) => {
  await page.goto('/projects');
  await page.getByText('쇼핑몰 리뉴얼').first().click();
  await expect(page).toHaveURL(/\/projects\/3/);
  await expect(page.getByRole('heading', { name: '쇼핑몰 리뉴얼' })).toBeVisible();
});
