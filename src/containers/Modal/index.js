import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Icon from '../../components/Icon'
import './style.scss'

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened)

  useEffect(() => {
    setIsOpened(opened)
  }, [opened])

  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className='modal'>
          <div className='content'>
            {/* 直接渲染Content作为React元素 */}
            {Content}
            <button
              type='button'
              data-testid='close-modal'
              onClick={() => setIsOpened(false)}
              aria-label='Close'
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
  Content: PropTypes.element.isRequired, // nessesary
  children: PropTypes.func.isRequired,
}

export default Modal
