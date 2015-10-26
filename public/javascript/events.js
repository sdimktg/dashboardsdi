$(document).ready(function() {

    
/******************************************************************************************************
Dropdown List State and Location(Test Mode)will  be filling with json object from heroku database 

******************************************************************************************************/
    
    $('#test').focusout(function(){
        
        var errorMessage = $("#errorMessage");
        var error = $("#warning");
        error.hide();

       
        var request = this.value;
        
                $.ajax({ // ajax call starts
            url: '/site_location', 
            type:"POST",
            dataType: 'json', // Choosing a JSON datatype
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                    request: request,
                   
                }),
           
            success: function(data) {
                
                if (request.length == 0 ) {
                    errorMessage.text("This Store Code Does not exists");
                    error.show();
                }
                
                
                
                
                var clear = $('#location');
                clear.empty();

                data.rows.forEach(function(row){
                $('#location').append('<option id="'+row.sfid+'" value="'+row.sfid+'">' + row.full_location__c +'</option>');     
          });
                  
            },
                        error: function(err) {
                            errorMessage.text("This Store Code Does not exists");
                            error.show();
                        }
        });
        
         });
    
    
    
        $("#new_kpf").submit(function(event) {
                event.preventDefault();

                var errorMessage = $("#errorMessage");
                var error = $("#error");
                error.hide();

                $("#message").hide();

                var datePicker = $("#datePicker").val();
                var store_app = $("#store_app").val();
                var location = $("#location").val();
                var fuel_center = $("#fuel_center").val();
                var hour = $("#hour").val();
                var notes = $("#notes").val();
               

                if (datePicker.length == 0 || store_app.length == 0 || location.length == 0 || fuel_center.length == 0 || hour.length == 0 ) {
                    errorMessage.text("This fields are required.");
                    error.show();
                }
                else {
                    $.ajax({
                        url: event.target.action,
                        method: event.target.method,
                        data: JSON.stringify({
                           datePicker: datePicker,
                            store_app: store_app,
                            location: location,
                            fuel_center: fuel_center,
                            hour: hour,
                            notes: notes
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data) {
                            $("#datePicker").val("");
                            $("#store_app").val("");
                            $("#location").val("");
                            $("#fuel_center").val("");
                            $("#hour").val("");
                            $("#fuel_center").val("");
                            $("#notes").val("");
                            $("#messageMessage").text("IT Software License Created");
                            $("#message").show();
                        },
                        error: function(err) {
                            errorMessage.text(err.responseJSON.error);
                            error.show();
                        }
                    })
                }
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