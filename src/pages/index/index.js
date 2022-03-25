import app from '../../components/app/app'
import header from '../../components/header/header'
import hero from '../../components/hero/hero'
import stages from '../../components/stages/stages'
import slides from '../../components/slides/slides'
import feedback from '../../components/feedback/feedback'

document.addEventListener('DOMContentLoaded', function () {
	app.init()
	header.init()
	hero.init()
	stages.init()
	slides.init()
	feedback.init()
})
