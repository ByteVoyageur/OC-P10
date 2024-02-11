import PropTypes from 'prop-types'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

const DataContext = createContext({})

export const api = {
  loadData: async () => {
    const json = await fetch('/events.json')
    return json.json()
  },
}
// api.loadData() is a mock function that returns a promise that resolves to a JSON object.

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData())
    } catch (err) {
      setError(err)
    }
  }, [])
  useEffect(() => {
    if (data) return
    getData()
  })
  // usecallback is used to prevent the getData function from being recreated on every render.

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        // value is an object that contains the data and error states, as well as the getData function.
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext)
// useData is a custom hook that returns the context value.
export default DataContext
