const trivia = {
	title: 'Trivia de prueba',
	image: 'https://48tools.com/wp-content/uploads/2015/09/shortlink.png',
	questions: [
		{
			text: 'En que pais se realiza el combate final en Rocky IV',
			image:
				'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
			lifetimeSeconds: 5,
			options: [
				{ text: 'En China', correct: false },
				{ text: 'En Italia', correct: false },
				{ text: 'En Rusia', correct: false },
				{ text: 'En EE.UU', correct: true },
			],
		},
		{
			text: 'Quien descubrio america',
			image:
				'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg',
			lifetimeSeconds: 7,
			options: [
				{ text: 'Napoleon', correct: false },
				{ text: 'Cristoval Colon', correct: true },
				{ text: 'Juan Tomas de Aquino', correct: false },
				{ text: 'Bartolome Mitre', correct: false },
			],
		},
		{
			text: 'Cuando empeso la segunda guerra mundial',
			image:
				'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg',
			lifetimeSeconds: 4,
			options: [
				{ text: 'en 1939 ', correct: true },
				{ text: 'en 2015', correct: false },
				{ text: 'en 1820', correct: false },
				{ text: 'en 1755', correct: false },
			],
		},
	],
};

module.exports = trivia;
