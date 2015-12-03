$(function(){
//Call function getMakes
getMakes();

//Function which populates dropdown vehicle make dropdown menu
function getMakes(){
	//Begin AJAX request
	var request = {
		fmt: 'json',
		api_key: 'fykn8d62jqsgnn2qxq3u5pqj' 
		};

	$.ajax({
		url: "https://api.edmunds.com/api/vehicle/v2/makes",
		data: request,
		type: "GET",
	})
	//End AJAX request, begin function which extracts vehicle makes from returned AJAX array
	.done(function(result){
		//console.log(result.makes);
		$.each(result.makes, function(i, makes) {
			var brands = result.makes[i].name;
			var brandsNice = result.makes[i].niceName; 
			$('#make-drop').append("<option id='option' value="+brandsNice+">"+brands+"</option>");
		});//Appends vehicle make to dropdown list
	//Dynamically changes value of selected vehicle make
	var e = document.getElementById("make-drop");
	var selectedMake = e.options[e.selectedIndex].value;
	//console.log(selectedMake);
	getModels(selectedMake);
	//Calls run function on change in dropdown list
	e.onchange = function() {run()};
	})
}

//Function which updates selectedMake due to user input
function run(selectedMake){
	selectedMake = document.getElementById("make-drop").value;
	$('#model-drop').empty();
	$('#year-drop').empty();
	getModels(selectedMake);
}

//Function which populates vehicle model field depending on selected vehicle make
function getModels(selectedMake) {
//console.log(selectedMake);
//Begin AJAX request
	var request = {
		//make: selectedMake,
		fmt: 'json',
		api_key: 'fykn8d62jqsgnn2qxq3u5pqj' 
		};

	$.ajax({
		url: "https://api.edmunds.com/api/vehicle/v2/"+selectedMake+"/models",
		data: request,
		type: "GET",
	})
	//End AJAX request, begin function which extracts vehicle models from returned AJAX array
	.done(function(result){
		//console.log(result);
		$.each(result.models, function(i, makes) {
			var models = result.models[i].name;
			var modelsNice = result.models[i].niceName;
			//console.log(models); 
			$('#model-drop').append("<option id='option' value="+modelsNice+">"+models+"</option>");
		});//Appends vehicle models to dropdown list
	
	//Dynamically changes value of selected vehicle models
	var e = document.getElementById("model-drop");
	var selectedModel = e.options[e.selectedIndex].value;
	getYear(selectedMake,selectedModel);
	//Calls run1 function on change in dropdown list
	e.onchange = function() {run1(selectedMake)};
	})
}

//Function which updates selectedModel due to user input
function run1(selectedMake){
	selectedModel = document.getElementById("model-drop").value;
	$('#year-drop').empty();
	//console.log(selectedMake,selectedModel);
	getYear(selectedMake,selectedModel);
}

//Function which populates vehicle year field depending on selected vehicle model and make
function getYear(selectedMake,selectedModel) {
	//console.log(selectedMake,selectedModel);
	//Begin AJAX request
	var request = {
		fmt: 'json',
		api_key: 'fykn8d62jqsgnn2qxq3u5pqj' 
		};

	$.ajax({
		url: "https://api.edmunds.com/api/vehicle/v2/"+selectedMake+"/"+selectedModel+"/years",
		data: request,
		type: "GET",
	})
	//End AJAX request, begin function which extracts vehicle year from returned AJAX array
	.done(function(result){
		$.each(result.years, function(i, makes) {
			var years = result.years[i].year;
			$('#year-drop').append("<option id='option' value="+years+">"+years+"</option>");
		});//Appends vehicle make to dropdown list
	//Dynamically changes value of selected vehicle year
	var e = document.getElementById("year-drop");
	var selectedYear = e.options[e.selectedIndex].value;
	//Call function getReview at point where selectedMake, selectedModel, selectedYear all exist
	getReview(selectedMake, selectedModel, selectedYear);
	//Call getPhotos for images on page
	//getPhotos(selectedMake, selectedModel, selectedYear);
	//Calls run1 function on change in dropdown list
	e.onchange = function() {run2(selectedMake, selectedModel, selectedYear)};
	})
}

//Function which updates selectedYear due to user input
function run2(selectedMake, selectedModel, selectedYear){
	selectedYear = document.getElementById("year-drop").value;
	getReview(selectedMake, selectedModel, selectedYear);
}

//Function which obtains strategic information from editor reviews api utilizing make, model, and year
function getReview(selectedMake, selectedModel, selectedYear) {
	//console.log(selectedMake,selectedModel,selectedYear);
	//Begin AJAX request
	var request = {
		make: selectedMake,
		model: selectedModel,
		year: selectedYear,
		fmt: 'json',
		api_key: 'fykn8d62jqsgnn2qxq3u5pqj' 
		};

	$.ajax({
		url: "https://api.edmunds.com/v1/content/editorreviews",
		data: request,
		type: "GET",
	})
	//End AJAX request, begin function which extracts vehicle year from returned AJAX array
	.done(function(result){
		//console.log(result.editorial);
		showResults(result);
	})
}
/*
function getPhotos(selectedMake, selectedModel, selectedYear) {
	//console.log(selectedMake,selectedModel,selectedYear);
	//Begin AJAX request
	var request = {
		//make: selectedMake,
		//model: selectedModel,
		//year: selectedYear,
		api_key: 'fykn8d62jqsgnn2qxq3u5pqj', 
		fmt: 'json'
		};

	$.ajax({
		url: "https://api.edmunds.com/api/media/v2/"+selectedMake+"/"+selectedModel+"/"+selectedYear+"/photos",
		data: request,
		type: "GET",
	})
	//End AJAX request, begin function which extracts vehicle year from returned AJAX array
	.done(function(result){
		console.log(result.photos);
	})
}*/


//Function shows results
function showResults(result){
	$('.vehicle-review').html(result.editorial.review);
	$('.vehicle-pro').html(result.editorial.pro);
	$('.vehicle-con').html(result.editorial.con);
}


});


