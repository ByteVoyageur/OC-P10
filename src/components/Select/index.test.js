import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Select from './index'

describe('Select Component', () => {
  const selectionOptions = ['Option 1', 'Option 2', 'Option 3']
  const onChangeMock = jest.fn()
  const name = 'testSelect'

  beforeEach(() => {
    render(
      <Select
        selection={selectionOptions}
        onChange={onChangeMock}
        name={name}
        label='Test Select'
      />
    )
  })

  test('renders with default state and label', () => {
    expect(screen.getByText('Test Select')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument()
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument() // Initially not visible
  })

  test('toggles options list on button click', () => {
    const collapseButton = screen.getByTestId('collapse-button-testid')
    fireEvent.click(collapseButton) // Open
    expect(screen.getByText('Option 2')).toBeInTheDocument()

    fireEvent.click(collapseButton) // Close
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
  })

  test('selects an option and calls onChange', () => {
    fireEvent.click(screen.getByTestId('collapse-button-testid')) // Open options list
    fireEvent.click(screen.getByText('Option 2')) // Select an option

    expect(onChangeMock).toHaveBeenCalledWith('Option 2')
    expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument() // New selected option is visible
  })
})
