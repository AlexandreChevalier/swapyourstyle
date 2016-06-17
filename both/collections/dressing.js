/*
created by Marc G
29/05/2016
*/

Dressing = new Mongo.Collection("dressing");

Dressing.attachSchema(new SimpleSchema({
	userId: {
		type: String
	},
	dressingName: {
		type:String,
        optional: true,
        label: T9n.get("Dressing Name")
	},
    clothes: {
        type: [Clothes],
        optional: true
    }
}));

Dressing.allow({
    update: function(userId, doc) {
        return true;
    }
});
