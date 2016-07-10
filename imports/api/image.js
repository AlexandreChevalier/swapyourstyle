/*
created by Marc G
11/06/2016
*/
export const Images = new FilesCollection({
  /*storagePath: 'assets/app/uploads/Images',
  downloadRoute: '/uploads',*/
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  //public: true,
  debug: true,
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

//Images.collection.attachSchema(new SimpleSchema(Images.schema));

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function imagesPublication() {
    return Images.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });

  Images.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}