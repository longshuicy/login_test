var removedNodes = {};
var removedRelations = {};
var cy = null;

function loadGraph(username, hashkey) {
	arg = {username : username, hashkey : hashkey};
	$.getJSON(
		'/loadGraph',
		{arg: JSON.stringify(arg)},
		function drawGraph(response){
			/*console.log(response.elements);*/
			var style = [
				{selector: 'node[resource = "twitter"][object = "User"]', css: {'background-color': 'blue'}},
				{selector: 'node[resource = "twitter"][object = "Tweet"]', css: {'background-color': 'red'}},
				{selector: 'node[resource = "twitter"][object = "Geo"]', css: {'background-color': 'green'}},
				{selector: 'node[resource = "twitter"][object = "Place"]', css: {'background-color': 'pink'}},
				{selector: 'node[resource = "twitter"][object = "Coordinate"]', css: {'background-color': 'yellow'}},
				{selector: 'node[resource = "twitter"][object = "Entity"]', css: {'background-color': 'grey'}},
				{selector: 'edge', css: {'background-color': 'black', 'curve-style': 'unbundled-bezier'}}
			];

			cy = cytoscape({
				container: document.getElementById('cy'),
				style: style,
				layout: { name: 'cose', fit: true, randomize: true },      
				elements: response.elements
			});

			console.log(response.elements['edges'].length);


			cy.on('tap', 'edge', function(evt){
				console.log(this.data())
			});

			cy.cxtmenu({
				selector: 'node',

				commands: [
				{
					content: 'Select',
					select: function(ele){
						ele.select();
						return;
					}
				},

				{
					content: 'Detail',
					select: function(ele){
						var data = ele.data();
						showNodeDetail(data);
					}
				},

				{
					content: 'Compute Normalized Degree Centrality',
					select: function(ele){
						var degreeCentralityNormalized = cy.elements().degreeCentralityNormalized({ /* my options */ })
						var nodes_dcn = {}
						cy.nodes().forEach( n => {
							n.data({
							  degreeCentralityNormalized: degreeCentralityNormalized.degree(n)
							});
							if (degreeCentralityNormalized.degree(n) in nodes_dcn)
								nodes_dcn[degreeCentralityNormalized.degree(n)].push({"name" : n.data("name"), "neo4j_id" : n.data("neo4j_id")});
							else
								nodes_dcn[degreeCentralityNormalized.degree(n)] = [{"name" : n.data("name"), "neo4j_id" : n.data("neo4j_id")}];
						});

						var dcn_values = Object.keys(nodes_dcn);
						dcn_values.sort();
						dcn_values.forEach(n => {
							var nodes = nodes_dcn[n];
							nodes.forEach(x => {
								console.log(n, x["name"]);
							})
						})
						// console.log(cy.elements());
					}
				}]
			});


			addResourcesListener();
			addObjectsListener();
			addRelationsCheckboxes();
			addRelationsListener();
			return;
		}
	);
}


function showNodeDetail(data)
{
	addMask("NodeDetail");
	for (var key in data)
	{
		var node = document.createElement("LI");
		var textnode = document.createTextNode(key + " : " + data[key]);
		node.appendChild(textnode);
		document.getElementById("DisplayDetailsArea").appendChild(node);
	}
	
	document.getElementById('NodeDetail').style.display = "block";
	return;
}

function closeNodeDetail() 
{
	removeMask('NodeDetail');
	document.getElementById("NodeDetailTitle").innerText = "Details of the node you clicked";
	document.getElementById("DisplayDetailsArea").innerHTML = "";
	document.getElementById('NodeDetail').style.display = "none";
	return;
}

function addResourcesListener() {
	document.getElementById('resources').addEventListener('click', function (e) {
		if (e.target.type == 'checkbox') {
			var resource = e.target.value;
			var checked = e.target.checked;
			
			if (checked){
				var li = document.getElementById(resource + "Objects").parentElement;
				li.style.display = "inline-block";
			}

			else{
				var li = document.getElementById(resource + "Objects").parentElement;
				li.style.display = "none";
			}

			var selector = "node[resource = '" + resource + "']";
			nodeDisplayHandler(selector, checked);
			

		}
	});
	return;
}


function addObjectsListener() {
	document.getElementById("objects").addEventListener('click', function (e) {
		if (e.target.type == 'checkbox') {
			var resource = e.target.parentElement.parentElement.id.slice(0, -7);
			var object = e.target.value;
			var checked = e.target.checked;
			var selector = "node[resource = '" + resource + "'][object = '" + object + "']";
			nodeDisplayHandler(selector, checked);
		}
	});
	return;
}

function addRelationsCheckboxes() {
	var ul = document.getElementById("relations");
	var relations = cy.filter('edge');
	var relation_types = {};
	relations.forEach(n => {
		var type = n.data('relationship');
		if (type in relation_types)
			relation_types[type] += 1;
		else
			relation_types[type] = 1;
	})

	for (var type in relation_types){
		var count = relation_types[type];
		var checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('value', type);
		checkbox.setAttribute('checked', 'checked');
		var p = document.createElement('p');
		p.innerHTML = type + "(" + count.toString() + ")";
		p.appendChild(checkbox);
		ul.appendChild(p);
	}
	return;
}

function addRelationsListener() {
	document.getElementById('relations').addEventListener('click', function (e) {
		if (e.target.type == 'checkbox') {
			var relation = e.target.value;
			var checked = e.target.checked;
			var selector = "edge[relationship = '" + relation + "']";
			relationDisplayHandler(selector, checked);
		}
	})
}

function nodeDisplayHandler(selector, checked) {
	if (checked){
		cy.add(removedNodes[selector]);
		delete removedNodes[selector];	
	}

	else{
		var nodes_to_remove = cy.$(selector);
		removedNodes[selector] = cy.remove(nodes_to_remove.union(nodes_to_remove.connectedEdges()));
	}

	return;
}

function relationDisplayHandler(selector, checked) {
	if (checked) {
		cy.add(removedNodes[selector])
		cy.add(removedRelations[selector]);
		delete removedNodes[selector];
		delete removedRelations[selector];
	}

	else{
		var relations_to_remove = cy.$(selector);
		removedRelations[selector] = cy.remove(relations_to_remove);
		var edges_to_preserve = cy.$('edge');
		var nodes_to_preserve = edges_to_preserve.connectedNodes();
		var nodes_to_remove = cy.nodes().difference(nodes_to_preserve);
		removedNodes[selector] = cy.remove(nodes_to_remove);
	}
	return;
}

function addConstrain(resource, object, property, type) {
	document.getElementById("ConstrainForm").reset();
	var dynamic_action_function = "applyConstrain" + "('" + resource + "','" + object + "','" + property + "','" + type + "')";
	document.getElementById("SubmitConstrain").setAttribute("onclick", dynamic_action_function); 
	document.getElementById('ConstrainTitle').innerHTML = "Set Constrain on " + property;
	document.getElementById('Property').value = property;
	document.getElementById('Property').readOnly = true;
	switch(type){
		case "Boolean":
			document.getElementById('BooleanValueDiv').style.display = "block";	
			break;

		case "String":
			document.getElementById('StringOperatorDiv').style.display = "block";
			document.getElementById('RHSvalueDiv').style.display = "block";	
			break;

		case "List":
			document.getElementById('ListOperatorDiv').style.display = "block";
			document.getElementById('RHSvalueDiv').style.display = "block";
			break;

		default:
			document.getElementById('NumberOperatorDiv').style.display = "block";
			document.getElementById('RHSvalueDiv').style.display = "block";
	}


	document.getElementById('SubmitConstrain').style.width = "40%";
	document.getElementById('ResetConstrain').style.width = "40%";
	addMask('Constrain');
	document.getElementById('Constrain').style.display = "block";
}

function cancelConstrain() {
	removeMask('Constrain');
	hideConstrainForm();
	//document.getElementById("ConstrainForm").reset();
	return;
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

function applyConstrain(resource, object, property, type) {
	removeMask('Constrain');
	hideConstrainForm();
	var form = document.getElementById("ConstrainForm");
	var inclusive_element = document.getElementById("exclusive_or_inclusive");
	var inclusive = inclusive_element.options[inclusive_element.selectedIndex].value;
	var complement_selector = "node[resource = '" + resource + "'][object = '" + object + "']";
	var operator = null;
	var value = null;
	var expression_value = null;

	if(inclusive == '!')
		inclusive = '';
	else
		inclusive = '!';

	switch(type){
		case "Boolean":
			var operator_element = document.getElementById("BooleanValue");
			value = operator_element.options[operator_element.selectedIndex].value;
			if (inclusive == '!'){
				if (value == '?')
					value = '!';
				else
					value = '?';
			}
		
			complement_selector += "[" + value + property + "]";
			nodeDisplayHandler(complement_selector, false);
			var missing_selector = "node[resource = '" + resource + "'][object = '" + object + "'][" + property + " ^= 'Missing']";
			nodeDisplayHandler(missing_selector, false);

			inclusive = inclusive_element.options[inclusive_element.selectedIndex].text;
			operator = "";
			value = operator_element.options[operator_element.selectedIndex].text;
			expression_value = complement_selector + ";" + missing_selector;

			break;

		case "String":
			var operator_element = document.getElementById("StringOperator");
			operator = operator_element.options[operator_element.selectedIndex].value;
			value = document.getElementById("RHSvalue").value;
			complement_selector += "[" + property + " " + inclusive + operator + "'" + value + "']"
			nodeDisplayHandler(complement_selector, false);
			var missing_selector = "node[resource = '" + resource + "'][object = '" + object + "'][" + property + " ^= 'Missing']";
			nodeDisplayHandler(missing_selector, false);

			inclusive = inclusive_element.options[inclusive_element.selectedIndex].text;
			operator = operator_element.options[operator_element.selectedIndex].text;
			expression_value = complement_selector + ";" + missing_selector;
			break;

		case "List":
			break;

		default:
			var operator_element = document.getElementById("NumberOperator");
			operator = operator_element.options[operator_element.selectedIndex].value;
			value = document.getElementById("RHSvalue").value;
			complement_selector += "[" + property + " " + inclusive + operator + "'" + value + "']"
			nodeDisplayHandler(complement_selector, false);
			var missing_selector = "node[resource = '" + resource + "'][object = '" + object + "'][" + property + " ^= 'Missing']";
			nodeDisplayHandler(missing_selector, false);

			inclusive = inclusive_element.options[inclusive_element.selectedIndex].text;
			operator = operator_element.options[operator_element.selectedIndex].text;
			expression_value = complement_selector + ";" + missing_selector;
	}



	var readable_expression = "From " + resource + " select " + object + " where " + property + " " + inclusive + " " + operator + " " + value;
	addInfo(readable_expression, expression_value);
	return;

}


function addInfo(readable_expression, expression_value) {
	var node = document.createElement("LI");
	var a  = document.createElement("a");
	a.setAttribute("id", expression_value);
	a.setAttribute("href", 'javascript:appliedConstrainHandler("' + expression_value + '")');
	a.innerHTML = readable_expression;
	node.appendChild(a);
	document.getElementById("info").appendChild(node);
}

function appliedConstrainHandler(selectors_str) {
	var selectors = selectors_str.split(";");
	for (var i = 0; i < selectors.length; i++) {
		nodeDisplayHandler(selectors[i], true);
	}

	document.getElementById(selectors_str).parentElement.remove();
	return;
}