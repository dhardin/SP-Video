//our data module allows us to take in an array of objects 
//which will each reference a list and view GUID.
//
//The module processes each object linearly and then
//returns the results which is stored in the object.
//
//When a result is returned, a callback function is called on the result
//and each callback is also stored in the calling object.  This allows for us to
//process the results asynchronously.
//

var spData = (function(){
	var stateMap = {
		dataArr: [],
		currentDataArrIndex: 0
	},
	getData, _getListItems, _parseSPUrl;

	getData = function(dataArr, index, callback){
		var url, guid, viewName, type, dataCallback;

		if(!dataArr instanceof Array){
			return;
		}
		if (index > dataArr.length){
			return;
		}

		url = dataArr[index].url;
		dataCallback = dataArr[index].callback;

		stateMap.dataArr = dataArr;
		stateMap.currentDataArrIndex = index = index || 0;

		getListItems(url, function () {
			if (dataCallback){
				dataCallback(results);
			}
			if(index == dataArr.length){
				if(callback){
					callback();
				}
			} else {
				getData(dataArr, ++index, callback);
			}
		})

	};

	 // Begin Utility Method /_getListItems/
    _getListItems = function (url, callback) {
        var results = [], soapEnv, body, listName;
        
        _parseSPUrl(url, function(result){
            listName = result.title;
            url = result.site;
        });


        soapEnv =
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
                <soap:Body>\
                    <GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
                        <listName>'+listName+'</listName>\
                    </GetListItems>\
                </soap:Body>\
            </soap:Envelope>';



        $.ajax({
            url: url + "/_vti_bin/lists.asmx",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/sharepoint/soap/GetListItems');
            },
            type: "POST",
            dataType: "xml",
            data: soapEnv,
            tryCount: 3,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                printError(XMLHttpRequest, textStatus, errorThrown)
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                } else if (callback) {
                    callback(textStatus);
                }
            },
            complete: function (xData, status) {
                var responseProperty = (type == config_map.type_map.document_library ? 'responseText' : 'responseXML'),
                 results = $(xData[responseProperty]).find('z\\:row');

                if (callback) {
                    callback(results);
                }
            },
            contentType: "text/xml; charset=\"utf-8\""
        });
    };
    // End Utility Method /_getListItems/

    // Begin Utility Method /_parseSPUrl/
    _parseSPUrl = function(url, callback){
            if (!url){
                return;
            }

            var result = {site: 'N/A', title: 'N/A', type: 'N/A'},
                listPathIndex = url.toLowerCase().indexOf('lists'), 
                formsPathIndex = url.toLowerCase().indexOf('forms'), 
                titleStartIndex = -1, titleEndIndex = -1,
                tempUrl = '';

            


                //parse out the site from the url
            if(listPathIndex > -1){
                //parse out the title of the list or library from the url
                titleEndIndex = (url.lastIndexOf('/') < url.length - 1 ? url.lastIndexOf('/') : url.length);
                tempUrl = url.substr(0, titleEndIndex);
                titleStartIndex = tempUrl.lastIndexOf('/') + 1;

                result.title = tempUrl.substr(titleStartIndex, titleEndIndex);
                result.site = url.substr(0, listPathIndex);
                result.type = 'List';

            } else if (formsPathIndex > -1){
                //parse out the title of the list or library from the url
                titleEndIndex = formsPathIndex - 1;
                tempUrl = url.substr(0, titleEndIndex);
                titleStartIndex = tempUrl.lastIndexOf('/') + 1;

                result.title = tempUrl.substr(titleStartIndex, titleEndIndex);
                result.site = tempUrl.substr(0, titleStartIndex);
                result.type = 'Document Library';
            } 

            if(callback){
                callback(result);
            }
        }
    // End Utility Method /_parseSPUrl/

	return {
		getData: getData
	};
})();