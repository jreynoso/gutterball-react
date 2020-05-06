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
  const score = getByText(`${testScore}`)
  expect(score).toBeInTheDocument()
})

test('formats standard spare frame correctly', () => {
  const frame = {
    number: 1,
    rolls: [3,7],
    score: Faker.random.number(),
    isCurrentFrame: true
  }
  const { getByText } = render(<Frame {...frame}/>)
  const rollOne = getByText('3')
  expect(rollOne).toBeInTheDocument()
  const rollTwo = getByText('/')
  expect(rollTwo).toBeInTheDocument()
})

test('formats standard strike frame correctly', () => {
  const frame = {
    number: 1,
    rolls: [10],
    score: Faker.random.number(),
    isCurrentFrame: true
  }
  const { getByText } = render(<Frame {...frame}/>)
  const strike = getByText('X')
  expect(strike).toBeInTheDocument()
})

test('formats final frame correctly', () => {
  const frame = {
    number: 10,
    rolls: [10, 3, 7],
    score: Faker.random.number(),
    isCurrentFrame: true
  }
  const { getByText } = render(<Frame {...frame}/>)
  const strike = getByText('X')
  expect(strike).toBeInTheDocument()
  const rollTwo = getByText('3')
  expect(rollTwo).toBeInTheDocument()
  const rollThree = getByText('/')
  expect(rollThree).toBeInTheDocument()
})

test('formats final frame correctly when strike followed by gutterball and spare', () => {
  const frame = {
    number: 10,
    rolls: [10, 0, 10],
    score: Faker.random.number(),
    isCurrentFrame: true
  }
  const { getByText } = render(<Frame {...frame}/>)
  const strike = getByText('X')
  expect(strike).toBeInTheDocument()
  const rollTwo = getByText('-')
  expect(rollTwo).toBeInTheDocument()
  const rollThree = getByText('/')
  expect(rollThree).toBeInTheDocument()
})