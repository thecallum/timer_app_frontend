import { test, expect } from '../playwright/my-setup'
import {
  setupCreateProjectRequestIntercept,
  setupDeleteProjectRequestIntercept,
  setupGetProjectsIntercept,
  setupUpdateProjectRequestIntercept,
  waitForCreateProjectRequest,
  waitForDeleteProjectRequest,
  waitForGetProjectsRequest,
  waitForUpdateProjectRequest,
} from '../playwright/test-helpers'

import { existingProject, updateProjectResponse } from '../playwright/fixtures'

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
})

test('shows empty list of projects', async ({ page }) => {
  // init with no projects
  await setupGetProjectsIntercept(page, [])

  await Promise.all([
    page.goto('http://localhost:3000/projects'),
    waitForGetProjectsRequest(page),
  ])

  expect(await page.screenshot()).toMatchSnapshot('no-projects.png')
})

test.describe('creates a project', () => {
  test.beforeEach(async ({ page }) => {
    // init with no projects
    await setupGetProjectsIntercept(page, [])

    await Promise.all([
      page.goto('http://localhost:3000/projects'),
      waitForGetProjectsRequest(page),
    ])
  })

  test('request error', async ({ page }) => {
    // create a project
    await page.getByText('Create a new project').click()
    await page.getByLabel('Project description').fill('New Project')

    await setupCreateProjectRequestIntercept(page, null, 400)

    await Promise.all([
      page.getByRole('button', { name: 'Create project' }).click(),
      waitForCreateProjectRequest(page, 400),
    ])

    // assert error message
    expect(
      page
        .getByLabel('Create a project')
        .getByText('Request failed with status code 400'),
    ).toHaveCount(1)
  })

  test('project created', async ({ page }) => {
    await setupCreateProjectRequestIntercept(page)

    // create a project
    await page.getByText('Create a new project').click()
    await page.getByLabel('Project description').fill('New Project')

    await Promise.all([
      page.getByRole('button', { name: 'Create project' }).click(),
      waitForCreateProjectRequest(page),
    ])

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // remove toast
    await page.getByText('Project added').click()
    await page.waitForSelector('text="Project added"', { state: 'detached' })

    expect(await page.screenshot()).toMatchSnapshot('project-created.png')
  })
})

test.describe('edits a project', () => {
  test.beforeEach(async ({ page }) => {
    await setupGetProjectsIntercept(page, [existingProject])

    await Promise.all([
      page.goto('http://localhost:3000/projects'),
      waitForGetProjectsRequest(page),
    ])
  })

  test('request error', async ({ page }) => {
    await setupUpdateProjectRequestIntercept(page, null, 400)

    // edit the project
    await page
      .getByRole('row', { name: 'Existing Project 0.0 hours Edit' })
      .getByRole('button')
      .click()

    await page.getByLabel('Project description').fill('updated description')

    await Promise.all([
      page
        .getByLabel('Edit project')
        .getByRole('button', { name: 'Edit project' })
        .click(),
      waitForUpdateProjectRequest(page, 400),
    ])

    // assert error message
    expect(
      page
        .getByLabel('Edit project')
        .getByText('Request failed with status code 400'),
    ).toHaveCount(1)
  })

  test('edits a project', async ({ page }) => {
    // edit the project
    await page
      .getByRole('row', { name: 'Existing Project 0.0 hours Edit' })
      .getByRole('button')
      .click()

    await page.getByLabel('Project description').fill('updated description')

    await setupUpdateProjectRequestIntercept(page, {
      ...updateProjectResponse,
      id: 82,
    })

    await page
      .getByLabel('Edit project')
      .getByRole('button', { name: 'Edit project' })
      .click()

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // remove toast
    await page.getByText('Project updated').click()
    await page.waitForSelector('text="Project updated"', { state: 'detached' })

    expect(await page.screenshot()).toMatchSnapshot('project-updated.png')
  })
})

test('validates project description', async ({ page }) => {
  await setupGetProjectsIntercept(page, [])

  await Promise.all([
    page.goto('http://localhost:3000/projects'),
    waitForGetProjectsRequest(page),
  ])

  // create a project
  await page.getByText('Create a new project').click()

  // set invalid description
  await page.getByLabel('Project description').fill('aaaaaaaaaa'.repeat(4))

  // click add button
  await page.getByRole('button', { name: 'Create project' }).click()

  // assert error message
  expect(page.getByText('Description cannot exceed 30 characters')).toHaveCount(
    1,
  )
})

test.describe('deletes a project', () => {
  test.beforeEach(async ({ page }) => {
    await setupGetProjectsIntercept(page, [existingProject])

    await Promise.all([
      page.goto('http://localhost:3000/projects'),
      waitForGetProjectsRequest(page),
    ])
  })

  // test('request error', async ({ page }) => {
  //   await setupDeleteProjectRequestIntercept(page, 400)

  //   await page
  //     .getByRole('row', { name: 'Existing Project 0.0 hours Edit' })
  //     .getByRole('button')
  //     .click()

  //   await Promise.all([
  //     page.getByLabel('Delete project').click(),
  //     waitForDeleteProjectRequest(page, 400),
  //   ])

  //   // assert error message
  //   expect(page.getByText('Request failed with status code 400')).toHaveCount(1)
  // })

  test('deletes a project', async ({ page }) => {
    await setupDeleteProjectRequestIntercept(page)

    await page
      .getByRole('row', { name: 'Existing Project 0.0 hours Edit' })
      .getByRole('button')
      .click()

    await Promise.all([
      page.getByLabel('Delete project').click(),
      waitForDeleteProjectRequest(page),
    ])

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // remove toast
    await page.getByText('Project deleted').click()
    await page.waitForSelector('text="Project deleted"', { state: 'detached' })

    expect(await page.screenshot()).toMatchSnapshot('project-deleted.png')
  })
})
