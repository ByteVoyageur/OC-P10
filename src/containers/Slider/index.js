import { useEffect, useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { getMonth } from '../../helpers/Date'
import './style.scss'

const Slider = () => {
  const { data } = useData() // destructure the data from the context const reuslt = useData() const data = result.data
  const [index, setIndex] = useState(0)
  const byDateDesc = [...(data?.focus || [])].sort(
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  )

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        ),
      5000
    )
    return () => clearTimeout(timer)
  }, [index, byDateDesc.length])

  return (
    <div className='SlideCardList'>
      {byDateDesc?.map((event, idx) => (
        <div
          key={`${event.title}-${event.date}`}
          className={`SlideCard SlideCard--${
            index === idx ? 'display' : 'hide'
          }`}
        >
          <img src={event.cover} alt='forum' />
          <div className='SlideCard__descriptionContainer'>
            <div className='SlideCard__description'>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className='SlideCard__paginationContainer'>
        <div className='SlideCard__pagination'>
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={`${event.title}-${event.date}`}
              type='radio'
              name='radio-button'
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
              // Add an onChange handler to make this a controlled component
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slider
