import './header-services-link/header-services-link'
import './header-services-popup/header-services-popup'
import './header-services.styl'

class headerServices {
	static init() {
		const parent = document.querySelector('.header-services')
		const pull = document.querySelector('[data-action=show-services]')
		const popup = document.querySelector('.header-services__popup')
		const popupActiveClass = 'header-services__popup--active'
		const pullActiveClass = 'header-services-link--active'

		pull.addEventListener('click', function() {
			if (popup.classList.toggle(popupActiveClass)) {
				pull.classList.add(pullActiveClass)
			} else {
				pull.classList.remove(pullActiveClass)
			}
		})

		document.addEventListener('click', (e) => {
			if (!parent.contains(e.target)) {
				popup.classList.remove(popupActiveClass)
				pull.classList.remove(pullActiveClass)
			}
		})
	}
}
export default headerServices
