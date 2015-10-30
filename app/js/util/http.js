'use strict';
var HttpInteractor = function() {

    this.successBlock = null;
    this.failBlock = null;
    this.token = null;

    this.onReadyStateChange = function() {
        if (this.xhr.readyState === 4) {
            if (this.xhr.status === 200) {
                var data = JSON.parse(this.xhr.responseText);
                this.successBlock(data);
            } else {
                this.failBlock(this.xhr.status);
            }
        }
    }.bind(this);

    this.delete = function(url, successBlock, failBlock) {
        this.request("DELETE", url, successBlock, failBlock);
    };

    this.post = function(url, data, successBlock, failBlock) {
        this.request("POST", url, data, successBlock, failBlock);
    }.bind(this);

    this.get = function(url, successBlock, failBlock) {
        this.request("GET", url, null, successBlock, failBlock);
    }.bind(this);

    this.request = function(method, url, data, successBlock, failBlock) {
        this.successBlock = successBlock;
        this.failBlock = failBlock;
        this.xhr.open(method, url, true);
        this.xhr.setRequestHeader("Content-Type", "application/json");
        this.xhr.setRequestHeader("Accept", "application/json");
        if (this.token) {
            this.xhr.setRequestHeader("X-Auth-Token", this.token);
        }
        if (data) {
            this.xhr.send(JSON.stringify(data));
        }
        else {
            this.xhr.send();
        }
    }.bind(this);

    this.setSecret = function(token) {
        this.token = token;
    };

    this.xhr = new XMLHttpRequest();
    this.xhr.onreadystatechange = this.onReadyStateChange;

};

module.exports = HttpInteractor;
