
//duplicate characters from string
function remove_unique_characters( string ){
    var unique='';
    for(var i=0; i<string.length; i++){
        if(unique.indexOf(string[i])==-1){
            unique += string[i];
        }
    }
    return unique;
}

function find_unique_characters(string){
    var unique='';
    var result=0;
    
    if (string.length>3){
    	for(var i=0; i<string.length; i++){
            if(unique.indexOf(string[i])==-1){
                unique += string[i];
            }
        }
        
        if (string.length==unique.length){
        	result=0;//No duplicate
        }else{
        	result=1;//has duplicate
        }
    }    
    return result;
}

function unique(array) {
	  return $.grep(array, function(el, index) {
	        return index == $.inArray(el, array);
	    });
}