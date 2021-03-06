var express = require('express'),
    http = require('http'),
    path = require('path'),
   
    bodyParser = require('body-parser'),
    app = express();

var session  = require('express-session');
var localStorage = require('node-localstorage');
var pg = require('pg');


app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

app.get('/appid', function(req, res) {
    res.send({appId: appId});
});



app.set('port', process.env.PORT || 5000);


/***********************************************************************************************
TEST SESSION VARIABLE
************************************************************************************************/
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

    app.get('/',function(req,res){
        
        sess=req.session;
            //Session set when user Request our app via URL
    if(sess.hashid)
    {
        res.redirect('/launchpad');
    }
        
    else{
            res.render('index.html');
        }
});

/***********************************************************************************************
Check the user credentials in salesforce
************************************************************************************************/
app.post('/check', function(req, res) {
    
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        
        if (err) console.log(err);
        
     var check  = 'SELECT name, employee_name__c, sfid FROM  salesforce.SDI_Rep_LP__c  WHERE lp_pass__c = $1 AND work_email__c = $2 ';
        conn.query(check,[req.body.login_pass__c,req.body.email__c],
       function(err, result){
                done();
                if (err != null || result.rowCount == 0) {
                     console.error(err);
                     console.log(check);
                    
                    res.status(400).json({error: err});
                }
                else {
                    
                    req.session.name = req.body.name;
                    res.json(result);
                
                }
                   
        });   
    });
});



app.get('/check', function(req, res) {
    
    sess=req.session;
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        
        if (err) console.log(err);
        
     var check  = 'SELECT hashid__c, employee_name__c FROM  salesforce.CDN_Reps__c ';
        conn.query(check, function(err, result) {
          
           if (err) {
               
                res.send('Error in Query');
        
           }
            res.json(result);
            
            });
        });
}); 



app.get('/logout',function(req,res){

    
    req.session.destroy(function(err){
    
    
        if(err){
            console.log(err);
        }
        else
        {
           
            res.redirect('/index.html');
        }
    });

});

/******************************************************************************************************
GET- User Links : Display all the links associated with the user 
******************************************************************************************************/
app.post('/listinglinks',function(req,res) {
   
     pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
     
     if (err) console.error(err);
         
         
         var links = 'SELECT sfid,link_name__c, links__c  FROM salesforce.SDI_Reps_Link__c WHERE cdnrep_sfid__c = $1 ';
            conn.query(links,[req.body.related],
            
            function(err, result){
                done();
                if (err != null || result.rowCount == 0) {
                    
                    res.status(400).json({error: err});
                }
                else {
                    
                    res.json(result);
                }
                   
        });
                       
    });
 
});


/***********************************************************************************************
GET-/LOCATION: Find the fields from the custom object and display it in the form (KPF.html)
************************************************************************************************/
app.post('/site_location',function(req,res) {
    
     pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
     
     if (err) console.error(err);
        
        var select = 'SELECT sfid, name, store__c, full_location__c FROM salesforce.SDI_Site_Location__c WHERE store__c = $1 ';
        conn.query(select,[req.body.request], 
                   
        function(err, result){
            done();
            
                if (err != null || result.rowCount == 0) {
                    
                    res.status(400).json({error: err});
                }
                else {
                    
                    res.json(result);
                }
                   
        });           
        });
});



/*********************************************************************************************************
POST-/create: Receive the form from the client side and create a new record in the database/salesforce
**********************************************************************************************************/
app.post('/new_kpf', function(req, res) {
    
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        
        if (err) console.log(err);
        
        
        var insert = 'INSERT INTO salesforce.SDI_Rep_KPF__c (Event_Date__c, store_app__c , sdi_site_location__c , fuel_center_app__c, hour__c, notes__c, sdi_sfid__c) VALUES ($1, $2, $3, $4, $5,$6, $7)';
                    
            conn.query(insert,[req.body.datePicker, req.body.store_app, req.body.location, req.body.fuel_center,req.body.hour,req.body.notes, req.body.sfid],
    
                  function(err, result) {
                        
                    done();
                        
                    if (err) {
                        
                        res.status(400).json({error: err.message});
                    }
                    else {
                        // this will still cause jquery to display 'Record updated!'
                        // eventhough it was inserted
                        res.json(result);
                    }
               
               
});         
                    
                               
  });         
            });         
          
/***********************************************************************************************
GET-/Listing: Find the fields from the custom object and display it in the form (index.html)
************************************************************************************************/
app.get('/listing',function(req,res) {
    
     pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
     
     if (err) console.error(err);
        
        var select = 'SELECT sfid, Name, date_purchased__c ,subscription__c, number_of_licenses_purchased__c FROM salesforce.IT_Software_Type__c ORDER BY Name ASC ';
        conn.query(select, function(err, result) {
          
           if (err) {
               
                res.send('Error in Query');
        
           }
            res.json(result);
            
            });
        });
});


/******************************************************************************************************
GET-/softwareName: Display the Software name that does not have licenses
******************************************************************************************************/
app.get('/softwareName',function(req,res) {

     pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
     
     if (err) console.error(err);
        
        var select = 'SELECT sfid, Name FROM salesforce.IT_Software_Type__c WHERE number__c = 0 ORDER BY Name ASC ';
        conn.query(select, function(err, result) {
          
           if (err) {
               
                res.send('select');
        
           }
            res.json(result);
         
            });
        });
});

/***********************************************************************************************************
POST-/updateSoftware: Receive the form from the client side and update the record in the database/salesforce
************************************************************************************************************/
app.post('/update', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        
        if (err) console.log(err);
        
     var update = 'UPDATE salesforce.IT_Software_Type__c SET number_of_licenses_purchased__c = $1, externalid__c = $2   WHERE sfid = $3';
        conn.query(update,[req.body.number_of_licenses_purchased__c, req.body.sfid, req.body.externalid__c],
       function(err, result) {
                done();
                if (err != null || result.rowCount == 0) {
                     console.error(err);
                    res.status(400).json({error: err});
                }
                else {
                    res.json(result);
                }
            }
            
        );
   
          var insert = 'INSERT INTO salesforce.IT_Software_Log__c (IT_Software_Type__c, number_of_licenses_purchased__c) VALUES ($1,$2)';
                    
            conn.query(insert,[req.body.IT_Software_Type__c,req.body.number_of_licenses_purchased__c],function(err, result) {
                done();
                if (err != null || result.rowCount == 0) {
                    console.error(err);
                    res.status(400).json({error: err});
                }
                else {
                    res.json(result);
                }
            }
            
        );    
            
    });
});


/*********************************************************************************************************
POST-/create: Receive the form from the client side and create a new record in the database/salesforce
**********************************************************************************************************/
app.post('/create', function(req, res) {
    
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        
        if (err) console.log(err);
        
        var update = 'UPDATE salesforce.IT_Software_Type__c SET number_of_licenses_purchased__c = $1, date_purchased__c = $3, subscription__c =$4  WHERE LOWER(Name) = LOWER($2)';
        
        conn.query(update,[req.body.number_of_licenses_purchased__c, req.body.name, req.body.date_purchased__c, req.body.subscription__c],function(err, result) {
                
        if (err != null || result.rowCount == 0) {
                    
            var insert = 'INSERT INTO salesforce.IT_Software_Type__c (number_of_licenses_purchased__c, Name , date_purchased__c, subscription__c) VALUES ($1, $2, $3, $4)';
                    
            conn.query(insert,[req.body.number_of_licenses_purchased__c, req.body.name, req.body.date_purchased__c, req.body.subscription__c],
    
                  function(err, result) {
                        
                    done();
                        
                    if (err) {
                        
                        res.status(400).json({error: err.message});
                    }
                    else {
                        // this will still cause jquery to display 'Record updated!'
                        // eventhough it was inserted
                        res.json(result);
                    }
                  });
                }
                else {
                    
                    
                    done();
                    res.json(result);
                }
            }
        );
    });
});


/***********************************************************************************************************
POST-/updateSoftware: Receive the form from the client side and update the record in the database/salesforce
************************************************************************************************************/
app.post('/delete', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        
        if (err) console.log(err);
        
            var d = 'DELETE FROM salesforce.IT_Software_Type__c   WHERE sfid = $1';
                    conn.query(d,[req.body.sfid],
                               
       function(err, result) {
                done();
                if (err != null || result.rowCount == 0) {
                     console.error(err);
                    res.status(400).json({error: err});
                }
                else {
                    res.json(result);
                }
            }
            
        );

            
    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});