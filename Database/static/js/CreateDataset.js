var currDataset = null;

function createDataset(arg) 
{
	console.log(arg);
	document.getElementById("StartButtons").style.display = "none";
	document.getElementById("MainArea").style.display = "inline-block";
	document.getElementById("DatasetButtons").style.display = "block";
	document.getElementById("CancelDataset").style.display = "block";
	document.getElementById("StopCreating").style.display = "block";
	document.getElementById("SaveDataset").style.display = "none";
	document.getElementById("title").innerHTML = "Create Your Dataset";
	showResources();
}

function FinishCreatingDataset() 
{
	currDataset = null;
	document.getElementById("StartButtons").style.display = "inline-block";
	document.getElementById("MainArea").style.display = "none";
	document.getElementById("DatasetButtons").style.display = "none";
	document.getElementById("CancelDataset").style.display = "none";
	document.getElementById("SaveDataset").style.display = "none";
	document.getElementById("StopCreating").style.display = "none";
	document.getElementById("title").innerHTML = "What do you want to do?";

	var cy = cytoscape({container: document.getElementById('cy')});
	var collection = cy.elements("node");
	cy.remove(collection);
}

function showResources()
{
	document.getElementById("SaveDataset").style.display = "none";
	var style = [{
					selector: 'node[group = "nodes"]',
					css: {'background-color': 'blue', 'content': 'data(label)'}
				}]

	var cy = cytoscape({
        container: document.getElementById('cy'),
        style: style,
        layout: { name: 'cose', fit: true },
        elements: 
        {
          	nodes: [ {"data" : { id: "twitter", label: "twitter", group: "nodes"}},
            	     {"data" : { id: "facebook", label: "facebook", group: "nodes"}},
                	 {"data" : { id: "reddit", label: "reddit", group: "nodes" }}],
                 
        	/*
        	edges: [ {"data" : { id: "e1", label: "Edge 1", weight: 1.1, source: "n1", target: "n3", group: "edges" }},
                 	{"data" : { id: "e2", label: "Edge 2", weight: 3.3, source:"n2", target:"n1", group: "edges"}} ]
            */
        },     
    });

	if (document.getElementById("start") != null)
	{
		document.getElementById("start").style.display = "none";
	}    
	    
	cy.on('tap', 'node', function handler(evt) {
		var resource = this.data('label');
		showQueryObject(resource);
	});

}


function showQueryObject(resource) 
{
	objectList = {
		"twitter" : ["User", "Tweet", "Geo", "Place", "Coordinate", "Entity"],
		"wikipedia" : ["wikiPageContent"],
		"stackoverflow" : ["advancedSearch", "questionID"],
		"spotify" : ["soptifyTrack", "spotifyArtist", "spotifyPlaylist", "spotifyAlbum", "spotifyUser", "spotifyCategory"],
		"flickr" : ["flickrPhoto", "flickrGroup", "flickrPlace", "flickrPerson", "flickrTag"],
	};

	objects = objectList[resource];


	var style = [	
					{
						selector: 'node[group = "object"]',
						css: {'background-color': 'blue', 'content': 'data(label)'}
					},

					{
						selector: 'node[group = "resource"]',
						css: {'background-color': 'red', 'content': 'data(label)'}
					}
				]
	var nodes = [{"data" : {id : "n0", label : resource, group : "resource"}}];
	var edges = [];
	for (var i = 0 ; i < objects.length; i ++) 
	{
		nodes.push({"data" : {id : "n" + (i + 1).toString() ,label : objects[i], group : "object"}});
		edges.push({"data" : {id : "e" + i.toString(), source : "n0", target : "n" + (i + 1).toString(), group : "edges"}});
	}

	var cy = cytoscape({
        container: document.getElementById('cy'),
        style: style,
        layout: { name: 'cose', fit: true },
        elements: 
        {
        	nodes: nodes,
        	edges: edges
        }
    });

    cy.on('tap', 'node', function(evt)
	{
	    var group = this.data('group');
	    if (group == 'object')
	    {
	        var object = this.data("label");
	        drawSchema(resource, object);
	    }
	    else
	    {
	        return;
	    }
	});

}



function drawSchema(resource, object) 
{
	arg = {resource : resource, object : object};
	$.getJSON(
                '/getSchema',
                {arg: JSON.stringify(arg)},
                function draw(response) 
                {
                	var schema = response.res.schema;
                	var properties = Object.keys(schema);
                	var nodes = [];
					for (var i = 0; i < properties.length; i ++) 
					{
						nodes.push({"data" : {id : properties[i], label : properties[i], group : "properties"}});
					}

					var style = [
					                { selector: 'node', css: {'background-color': 'blue', 'content': 'data(label)'}}
					            ];

					var cy = cytoscape({
					                    container: document.getElementById('cy'),
					                    style: style,
					                    layout: { name: 'cose', fit: true },      
					                    elements: 
					                    {
	                    					nodes: nodes
	 				                   	}
	                		});

					cy.on('tap', 'node', function(evt)
					{
	    				var property = this.data('label');
	    				var type = schema[property];
	    				setConstrain(resource, object, property, type);
					});


                }
            );
}


function setConstrain(resource, object, property, type) 
{
	document.getElementById("ConstrainForm").reset();
	var dynamic_query_function = "queryData" + "('" + resource + "','" + object + "','" + property + "','" + type + "')";
	document.getElementById("SubmitConstrain").setAttribute("onclick", dynamic_query_function); 

	/*var dynamic_cancel_function = "cancelConstrain" + "('" + type + "')";
	document.getElementById("ResetConstrain").setAttribute("onclick", dynamic_cancel_function); */

	var title = "Set Constrain on " + property;
	document.getElementById('ConstrainTitle').innerHTML = "Set constrain on property " + property;
	document.getElementById('Property').value = property;
	document.getElementById('Property').readOnly = true;
	if (type == "Boolean")
	{		
		document.getElementById('BooleanValueDiv').style.display = "block";	
	}
	else if (type == "String")
	{
		document.getElementById('StringOperatorDiv').style.display = "block";
		document.getElementById('RHSvalueDiv').style.display = "block";	
	}
	else if (type == "List")
	{
		document.getElementById('ListOperatorDiv').style.display = "block";
		document.getElementById('RHSvalueDiv').style.display = "block";
	}
	else
	{
		document.getElementById('NumberOperatorDiv').style.display = "block";
		document.getElementById('RHSvalueDiv').style.display = "block";
	}

	document.getElementById('SubmitConstrain').style.width = "40%";
	document.getElementById('ResetConstrain').style.width = "40%";
	addMask('Constrain');
	document.getElementById('Constrain').style.display = "block";
}


function hideConstrainForm() 
{
	document.getElementById('Constrain').style.display = "none";
	document.getElementById('Property').readOnly = false;
	var classElements = document.getElementsByClassName('ConstrainFormElement');
	for (var i = 0; i < classElements.length; i ++) 
	{
    	classElements[i].style.display = 'none';
	}
}


function queryData(resource, object, property, type) 
{
	removeMask('Constrain');
	hideConstrainForm();
	var form = document.getElementById("ConstrainForm");
	var inclusive_element = document.getElementById("exclusive_or_inclusive");
	var inclusive = inclusive_element.options[inclusive_element.selectedIndex].value;
	var query = {"resource" : resource, "object" : object, "property" : property, "inclusive" : inclusive, "type" : type}
	
	if (type == "Boolean")
	{
		var operator_element = document.getElementById("BooleanValue");
		var value = operator_element.options[operator_element.selectedIndex].value;
		query["operator"] = "=";
		query["value"] = value;
	}
	else if (type == "String")
	{
		var operator_element = document.getElementById("StringOperator");
		var operator = operator_element.options[operator_element.selectedIndex].value;
		var value = document.getElementById("RHSvalue").value;
		query["operator"] = operator;
		query["value"] = value;
	}
	else if (type == "List")
	{
		var operator_element = document.getElementById("ListOperator");
		var operator = operator_element.options[operator_element.selectedIndex].value;
		var value = document.getElementById("RHSvalue").value;
		query["operator"] = operator;
		query["value"] = value;
	}
	else
	{
		var operator_element = document.getElementById("NumberOperator");
		var operator = operator_element.options[operator_element.selectedIndex].value;
		var value = document.getElementById("RHSvalue").value;
		query["operator"] = operator;
		query["value"] = value;
	}

	$.getJSON(
                '/queryData',
                {arg: JSON.stringify(query)},
                function drawDataset(response) 
                {
                	var result = response.nodes.nodes;
                	var style = [
					                { selector: 'node', css: {'background-color': 'blue', 'content': 'data(' + property + ')'}}
					            ];

					var cy = cytoscape({
					                    container: document.getElementById('cy'),
					                    style: style,
					                    layout: { name: 'cose', fit: true },      
					                    elements: 
					                    {
	                    					nodes: result
	 				                   	}
	                		});

					currDataset = cy;
					document.getElementById("SaveDataset").style.display = "block";
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

function addMask(elementToShow) 
{
	var maskWidth = $(document).width();
	var maskHeight = $(document).height();
	$('<div class="mask"></div>').appendTo($('body'));
	$('div.mask').css({
		'position':'absolute',
		'top':0,
		'left':0,
		'background':'black',
		'opacity':0.5,
		'width':maskWidth,
		'height':maskHeight,
		'z-index':999
	});
	document.getElementById(elementToShow).style.zIndex = 1000;
}

function removeMask(elementToShow) 
{
	$('div.mask').remove();
	document.getElementById(elementToShow).style.zIndex = 0;
}


function cancelConstrain() 
{
	removeMask('Constrain');
	hideConstrainForm();
	document.getElementById("ConstrainForm").reset();
	return;
}

function closeDetails() 
{
	removeMask('NodeDetail');
	document.getElementById("NodeDetailTitle").innerText = "Details of the node you clicked";
	document.getElementById("DisplayDetailsArea").innerHTML = "";
	document.getElementById('NodeDetail').style.display = "none";
	return;
}


function cancelDataset() 
{
	currDataset = null;
	showResources();
	return;
}

function saveDataset() 
{
	var end = false;
	var data = [];
	var name = null;
	while (end == false)
	{
		name = prompt("Please enter name for this dataset", "");
		if (name === "") 
    	{
    		alert("Name cannot be empty");
		} 
		else if (name) 
		{
			var cy = currDataset;
			var nodes = cy.filter("node");
			var resource = null;
			var object = null;
			for (var i = 0; i < nodes.length; i++) 
			{
				data.push(nodes[i].data());
				/*
				resource = nodes[i].data('resource');
				object = nodes[i].data('object');
				*/
			}
			//console.log(nodes);
			end = true;
		} 
		else 
		{
			end = true;
			return;
		}
	}


	$.getJSON(
                '/saveDataset',
                {arg: JSON.stringify([name, data])},
                function addDatasetNode(response)
                {
                	/*console.log(response.response["msg"]);*/
                	var result = response.response["msg"];
                	if (result == "Already exists")
                	{
                		alert("Dataset name already exists.");
                	}
                	else
                	{
                		alert("Successfully saved.");
                	}
                	return;
                })


}