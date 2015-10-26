$(document).ready(function() {

    
/******************************************************************************************************
Dropdown List State and Location(Test Mode)will  be filling with json object from heroku database 

******************************************************************************************************/
    
    $('#test').focusout(function(){
        location.reload();
        var request = this.value;
        
        alert(request);
        
                $.ajax({ // ajax call starts
            url: '/site_location', 
            type:"POST",
            dataType: 'json', // Choosing a JSON datatype
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                    request: request,
                   
                }),
           
            success: function(data) {

                data.rows.forEach(function(row){
                $('#location').append('<option id="store__c" value="'+row.store__c+'">' + row.full_location__c +'</option>');     
          });
                  
            }
        });
        
         });
    
 /*   
    
        $( "#test" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "/site_location",
          dataType: "jsonp",
          data: {
            q: request.term
              
          },
          success: function( data ) {
            response( data );
          }
        });
      },
            
    
      minLength: 2,
    
     select: function( event, ui ) {
        log( ui.item ?
          "Selected: " + ui.item.label :
          "Nothing selected, input was " + this.value);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      }
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });
    
    
    /*
       $("#test").autocomplete({
        source: function (request, response) {
            $.ajax({
                dataType: "json",
                data: {
                    term: request.term,
                },
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                cache: true,
                url: '/site_location',
                success: function (data) {
                    var array = $.map(data.value, function (item) {
                        return {
                            label: item.full_location__c,
                            value: item.full_location__c
                        }
                    });

                    //call the filter here
                    response($.ui.autocomplete.filter(array, request.term));
                },
                error: function (data) {

                }
            });
        },
        //minLength: 3,
        open: function () {

        },
        close: function () {

        },
        focus: function (event, ui) {

        },
        select: function (event, ui) {

        }
    });
    
/*
            $.ajax({
                type: "POST",
                url: '/site_location',
                dataType: "json",
                data: {
                   type: $("#test").val(),
                    term: request.term
                },
                
                success: function (data) {
                    
                    response($.map(data,function(c){
                    
                    return {
                        
                        label: c.full_location__c,
                        value: c.full_location__c
                    
                    }
                    
                     }));
                                
                }
                
            });
            
            */

    /*
    
    
    
    
    
        $.ajax({
          url: "/site_location",   
          dataType: "json",
          data: {term: request.term,},
          type: "Get",
          contentType: 'application/json; charset=utf-8',
            
            //JSON.stringify({ "full_location__c": full_location__c }),  
            
          success: function (data) {
              
              var array = $.map(data.value, function(item){
                  
                  return {
                  
                    label : item.store,
                    value : item.full_location
                  }
                 
              });
              
              $( "#test" ).autocomplete({
                source: array,
                minLength: 2,
                select: function( event, ui ) {
  
                }
            });    
              
          }
});

               
   */              
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