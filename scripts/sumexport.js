function sumexport(ratetype,type,divide,action){
	var data=[];
	$.ajax({
        url: "sumexport.php",
        type: "POST",
        data: {
        	ratetype:ratetype,
        	type:type,
        	divide:divide,
        	action:action
        },
        datatype: "json",
        cache: false,
        beforeSend:function(){
        	$("#loading").show();
        },
        success: function (response) {
        	data=response;
        },
        complete:function(){
        	//console.log("Tab"+ TabType);
        	
        	$("#loading").hide();       	
        	getsummaryData(1,"first","sumary");
        }	 
 });
}


function getsumexportData(ratetype,type,divide,action,pr_status){
	var data=[];
	$.ajax({
        url: "getsumexport.php",
        type: "POST",
        data: {
        	ratetype:ratetype,
        	type:type,
        	divide:divide,
        	action:action,
        	status:pr_status
        },
        datatype: "json",
        cache: false,
        beforeSend:function(){
        	$("#loading").show();
        },
        success: function (response) {
        	data=response;
        },
        complete:function(){
        	//console.log("Tab"+ TabType);
        	
        	$("#loading").hide();       	
        	window.location=self.location;
        }	 
 });
}