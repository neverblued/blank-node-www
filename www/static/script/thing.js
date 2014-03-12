var act = {};

act.recordThing = function(tag, order){
	$.post("/thing.record", {}, null, "json");
};

act.deleteThing = function(tag, order){
	$.post("/thing.delete", {}, function(data, textStatus, jqXHR){
		document.location.reload();
	}, "json");
};

$(function(){

	var user = request.user;
	if(!user){
		return;
	}
	
	var things = $(".things");
	if(things.find(".thing").length < 2){
		return;
	}
	
	things.sortable({
		update: function(event, ui){
			act.recordThing();
		}
	});
	
	$(".thing.action .delete").click(function(){
		act.deleteThing();
	});
});
