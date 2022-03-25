import MoveTo from 'moveto'
import './header-menu.styl'

class headerMenu {
	static init() {
		const links = document.querySelectorAll('[data-scroll]')
		const moveTo = new MoveTo()

		links.forEach(link => {
			link.onclick = function (e) {
				e.preventDefault()
				document.querySelector('.menu').classList.remove('menu--active')
				moveTo.move(document.getElementById(link.dataset.scroll), {
					tolerance: 52,
					duration: 300
				})
			}
		})
	}
}
export default headerMenu
