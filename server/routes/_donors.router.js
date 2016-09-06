// # User API object

// HTTP Verb  Route                   Description

// GET        /api/user             Get all of Users
// GET        /api/user/:_id  Get a single User by User id
// POST       /api/user             Create a single User
// DELETE     /api/user/:_id  Delete a single User
// PUT        /api/user/:_id  Update a User with new info

// Load the `recipe` model
import User from '../models/user.model';

export default (app, router) => {

  // ## User API Routes

  router.route('/user')

    // ### Create a `user`

    // Accessed at POST http://localhost:3000/api/user

    // Create a `user`
    .post((req, res) => {
      console.log('user post hit');
      var user = new User(req.body);
      console.log('req.body: ',req.body);
      console.log('user posted:',user.email_address);
      user.save(function(err){
        if(err) return console.error(err);
        res.send({message: 'successful'});
      });
    })

    // ### Get all of the `users`

    // Accessed at GET http://localhost:3000/api/user
    .get((req, res) => {
      console.log('user get hit');
      // Use mongoose to get all users in the database
      User.find((err, user) => {

        if(err)
          res.send(err);

        else
          res.json(user);
      });
    });


  router.route('/user/:email_address')

  .get((req,res) => {
      console.log('single user by email get hit: ',req.params.email_address);
      User.findOne({email_address: req.params.email_address},(err,user)=>{
            if(err){
              res.send(err); 
            }else if (user){
              console.log('user fetched: ',user);
              res.json(user);
            }else{
              res.status(204).send();
            }
      });
  });



  router.route('/user/:_id')

    // ### Get a `user` by ID

    // Accessed at GET http://localhost:3000/api/user/:_id
    .get((req, res) => {
          
      // Use mongoose to fetch a single `user` by id in the database
          console.log('single user by id get hit');
          User.findOne(req.params._id, (err, user) => {
            if(err){
              res.send(err);  
            }
            else if (!user || !user.length){
              res.status(204).send();
            }else{
              res.json(user);
            }
          });
    })

    // ### Update a `user` by ID

    // Accessed at PUT http://localhost:3000/api/user/:_id
    .put((req, res) => {
      console.log('update user hit');
      // use our `user` model to find the `user` we want
      User.findOne({

        '_id' : req.params._id

      }, (err, user) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.first_name)
          user.first_name = req.body.first_name;

        if (req.body.last_name)
          user.last_name = req.body.last_name;

        if (req.body.rating)
          user.contact_number = req.body.contact_number;

        if (req.body.creator)
          user.email_address = req.body.email_address;

        if (req.body.description)
          user.blood_group = req.body.blood_group;

        // save the `user`
        return user.save((err) => {

          if (err)
            res.send(err);

          res.send(user);

        });
      });
    })

    // ### Delete a `user` by ID

    // Accessed at DELETE http://localhost:3000/api/user/:_id
    .delete((req, res) => {
      // DEBUG
      console.log(`Attempting to delete user with id: ${req.params._id}`);

      User.remove({

        _id : req.params._id
      }, (err, user) => {

        if(err)
          res.send(err);

        else
          console.log('User successfully deleted!');

        User.find((err, users) => {
          if(err)
            res.send(err);

          res.json(users);
        });
      });
    });
};
