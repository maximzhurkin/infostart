import JustValidate from 'just-validate'
import IMask from 'imask'
import '../../label/label'
import '../../input/input'
import '../../required/required'
import '../../button/button'
import './feedback-form.styl'

class feedbackForm {
	static init() {
		IMask(document.querySelector('input[type=tel]'), {
			mask: '+{7}(000)000-00-00'
		});

		const validation = new JustValidate('.feedback-form', {
			errorFieldCssClass: 'input--invalid',
			errorLabelCssClass: 'required',
			errorLabelStyle: {},
		})

		validation
			.addField('#person', [
				{
					rule: 'required',
					errorMessage: 'Имя и фамилия обязательно для заполнения',
				},
			])
			.addField('#phone', [
				{
					rule: 'required',
					errorMessage: 'Телефон обязателен для заполнения',
				},
				{
					validator: (value) => {
						return /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value)
					},
					errorMessage: 'Неверный формат телефона',
				},
			])
			.addField('#email', [
				{
					rule: 'required',
					errorMessage: 'Почта обязательна для заполнения',
				},
				{
					rule: 'email',
					errorMessage: 'Неверный формат почты',
				},
			])
			.addField('#comment', [
				{
					rule: 'required',
					errorMessage: 'Задача обязателена для заполнения',
				},
			])
			.onSuccess((e) => {
				const loadingClass = 'feedback-form--loading'
				const form = e.srcElement
				const data = new FormData(form)

				if (form.classList.contains(loadingClass)) {
					return false
				} else {
					form.classList.add(loadingClass)
					fetch('api/feedback/', {
						method: 'POST',
						body: data
					})
					.then(res => res.json())
					.then(res => {
						if (res.status) {
							form.reset()
							form.classList.remove(loadingClass)
						}
					})
				}
			})
	}
}
export default feedbackForm
