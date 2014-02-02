
function loadonedigit(){
	$data="";
	$.ajax({
	    url: "customer.php",
	    type: "POST",
	    data: {JSonResult:dataJSON},
	    datatype: "json",
	    beforeSend:function(){
	    	$("#loading").delay(1500).show();
	    },
	    success: function (response) {
	        data=response;
	    },
	    complete:function(){
	      	    
	      if (data)
	    	$("#msg").html(msg2);
	      else
	    	$("#msg").html(msg1);  
	     
	   	  if($("#msg").is(":hidden")){
	   		$("#msg").slideDown('slow').delay(2500).slideUp('slow');
	   	  }
	   	$("#loading").delay(3500).hide();
	    }
	});		
	
}

function loadtwodigit(){
	
	
}

function loadthreedigit(){
	
	
}