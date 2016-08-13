/**
 * Created by Marc on 20/06/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import './viewCloth.html';

/*Template.viewCloth.onRendered(function viewClothPageOnRendered() {
  $("#multidatespicker").multiDatesPicker();
  var item = Clothes.findOne({_id: FlowRouter.current().params._id});
  var datesArray = item.disponibility;
  $("#multidatespicker").multiDatesPicker('addDates', datesArray);
});*/

Template.viewCloth.helpers({
	cloth: function(){
        var item = Clothes.findOne({_id: FlowRouter.current().params._id});
        return item;
	},
	getTradName: function(){
		return T9n.get("Cloth Name");
	},
	getTradType: function(){
		return T9n.get("Cloth Type");
	},
	getTradTheme: function(){
		return T9n.get("Cloth Theme");
	},
	getTradColor: function(){
		return T9n.get("Cloth Color");
	},
	getTradGender: function(){
		return T9n.get("Cloth Gender");
	},
	getTradSize: function(){
		return T9n.get("Cloth Size");
	},
	getTradImage: function(){
		return T9n.get("Cloth Image");
	},
	getTradDescr: function(){
		return T9n.get("Cloth Description");
	},
	getClothImage: function(clothId) {
		var item = Images.findOne({_id: clothId});
		return item.url;
	},
	getThumbnail: function(imgUrl) {
		var thumb = Imgur.toThumbnail(imgUrl, Imgur.LARGE_THUMBNAIL);
		return thumb;
	},
	disponibility: function(){
		var item = Clothes.findOne({_id: FlowRouter.current().params._id});
		return item.disponibility;
	}
});

Template.viewCloth.events({
	'submit #dateSelection': function(event, template) {
		event.preventDefault();
		var selected = template.findAll("input[type=checkbox]:checked");
		var array = _.map(selected, function(item){
			return item.defaultValue;
		});
		swal({
            title: "Confirmation",
            text: "Etes vous sûr de vouloir louer cet objet aux dates suivantes ?<br/>" + array,
            type: "warning",
            confirmButtonColor: "#00897b",
            confirmButtonText: "Oui",
            showCancelButton: true,
            cancelButtonText: "Non",
            closeOnConfirm: false,
            html: true
        }, function(){
        	//TODO: function
            /*UserInfos.update(infos._id,
                {$set: {address: {
                    street: Session.get('location').streetNumber + " " + Session.get('location').streetName,
                    postalCode: Session.get('location').zipcode,
                    city: Session.get('location').city,
                    country: Session.get('location').country
                }}},
                function(error, result) {
                    if(error){
                        swal("Error !",
                            "Error : " + error.invalidKeys,
                            "error");
                    }
                    else {*/
						swal("Requête envoyée !",
				            "Une requête a été envoyée au propriétaire. Nous vous notifierons lors de sa réponse.",
				            "success");
                //}
        });
	}
});