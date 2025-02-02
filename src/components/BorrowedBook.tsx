import Book from './Book'
import { useUser } from '../context/user';
import useGetAllBorrowed from '../hooks/useGetAllBorrowed';
import moment from 'moment';

const BorrowedBook = () => {
  const { user } = useUser();
  const { data } = useGetAllBorrowed(user?.id);

  return (
    <>
      <div className='mt-5 grid grid-cols-1 gap-3'>
        {data && data?.length > 0 && data.map((res: any, index: number) => (
          <Book
            key={index}
            id={res?.Book?.id}
            title={res?.Book?.title}
            author={res?.Book?.author}
            available={res?.Book?.available}
            showBorrower={true}
            borrower={res?.User?.name}
            startDate={moment(res?.createdAt).format('YYYY-MM-DD HH:mm')}
            dueDate={moment(res?.dueDate).format('YYYY-MM-DD HH:mm')}
          />
        ))}
      </div>
    </>
  )
}

export default BorrowedBook