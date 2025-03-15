import Badge from '@/component/Badge'
import React from 'react'
import IntroPost from './IntroPost'
import banner from '../images/intro.png'
import { useParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { getCard } from '@/services/apiCard'
import Spinner from '@/component/Spinner'
import { BASE_URL } from '@/api/api'

const IntroDetails = () => {
  const { id } = useParams();

  const {
    isPending,
    isError,
    error,
    data: card,
  } = useQuery({
    queryKey: ["cards", id],
    queryFn: () => getCard(id),
  });

  console.log(card);
  if (isPending) {
    return <Spinner/>;
  }


    return (
      <div className="padding-dx max-container py-9">
        <Badge card={card}/>
  
        <div className="flex justify-between items-center">
          <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
           {card.title}
          </h2>
        </div>
  
        <IntroPost card={card}/>
  
        <div className="w-full h-[350px] my-9 overflow-hidden rounded-sm">
          <img className="w-full h-full object-cover rounded-sm" src={`${BASE_URL}${card.featured_image}`} />
        </div>
        <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
          {card.content}
        </p>
      </div>
    )
  }
  
  export default IntroDetails
