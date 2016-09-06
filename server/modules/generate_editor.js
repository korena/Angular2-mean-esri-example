module.exports = {
    buildHtml: function(req, res) {
      var html = assemble(req,res);
        res.writeHead(200, {
            'Content-Type': 'text/html',
            // 'Content-Length': html.length,
            'Expires': new Date().toUTCString()
        });
        res.end();
    }
};

     function assemble (req,res){

///edit/:first_name/:last_name/:objectId/:_id
      var paths = [];
       paths = req.url.split("/");
      var first_name = paths[1];
      var last_name  = paths[2];
      var objectId = paths[3];
      var _id = paths[4];

        var header = '  <link rel="stylesheet"  href= "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';

        res.write('<!DOCTYPE html><html><header>');
        res.write(header);
        res.write('</header><body>');
        res.write('<div class="container" style="width: 400px">');
        res.write( '   <div>');
        res.write(        '<h4>Edit Donor Entry</h4>');
        res.write(  '      <form>');
        res.write(  '          <div class="form-group">');
        res.write(  '              <label for="first_name">First Name</label>');
        res.write(  '              <input type="text" class="form-control" value="'+first_name+'" id="first_name" name="first_name" required>');
        res.write(  '              <label for="last_name">Last Name</label>');
        res.write(  '              <input type="text" class="form-control" id="last_name" value="'+first_name+'" name="last_name" required>');
        res.write(  '          </div>');
        res.write(  '          <div class="form-group">');
        res.write(  '              <label for="blood_group">Blood Group</label>');
        res.write(  '              <select class="form-control" id="blood_group" required name="blood_group">');
        res.write(  '                  <option value="A">A</option>');
        res.write(  '                  <option value="A+">A+</option>');
        res.write(  '                  <option value="B">B</option>');
        res.write(  '                  <option value="B+">B+</option>');
        res.write(  '                  <option value="AB">AB</option>');
        res.write(  '                  <option value="O">O</option>');
        res.write(  '              </select>');
        res.write(  '          </div>');
        res.write(  '          <div class="form-group">');
        res.write(  '              <label for="contact_number">Contact Number</label>');
        res.write(  '              <input type="text" class="form-control" id="contact_number" value="'+contact_number+'" name="contact_number" required placeholder="(xxxx-xxx-xxxx)" pattern="^\d{4}-\d{3}-\d{4}$">');
        res.write(  '              <label for="email_address">Email Address</label>');
        res.write(  '              <input type="text" class="form-control" id="email_address" value="'+email_address+'" name="email_address"');
        res.write(  '              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$">');
        res.write(  '          </div>');
        res.write(  '          <div class="form-group">');
        res.write(  '              <label for="longitude">Longitude</label>');
        res.write(  '              <input type="text" class="form-control" id="longitude" value="'+longitude+'" name="longitude" required readonly="true">');
        res.write(  '              <label for="latitude">Latitude</label>');
        res.write(  '              <input type="text" class="form-control" id="latitude" name="latitude" value="'+latitude+'" required readonly="true">');
        res.write(  '          </div>');
        res.write(  '          <input type="submit" class="btn btn-default" value="Update"/>');
        res.write(  '          <button class="btn btn-default">Delete</button>');
        res.write(  '      </form>');
        res.write(  '  </div>');
        res.write('</div>');
        res.write('</body></html>');
    }
