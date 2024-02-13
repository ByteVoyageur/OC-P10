/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Arrow from './Arrow'
import './style.scss'

const Select = ({
  selection,
  onChange,
  name,
  titleEmpty,
  label,
  type = 'normal',
  dataTestId,
}) => {
  const [value, setValue] = useState(selection[0] || '')
  const [collapsed, setCollapsed] = useState(true)

  const changeValue = (newValue) => {
    setValue(newValue)
    setCollapsed(true)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className={`SelectContainer ${type}`} data-testid={dataTestId}>
      {label && <div className='label'>{label}</div>}
      <div className='Select'>
        <ul>
          <button
            className={collapsed ? 'SelectTitle--show' : 'SelectTitle--hide'}
            onClick={() => setCollapsed(!collapsed)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setCollapsed(!collapsed)
            }}
            type='button'
          >
            {value || (!titleEmpty && 'Toutes')}
          </button>
          {!collapsed && (
            <>
              {!titleEmpty && (
                <li onClick={() => changeValue('')}>
                  <input
                    checked={!value}
                    name={name}
                    type='radio'
                    onChange={() => changeValue('')}
                  />{' '}
                  Toutes
                </li>
              )}
              {selection.map((s, index) => (
                <li
                  key={s}
                  onClick={() => changeValue(s)}
                  data-testid={`item-${index}`}
                >
                  <input
                    checked={value === s}
                    name={name}
                    type='radio'
                    onChange={() => changeValue(s)}
                  />{' '}
                  {s}
                </li>
              ))}
            </>
          )}
        </ul>

        <input type='hidden' value={value || ''} name={name} />
        <button
          type='button'
          data-testid='collapse-button-testid'
          className={collapsed ? 'open' : 'close'}
          onClick={() => setCollapsed(!collapsed)}
          aria-label='Toggle Dropdown' // add aria-label
          // eslint-disable-next-line react/jsx-no-duplicate-props
        >
          <Arrow />
        </button>
      </div>
    </div>
  )
}
Select.propTypes = {
  selection: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  titleEmpty: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  dataTestId: PropTypes.string,
}

Select.defaultProps = {
  onChange: () => {},
  titleEmpty: false,
  label: '',
  type: 'normal',
}

export default Select
