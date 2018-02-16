from Twitter.TwitterParser import TwitterParser

def getHashKey(nodeRecord):
    data = {"id": str(nodeRecord.d._id)}
    data.update(nodeRecord.d.properties)
    return data

def buildNodes(nodeRecord):
    data = {"id": str(nodeRecord.d._id), "label": next(iter(nodeRecord.d.labels))}
    data.update(nodeRecord.d.properties)
    ret = {"data": data}
    return ret

def buildEdges(relationRecord):
    data = {"source": str(relationRecord.r.start_node._id), 
            "target": str(relationRecord.r.end_node._id),
            "relationship": relationRecord.r.rel['type']}

    return {"data": data}

def storeData(resource, graph, data, usernamem, hashkey):
    # data = json.loads(request.args.get('arg'))
    if resource == "twitter":
        tp = TwitterParser(graph)
        tp.execute(data, usernamem, hashkey)
        return {"msg" : "Done"}
        # return jsonify(response = {"msg" : "Done"})