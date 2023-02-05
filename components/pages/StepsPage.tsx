import { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Step0 from '../Step0'
import Step1 from '../Step1'
import Step2 from '../Step2'

export const StepsPage = () => {
   const sliderRef = useRef<Slider>(null)

   return (
      <Slider
         ref={sliderRef}
         {...{
            swipe: false,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
         }}
         className='h-full'
      >
         {[
            {
               key: 'step-0',
               page: <Step0 sliderRef={sliderRef} />,
            },
            {
               key: 'step-1',
               page: <Step1 sliderRef={sliderRef} />,
            },
            {
               key: 'step-2',
               page: <Step2 sliderRef={sliderRef} />,
            },
         ].map(({ page, key }) => (
            <div key={key} className='h-screen'>
               {page}
            </div>
         ))}
      </Slider>
   )
}

export default StepsPage
