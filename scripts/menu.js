
function Dataclear(){
	var data=[];
	$.ajax({
        url: "clear.php",
        type: "POST",
        data: {},
        datatype: "html",
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
        	$(window).focus();
        }	 
 });
}


function closeDiv(){
	
	if ($("#menu li").is(":focus")){
		$(this).hide("slide", { direction: "left" }, "fast");
		$('#lottonumber').val('').focus();
	}
	
	if ($("#divhelp").is(":focus")){
		$("#divhelp").slideUp("fast",function(e,ui){
		$(this).hide().html("");
		$(this).offset({left:0});	
		});
	}
}

function initmenu(){
	
	$( "#menu" ).menu({
		select: function( event, ui ) {
			event.preventDefault();
			var mindex=ui.item.index();
			//alert(mindex);
			menulink(mindex);
		},
		disabled: false,
		enable:true,
		create:function(e,ui){
			
			if (MenuCollape==0){
				$(".ui-menu-item").eq(4).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(14).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(15).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(16).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(17).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(18).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(19).addClass("ui-state-disabled");
			}else if(MenuCollape==1){
				$(".ui-menu-item").eq(4).removeClass("ui-state-disabled");
				$(".ui-menu-item").eq(14).removeClass("ui-state-disabled");
				$(".ui-menu-item").eq(15).removeClass("ui-state-disabled");
				$(".ui-menu-item").eq(16).removeClass("ui-state-disabled");
				$(".ui-menu-item").eq(17).removeClass("ui-state-disabled");
				$(".ui-menu-item").eq(18).removeClass("ui-state-disabled");
				$(".ui-menu-item").eq(19).removeClass("ui-state-disabled");
			}else if(MenuCollape==2){
				$(".ui-menu-item").eq(4).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(14).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(15).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(16).addClass("ui-state-disabled");
				$(".ui-menu-item").eq(17).removeClass("ui-state-disabled");
				$(".ui-menu-item").eq(18).removeClass("ui-state-disabled");
				$(".ui-menu-item").eq(19).addClass("ui-state-disabled");
			}
		}
	});
	
	$("#submenu1").menu({
		select: function( event, ui ) {
			event.preventDefault();
			var mindex=ui.item.index();
			//alert(mindex);
			submenu(mindex,event);
		},
		disabled: false,
		enable:true
	});
	
		
	menucollape();
}

function menucollape(){
	
	if ($("#menu").is(":hidden")){
		$( "#menu" ).show("slide", { direction: "left" }, "fast").focus();
		
	}else{
		$( "#menu" ).hide("slide", { direction: "left" }, "fast").focus();
		$('#lottonumber').val('').focus();
	}
	
}

function ajaxmenu(){
	$.ajax({
	    url: "menu.html",
	    type: "POST",
	    data: {},
	    datatype: "html",
	    success: function (response) {data=response;},
	    complete:function(){ $(data).appendTo($("#menucontainer"));}
	});			
}

function loadhelp(){
	//retrieve current window width
	
	var documentWidth = $(window).width();
	var divhelp=documentWidth/2;
	var left=0;
	
	
	var left=divhelp-$("<div id='divhelp'></div>").width()/2;
	var data=[];
	$.ajax({
        url: "help.html",
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

$(document).ready(function(e,ui){
			
	$("<div id='msg'></div>").insertBefore($("#datacontainer"));
	$("<div id='customer-info'>㺷�� <label id='sheetorder'></label><label id='cusname'></label></div>").insertBefore($("#datacontainer"));
	$("<div id='menucontainer'></div>").insertBefore($("#datacontainer"));
	$("<div id='divhelp'></div>").insertBefore($("#datacontainer"));
	$("<div id='cleardatapopup'><label>��ҹ��ͧ�����ҧ�������������</label></br><input id='yes' type='button' value='��'><input id='cancel' type='button' value='¡��ԡ'></div>").insertBefore($("#datacontainer"));
	$("<a href='#' id='menulink'>����</a>").insertBefore($("#datacontainer"));
	$("<div id='shcover'>㺷�� <input id='sheet' type='text' value='1'></div>	").insertBefore($("#datacontainer"));
	$("<div id='preventblock'></div>").insertBefore($("#datacontainer"));
	$("<ul id='printpage'><li><a href='#'></a></li></ul>").appendTo($("#doctitle"));
	
	ajaxmenu();
		
	$("#yes").click(function(){
		Dataclear();
		$("#preventblock").hide();
	});
	
	$("#cancel").click(function(){
		$("#cleardatapopup").hide("slide", { direction: "up" }, "fast").focus();
		$("#preventblock").hide();
	});
	
	$("#menulink").click(function(event,ui){
		event.preventDefault();
		initmenu();
	});
		
});

function menulink(index){
	
	switch (index) {
	case 0:
		window.location="index.html";
		$(window).focus();
	break;
	case 1:
		requestFullScreen();
		$(window).focus();
	break;
	case 2:
		window.location="sumtotal.html";	
		$(window).focus();
	break;
	case 3:
		window.location="chklotto.html";
		$(window).focus();
	break;
	case 4:
	break;
	case 5:
		console.log(self.location);
		sumtotal=2;
		getsummaryData(1,"last","getsumexportdata",0);
		$("#sumtitle").html("�ʹ������͡");
		$("title").html("�ʹ������͡");
		hidesublayer();
		$(window).focus();
	break;
	case 6:
		console.log(self.location);
		sumtotal=2;
		getsummaryData(1,"last","getsumexportdata",1);
		$("#sumtitle").html("�ʹ���͡���������");
		$("title").html("�ʹ���͡���������");
		hidesublayer();
		$(window).focus();
	break;
	case 7:
	break;
	case 8:
		window.location="ratepayset.html";
		$(window).focus();
	break;
	case 9:
		window.location="customers.html";
		$(window).focus();
	break;
	case 10:
		$( "#menu" ).hide("slide", { direction: "left" }, "fast");
		hidesublayer();
		$("#cleardatapopup").show("slide", { direction: "up" }, "fast").focus();
		$("#yes").focus();
		$("#preventblock").show();
	break;
	case 11:
	break;
	default:
		break;
	}
}


function submenu(index,e){
	
	switch (index) {
	case 0:
		//e.preventDefault();
		sumexport(1,0,0);
	break;
	case 1:
		//e.preventDefault();
		sumexport(3,0,0);		
	break;
	case 2:
		//e.preventDefault();
		sumexport(2,1,0);
	break;
	case 3:
		//e.preventDefault();
		sumexport(3,1,0);
	break;
	case 4:
		//e.preventDefault();
		sumexport(5,2,0);
	break;
	case 5:
		//e.preventDefault();
		sumexport(6,2,0);
	break;
	case 6:
		//e.preventDefault();
		sumexport(7,0,0);
	break;
	case 7:
		//e.preventDefault();
		sumexport(8,1,0);
	break;
	case 8:
		//e.preventDefault();
		sumexport(8,1,0,"all");
	break;
	default:
		break;
	}
}

function hidesublayer(){
	$("#menu").hide();
	$("#search").hide();
	$("#divhelp").html("").hide();
	$("#container2").hide();
	$("#cleardatapopup").hide("slide", { direction: "up" }, "fast").focus();
}

$(window).on("keyup",function(e){
	//Tab Keyboard Ctrl + ~
	//e.preventDefault();
	
	//hidesublayer();
	
	if (e.keyCode==192 && e.ctrlKey){
		e.preventDefault();
		initmenu();
		//menucollape();
	}
	
	//CTRL+ Alt + A ��Ѻ价������ͧ�١ ���������ŧ����ͧ
	if (e.ctrlKey && e.altKey && e.keyCode==65){
		//e.preventDefault();
		window.location="index.html";
		$(window).focus();
	}
	
	//Alt + D �ʹ����ѹ�Ѻ�٧�ش
	if (e.altKey && e.keyCode==68){
		//e.preventDefault();
		if (MenuCollape==1){
			sumtotal=2;
			getsummaryData(1,"last","getsumexportdata",0);
			$("#sumtitle").html("�ʹ������͡");
			$("title").html("�ʹ������͡");
			hidesublayer();
			
		}
		$(window).focus();
	}
	
	//Alt + K �ѵ�ҡ�õ�駨���
	if (e.altKey && e.keyCode==75){
		//e.preventDefault();
		window.location="ratepayset.html";
		$(window).focus();
	}
	
	//Alt + C ��ª����١���
	if (e.altKey && e.keyCode==67){
		//e.preventDefault();
		window.location="customers.html";
		$(window).focus();
	}
	
	//Alt+ F2 ��������� 	
	if (e.keyCode == 113 ){
		loadhelp();
	}
	
	//Alt + T �Դ˹�Ҩ� �ʹ���������
	if (e.keyCode == 84 && e.altKey){
		//e.preventDefault();
		window.location="sumtotal.html";
		$(window).focus();
	}
	
	//Alt + V �Դ˹�Ҩ� ��Ǩ�Ţ���١
	if (e.keyCode == 86 && e.altKey){
		//e.preventDefault();
		window.location="sumtotal.html";
		$(window).focus();
	}
	
	//Alt + E �Դ˹�Ҩ� ��Ǩ�Ţ���١
	if (e.keyCode == 69 && e.altKey){
		//e.preventDefault();
		$("#preventblock").show();
		$("#cleardatapopup").show("slide", { direction: "up" }, "fast").focus();
		$("#yes").focus();
	}
	
	//Alt + F1  ���͡ 2 ��Ǻ�
	if (e.keyCode == 112 && e.altKey){
		//e.preventDefault();
		sumexport(1,0,0);
	}
	
	//Alt + F2  ���͡  2 �����ҧ
	if (e.keyCode == 113 && e.altKey){
		//e.preventDefault();
		sumexport(2,1,0);
	}
	
	//Alt + F3  ���͡  3 ��Ǻ�
	if (e.keyCode == 114 && e.altKey){
		//e.preventDefault();
		sumexport(3,0,0);
	}
	
	//Alt + F4  ���͡  3 �����ҧ
	if (e.keyCode == 115 && e.altKey){
		//e.preventDefault();
		sumexport(4,1,0);
	}
	
	//Alt + F5  ���͡  2 ��
	if (e.keyCode == 116 && e.altKey){
		//e.preventDefault();
		sumexport(5,2,0);
	}
	
	//Alt + F6  ���͡  3 ��
	if (e.keyCode == 116 && e.altKey){
		//e.preventDefault();
		sumexport(6,2,0);
	}
	
	//Alt + F7  ���͡  ��觺�
	if (e.keyCode == 118 && e.altKey){
		//e.preventDefault();
		sumexport(7,0,0);
	}
	
	//Alt + F8  ���͡  �����ҧ
	if (e.keyCode == 119 && e.altKey){
		//e.preventDefault();
		sumexport(8,1,0);
	}
	
	//Alt + F9  ���͡  ������
	if (e.keyCode == 120 && e.altKey){
		//e.preventDefault();
		sumexport(8,1,0,all);
	}
	
	//Alt + Q  ����¹���ʹ��
	if (e.keyCode == 81 && e.altKey ){
		//e.preventDefault();
		if (MenuCollape==1){
		sumtotal=1;
		$("#sumtitle").html("�ʹ��");
		$("title").html("�ʹ��");
		getsummaryData(4,"first","sumary");
		}
		$(window).focus();
	}
	
	//Alt + O �������
	if (e.keyCode == 79 && e.altKey ){
		//e.preventDefault();
		 //$("#shcover").slideDown("fast").show();
		 $( "#shcover" ).show("slide", { direction: "down" }, "fast");
		 $("#sheet").focus().select();
		 $("#preventblock").show();
	}
	
	//Alt + P ������ʹ���͡
	if (e.keyCode==80 && e.altKey){
		console.log("ready print");
		window.print();
	}
	
	//Alt + R �ʹ��觾��������
	if (e.keyCode==82 && e.altKey){
		if (MenuCollape==1){
		sumtotal=2;
		getsummaryData(1,"last","getsumexportdata",1);
		$("#sumtitle").html("�ʹ���͡���������");
		$("title").html("�ʹ���͡���������");
		hidesublayer();
		
		}
		$(window).focus();
		
	}
	
	
	//close all popup.
	if (e.keyCode==27){
		//e.preventDefault();
		$( "#menu" ).hide("slide", { direction: "left" }, "fast").focus();		
		$("#search").hide("slide", { direction: "up" }, "fast");
		$("#shcover").hide("slide", { direction: "up" }, "fast");
		$("#divhelp").html("").hide();
		$("#preventblock").hide();
		$("#container2").hide();
		$("#cleardatapopup").hide("slide", { direction: "up" }, "fast").focus();
		$('#lottonumber').val('').focus();
	}
});


