import { render } from '@testing-library/react'
import React from 'react'
import Faker from 'faker'
import Frame from '../Frame'

test('formats standard gutterball frame correctly', () => {
  const testScore = Faker.random.number()
  const frame = {
    number: 1,
    rolls: [0,0],
    score: testScore,
    isCurrentFrame: true
  }
  const { getByText, getAllByText } = render(<Frame {...frame}/>)
  const rolls = getAllByText(/-/i)
  expect(rolls).toHaveLength(2)
  const score = getByText(testScore)
  expect(score).toBeInTheDocument()
})

test('formats standard spare frame correctly', () => {
  const testScore = Faker.random.number()
  const frame = {
    number: 1,
    rolls: [3,7],
    score: testScore,
    isCurrentFrame: true
  }
  const { getByText } = render(<Frame {...frame}/>)
  const rollOne = getByText('3')
  expect(rollOne).toBeInTheDocument()
  const rollTwo = getByText('/')
  expect(rollTwo).toBeInTheDocument()
  const score = getByText(testScore)
  expect(score).toBeInTheDocument()
})