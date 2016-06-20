/*
created by Marc G
11/06/2016
*/

export const Clothes = new Mongo.Collection("clothes");

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('clothes', function clothesPublication() {
    return Clothes.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Clothes.attachSchema(new SimpleSchema({
    userId: {
        type: String
    },
	dressingId: {
		type: String		
	},
    clothName: {
        type: String,
        optional: true,
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
        return !! doc;
    },
    update: function(userId, doc) {
        return true;
    }
});