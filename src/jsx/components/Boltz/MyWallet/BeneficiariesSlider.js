import React,{useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css"
import Card1 from './../../../../images/card/card44.jpg';
import Card2 from './../../../../images/card/card33.jpg';
import Card3 from './../../../../images/card/card11.jpg';
import Card4 from './../../../../images/card/card22.jpg';
import SwiperCore, {  Scrollbar,Mousewheel} from 'swiper/core';

SwiperCore.use([Scrollbar,Mousewheel]);


const SwiperSlider2= ({ getClickedCard, detailedBeneficiariesArray, }) => {
 
  const [swiperBlog, setSwiperBlog] = useState([]);
  
  useEffect(() => {
		console.log(`BeneficiariesSlider Loaded detailedBeneficiariesArray: `,JSON.stringify(detailedBeneficiariesArray));
		console.dir(detailedBeneficiariesArray);

    	if (detailedBeneficiariesArray)
		{
			if (detailedBeneficiariesArray.length===0) return;

			let newSwiperBlog = []
			for (let i=0; i<detailedBeneficiariesArray.length; i++)
			{
				const imod = i%4;
				let card;
				switch (imod) {
					case 0:
						card = Card1;
						break;
					case 1:
						card = Card2;
						break;
					case 2:
						card = Card3;
						break;
					case 3:
						card = Card4;
						break;
					default:
						card = Card1;
				}
				
				newSwiperBlog.push({image: card, icon: "",  address: detailedBeneficiariesArray[i].address, nickname: detailedBeneficiariesArray[i].nickName, fmsg: detailedBeneficiariesArray[i].message, percent: detailedBeneficiariesArray[i].percent, index: detailedBeneficiariesArray[i].index});
			}
			setSwiperBlog(newSwiperBlog);

		}

  },[detailedBeneficiariesArray])


  return (
    <>
    <Swiper direction={'vertical'} slidesPerView={'auto'} freeMode={true} scrollbar={true} mousewheel={true} 
		
		breakpoints={{
			360: {
				direction: 'horizontal',
				slidesPerView: 'auto',
				
			},
			650: {
				direction: 'horizontal',
				slidesPerView: 2,
				scrollbar: {
					"el": '.swiper-scrollbar',
					
				},
			},
			1200: {
				direction: 'vertical',
				slidesPerView: 'auto',
				scrollbar: {
					el: '.swiper-scrollbar',
				},
			},			
		}}
		className="mySwiper card-swiper"
	>
				{swiperBlog.map((data,index)=>(	
					<SwiperSlide  key={index} onClick = { () => getClickedCard(index) }>
						<div className="card-bx stacked card">
							<img src={data.image} alt="" />
							<div className="card-info pt-4">
								<p className="mb-1 text-white fs-20" >Name </p>
								<div className="d-flex justify-content-between">
									<h6 className="text text-white mb-3 font-w600">{data.nickname}</h6>
								</div>
								<p className="mb-1 text-white fs-20" >Address </p>
								<div className="d-flex justify-content-between">
									<h6 className="text text-white font-w600">{data.address}</h6>
								</div>

							</div>
						</div>
					</SwiperSlide>
				))}
		</Swiper>
    </>
  )
}
export default SwiperSlider2; 
