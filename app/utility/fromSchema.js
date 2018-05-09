/**
 * Created by zendynamix on 20-11-2016.
 */

function  fromSchemaBasedOnJson(jsonConfig){
    var schemaFields=Object.keys(jsonConfig)
    var schemaObject={};
    for(var j=0;j<schemaFields.length;j++){

        schemaObject[schemaFields[j]]=jsonConfig[schemaFields[j]].type
    }

    return schemaObject;
}


module.exports ={
    fromSchemaBasedOnJson:fromSchemaBasedOnJson
}