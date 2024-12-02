import React from 'react'

type Props = {}

const index = (props: Props) => {
	return (
		<div className='w-full flex justify-between items-center pr-4 pl-10 py-7 border-t-0.5 border-[#C1C1C1]  '>
			<div className='flex gap-8'>
				<div className='divide-x divide-slate-200'>Sipariş Özeti</div>
				<div className="flex items-center">
 </div>
				<div>
					<h3>Squier Bullet Strat Laurel Klavye Arctic Black Elektro Gitar</h3>
					<h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sapien sapien.</h3>
				</div>
			</div>
			<div>
				<div>$2350.00</div>
				<button>Sepete Ekle</button>
			</div>
		</div>
	)
}

export default index