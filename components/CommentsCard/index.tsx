"use client"

import React, { useState } from 'react'
import StarCreate from '@/components/StarCreate'
import StarYellowFillIcon from '@/components/icons/StarYellowFillIcon';
import StarYellowOutlinedIcon from '@/components/icons/StarYellowOutlinedIcon';

interface Props {
	reviews: { reviewerName: string; comment: string, rating: number }[];
}


const Index = (props: Props) => {

	const { reviews } = props
	const [showReviews, setShowReviews] = useState(reviews?.length > 2 ? 2 : reviews?.length)
	const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});

	const toggleComment = (index: number) => {
		setExpandedComments(prev => ({ ...prev, [index]: !prev[index] }));
	};
	return (
		<div className="flex flex-col gap-4 font-medium">
			<label className="custom-22 font-bold text-base font-poppins">Ürün Yorumları</label>
			<div className="flex gap-6 flex-col">
				{
					reviews?.slice(0, showReviews)?.map((item, index) => (
						<div key={index} className="flex gap-1 flex-col text-start font-roboto">
							<div className='flex items-center gap-4'>
								<div className={`text-black text-lg leading-6`}>{item.reviewerName}</div>
								<div className="flex gap-[9.6px]">
									<StarCreate data={item.rating} svg={<StarYellowFillIcon />} svgOutlined={<StarYellowOutlinedIcon />} />
								</div>
							</div>
							<div className={`text-lg text-black leading-7 font-normal`}>
								{expandedComments[index] || item.comment.length <= 100 ? item.comment : `${item.comment.slice(0, 100)}... `}
								{item.comment.length > 100 && (
									<button onClick={() => toggleComment(index)} className="text-green font-normal text-lg font-roboto leading-7 ">
										{expandedComments[index] ? 'Daha az göster' : 'Daha fazla göster'}
									</button>
								)}
							</div>
						</div>
					))
				}

				{showReviews < reviews.length && (
					<button onClick={() => setShowReviews(reviews.length)} className='font-inter max-w-fit text-white bg-black text-sm font-medium leading-6 py-2 px-6 rounded-lg'>
						Tümünü Gör
					</button>
				)}
			</div>
		</div>
	)

}

export default Index