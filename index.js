var mongoose = require ('mongoose');
var schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/test');

let Publicacion = mongoose.model('Facebook', schema, 'publicaciones');

let publicacion = new Publicacion ({
    title: 'Feliz Lunes',
    author: 'Ramon Antonio estrada Torres',
    body: 'Imagen',
    comments:{
        body: 'Igualmente',
        date: new Date()
    } ,
    date: new Date(),
    hidden: 1,
    meta: {
        votes: 50,
        favs: 25
    }
});

publicacion.save( function(error){
    if(error){
        console.log(error);
        process.exit(1);
    }
    console.log('Saved!!');
    process.exit(0)
});