"use client"
import Button from '@/componets/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const booking = () => {
    router.push('/booking');
  };
  return (
    <div style={{ backgroundImage:"url('/images/home_bg.jpg')"}} className='relative flex flex-col-reverse  lg:flex-row justify-center items-start md:items-center min-h-screen bg-cover bg-center'>
      <div className='absolute inset-0 bg-black bg-opacity-70'></div>
        <div className='relative z-10 text-center '>
          <div><h1 className='text-3xl md:text-5xl xl:text-6xl leading-tight md:leading-snug xl:leading-normal text-[#ededed]'>Book Your <span className='font-bold text-yellow-400'>Movie Tickets</span></h1></div>
          <div><Button onClick={booking}  text='Book Ticket' className='mt-6 px-8 py-3 rounded-lg  bg-red-500 text-white text-lg'/></div>
        </div>
        <div className="relative z-10 md:w-1/2 p-10  md:block">
          <img
            src="/images/home_image.jpg"
            alt="Movie Theater"
            className="rounded-lg shadow-lg w-full h-auto filter brightness-50 mix-blend-overlay -mt-48 lg:-mt-0 "
          />
        </div>
    </div>
  );
}
