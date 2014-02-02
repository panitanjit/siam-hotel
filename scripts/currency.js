
//เปลี่ยน ตัวเลขเป็นรูปแแบบ สกุลเงิน
function ToCur(strnum){
	var newnumber=0;
	//console.log(strnum);
	newnumber=(strnum+"").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	return(newnumber);
}

//เปลี่ยน รูปแแบ สกุลเงิน เป็นตัวเลข
function ToNum(currency){
	var ret=0;
	ret=parseInt((currency+"").replace(/\D/,''));
	return(ret);
}