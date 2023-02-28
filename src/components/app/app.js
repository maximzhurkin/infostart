import WebFont from 'webfontloader';
import 'reset.css'
import './app.styl'

class app {
	static getWebp() {
		const elem = document.createElement('canvas')

		if (!!(elem.getContext && elem.getContext('2d'))) {
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
		}
		return false
	}
	static setWebpClass() {
		const webp = this.getWebp()
		const root = document.documentElement

		root.classList.add(webp ? 'webp' : 'no-webp')
	}
	static getTouch() {
		return (
			navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		) ? true : false
	}
	static setTouchClass() {
		const root = document.documentElement

		root.classList.add((this.getTouch()) ? 'touch' : 'no-touch')
	}
	static getCrios() {
		return (navigator.userAgent.match('CriOS')) ? true : false
	}
	static setCriosClass() {
		if (this.getCrios()) {
			document.documentElement.classList.add('crios')
		}
	}
	static loadFonts() {
		WebFont.load({
			google: {
				families: ['Inter:400,600,700,800:latin,cyrillic&display=swap'],
			},
		});
	}
	static init () {
		this.setWebpClass()
		this.setTouchClass()
		this.setCriosClass()
		this.loadFonts()
	}
}
export default app
