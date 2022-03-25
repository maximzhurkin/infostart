import '../icon-button/icon-button'
import '../logo/logo'
import '../menu/menu'
import headerMenu from './header-menu/header-menu'
import headerServices from './header-services/header-services'
import './header.styl'

class header {
	static init() {
		const burger = document.querySelector('[data-action=show-menu]')
		const close = document.querySelectorAll('[data-action=close-menu]')
		const menu = document.querySelector('.menu')
		const menuClassActive = 'menu--active'

		burger.addEventListener('click', function() {
			menu.classList.add(menuClassActive)
		})
		close.forEach(action => {
			action.addEventListener('click', function () {
				menu.classList.remove(menuClassActive)
			})
		})

		headerMenu.init()
		headerServices.init()
	}
}
export default header
