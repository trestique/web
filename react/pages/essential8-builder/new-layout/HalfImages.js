import React from 'react'
import Srcset from '../../../components/Srcset'
const HalfImages = ({half_image}) => {
  return (
    <div className="half-images">
   {   half_image.map((item,i) => {
        if(!item.img){
          return null;
        }
        return (
            <div className='half-image-item' key={i}>
                <a href={item?.link} className="image-container">
                {typeof item?.img === 'object' && item?.img?.src  ? 
                    <Srcset className="full-image" src={item?.img?.src}/>
                   :
                   <Srcset className="full-image" src={item?.img}/>
                  }
                </a>
            </div>
        )
      })}
    </div>
  
  )
}

export default HalfImages