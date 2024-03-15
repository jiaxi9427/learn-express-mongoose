var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: {type: String, required: true, maxLength: 100},
  family_name: {type: String, required: true, maxLength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function() {
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name;
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  var lifespanString = '';
  if (this.date_of_birth) {
    lifespanString += this.date_of_birth.getFullYear().toString();
  } else {
    lifespanString += 'Unknown';
  }
  
  lifespanString += ' – ';
  
  if (this.date_of_death) {
    lifespanString += this.date_of_death.getFullYear().toString();
  } else {
    lifespanString += '';
  }
  
  return lifespanString;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);

