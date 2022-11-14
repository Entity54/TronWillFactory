import React,{useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css"

import Card2 from './../../../../images/card/card33.jpg';
import Card3 from './../../../../images/card/card11.jpg';

import SwiperCore, {  Scrollbar,Mousewheel} from 'swiper/core';

SwiperCore.use([Scrollbar,Mousewheel]);

const SwiperSlider2= ({ allAdminAccounts, getClickedAccount,  }) => {
 
  const [swiperBlog, setSwiperBlog] = useState([{image: Card2, address: "999TVb6TusyyPYPSg6QfJAgrM3zoEFGa9iCq4"}]);

  useEffect(() => {
		console.log(`SwiperSlider2 Loaded allAdminAccounts: `,JSON.stringify(allAdminAccounts));
		let newSwiperBlog = []
		for (let i=0; i<allAdminAccounts.length; i++)
		{
			const card = i===0? Card2 : Card3;
			newSwiperBlog.push({image: card, address: allAdminAccounts[i] });
		}
		setSwiperBlog(newSwiperBlog);
  },[allAdminAccounts])


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
					<SwiperSlide  key={index}>
						<div className="card-bx stacked card"  onClick = { () => getClickedAccount(data.address) }>
							<img src={data.image} alt="" />
							<div className="card-info">
								<p className="mb-1 text-white fs-20">Registered TRON Address</p>
								<div className="d-flex justify-content-between">
									<h6 className="text text-white mb-3 font-w600">{data.address}</h6>
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
