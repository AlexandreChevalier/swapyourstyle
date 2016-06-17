/*
created by Marc G
29/05/2016
*/

userProfile = new Mongo.Collection("userProfile");

addressSchema = new SimpleSchema({
    street: {
        type: String,
        label: T9n.get("Street")
    },
    postalCode: {
        type: String,
        max: 5,
        regEx:/^\d+$/,
        label: T9n.get("Postal Code")
    },
    city: {
        type: String,
        label: T9n.get("City")
    },
    country: {
        type: String,
        label: T9n.get("Country")
    }
});

userProfile.attachSchema(new SimpleSchema({
	userId: {
		type: String
	},
    firstName: {
        type: String,
        optional: true,
        label: T9n.get("Firstname")
    },
    lastName: {
        type: String,
        optional: true,
        label: T9n.get("Lastname")
    },
    birthdate: {
        type: Date,
        optional: true,
        label: T9n.get("Birthdate")
    },
    gender: {
        type: String,
        autoform: {
            type: "select",
            label: T9n.get("Gender"),
            options: function () {
                return [
                    {label: T9n.get("Male"), value: "Male"},
                    {label: T9n.get("Female"), value: "Female"},
                    {label: T9n.get("Other"), value: "Other"}
                ];
            }
        },
        optional: true
    },
    phoneNumber : {
        type: String,
        max: 10,
        regEx: /^\d+$/,
        label: T9n.get("Phone Number"),
        optional: true
    },
    bio: {
        type: String,
        max: 500,
        optional: true,
        label: T9n.get("Bio")
    },
    address: {
        type: addressSchema,
        optional: true,
        label: T9n.get("Address")
    }
}));

userProfile.allow({
    update: function(doc){
        return true;
    }
});