
//����¹ ����Ţ���ٻ�Ẻ ʡ���Թ
function ToCur(strnum){
	var newnumber=0;
	//console.log(strnum);
	newnumber=(strnum+"").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	return(newnumber);
}

//����¹ �ٻ�� ʡ���Թ �繵���Ţ
function ToNum(currency){
	var ret=0;
	ret=parseInt((currency+"").replace(/\D/,''));
	return(ret);
}