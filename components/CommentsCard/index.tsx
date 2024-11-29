import React from 'react'

interface Props {
	reviews: { reviewerName: string; comment: string }[];
}


const index = (props: Props) => {
	const { reviews } = props
	return (
		<div className="flex flex-col gap-4 font-medium	">
			<label className="custom-22 font-bold text-base	">Ürün Yorumları</label>
			<div className="flex gap-6 flex-col">
				{
					reviews.map((item) => (
						<button key={item.reviewerName} className="flex gap-1 flex-col text-start font-roboto">
							<div className={`text-black text-lg leading-6`}>{item.reviewerName}</div>
							<div className={`text-lg text-black leading-7 font-normal	`}>{item.comment}</div>
						</button>
					))
				}


			</div>

		</div>)
}

export default index