import { test, expect } from './my-setup'
import {
  setupCreateProjectRequestIntercept,
  setupDeleteProjectRequestIntercept,
  setupGetProjectsIntercept,
  setupUpdateProjectRequestIntercept,
  waitForCreateProjectRequest,
  waitForDeleteProjectRequest,
  waitForGetProjectsRequest,
} from './test-helpers'

import { existingProject, updateProjectResponse } from './fixtures'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test.beforeEach(async ({ page, login }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
})

test('shows empty list of projects', async ({ page }) => {
  // init with no projects
  const getProjectsRequestAssertion = waitForGetProjectsRequest(page)
  setupGetProjectsIntercept(page)
  await page.goto('http://localhost:3000/projects')
  await getProjectsRequestAssertion

  expect(await page.screenshot()).toMatchSnapshot('no-projects.png')
})

test('creates a project', async ({ page }) => {
  // init with no projects
  const getProjectsRequestAssertion = waitForGetProjectsRequest(page)

  setupGetProjectsIntercept(page)

  await page.goto('http://localhost:3000/projects')

  await getProjectsRequestAssertion

  setupCreateProjectRequestIntercept(page)

  // create a project
  await page.getByText('Create a new project').click()
  await page.getByLabel('Project description').fill('New Project')

  const createProjectRequestAssertion = waitForCreateProjectRequest(page)

  await page.getByRole('button', { name: 'Create project' }).click()

  await createProjectRequestAssertion

  expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  // remove toast
  await page.getByText('Project added').click()
  await page.waitForSelector('text="Project added"', { state: 'detached' })

  expect(await page.screenshot()).toMatchSnapshot('project-created.png')
})

test('edits a project', async ({ page }) => {
  const getProjectsRequestAssertion = waitForGetProjectsRequest(page)

  setupGetProjectsIntercept(page, [existingProject])
  await page.goto('http://localhost:3000/projects')
  await getProjectsRequestAssertion

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

test('validates project description', async ({ page }) => {
  const getProjectsRequestAssertion = waitForGetProjectsRequest(page)
  setupGetProjectsIntercept(page)
  await page.goto('http://localhost:3000/projects')

  await getProjectsRequestAssertion

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

test('deletes a project', async ({ page }) => {
  setupDeleteProjectRequestIntercept(page)

  const getProjectsRequestAssertion = waitForGetProjectsRequest(page)
  setupGetProjectsIntercept(page, [existingProject])
  await page.goto('http://localhost:3000/projects')

  await getProjectsRequestAssertion

  // delete the project
  await page
    .getByRole('row', { name: 'Existing Project 0.0 hours Edit' })
    .getByRole('button')
    .click()

  const deleteProjectRequestAssertion = waitForDeleteProjectRequest(page)

  await page.getByLabel('Delete project').click()

  expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  await deleteProjectRequestAssertion

  // remove toast
  await page.getByText('Project deleted').click()
  await page.waitForSelector('text="Project deleted"', { state: 'detached' })

  expect(await page.screenshot()).toMatchSnapshot('project-deleted.png')
})
