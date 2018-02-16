var currEdge = null;
var currDataset = null;
function processDataset() 
{
	document.getElementById("StartButtons").style.display = "none";
	document.getElementById("MainArea").style.display = "inline-block";
    document.getElementById("ProcessButtons").style.display = "block";
	document.getElementById("CancelProcessedDataset").style.display = "block";
	document.getElementById("SaveProcessedDataset").style.display = "none";
    document.getElementById("StopProcessing").style.display = "block";
    document.getElementById("title").innerHTML = "Process Your Dataset";
	showCreatedDataset();
}

function FinishProcessing() 
{
    currEdge = null;
    currDataset = null;
    document.getElementById("StartButtons").style.display = "inline-block";
    document.getElementById("MainArea").style.display = "none";
    document.getElementById("ProcessButtons").style.display = "none";
    document.getElementById("CancelProcessedDataset").style.display = "none";
    document.getElementById("SaveProcessedDataset").style.display = "none";
    document.getElementById("StopProcessing").style.display = "none";
    document.getElementById("title").innerHTML = "What do you want to do?";

    var cy = cytoscape({container: document.getElementById('cy')});
    var collection = cy.elements("node");
    cy.remove(collection);
    var collection = cy.elements("edge");
    cy.remove(collection);
}


function showCreatedDataset()
{
	arg = {"operation" : "showCreatedDataset"};
	$.getJSON(
                '/showCreatedDataset',
                {arg: JSON.stringify(arg)},
                function draw(response) 
                {
                	var datasets = response.nodes;
                    var nodes_num = datasets['nodes'].length;
                	/*console.log(datasets);*/

                    var cy = window.cy = cytoscape({
                        container: document.getElementById('cy'),

                        layout: {
                          name: 'grid',
                          rows: Math.sqrt(Math.round(nodes_num)),
                          cols: Math.sqrt(Math.round(nodes_num))
                        },

                        style: [
                            {
                              selector: 'node',
                              style: {
                                'content': 'data(name)'
                              }
                            },

                            {
                              selector: 'edge',
                              style: {
                                'curve-style': 'bezier',
                                'target-arrow-shape': 'triangle'
                              }
                            },

                            // some style for the extension
                            {
                              selector: '.eh-handle',
                              style: {
                                'background-color': 'red',
                                'width': 12,
                                'height': 12,
                                'shape': 'ellipse',
                                'overlay-opacity': 0,
                                'border-width': 12, // makes the handle easier to hit
                                'border-opacity': 0
                              }
                            },

                            {
                                selector: '.eh-hover',
                                style: {'background-color': 'red'}
                            },

                            {
                              selector: '.eh-source',
                              style: {
                                'border-width': 2,
                                'border-color': 'red'
                              }
                            },

                            {
                              selector: '.eh-target',
                              style: {
                                'border-width': 2,
                                'border-color': 'red'
                              }
                            },

                            {
                              selector: '.eh-preview, .eh-ghost-edge',
                              style: {
                                'background-color': 'red',
                                'line-color': 'red',
                                'target-arrow-color': 'red',
                                'source-arrow-color': 'red'
                              }
                            }
                        ],

                        elements: datasets
                    });

                    var eh = cy.edgehandles();

                    cy.cxtmenu({
                        selector: 'node',

                        commands: [
                        {
                            content: 'Show details',
                            select: function(ele){
                                getDatasetDetail(ele.data("name"))
                            }
                        },

                        {
                            content: 'Delete',
                            select: function(ele){
                                deleteDataset(ele.data("name"));
                            }
                            /*disabled: true*/
                        },

                        {
                            content: 'Download dataset as csv',
                            select: function(ele){
                                downloadCSV({datasetname: ele.data("name")});
                            }
                        }]
                    });

                    /*cy.cxtmenu({
                        selector: 'core',

                        commands: [
                        {
                            content: 'bg1',
                            select: function(){
                                console.log( 'bg1' );
                            }
                        },

                        {
                            content: 'bg2',
                            select: function(){
                                console.log( 'bg2' );
                            }
                        }]
                    });*/

                    cy.on('tap', 'node', function showDetails()
                    {
                        // addMask("NodeDetail");
                        var name = this.data("name");
                        getDatasetDetail(name);
                    });

                    cy.on('tap', 'edge', function buildConnection(arg) {
                        currEdge = this;
                        var source = this.source();
                        var target = this.target();
                        addMask("EdgeChoices");
                        createEdgeChoicesButtons();
                        document.getElementById("EdgeChoices").style.display = "block";
                    })
                });
}


function getDatasetDetail(name) 
{
    query = {"name" : name};
    $.getJSON(
                '/getDatasetDetail',
                {arg: JSON.stringify(query)},
                function (response) 
                {
                    var result = response.nodes.nodes;
                    var style = [
                                    { selector: 'node', css: {'background-color': 'blue'}}
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

function deleteDataset(name) 
{
    query = {"name" : name}
    $.getJSON(
                '/deleteDataset',
                {arg: JSON.stringify(query)},
                function (response) 
                {
                    var result = response.response["msg"];
                    window.alert(result);
                    showCreatedDataset();
                    return;
                })
}



function createEdgeChoicesButtons()
{
    clearElements("EdgeChoices", "div");

    var div = document.createElement("div");
    var findIntersection = document.createElement("input");

    findIntersection.id = "findIntersection";
    findIntersection.type = "button";
    findIntersection.value = "Find intersection";
    findIntersection.width = "100%";
    var action_function = "action('findIntersection')"
    findIntersection.setAttribute("onclick", action_function); 

    div.appendChild(findIntersection);
    document.getElementById("EdgeChoices").appendChild(div);

    var div = document.createElement("div");
    var findUnion = document.createElement("input");
    findUnion.id = "findUnion";
    findUnion.type = "button";
    findUnion.value = "Find Union";
    findUnion.width = "100%";
    var action_function = "action('findUnion')"
    findUnion.setAttribute("onclick", action_function); 

    div.appendChild(findUnion);
    document.getElementById("EdgeChoices").appendChild(div);
}


function closeEdgeChoices() 
{
    currEdge = null;
    removeMask("EdgeChoices");
    clearElements("EdgeChoices", "div");
    document.getElementById("EdgeChoices").style.display = "none";
}

function clearElements(div_id, element_type) 
{
    jQuery('#' + div_id + ' ' + element_type).html('');
}


function action(function_name) 
{
    window[function_name]();
    closeEdgeChoices();
    document.getElementById("SaveProcessedDataset").style.display = "block";
}


function findIntersection() 
{
    removeMask("EdgeChoices");
    var edge = currEdge;
    var source = edge.source();
    var target = edge.target();
    source_name = source.data('name');
    target_name = target.data('name');
    /*
    source_resource = source.data('resource');
    target_resource = target.data('resource');
    source_object = source.data('object');
    target_object = target.data('object');
    */
    $.getJSON(
                '/findIntersection',
                {arg: JSON.stringify([source_name, target_name])},
                function (response)
                {
                    var result = response.nodes.nodes;
                    var style = [
                                    { selector: 'node', css: {'background-color': 'blue'}}
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
                })

}

function findUnion() 
{
    removeMask("EdgeChoices");
    var edge = currEdge;
    var source = edge.source();
    var target = edge.target();
    source_name = source.data('name');
    target_name = target.data('name');
    /*
    source_resource = source.data('resource');
    target_resource = target.data('resource');
    source_object = source.data('object');
    target_object = target.data('object');
    */
    $.getJSON(
                '/findUnion',
                {arg: JSON.stringify([source_name, target_name])},
                function (response)
                {
                    var result = response.nodes.nodes;
                    var style = [
                                    { selector: 'node', css: {'background-color': 'blue'}}
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
                })
}


function saveProcessedDataset()
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
                    showCreatedDataset();
                    return;
                })
}

function cancelProcessedDataset() 
{
    currDataset = null;
    currEdge = null;
    showCreatedDataset();
    return;
}


function pivot(arr) {
    var mp = new Map();
    
    function setValue(a, path, val) {
        if (Object(val) !== val) { // primitive value
            var pathStr = path.join('.');
            var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
            a[i] = val;
        } else {
            for (var key in val) {
                setValue(a, key == '0' ? path : path.concat(key), val[key]);
            }
        }
        return a;
    }
    
    var result = arr.map( obj => setValue([], [], obj) );
    ret = [[...mp.keys()], ...result];
    return ret
}

function toCsv(arr) {
    ret = arr.map( row => 
        row.map ( val => isNaN(val) ? JSON.stringify(val) : val ).join(',')
    ).join('\n');
    return ret
}


function convertArrayOfObjectsToCSV(args) 
{

    ret = toCsv(pivot(args.data));
    return ret;
}

function downloadCSV(args) 
{
    var datasetname = args.datasetname;
    query = {"name" : datasetname};
    console.log(datasetname);
    $.getJSON(
        '/getDatasetDetail',
        {arg: JSON.stringify(query)},
        function (response) 
        {
            var result = response.nodes.nodes;
            var csv_data = [];
            for (var i = 0; i < result.length; i++) {
                csv_data.push(result[i]["data"]);
            }
            var data, link;
            var csv = convertArrayOfObjectsToCSV({
                data: csv_data
            });
            if (csv == null) return;
            var filename = datasetname + '.csv';

            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);

            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();

        });

}