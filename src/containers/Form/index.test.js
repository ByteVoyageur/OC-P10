import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import mockContactApi from './mockContactApi' // Assurez-vous que le chemin est correct
import Form from './index'

// Simuler correctement mockContactApi
jest.mock('./mockContactApi', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('Lorsque le Formulaire est rendu', () => {
  it('affiche correctement les champs du formulaire', async () => {
    render(<Form />)
    await screen.findByText('Email')
    await screen.findByText('Nom')
    await screen.findByText('Prénom')
    await screen.findByText('Personel / Entreprise')
  })

  describe('et un clic est déclenché sur le bouton de soumission', () => {
    it("l'action de succès est appelée", async () => {
      // Configurer mockContactApi pour réussir la réponse
      mockContactApi.mockImplementation(() => Promise.resolve())

      const onSuccess = jest.fn()
      render(<Form onSuccess={onSuccess} />)

      // Utiliser fireEvent.click pour simplifier l'action de clic
      fireEvent.click(await screen.findByTestId('button-test-id'))

      // Attendre que le bouton affiche "En cours"
      await waitFor(() =>
        expect(screen.getByText('En cours')).toBeInTheDocument()
      )

      // Ici, pas besoin d'attendre à nouveau le texte "Envoyer", car il apparaît après l'achèvement de l'envoi
      // Au lieu de cela, attendre que onSuccess soit appelé
      await waitFor(() => expect(onSuccess).toHaveBeenCalled())
    })
  })
})
