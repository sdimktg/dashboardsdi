$(document).ready(function() {

    
/******************************************************************************************************
Dropdown List State and Location(Test Mode)will  be filling with json object from heroku database 

******************************************************************************************************/
 
     var Alabama = [
                
    "722/OH/DAYTON/10101 LANDING WAY",
"562/TN/KNOXVILLE/702 WINFIELD DUNN PARKWAY",
"686 /TN/FARRAGUT /189 BROOKLAWN STREET", 
"310/AL/LANETT/1401 S GILMER AVE",
"190/TX/HUMBLE/9475 FM 1960 BP",
"938/OH/ENGLEWOOD/885 UNION ROAD",
"488 /TN/MEMPHIS/3444 PLAZA",
"388/MS/BRANDON/1811 W GOVERNMENT ST",
"990/ON/TORONTO/INSTORE/IN CLASS/TRAINING",
"256/TX/ANGELTON/1804 N. VELASCO.",
"366/TX/HOUSTON/12434 TOMBALL PKWY.",
"490/GA/FAYETTEVILLE /805 S GLYNN ST, SUITE 117",
"458/GA/DALTON/1365 W WALNUT AVENUE", 
"419/GA/WOODSTOCK/12050 HIGHWAY 92, SITE # 112",
"999/ON/TORONTO/200 - 65 INTERNATIONAL BLVD/SDI ADMIN",
"260/AL/AUBURN/300 DEANS RD",
"825/OH/KETTERING/2115 E. DOROTHY LANE",
"420/GA/NEWNAN/3150 EAST HIGHWAY 34",
"367/TX/HUMBLE/3820 ATASCOSITA RD.",
"400/GA/MACON/4321 HARTLEY BRIDGE ROAD",
"433/GA/MCDONOUGH /5900 EAST LAKE PARKWAY", 
"999/ON/TORONTO/200 - 65 INTERNATIONAL BLVD/SDI ADMIN",
"862/TN/KNOXVILLE/244 S. HALL RD.",
"917/TX/GRANBURY/3915 HWY 377 EAST"
     ];
            
    
    $( "#test" ).autocomplete({
        source: function( request, response ) {
            
        $.ajax({
          url: "/site_location",   
          dataType: "jsonp",
          type: "POST",
          contentType: "application/json; charset=utf-8",
            data: {q: request.term},
            
            //JSON.stringify({ "full_location__c": full_location__c }),  
            
          success: function (data) {
              
              
              response(data);
                 
              }

            });
    
        },
        minLength: 3
   });     
       
                 
        var employee_name = localStorage.getItem("employee_name__c");
        var nameID = localStorage.getItem("name");
        var related = localStorage.getItem("sfid");

            $("#welcome_user1").append(employee_name);
            $("#welcome_user2").append( "&nbsp; Welcome &nbsp; &nbsp;" + employee_name);
            
            
            $.ajax({
                url: "/listinglinks",
                type: "post",
                data: JSON.stringify({
                    related: related,
                   
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                
                success: function(data) {
                    
                data.rows.forEach(function(row){
                    
                    
                    var print = "<div  class='col-lg-3 col-md-6'><a  id= "+row.sfid+" href="+row.links__c+" target='_blank'><div class='panel panel-green'><div class='panel-heading'><div class='row'><div class='col-xs-3'><i id='icon' class='fa fa-external-link fa-3x'></i></div><div class='col-xs-9 text-right'> <div id='icon' class='huge'>"+row.link_name__c+"</div></div>";
                    
                    print+= "</div></div></div></a></div>";
                    
                    $("#links_info").append(print);

                    });
                }

            });

    $('#datePicker')
        .datepicker({
            format: 'mm/dd/yyyy',
            pickerPosition: "bottom-left"
        })
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#eventForm').formValidation('revalidateField', 'date');
        });    

});