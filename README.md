# TwsWebsite - Angular Website.

## Sponsor this project
Links on Right

## Disclaimers
### <ins>High Charts</ins>
The charts utilize highcharts which requires a separate license.  Please see https://shop.highsoft.com/
###  <ins>Interactive Brokers</ins>
This is not associated with Interactive Brokers other than the utilization of the api supplied by Interactive Brokers.
###  <ins>Proof of concept/Alpha version </ins>
Little testing, never utilized in production, no automated tests.
###  <ins>Ports</ins>
Make sure the following ports are secured:
* 7497, 7496, 4001, 4002 - Default ports utilized by TWS workstation or gateway.
* 6811 - Default port utilized between website and server.
* 8080 - Default port utilized by website.

## Windows Installation
1. https://github.com/Jde-cpp/TwsWebsite/releases - run Setup.msi.
2. Requires node.js - https://nodejs.org/en/
3. From the start menu, open 'node.js command prompt' and run:  `npm install --global http-server`
4.  Start Interactive Brokers TWS Gateway or Workstation.
5.  Run TwsWeb.bat on Desktop.
6.  Open browser to http://localhost:8080/portfolio.
### <ins>Settings</ins>
%ProgramData%\jde-cpp\TwsWebSocket.json
* twsWebSocket\accounts fill in account alias:  `["U123": "IRA", "U456": "Sandbox"]`

## Screenshots
![Portfolio](Portfolio.png "Portfolio")
![Trades](Trades.png "Trades")
![Orders](Orders.png "Orders")
![Watchlist](Watchlist.png "Watchlist")
![Fundamentals](Fundamentals.png "Fundamentals")
![News](News.png "News")
![Chart](Chart.png "Chart")
![Options](Options.png "Options")