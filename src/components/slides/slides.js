import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import './slides-item/slides-item'
import './slides.styl'

class slides {
	static init() {
		Swiper.use([Navigation, Pagination])

		new Swiper('.swiper-container', {
			slidesPerView: 1,
			cssMode: (navigator.userAgent.match('CriOS')) ? true : false,
			navigation: {
				prevEl: ".slides__arrow--prev",
				nextEl: ".slides__arrow--next",
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
		})
	}
}
export default slides
