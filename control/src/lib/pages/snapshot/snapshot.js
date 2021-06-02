"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var webSocket_1 = require("rxjs/webSocket");
var PortfolioComponent = /** @class */ (function () {
    //find out how a global setting is set to determine ib server.
    //connect to the global server here.
    //subscribe to events here.
    function PortfolioComponent(dialog, loggingService, element) 
    {
        this.dialog = dialog;
        this.loggingService = loggingService;
        this.element = element;
        this.connected = false;
        this.displayedColumns = ['date', 'message', 'file', 'function', 'line']; // [ 'date', 'message', 'file', 'function', 'line' ];
    }
    PortfolioComponent.prototype.ngAfterViewInit = function () 
    {
        var _this = this;
        this.socket = webSocket_1.webSocket({ url: 'ws://localhost:1967', deserializer: function (msg) { return _this.onMessage(msg); }, serializer: function (msg) { return msg; } });
        this.socket.subscribe(function (msg) { return _this.addMessage(msg); }, function (err) { return _this.error(err); }, function () { return _this.complete(); });
        this.connected = true;
    };
    PortfolioComponent.prototype.onMessage = function (msg) 
    {
        var transmission = Jde.Markets.Proto.Transmission.decode(msg);
        //var tokens = msg.data.split( '\0' );
        return "";
    };
    PortfolioComponent.prototype.addMessage = function (msg) 
    {
        //this.loggingService.log( msg );
        //this.loggingService. 
    };
    PortfolioComponent.prototype.error = function (err) 
    {
        this.connected = false;
        this.loggingService.error(err);
    };
    PortfolioComponent.prototype.complete = function () 
    {
        this.loggingService.log('complete');
    };
    PortfolioComponent = __decorate([ core_1.Component({ selector: 'portfolio', templateUrl: './portfolio.component.html'})], PortfolioComponent );
    return PortfolioComponent;
}());
exports.PortfolioComponent = PortfolioComponent;
