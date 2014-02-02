
//To set:
function setCook(key,val){
	var date = new Date();
	var minutes = 30;
	 //date.setTime(date.getTime() + (2*minutes * 60 * 1000));
	$.cookie(key, val,{expires: 2 });
}

//To Get
function getCook(key){
	var ret=$.cookie(key);
	return(ret);
}

//To Delete
function delCook(key){
	return($.cookie(key, null));
}
