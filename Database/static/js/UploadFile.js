function uploadData(){
	document.getElementById("StartButtons").style.display = "none";
	document.getElementById("MainArea").style.display = "inline-block";
	document.getElementById('UploadButtons').style.display = "block";
	document.getElementById("UploadNewFile").style.display = "block";
	document.getElementById("StopUploading").style.display = "block";
	document.getElementById("title").innerHTML = "Upload your data";
	showUploadForm("Twitter");
}


function FinishUploading() {
	document.getElementById("StartButtons").style.display = "inline-block";
    document.getElementById("MainArea").style.display = "none";
    document.getElementById("UploadButtons").style.display = "none";
    document.getElementById("UploadNewFile").style.display = "none";
    document.getElementById("StopUploading").style.display = "none";
    document.getElementById("title").innerHTML = "What do you want to do?";

    var cy = cytoscape({container: document.getElementById('cy')});
    var collection = cy.elements("node");
    cy.remove(collection);
    var collection = cy.elements("edge");
    cy.remove(collection);

}


function showUploadForm(resource) {
	addMask("NodeDetail");

	var upload_button = document.createElement("INPUT");
	upload_button.setAttribute("type", "file");
	upload_button.setAttribute("id", "TwitterFile");

	var submit_button = document.createElement("INPUT");
	submit_button.setAttribute("type", "submit");
	submit_button.setAttribute("id", "TwitterFileSubmitButton");

	var form = document.createElement("FORM");
	form.appendChild(upload_button);
	form.appendChild(submit_button);

	switch(resource){
		case "Twitter":
			form.addEventListener('submit', TwitterDataHandler);
		default:
			form.addEventListener('submit', TwitterDataHandler);
	}
	

	document.getElementById("DisplayDetailsArea").appendChild(form);
	document.getElementById("NodeDetailTitle").innerText = "Upload your data";
	document.getElementById('NodeDetail').style.display = "block";

	
}

function TwitterDataHandler(event) {
	event.preventDefault();
	document.getElementById("NodeDetailTitle").innerText = "Details of the node you clicked";
	var reader = new FileReader();
	reader.onload = onReaderLoad;
	var file = document.getElementById('TwitterFile').files[0];
	reader.readAsText(file);
}

function onReaderLoad(event){
	document.getElementById('CloseDetails').click();
	var json_str = event.target.result;
	var json_obj = JSON.parse(json_str);
	console.log("Finish parsing");
	$.getJSON(
		'/storeTwitterData',
		{arg: JSON.stringify(json_obj)},
		function action(response) 
		{
			var res = response.response["msg"];
			window.alert(res);
			showTwitterGraph();
			return;
		})
}

function showGraph(resources)
{
	var query = {"resources" : resources, "multiple" : Array.isArray(resources)};

	$.getJSON(
		'/showGraph',
		{arg: JSON.stringify(query)},
		function drawGraph(response){
			console.log(response.elements);
			document.getElementById('MainArea').style.display = "inline-block";
			/*var style = [
				{selector: 'node[object = "User"]', css: {'background-color': 'blue', 'label': 'data(name)'}},
				{selector: 'node[object = "Tweet"]', css: {'background-color': 'red', 'label': 'data(text)'}},
				{selector: 'node[object = "Geo"]', css: {'background-color': 'green', 'label': 'data(neo4j_id)'}},
				{selector: 'node[object = "Place"]', css: {'background-color': 'pink', 'label': 'data(neo4j_id)'}},
				{selector: 'node[object = "Coordinate"]', css: {'background-color': 'yellow', 'label': 'data(neo4j_id)'}},
				{selector: 'node[object = "Entity"]', css: {'background-color': 'grey', 'label': 'data(hashtags)'}},
				{selector: 'edge', css: {'background-color': 'black', 'label': 'data(relationship)'}}
			];*/
			var style = [
				{selector: 'node[object = "User"]', css: {'background-color': 'blue'}},
				{selector: 'node[object = "Tweet"]', css: {'background-color': 'red'}},
				{selector: 'node[object = "Geo"]', css: {'background-color': 'green'}},
				{selector: 'node[object = "Place"]', css: {'background-color': 'pink'}},
				{selector: 'node[object = "Coordinate"]', css: {'background-color': 'yellow'}},
				{selector: 'node[object = "Entity"]', css: {'background-color': 'grey'}},
				{selector: 'edge', css: {'background-color': 'black'}}
			];

			var cy = cytoscape({
				container: document.getElementById('cy'),
				style: style,
				layout: { name: 'cose', fit: false },      
				elements: response.elements
    		});

			cy.on('tap', 'node', function showDetails()
			{
				addMask("NodeDetail");
				var data = this.data();
				for (var key in data)
				{
					var node = document.createElement("LI");
					var textnode = document.createTextNode(key + " : " + data[key]);
					node.appendChild(textnode);
					document.getElementById("DisplayDetailsArea").appendChild(node);
				}
				
				document.getElementById('NodeDetail').style.display = "block";

			});

			return;
		})
}

function showTwitterGraph() {
	showGraph("twitter");
}