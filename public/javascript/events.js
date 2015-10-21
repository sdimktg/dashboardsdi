$(document).ready(function() {
    
/******************************************************************************************************
Dropdown List State and Location(Test Mode)will  be filling with json object from heroku database 

******************************************************************************************************/
     var Alabama = [
                {display: "Alabama1", value: "1"},
                {display: "Alabama2", value: "2"}];
            
            var Georgia = [
                 {display: "Georgia1", value: "1"},
                 {display: "Georgia2", value: "2"},
                 {display: "Georgia3", value: "3"},
                 {display: "Georgia4", value: "4"},
                 {display: "Georgia5", value: "5"},
                 {display: "Georgia6", value: "6"},
                 {display: "Georgia7", value: "7"},
                 {display: "Georgia8", value: "8"},
                 {display: "Georgia9", value: "9"},
                 {display: "Georgia10", value: "10"},
                 {display: "Georgia11", value: "11"},
                 {display: "Georgia12", value: "12"},
                 {display: "Georgia13", value: "13"},
                {display: "Georgia14", value: "14"}];
            
            var Ohio = [
                {display: "Ohio1", value: "1"},
                {display: "Ohio2", value: "2"},
                {display: "Ohio3", value: "3"},
                {display: "Ohio4", value: "4"},
                {display: "Ohio5", value: "5"}];
            
            var Ontario = [
                {display: "Ontario1", value: "1"},
                {display: "Ontario2", value: "2"}];
            
            
             var Mississipi = [
                {display: "Missi1", value: "1"},
                {display: "Missi2", value: "2"},
                {display: "Missi3", value: "3"},
                {display: "Missi4", value: "4"}];
            
            
            var Tennessee = [
                {display: "Tenne1", value: "1"},
                {display: "Tenne2", value: "2"},
                {display: "Tenne3", value: "3"},
                {display: "Tenne4", value: "4"},
                {display: "Tenne5", value: "5"},
                {display: "Tenne6", value: "6"},
                {display: "Tenne7", value: "7"}];
            
            
            var Texas = [
                 {display: "Texas1", value: "1"},
                 {display: "Texas2", value: "2"},
                 {display: "Texas3", value: "3"},
                 {display: "Texas4", value: "4"},
                 {display: "Texas5", value: "5"},
                 {display: "Texas6", value: "6"},
                 {display: "Texas7", value: "7"},
                 {display: "Texas8", value: "8"},
                 {display: "Texas9", value: "9"},
                 {display: "Texas10", value: "10"},
                 {display: "Texas11", value: "11"},
                 {display: "Texas12", value: "12"},
                 {display: "Texas13", value: "13"}];
            
            
        $("#state_s").change(function(){
        
            var state = $(this).val();
            
            switch(state){
                
                case 'AL':
                    
                    list(Alabama);
                    break;
                    
                    case 'GA':
                    
                    list(Georgia);
                    break;
                    
                    case 'OH':
                    
                    list(Ohio);
                    break;
                    
                    case 'ON':
                    
                    list(Ontario);
                    break;
                    
                    case 'TN':
                    
                    list(Tennessee);
                    break;
                    
                    case 'TX':
                    
                    list(Texas);
                    break;
                    
            }
        });
            
            
    function list(array_list)
    {
        
        $("#location_s").html("");
        $(array_list).each(function(i) {
            
            $("#location_s").append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
        
        
        });
    }
                 
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