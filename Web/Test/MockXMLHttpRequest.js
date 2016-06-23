function MockXMLHttpRequest() {
    this.OpenRequestValues = "";
    this.SendData = "";
    this.SendCalled = 0;
    this.RequestHeader = "";
    this.SetResponseText = function (JsonResponce) {
        this.responseText = JsonResponce;
    }

    this.responseText = "";
    this.readyState = 4;
    this.status = 200;
    this.open = function(method, url, async) {
        this.OpenRequestValues = method + url + async;
    }
    this.send = function (packet) {
        if (packet == undefined)
            this.SendCalled++;
        else
            this.SendData = packet;
    }
    this.setRequestHeader = function(HeaderTitle, HeaderValue) {
        this.RequestHeader = HeaderTitle + HeaderValue;
    }
    this.onreadystatechange = null;
}