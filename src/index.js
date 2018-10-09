fetch('/api/cards/random', {
	method: 'get',
}).then(res => res.text())
.then(x => console.log(x));

