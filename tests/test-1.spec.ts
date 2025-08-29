import { test, expect } from '@playwright/test';

// Se creó este test con Record de Playwright
test('Test de Mercadolibre con Record de Playwright', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com/');
  await page.getByRole('link', { name: 'Colombia' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).fill('IPhone');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('link', { name: 'Apple iPhone 16 Pro (128 GB) - Titanio del desierto' }).click();
  await page.getByRole('button', { name: 'Boton 2 de 4, 256 GB' }).click();
});
