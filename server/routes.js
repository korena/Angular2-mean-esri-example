import donorRoutes from './routes/_donors.router.js';

var htmlGen = require('./modules/generate_editor.js');

export default (app, router, passport) => {


    // ### Express Middlware to use for all requests
    router.use((req, res, next) => {

        console.log('API hit'); // DEBUG

        // Make sure we go to the next routes and don't stop here...
        next();
    });




    // All of our routes will be prefixed with /api
    app.use('/api', router);

    // Pass in our Express app and Router.
    // Also pass in auth & admin middleware and Passport instance
    donorRoutes(app, router);

    // ### Generated urls hit this end

    app.get('/edit/:first_name/:last_name/:objectId/:_id', function(req, res, next){
        console.log(req);
        htmlGen.buildHtml(req,res);
        next();
    });

    // ### Frontend Routes (none API)

    app.get('*index.html', (req, res) => {
        res.sendFile('/dist/index.html', { root: __dirname + "/../" });
    });
    app.get('/', (req, res) => {
        res.sendFile('/dist/index.html', { root: __dirname + "/../" });
    });
    app.get('/vendor.bundle.js', (req, res) => {
        res.sendFile('/dist/vendor.bundle.js', { root: __dirname + "/../" });
    });
    app.get('/main.bundle.js', (req, res) => {
        res.sendFile('/dist/main.bundle.js', { root: __dirname + "/../" });
    });
    app.get('/assets/main.css',(req, res) => {
        console.log(req);
        res.sendFile('/dist/assets/main.css'+ req.file, { root: __dirname + "/../" });
    });


};
