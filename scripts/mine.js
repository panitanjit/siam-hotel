//Global variable.

var TabType=0; //tab 0=เลขบน / 1=เลข ล่าง
var LottoType=0; //
var Str_Type="";
var Data1="";
var Data2="";
var offset=0;
var dataheight=0;
var cusid="0";
var rawData=[];
var rawVolume=[];
var cusinfo=[];
var symbolnumber=/^\d{1,5}$/;

$(document).ready(function(e) {
 	 	
	
	    getCustomer(CkCusId()); //ดึงรายชื่อลูกค้า
 
	    CreatHtmlLayout(); //สร้างและปรับแต่ง หน้าจอ โปรแกรม
	    
	    //ajaxmenu(); //loadmenu
     	
	    $(".content").mCustomScrollbar();  	//สร้าง Scroll Bar 
     	     	
     	//ตั้งค่า ขนาด ตัวเลข เริ่มต้นที่ 3ตัวเลข
     	limitlengthinput(0);
     	
     	
  
     	$("#lottonumber").keypress(function(e,ui){
     		var intRegex = /^\d+$/g; //match for only number
     		var symbol3=/^\d+\.?\d*$/; //Match for number . number
     		var symbol4=/^\d+\+?\d*$/; //Match for number + number
     		
     		
     		var str1=$("#lottonumber").val();
     		limitlengthinput(TabType);
     		
     		//console.log("Number is foucus");
     		if( e.keyCode ==  13 )
     		    {
     			 	if(intRegex.test(str1)) {
     	    		   //ตรวจสอบเลขไม่มี 4 หลักในเลขหมู่
     			 	   console.log(find_unique_characters(str1));
     	    		   if (TabType==2 && $("#lottonumber").val().length==4 || find_unique_characters(str1)==1){
     	    			   $("#lottonumber").val("").focus();
     	    		   }else{
     	    			   $("#LottoVolume").focus();
     	    		   }
     			 	}else{
     	    		   $("#lottonumber").val("").focus();
     	    		}
     		    }
     	});
     	
     	
     	$("#LottoVolume").keypress(function(e,ui){
     		var symbol2=/^\d{1,5}$/;
     		var symbol3=/^\d{1,5}\.\d{1,5}$/; //Match for number . number And not over 4 digit
     		var symbol4=/^\d{1,5}\+\d{1,5}$/; //Match for number + number And not over 4 digit 
     		var symbol5=/^\-\d{1,5}$/; //Match for -number
     		var symbol6=/^\-\d{1,5}\.\-\d{1,5}$/; //Match for -number . (-number)
     		var symbol7=/^\-\d{1,5}\+\-\d{1,5}$/; //Match for -number + (-number)
     		
     		var str2=$("#LottoVolume").val();
     		limitlengthinput(TabType);
     		
     		if( e.keyCode ==  13 )
     		    {
     			
     			if (symbol5.test(str2)){
     				//console.log("- is pass");
     			}
     			
     			if((((symbol4.test(str2) || symbol3.test(str2)) || symbol5.test(str2))|| symbol2.test(str2))||symbol6.test(str2)||symbol7.test(str2) && str2!=0){	   
     				   if (symbol3.test(str2)){
     					   console.log("kub");
     					   LottoType="kub"; 
     				   }else if (symbol4.test(str2)){
     					   console.log("tod");
     					   LottoType="tod";
     				   }
     				   
     				   //console.log("- is pass");
     	    		   //Save Raw Data and Update amount by number
     	    		   setRawData(cusid);
     	    		   
     	    		   ScrollLast(TabType);

     	    		   $("#LottoVolume").val("");
     	    		   
     	    		   $('#lottonumber').val('').focus();
     	    		   		     	 			        	 			
     	    	}else{
     	    		$("#LottoVolume").val("").focus();	   
     	    	}
     		 }
     	});
     	
         	
     	$(window).resize(function() {
    		//console.log("window has resize");
     		CreatHtmlLayout();
    		ScrollLast(0);
    	});
     
     	
     	//Auto Complete in Lotto Value.
     	$("#LottoVolume").on("keyup",function(){
     		var newArray=$.unique(rawVolume);
     		$("#LottoVolume").autocomplete({
     	 		source: newArray.sort()
     	 	});	
     		//console.log(newArray);
     	});
     	       	
     	
     	var customerinfo="customerinfo"+cusid;
     	
     	try {
			
     		var d=[];
     		if ($.isEmptyObject(getCook("raw"))==false){
     			console.log(getCook("raw"));
     			d=JSON.parse(getCook("raw"));
     			console.log(d[0]);
     		}    
     		    		
     		console.log(getCook(customerinfo));
     		
     		if ($.isEmptyObject(getCook(customerinfo))==false && getCook(customerinfo)!=null){
    			var cusdata=JSON.parse(getCook(customerinfo));
    			if (cusdata!=null){
    				$("#sheetorder").html(cusdata[0].sheetid);
        			$("#cusname").html(cusdata[0].customername);
    			}else{
    				$("#sheetorder").html("0");
        			$("#cusname").html("--");
    			}
    			     		
    		}else{
    			$("#sheetorder").html("0");
    			$("#cusname").html("--");     
    		}
     		
		} catch (e) {
			// TODO: handle exception
			console.log(e.message);
		}

		//console.log(cusdata[0].sheetid);
		
		$("#sheet").keypress(function(e,ui){
			if (e.keyCode==13){
				 if (symbolnumber.test($("#sheet").val())){
					 $("#shcover").hide("slide", { direction: "up" }, "fast");
					 $("#sheetorder").html($("#sheet").val());
					 
					 if ($.isEmptyObject(cusinfo)==true){
						 var cus_name=$("#cusname").html();
						 //var cus_id=cusid;
					 }else{
						 var cus_name=cusinfo[0].customername;
					 }
					 
					 if ($.isEmptyObject(cusinfo)==true){
						 var cus_id=cusid;
					 }else{
						 var cus_id=cusinfo[0].cusid;
					 }
					 
					 cusinfo=[{
	 					"sheetid":$("#sheet").val(),
	 					"customername":cus_name,
	 					"cusid":cus_id
					 }];
					 
					 setCook(customerinfo,JSON.stringify(cusinfo));
					 
					 $("#sheetorder").html($("#sheet").val());
		    		 $("#cusname").html(cusinfo[0].customername);     
					 
					
					 
					 $("#preventblock").hide();
					 clearRawData(); //Remove All html tag in Each 3 Tabs.
					 getRawData(TabType,cus_id);
					 sumByustomer(cus_id,0,0);
					 $("#lottonumber").val('').focus();	
					 
				 }else{
					 $("#sheet").val("").focus();
				 }
			}
		});
				
});


//==============================================================================
//ตรวจสอบ key ลัด
//==============================================================================
$(window).on("keyup",function(e){

	
	//เปลึ่ยนช่อง ชนิด  เลขบน=0 / เลขล่าง=1 / เลขพ่วง =2 * Key 	
    if (e.keyCode==106){
    	
        //Set to full screen mode
    	//requestFullScreen();
    	
    	if (TabType==0){
    		$("#lottoinput").appendTo($("#data1 .mCSB_container"));
    		TabType=1;
    		$("#lottonumber").focus();
    	}else if (TabType==1){    	
    		$("#lottoinput").appendTo($("#data2 .mCSB_container"));
    		TabType=2;
    		$("#lottonumber").focus();
    	}else if (TabType==2){
    		$("#lottoinput").appendTo($("#data0 .mCSB_container"));
    		TabType=0;
    		$("#lottonumber").focus();
    	}
    	
    	//console.log(TabType +" cid "+ cusid);
    	
    	$(".TabOnEnter").val('');
    	
    	window.focus();
    	//$('#lottonumber').val('').focus();
    	LottoType=0;
    	
    	limitlengthinput(TabType);
    	
    	setCook("tab",TabType);
    	ScrollLast(TabType);
    }
	
	//Key + Key Code ==107 //เลขโต๊ด เครื่องหมาย +
	if (e.keyCode == 107 ){
		LottoType="tod";
    	window.focus();
	}else{
		LottoType=0;
	}
	
	//Key . Key Code ==190 //เลขกลับ เครื่องหมาย .
	if (e.keyCode == 190 ){
		LottoType="kub";
    	window.focus();
	}else{
		LottoType=0;
	}
	
	
	//ESC on Key
	if (e.keyCode==27){
		//$('#lottonumber').val('').focus();
		closeDiv();
	}
	
	//Space Bar Key.Switch to customers list
	if ((e.keyCode==32)){
		
			if ($("#customer").is(":focus")) {
				
			}else{
				$("#customer").focus();
			}	
			
	}
	
	//Alt+ K  อัตราจ่าย
	if (e.keyCode==75 && e.altKey){
		setrate();
	}
 	

});



$(window).on("click",function(){
	//$('#lottonumber').val('').focus();
});

function limitlengthinput(TabType){
	if (TabType==0 || TabType==1){
		$("#lottonumber").attr({ maxLength : 3 });
	}else{
		$("#lottonumber").attr({ maxLength : 5 });
	}
}

function ScrollLast(TabType){
	
	if (TabType==0){
   		$("#data0").mCustomScrollbar("update");
		$("#data0").mCustomScrollbar("scrollTo","last");	
		//console.log("Tab1");
   	}else if(TabType==1){
   		$("#data1").mCustomScrollbar("update");
   		$("#data1").mCustomScrollbar("scrollTo","last");
		//console.log("Tab2");
   	}else if(TabType==2){
   		$("#data2").mCustomScrollbar("update");
		$("#data2").mCustomScrollbar("scrollTo","last");
		//console.log("Tab3");
   	}
	
	//$("#lottonumber").val('').focus();
}

function getRawData(TabType,cusid){
	var data1=[]; 
	$.ajax({
	        url: "getrawdata.php",
	        type: "POST",
	        data: {
	            customerid: cusid,
	            tabtype:TabType,
	            lottosheet:$("#sheetorder").html()
	        },
	        datatype: "html",
	        cache: false, 
	        success: function (data) {
	        	data1=data;
	        },
	        complete:function(){
	        	//console.log("Tab"+ TabType);
	        	
	        	if (TabType==0){
	        		$(data1).appendTo($("#data0 .mCSB_container"));
	        		$("#lottoinput").insertAfter($(".firsttab"));
	        		ScrollLast(0);
	        	}else if(TabType==1){
	        		$(data1).appendTo($("#data1 .mCSB_container"));
	        		ScrollLast(1);
	        	}else if(TabType==2){
	        		$(data1).appendTo($("#data2 .mCSB_container"));
	        		ScrollLast(2);
	        	}
	        }	 
	 });
}

function getCustomer(cusid){
	var data1=[];
	$.ajax({
        url: "customer.php",
        type: "POST",
        datatype: "html",
        beforeSend:function(){
        	$("#loading").show();
        },
        success: function (data) {
        	data1=data;
        },
        complete:function(){
        	$(data1).appendTo($("#customer"));
        	ScrollLast(2);
        	
        	//console.log("customer id"+cusid);
        	clearRawData();
			 
			getRawData(0,cusid);
			getRawData(1,cusid);
			getRawData(2,cusid);
        	
			sumByustomer(cusid,0,0);
			
			
			$("#data3").mCustomScrollbar("update");
			$("#data3").mCustomScrollbar("scrollTo","last");

			$( "#customer li>a" ).each(function() {
				  //console.log(( "(id = '<b>" + this.title + "</b>')" ));
				  if (cusid==this.title)
				  $(this).toggleClass("tc");
			});
						

        	$( "#customer" ).menu({
        		select: function( event, ui ) {
        			 event.preventDefault();
        			 $("#customer a").removeClass("tc");
        			 var text=ui.item.text();
        			 $('#customer .ui-state-focus').toggleClass("tc");
        			 
        			 //CreatHtmlLayout();
        			 
        			 $("#shcover").show("slide", { direction: "up" }, "fast");
        			 //$("#shcover").show();
        			 $("#preventblock").show();
        			 $("#sheet").focus();
        			 
        			 $("#cusname").html(text);
        			 
        			 cusid1=text.split('.');
        			 cusid=cusid1[0];
        			       			
        			var customerinfo="customerinfo"+cusid;
        			    		      			 
        			cusinfo=[{
	 					"sheetid":"1",
	 					"customername":text,
	 					"cusid":cusid
        			}];
        			
        			setCook(customerinfo,JSON.stringify(cusinfo)); //Cookie save Current Customer By ID					
        			clearRawData(); //Remove All html tag in Each 3 Tabs.
       			 
        			 //console.log("customer id "+cusid);
        			 getRawData(0,cusid); //บน
        			 getRawData(1,cusid); //ล่าง
        			 getRawData(2,cusid); //เลขหมู่
        			 
        			 sumByustomer(cusid,0,0);
        			         			 
        			 //Save Current Tab to cookie
        			 setCook("tab",TabType);      //Cookie save Current Tab 
        			 setCook("customerid",cusid); //Cookie save Current Customer By ID
        			
        			 TabType=0; //เริ่มต้น tab 0  ใหม่ อีกครั้ง

        		}
        	});
        }
	});
	

	 $("#sheet").focus();
	//$('#lottonumber').val('').focus();
}

function clearRawData(){
	$(".firsttab").each(function(){
		$(this).remove();
	});
	$(".secondtab").each(function(){
		$(this).remove();
	});
	$(".thirdtab").each(function(){
		$(this).remove();
	});
	
	$("#lottoinput").each(function(){
		if ($("#lottoinput").eq(0)){
			
		}else{
			$(this).remove();
		}
		
	});
}

function setRawData(cusid){

	  var data_arr=[];
	  var data=[];
	  //console.log("set customer id "+cusid);
	  //console.log("set tab type "+TabType);
	  //console.log("set lotto type "+LottoType);
	  //console.log("set lotto value "+ $('#LottoVolume').val() );
	  //console.log("customer id "+cusid);
	  var newValue=$('#LottoVolume').val();//.replace("+","tod");
	  
	  //Keep Data to Array .
	  rawData.push({
		  customerid:cusid,
		  lottonumber:$('#lottonumber').val(),
		  lottovalue:LottoType,
		  lottotype:newValue,
		  lottosheet:$("#sheetorder").html()
	  });
	  
	  rawVolume.push(
		  newValue
	  );
	  
	  setCook("raw",JSON.stringify(rawData));
	  
	  //console.log(rawData);
	  
	  $.ajax({
        url: "onedigit.php",
        type: "POST",
        data: {
            cid: cusid,
            LottoNumber: $('#lottonumber').val(),
            LottoType:LottoType,
            TabType:TabType,
            LottoVolume: newValue,
            LottoSheet:$("#sheetorder").html()
        },
        datatype: "json",
        cache: false,
        beforeSend:function(){$("#loading").show().delay(15000);},
        success: function (response) {
            
        	data=response;
            
        },
        complete:function(){
        	//รีเซ็ท โต๊ด กลับ ให้เป็น ค่าตรงปกติ
			LottoType=0;
        	returnRawData(data);
        	sumByustomer(cusid,0,0);
        	$("#loading").hide().delay(1500);
        }
    });
}     


function returnRawData(data){
        
	    //console.log("Retrun Type "+data[0].type);
	
    	if (data[0].type=="kub"){
    		Str_Type="ก";
    		Data2=data[0].kub;
    		if (Data2==0){Str_Type="";Data2="";}
    	}else if (data[0].type=="tod"){
    		Str_Type="x";
    		Data2=data[0].tod;
    		if (Data2==0){Str_Type="";Data2="";}
    	}else{
    		
    	}
    	
    	 if (TabType==1){
    		 Data1=data[0].down;
    		 //console.log("tab 1 "+Data1);
    		 if (data[0].lottonumber.length==1){Str_Type="";Data2="";}
    		 
    		 if (Data2==0){Str_Type="";Data2="";}
    	 }else if (TabType==2){
    		 
    		 //console.log(data[0].lottonumber.length);
    		 if (data[0].lottonumber.length==5 ){
    			 Data1=data[0].up;
    			 Data2="";
    		 }else{
    			 Data2=data[0].tod; //เลขหมู่ต้องเป็นโต๊ด
    			 Data1=Data2;
    			 Data2="";
    		 }
    		 
    		 if (data[0].lottonumber.length==2 || data[0].lottonumber.length==3||data[0].lottonumber.length==1){
    			 Data2=data[0].tod; //เลขหมู่ต้องเป็นโต๊ด
    			 Data1=Data2;
    			 Data2="";
    			 Str_Type="";
    		 }
    	 }else if (TabType==0){
    		 Data1=data[0].up;
    		 //console.log(data[0].lottonumber.length);
    		 if (data[0].lottonumber.length==1){Str_Type="";Data2="";}
    		 if (Data2==0){Str_Type="";Data2="";}
    	 }
    	 var tblRow =
        	 "<tr>"
        	 +"<td class='Datalottonumber' align='right'><a href='#' onclick='editRaw("+data[0].id+")' class='editlink'>"+data[0].lottonumber+"</a>&nbsp;=&nbsp;</td>"
        	 +"<td align='right' class='t4'>"+Data1+"</td>"
        	 +"<td align='left'><div class='symboltype'>"+Str_Type+"</div></td>"
        	 +"<td align='right' class='t4'>"+Data2.replace(/[^\d\+\.\-]/g, "")+"</td>"                	                
        	 +"</tr>" ;
    	 

    	 if (TabType==0){
    		 $(tblRow).appendTo(".firsttab");
    		 $("#lottoinput").before($(tblRow).appendTo("#data0.firsttab"));
    	 }else if(TabType==1){
    		 $(tblRow).appendTo(".secondtab");
    		 $("#lottoinput").before($(tblRow).appendTo("#data1.secondtab"));
    	 }else if(TabType==2){
    		 $(tblRow).appendTo(".thirdtab");
    		 $("#lottoinput").before($(tblRow).appendTo("#data2.thirdtab"));
    	 }
    	 //Reset Data
    	 Data1="";Data2="";Str_Type="";
    	    
}

//ตรวจสอบ ความถูกต้องของ Customer id
function CkCusId(){
	
	//alert(getCook("customerid"));
	if (getCook("customerid")!=undefined){
 		//console.log("Customer ID:"+getCook("customerid"));
 		cusid=getCook("customerid");
 		$("#lottoinput").show();
 	}else{
 		//console.log("Defualt is cus 1");
 		$("#lottoinput").hide();
 		setCook("customerid",1);
 		cusid=1;
 	}
	return(cusid);
}

function CreatHtmlLayout(){
	//retrieve current window width
	var documentWidth = $(window).width();
	//retrieve current window height
 	var documentHeight = $(window).height();  
 	//console.log(documentHeight);
 	
 	var offset=$("#theader").height()+$("#tfooter").height();
 	var dataheight=documentHeight-(offset+20);
 	$("#data0,#data1,#data2,#data3").height(dataheight);
 	
 	var sheetw=$("#shcover").width()/2;
 	var sheeth=$("#shcover").height()/2;
 	var cleardataw=$("#cleardatapopup").width()/2;
 	var cleardatah=$("#cleardatapopup").height()/2;
 	
 	$("#shcover").offset(
 	{
 		left:documentWidth/2-sheetw,
 		top:documentHeight/3
 	});
 	
 	$("#preventblock").width(documentWidth);
 	$("#preventblock").height(documentHeight);
 	
 	$("#cleardatapopup").offset(
 	{
 		 		left:(documentWidth/2)-(cleardataw+80),
 		 		top:documentHeight/4
    });
}



function setrate(){
	var documentWidth = $(window).width();
	var divhelp=documentWidth/2;
	var left=0;
	var left=divhelp-$("#divhelp").width()/2;
	var data=[];
	$.ajax({
        url: "ratepayset.html",
        type: "POST",
        data: {},
        datatype: "html",
        cache: true,        
        success: function (response) {
            
        	data=response;
            
        },
        complete:function(){
        	$(data).appendTo($("#divhelp"));
        	
        	if ($("#divhelp").is(":hidden")){
    			$("#divhelp").slideDown("fast").show();
    			$("#divhelp").offset({left:left});
    		}else{
    			$("#divhelp").slideUp("fast",function(e,ui){
    			$(this).hide().html("");
        		$(this).offset({left:0});
    		
    			});
    		}
        	
        }
    });
}

function editRaw(t){
	
	console.log("timestamp "+t);
}
