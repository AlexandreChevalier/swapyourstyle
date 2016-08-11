// Clothes properties

var p = {};
export const clothes_properties = p;

p.sizes = {
	'32':'32',
	'34':'34',
	'36':'36',
	'38':'38',
	'40':'40',
	'42':'42',
	'44':'44',
	'46':'46',
	'48':'48',
	'50':'50',
	'52':'52',
	'54':'54'
};

p.types = {
	'Top':'top',
	'Blazer':'blazer',
	'Full Outfit':'full',
	'Jacket':'jacket',
	'Denim':'denim',
	'Dress':'dress',
	'Sweat-shirt':'sweatshirt',
	'Jeans':'jeans',
	'Full':'full',
	'Sweater':'sweater',
	'Suit':'suit',
	'Lingerie & Nightwear':'lingerie_nightwear',
	'Maternity':'Maternity',
	'Shirts & Blouses':'shirts_blouses',
	'Shoes':'shoes',
	'Shorts':'shorts',
	'Socks & tights':'socks_tights',
	'Swimsuit':'swimsuit',
	'T-shirts and tank tops':'t_shirts_tank_tops',
	'Pants & leggings':'pants_leggings',
	'Office Suit':'office_suit'
};

p.themes = {
	'Wedding':'wedding',
	'Festival':'festival',
	'Casual':'casual',
	'Disguise':'disguise',
	'Holidays':'holidays',
	'Party':'party',
	'Workwear':'workwear',
	'Vintage':'vintage',
	'Technical clothing':'technial'
};

p.colors = {
	'Blue':'#0000FF',
	'Deep Blue':'#000066',
	'Beige':'#F5F1DE',
	'Red':'#FF0000',
	'Green':'#00CC00',
	'White':'#FFFFFF',
	'Cream':'#FFFFCC',
	'Black':'#000000',
	'Brown':'#663300',
	'Yellow':'#FFFF00',
	'Gold':'#FFD700',
	'Orange':'#FF8000',
	'Purple':'#CC0066',
	'Pink':'#FF6666',
	'Gray':'#A0A0A0',
	'Silver':'#C0C0C0',
	'Copper':'#C87533',
	'Taupe':'#483C32',
	'Tawny':'#CD5700',
	'Mixed':'mixed'
};

p.genders = {
	'Male':'male',
	'Female':'female',
	'Unisex':'unisex'
};

/**
 * Transformations for each object :
 * {k:v} -> [{label:k, value:v}]
 */
for(o in p){
	var t = [];
	for(z in p[o]){
		var u = {};
		u.label = z; 
		u.value = p[o][z];
		t.push(u);
	}
	p[o] = t;
}