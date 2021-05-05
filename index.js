var mongoose = require('mongoose');
var schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/test');

let Publicacion = mongoose.model('Facebook', schema, 'publicaciones');

let publicacion = new Publicacion({
    title: 'Feliz Lunes',
    author: 'Ramon Antonio estrada Torres',
    body: 'Imagen',
    comments: {
        body: 'Igualmente',
        date: new Date()
    },
    date: new Date(),
    hidden: 1,
    meta: {
        votes: 50,
        favs: 25
    }
});

//----------------------------------------------------Crear insercion MongodB
publicacion.save(function (error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    console.log('Saved!!');
    //----------------------------------------------------Busqueda General

    Publicacion.find(function (error, docs) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log('<-------------------Consulta General----------------->');
        console.log(docs);

        //----------------------------------------------------Busqueda por parametro
        Publicacion.find({ _id: '6090115f79026b05081c0f70' },
            function (error, docs) {
                if (error) {
                    console.log(error);
                    process.exit(1);
                }
                console.log('<---------------------Consulta por parametro--------------------->');
                console.log(docs);

                //----------------------------------------------------Actualizar
                Publicacion.update({ _id: '6090115f79026b05081c0f70' },
                    { $set: { hidden: false } },
                    function (error, docs) {
                        if (error) {
                            console.log(error);
                            // process.exit(1);

                        }


                        console.log('<---------------------Actualizacion--------------------->');
                        console.log(docs);

                        //----------------------------------------------------Busqueda General

                        Publicacion.find(function (error, docs) {
                            if (error) {
                                console.log(error);
                                process.exit(1);
                            }
                            console.log('<-------------------Consulta General Despues de Actualizar----------------->');
                            console.log(docs);

                            //-------------------------------------------Borrar

                            Publicacion.findByIdAndRemove({ _id: '6090115f79026b05081c0f70' },

                                function (error, docs) {
                                    if (error) {
                                        console.log(error);
                                        // process.exit(1);

                                    }
                                    console.log('<---------------------Eliminar--------------------->');
                                    console.log(docs);

                                    //----------------------------------------------------Busqueda General

                                    Publicacion.find(function (error, docs) {
                                        if (error) {
                                            console.log(error);
                                            process.exit(1);
                                        }
                                        console.log('<-------------------Consulta General Despues de Borrar----------------->');
                                        console.log(docs);
                                    });
                                });
                        });

                    });

            });

    });

});