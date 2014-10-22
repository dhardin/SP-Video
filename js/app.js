var app = app || {};

videos = [
{
	title: 'Wildlife',
	src: 'videos/',
	description: 'A video about animals and stuff.',
	tags: 'animals; wildlife; outdoors; nature;'
},
{
	title: 'Water',
	src: 'videos/',
	description: 'A video about water and stuff.',
	tags: 'outdoors; nature;'
},
{
	title: 'Toy',
	src: 'videos/',
	description: 'A video about toys and stuff.',
	tags: 'toys; fun;'
},{
	title: 'Mountain',
	src: 'videos/',
	description: 'A video about mountains and stuff.',
	tags: 'outdoors; nature;'
},{
	title: 'Baileys',
	src: 'videos/',
	description: 'A video about horses and stuff.',
	tags: 'outdoors; nature; horses; feed; food;'
},{
	title: 'Dogs',
	src: 'videos/',
	description: 'A video about dogs and stuff.',
	tags: 'outdoors; nature; hunting; dogs; guns;'
}
];

var isTesting = true;

if (!isTesting){
	spData.getData({
		url: 'https://',
	}, 0, function(results){
		app.LibraryCollection = new app.Library(results);
	});
} else {
	app.LibraryCollection = new app.Library(videos);
}