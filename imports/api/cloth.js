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
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: T9n.get("Top"), value: "Top"},
                    {label: T9n.get("Bottom"), value: "Bottom"},
                    {label: T9n.get("Shoes"), value: "Shoes"}
                ];
            }
        },
        optional: true,
        label: T9n.get("Cloth Type")
    },
    clothTheme: {
        type: String,
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: T9n.get("Wedding"), value: "Wedding"},
                    {label: T9n.get("Party"), value: "Party"},
                    {label: T9n.get("Casual"), value: "Casual"}
                ];
            }
        },
        optional: true,
        label: T9n.get("Cloth Theme")
    },
    clothColor: {
        type: String,
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: T9n.get("Blue"), value: "Blue"},
                    {label: T9n.get("Red"), value: "Red"},
                    {label: T9n.get("Green"), value: "Green"},
                    {label: T9n.get("White"), value: "White"},
                    {label: T9n.get("Black"), value: "Black"},
                    {label: T9n.get("Brown"), value: "Brown"},
                    {label: T9n.get("Yellow"), value: "Yellow"},
                    {label: T9n.get("Purple"), value: "Purple"},
                    {label: T9n.get("Pink"), value: "Pink"},
                    {label: T9n.get("Gray"), value: "Gray"}
                ];
            }
        },
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
    //on vérifie que l'utilisateur a bien le droit de modifier l'objet
	insert: function(userId, doc) {
        return doc && (userId === doc.userId);
    },
    update: function(userId, doc) {
        return doc && (userId === doc.userId);
    }
});