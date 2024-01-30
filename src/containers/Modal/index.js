import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Icon from '../../components/Icon'
import './style.scss'

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened)

  // Use useEffect to synchronize the external 'opened' state
  useEffect(() => {
    setIsOpened(opened)
  }, [opened])

  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className='modal'>
          <div className='content'>
            {/* Ensure Content is rendered as a component */}
            <Content />
            <button
              type='button'
              data-testid='close-modal'
              onClick={() => setIsOpened(false)}
              aria-label='Close' // Accessible label for screen readers
            >
              <Icon name='close' />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

Modal.defaultProps = {
  opened: false,
}

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.elementType.isRequired, // Updated to elementType
  children: PropTypes.func.isRequired,
}

export default Modal
