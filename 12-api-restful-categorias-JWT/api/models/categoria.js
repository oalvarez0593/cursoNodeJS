const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const CategoriaSchema = Schema({
    id: String,
    name: String
});
CategoriaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Categoria', CategoriaSchema);