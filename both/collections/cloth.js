/*
created by Marc G
11/06/2016
*/

Clothes = new Mongo.Collection("clothes");

Clothes.attachSchema(new SimpleSchema({
	dressingId: {
		type: String		
	},
    clothName: {
        type: String,
        optional: false,
        label: T9n.get("Cloth Name")
    },
    clothType: {
        type: String,
        optional: true,
        label: T9n.get("Cloth Type")
    },
    clothCategory: {
        type: String,
        optional: true,
        label: T9n.get("Cloth Category")
    },
    clothColor: {
        type: String,
        optional: true,
        label: T9n.get("Cloth Color")
    },
    clothGender: {
        type: String,
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: T9n.get("Male"), value: "Male"},
                    {label: T9n.get("Female"), value: "Female"},
                    {label: T9n.get("Unisex"), value: "Unisex"}
                ];
            }
        },
        optional: true,
        label: T9n.get("Cloth Gender")
    },
    clothBrand : {
        type: String,
        optional: true,
        label: T9n.get("Cloth Brand")
    },
    clothSize: {
        type: String,
        optional: true,
        label: T9n.get("Cloth Size")
    },
    clothImages: {
        type: [String],
        optional: true,
        label: T9n.get("Cloth Images")
    },
    clothDescr: {
        type: String,
        optional: true,
        label: T9n.get("Cloth Description")
    }
}));

Clothes.allow({
	insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc) {
        return true;
    }
});