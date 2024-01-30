import { useState } from 'react'
import EventCard from '../../components/EventCard'
import Select from '../../components/Select'
import { useData } from '../../contexts/DataContext'
import Modal from '../Modal'
import ModalEvent from '../ModalEvent'

import './style.css'

const PER_PAGE = 9

const EventList = () => {
  const { data, error } = useData()
  const [type, setType] = useState('all') // default value is 'all'
  const [currentPage, setCurrentPage] = useState(1)

  const filteredEvents = data?.events.filter((event, index) => {
    // add type filter
    const isTypeMatch = type === 'all' || event.type === type
    const isInCurrentPage =
      (currentPage - 1) * PER_PAGE <= index && PER_PAGE * currentPage > index
    return isTypeMatch && isInCurrentPage
  })

  const changeType = (evtType) => {
    setCurrentPage(1)
    setType(evtType || 'all') // if evtType is null, set type to 'all'
  }
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1
  const typeList = new Set(data?.events.map((event) => event.type))
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        'loading'
      ) : (
        <>
          <h3 className='SelectTitle'>Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id='events' className='ListContainer'>
            {filteredEvents.map((event) => (
              <Modal
                key={event.id}
                opened={false} // 初始状态为关闭
                Content={<ModalEvent event={event} />} // 传递ModalEvent作为内容
              >
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)} // 点击事件卡片打开模态窗口
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className='Pagination'>
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href='#events' onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default EventList
