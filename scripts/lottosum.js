var sumtotal=0;

function sumByustomer(cid,n,pr_status){
	//console.log(pr_status);
	var data=[];
	$.ajax({
        url: "getsum.php",
        type: "POST",
        data: {
            customerid: cid,
            lottosheet:$("#sheetorder").html(),
            status:pr_status
        },
        datatype: "json",
        cache: false, 
        success: function (response) {
        	data=response;
        },
        complete:function(){
        	
        	DataHTML(data);
        	
        	//Last Process ทำให้ สามารถ คีย์ข้อมูลได้ทันที
        	//console.log("cus id "+cid);
        	cusid=getCook("customerid");
        	
        	for (i=0;i<10;i++){
    			$("#lottonumber").val('').focus();	
    		}
        	
        	$("#loading").hide();

        }
 });
}


function sumExportData(cid){
	var data=[];
	$.ajax({
        url: "getsum.php",
        type: "POST",
        data: {
            customerid: cid
        },
        datatype: "json",
        cache: false, 
        success: function (response) {
        	data=response;
        },
        complete:function(){
        	
        	DataHTML(data);
        	
        	//Last Process ทำให้ สามารถ คีย์ข้อมูลได้ทันที
        	//console.log("cus id "+cid);
        	cusid=getCook("customerid");
        	
        	for (i=0;i<10;i++){
    			//$("#lottonumber").val('').focus();	
    		}
        	
        	$("#loading").hide();

        }
 });
}

function DataHTML(data){
	$("#oneup").html(oneup(data));
	$("#onedown").html(onedown(data));
	
	if (data[2].up!="0"){
		//console.log(data[2].up);
		$("#twoup").html(twoup(data));
	}else{
		$("#twoup").html(twodown(data));	
	}
	
	if (data[3].down!="0"){
		//console.log(data[3].down);
		$("#twodown").html(twodown(data,1));
	}else{
		$("#twodown").html(twodown(data,0));	
	}
	
	$("#threeup").html(threeup(data));
	$("#threedown").html(threedown(data));
	
	var TodTotal=ToNum(data[2].tod)+ToNum(data[3].up);
	
	$("#threetod").html(sthreetod(data));
	$("#twotod").html(stwotod(data));
	
	//รวม เลขวิ่ง ตัวตรง ตัวโต๊ด
	$("#onetotal").html(sone(data));
	$("#tongtotal").html(stong(data));
	$("#threetotal").html(sthree(data));
	$("#todtotal").html(stod(data));
	$("#total").html(ToCur(Total(data)));
}

//data0=เลขวิ่ง
//data1=เลข 2 ตัวบนล่าง
//data2=เลข 3 ตัวบนล่าง
//data3=เลข หมู่

function oneup(data){
	var ret=ToCur(ToNum(data[0].up));
	if (sumtotal==1){
		ret=ToCur(ToNum(data[0].up)-ToNum(data[9].exoneup));
	}else if (sumtotal==2){
		ret=ToCur(ToNum(data[9].exoneup));
	}
	
	return(ret);
}

function onedown(data){
	var ret=ToCur(ToNum(data[1].down));
	if (sumtotal==1){
		ret=ToCur(ToNum(data[1].down)-ToNum(data[9].exonedown));
	}else if (sumtotal==2){
		ret=ToCur(ToNum(data[9].exonedown));
	}	
	return(ret);
}

function twoup(data){
	var ret=ToCur(ToNum(data[2].up)+ToNum(data[2].kub));
	if (sumtotal==1){
		ret=ToCur(ToNum(data[2].up)+ToNum(data[2].kub)-ToNum(data[9].extwoup));
	}else if (sumtotal==2){
		ret=ToCur(ToNum(data[9].extwoup));
	}	
	return(ret);
}

function twodown(data,d){
	var ret=ToCur(ToNum(data[3].down));
	if (sumtotal==1 && d==1){
		ret=ToCur(ToNum(data[3].down)+ToNum(data[3].kub)-ToNum(data[9].extwodown));
	}else if (sumtotal==2){
		ret=ToCur(ToNum(data[9].extwodown));
	}else{
		ret=ToCur(ToNum(data[3].down));
	}	
	return(ret);
}



function threeup(data){
	var ret=ToCur(ToNum(data[4].up)+ToNum(data[4].kub)+ToNum(data[6].up));
	if (sumtotal==1){
		ret=ToCur(ToNum(data[4].up)+ToNum(data[4].kub)+ToNum(data[6].up)-ToNum(data[9].exthreeup));
	}else if (sumtotal==2){
		ret=ToCur(ToNum(data[9].exthreeup));
	}
	return(ret);
}

function threedown(data){
	var ret=ToCur(data[5].down);
	if (sumtotal==1){
		ret=ToCur(ToNum(data[5].down)-ToNum(data[9].exthreedown));
	}else if (sumtotal==2){
		ret=ToCur(ToNum(data[9].exthreedown));
	}
	
	return(ret);
	
}

//SUMARY TOTAL 

function ExportTotal(){
	var ret5=ToNum(data[9].extwoup)+ToNum(data[9].extwodown)+ToNum(data[9].extwotod);
	var ret6=ToNum(data[9].exthreeup)+ToNum(data[9].exthreedown)+ToNum(data[9].exthreetod);
	var ret7=ToNum(data[9].exoneup)+ToNum(data[9].exonedown);
	var total=ret5+ret6+ret7;
	
	return(ToCur(total));
}


function Total(data){
	
	var ret1=ToNum(stong(data));
	var ret2=ToNum(sone(data));
	var ret3=ToNum(stod(data));
	var ret4=ToNum(sthree(data));
	
	//if (sumtotal==1){
	//	var ret5=ToNum(data[9].extwoup)+ToNum(data[9].extwodown)+ToNum(data[9].extwotod);
	//	var ret6=ToNum(data[9].exthreeup)+ToNum(data[9].exthreedown)+ToNum(data[9].exthreetod);
	//	var ret7=ToNum(data[9].exoneup)+ToNum(data[9].exonedown);
	//	var total=ret1+ret2+ret3+ret4;//-(ret5+ret6+ret7);
	//}else{
		var total=ret1+ret2+ret3+ret4;
	///}
		return(ToCur(total));

}



function sone(data){
	var ret=ToNum(data[0].up)+ToNum(data[0].down)+ToNum(data[1].up)+ToNum(data[1].down);
	
	if (sumtotal==1){
		var ret7=ToNum(data[9].exoneup)+ToNum(data[9].exonedown);
		ret=ret-ret7;
	}else if (sumtotal==2){
		ret=ToNum(data[9].exoneup)+ToNum(data[9].exonedown);
	}
	
	return(ToCur(ret));
}

function stong(data){
	var ret1=ToNum(data[0].up)+ToNum(data[0].down)+ToNum(data[0].kub);
	var ret2=ToNum(data[1].up)+ToNum(data[1].down)+ToNum(data[1].kub);
	var ret3=ToNum(data[2].up)+ToNum(data[2].down)+ToNum(data[2].kub);
	var ret4=ToNum(data[3].up)+ToNum(data[3].down)+ToNum(data[3].kub);
	
	var total=ret3+ret4;
	
	if (sumtotal==1){
		total=total-(ToNum(data[9].extwoup)+ToNum(data[9].extwodown));
	}else if (sumtotal==2){
		total=ToNum(data[9].extwoup)+ToNum(data[9].extwodown);
	}
	//console.log(ToNum(data[1].kub));
	
	return(ToCur(total));
}

function stwotod(data){
	var ret3=ToNum(data[2].tod);
	//var ret4=ToNum(data[3].tod);
	var ret5=ToNum(data[8].tod);
	var ret5=ToNum(data[8].tod);
	var total=ret3+ret5;
	
	if (sumtotal==1){
		total=total-ToNum(data[9].extwotod);
	}else if (sumtotal==2){
		total=ToNum(data[9].extwotod);
	}
	//console.log(ToNum(data[1].kub));
	
	return(ToCur(total));
}

function sthreetod(data){
	var ret3=ToNum(data[4].tod);
	var ret4=ToNum(data[5].tod);
	var ret5=ToNum(data[6].up);
	var ret6=ToNum(data[7].tod);
	var ret7=ToNum(data[8].tod);
	var total=ret3+ret4+ret6;
	
	if (sumtotal==1){
		total=total-ToNum(data[9].exthreetod);
	}else if (sumtotal==2){
		total=ToNum(data[9].exthreetod);
	}
	//console.log(ToNum(data[1].kub));
	
	return(ToCur(total));
}

function sthree(data){
	var ret3=ToNum(data[4].up)+ToNum(data[4].down)+ToNum(data[5].up)+ToNum(data[5].down);
	var ret4=ToNum(data[4].kub)+ToNum(data[6].up);
	var total=ret3+ret4;
	
	if (sumtotal==1){
		total=total-(ToNum(data[9].exthreeup)+ToNum(data[9].exthreedown));
	}else if (sumtotal==2){
		total=ToNum(data[9].exthreeup)+ToNum(data[9].exthreedown);
	}
	return(ToCur(total));
}

function stod(data){
	var ret1=ToNum(sthreetod(data));
	var ret2=ToNum(stwotod(data));
		
	var total=ret1+ret2;
	
	if (sumtotal==1){
		total=total-(ToNum(data[9].exthreetod)+ToNum(data[9].extwotod));
	}else if (sumtotal==2){
		total=ToNum(data[9].exthreetod)+ToNum(data[9].extwotod);
	}
	
	return(ToCur(total));
}