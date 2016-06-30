function MockXMLHttpRequest() {
    this.mockOpenRequestValues = "";
    this.mockSendData = "";
    this.mockSendCalled = 0;
    this.mockRequestHeader = "";
    this.stubSetResponseText = function (JsonResponce) {
        this.responseText = JsonResponce;
    }

    this.responseText = "";
    this.readyState = 4;
    this.status = 200;
    this.open = function(method, url, async) {
        this.mockOpenRequestValues = method + url + async;
    }
    this.send = function (packet) {
        if (packet == undefined)
            this.mockSendCalled++;
        else
            this.mockSendData = packet;
    }
    this.setRequestHeader = function(headerTitle, headerValue) {
        this.mockRequestHeader = headerTitle + headerValue;
    }
    this.onreadystatechange = null;
}