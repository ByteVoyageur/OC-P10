import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { api, DataProvider } from '../../contexts/DataContext'
import Events from './index'

const data = {
  events: [
    {
      id: 1,
      type: 'soirée entreprise',
      date: '2022-04-29T20:28:45.744Z',
      title: 'Conférence #productCON',
      cover: '/images/stem-list-EVgsAbL51Rk-unsplash.png',
      description:
        'Présentation des outils analytics aux professionnels du secteur',
      nb_guesses: 1300,
      periode: '24-25-26 Février',
      prestations: [
        '1 espace d’exposition',
        '1 scéne principale',
        '2 espaces de restaurations',
        '1 site web dédié',
      ],
    },

    {
      id: 2,
      type: 'forum',
      date: '2022-04-29T20:28:45.744Z',
      title: 'Forum #productCON',
      cover: '/images/stem-list-EVgsAbL51Rk-unsplash.png',
      description:
        'Présentation des outils analytics aux professionnels du secteur',
      nb_guesses: 1300,
      periode: '24-25-26 Février',
      prestations: ['1 espace d’exposition', '1 scéne principale'],
    },
  ],
}

describe('When Events is created', () => {
  it('a list of event cards is displayed with correct titles', async () => {
    api.loadData = jest.fn().mockReturnValue(data)
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    )

    // Check for the event titles to ensure event cards are displayed.
    await screen.findByText(data.events[0].title)
    await screen.findByText(data.events[1].title)

    // Check for the month "avril" which should be present for both event cards.
    const monthElements = await screen.findAllByText('avril')
    expect(monthElements).toHaveLength(data.events.length)
  })
  describe('and we select a category', () => {
    it('a filtered list is displayed', async () => {
      api.loadData = jest.fn().mockReturnValue(data)
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      )

      fireEvent.click(await screen.findByTestId('collapse-button-testid'))

      fireEvent.click(await screen.findByTestId('item-0'))

      expect(
        await screen.findByText('Conférence #productCON')
      ).toBeInTheDocument()
      expect(screen.queryByText('Forum #productCON')).not.toBeInTheDocument()
    })
  })
})
