class MockXMLHttpRequest {
    constructor() {
        this.mockOpenRequestValues = "";
        this.mockSendData = "";
        this.mockSendCalled = 0;
        this.mockRequestHeader = "";   
        this.responseText = "";
        this.readyState = 4;
        this.status = 200;
        this.onreadystatechange = null;
    }

    stubSetResponseText(JsonResponce) {
        this.responseText = JsonResponce;
    }

    open(method, url, async) {
        this.mockOpenRequestValues = method + url + async;
    }
    send(packet) {
        if (packet == undefined)
            this.mockSendCalled++;
        else
            this.mockSendData = packet;
    }
    setRequestHeader(headerTitle, headerValue) {
        this.mockRequestHeader = headerTitle + headerValue;
    }
}