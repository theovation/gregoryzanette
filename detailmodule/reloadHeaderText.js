 var baseUrl = window.location.hostname;
  function reloadHeaderText(baseUrl) {
  // var isDowntownboston = baseUrl.indexOf("");
  var isLocalHost = baseUrl.indexOf("localhost");
  var isGreg = baseUrl.indexOf("ovation");
  var isBackBay = baseUrl.indexOf("backbay");
  var isSeaport = baseUrl.indexOf("seaport");
  var isSouthboston = baseUrl.indexOf("southboston");
  var isSouthie = baseUrl.indexOf("southie");
  var isEastboston = baseUrl.indexOf("eastboston");
  var isBeaconhill = baseUrl.indexOf("beaconhill");
  var isCharlestown = baseUrl.indexOf("charlestown");
  var isEastcambridge = baseUrl.indexOf("eastcambridge");
  var isFenway = baseUrl.indexOf("fenway");
  var isMalden = baseUrl.indexOf("malden");
  var isNorthend = baseUrl.indexOf("northend");
  var isSomerville = baseUrl.indexOf("somerville");
  var isSouthend = baseUrl.indexOf("southend");
  var isWestend = baseUrl.indexOf("westend");
  var isAllston = baseUrl.indexOf("allston");
  var isChestnuthill = baseUrl.indexOf("chestnuthill");;
  var isDedham = baseUrl.indexOf("dedham"); 
  var isJamaicaPlain = baseUrl.indexOf("jamaicaplain");;
  var isNeedham = baseUrl.indexOf("needham");;
  var isNewton = baseUrl.indexOf("newton");;
  var isQuincy = baseUrl.indexOf("quincy");;
  var isRevere = baseUrl.indexOf("revere");;

  if(isGreg !== -1) {
    isBackBay = 1;
  }

  if(isLocalHost !== -1 || isBackBay !== -1) {
    window.neighborhoodCode = 'backbay';
    window.neighborhoodText = 'Back Bay';
    $(".city").text('Boston');
  }
  
  if(isAllston !== -1) {
    window.neighborhoodCode = 'allston';
    window.neighborhoodText = 'Allston';
    $(".city").text('Boston');
  }

  if(isChestnuthill !== -1) {
    window.neighborhoodCode = 'chestnuthill';
    window.neighborhoodText = 'Chestnut Hill';
    $(".city").text('Chestnut Hill');
  }

  if(isDedham !== -1) {
    window.neighborhoodCode = 'dedham';
    window.neighborhoodText = 'Dedham';
    $(".city").text('Dedham');
  }

  if(isJamaicaPlain !== -1) {
    window.neighborhoodCode = 'jamaicaplain';
    window.neighborhoodText = 'Jamaica Plain';
    $(".city").text('Boston');
  }

  if(isNeedham !== -1) {
    window.neighborhoodCode = 'needham';
    window.neighborhoodText = 'Needham';
    $(".city").text('Needham');
  }

  if(isNewton !== -1) {
    window.neighborhoodCode = 'newton';
    window.neighborhoodText = 'Newton';
    $(".city").text('Newton');
  }

  if(isQuincy !== -1) {
    window.neighborhoodCode = 'quincy';
    window.neighborhoodText = 'Quincy';
    $(".city").text('Quincy');
  }

  if(isRevere !== -1) {
    window.neighborhoodCode = 'revere';
    window.neighborhoodText = 'Revere';
    $(".city").text('Revere');
  }

  if(isSeaport !== -1) {
    window.neighborhoodCode = 'seaport';
    window.neighborhoodText = 'Sea Port';
    $(".city").text('Boston');
  }
  if(isSouthboston !== -1) {
    window.neighborhoodCode = 'southboston';
    window.neighborhoodText = 'South Boston';
    $(".city").text('Boston');
  }
  if(isSouthie !== -1) {
    window.neighborhoodCode = 'southie';
    window.neighborhoodText = 'Southie';
    $(".city").text('Boston');
  }
  if(isEastboston !== -1) {
    window.neighborhoodCode = 'eastboston';
    window.neighborhoodText = 'East Boston';
    $(".city").text('East Boston');
  }
  if(isBeaconhill !== -1) {
    window.neighborhoodCode = 'beaconhill';
    window.neighborhoodText = 'Beacon Hill';
    $(".city").text('Boston');
  }
  if(isCharlestown !== -1) {
    window.neighborhoodCode = 'charlestown';
    window.neighborhoodText = 'Charlestown';
    $(".city").text('Boston');
  }
  if(isEastcambridge !== -1) {
    window.neighborhoodCode = 'eastcambridge';
    window.neighborhoodText = 'East Cambridge';
    $(".city").text('East Cambridge');
  }
  if(isFenway !== -1) {
    window.neighborhoodCode = 'fenway';
    window.neighborhoodText = 'Fenway';
    $(".city").text('Boston');
  }
  if(isMalden !== -1) {
    window.neighborhoodCode = 'malden';
    window.neighborhoodText = 'Malden';
    $(".city").text('Malden');
  }
  if(isNorthend !== -1) {
    window.neighborhoodCode = 'northend';
    window.neighborhoodText = 'North End';
    $(".city").text('Boston');
  }
  if(isSomerville !== -1) {
    window.neighborhoodCode = 'somerville';
    window.neighborhoodText = 'Somerville';
    $(".city").text('Somerville');
  }
  if(isSouthend !== -1) {
    window.neighborhoodCode = 'southend';
    window.neighborhoodText = 'South End';
    $(".city").text('Boston');
  }
  if(isWestend !== -1) {
    window.neighborhoodCode = 'westend';
    window.neighborhoodText = 'West End';
    $(".city").text('Boston');
  }

  var isChinatown = baseUrl.indexOf("chinatown");;

  if(isChinatown !== -1) {
    window.neighborhoodCode = 'chinatown';
    window.neighborhoodText = 'Chinatown';
    $(".city").text('Boston');
  }

  var isDowntownboston = baseUrl.indexOf("downtownboston");;

  if(isDowntownboston !== -1) {
    window.neighborhoodCode = 'downtownboston';
    window.neighborhoodText = 'Downtown Boston';
    $(".city").text('Boston');
  }

  var isDorchester = baseUrl.indexOf("dorchester");;

  if(isDorchester !== -1) {
    window.neighborhoodCode = 'dorchester';
    window.neighborhoodText = 'Dorchester';
    $(".city").text('Boston');
  }

  var isFinancialDistrict = baseUrl.indexOf("financialdistrict");;

  if(isFinancialDistrict !== -1) {
    window.neighborhoodCode = 'financialdistrict';
    window.neighborhoodText = 'Financial District';
    $(".city").text('Boston');
  }

  var isHydePark = baseUrl.indexOf("hydepark");;

  if(isHydePark !== -1) {
    window.neighborhoodCode = 'hydepark';
    window.neighborhoodText = 'Hyde Park';
    $(".city").text('Boston');
  }

  var isKenmore = baseUrl.indexOf("kenmore");;

  if(isKenmore !== -1) {
    window.neighborhoodCode = 'kenmore';
    window.neighborhoodText = 'Kenmore';
    $(".city").text('Boston');
  }

  var isMissionHill = baseUrl.indexOf("missionhill");;

  if(isMissionHill !== -1) {
    window.neighborhoodCode = 'missionhill';
    window.neighborhoodText = 'Mission Hill';
    $(".city").text('Boston');
  }

  var isRoslindale = baseUrl.indexOf("roslindale");;

  if(isRoslindale !== -1) {
    window.neighborhoodCode = 'roslindale';
    window.neighborhoodText = 'Roslindale';
    $(".city").text('Boston');
  }

  var isRoxbury = baseUrl.indexOf("roxbury");;

  if(isRoxbury !== -1) {
    window.neighborhoodCode = 'roxbury';
    window.neighborhoodText = 'Roxbury';
    $(".city").text('Boston');
  }

  var isSeaport = baseUrl.indexOf("seaport");;

  if(isSeaport !== -1) {
    window.neighborhoodCode = 'seaport';
    window.neighborhoodText = 'Seaport';
    $(".city").text('Boston');
  }

  var isWestRoxbury = baseUrl.indexOf("westroxbury");;

  if(isWestRoxbury !== -1) {
    window.neighborhoodCode = 'westroxbury';
    window.neighborhoodText = 'West Roxbury';
    $(".city").text('Boston');
  }

  var isBrookline = baseUrl.indexOf("brookline");

  if(isBrookline !== -1) {
    window.neighborhoodCode = 'brookline';
    window.neighborhoodText = 'Brookline';
    $(".city").text('Boston');
  }

  var isCambridge = baseUrl.indexOf("cambridge");

  if(isCambridge !== -1) {
    window.neighborhoodCode = 'cambridge';
    window.neighborhoodText = 'Cambridge';
    $(".city").text('Cambridge');
  }

  var isDedham = baseUrl.indexOf("dedham");

  if(isDedham !== -1) {
    window.neighborhoodCode = 'dedham';
    window.neighborhoodText = 'Dedham';
    $(".city").text('Dedham');
  }

  var isLexington = baseUrl.indexOf("lexington");

  if(isLexington !== -1) {
    window.neighborhoodCode = 'lexington';
    window.neighborhoodText = 'Lexington';
    $(".city").text('Lexington');
  }

  var isMarblehead = baseUrl.indexOf("marblehead");

  if(isMarblehead !== -1) {
    window.neighborhoodCode = 'marblehead';
    window.neighborhoodText = 'Marblehead';
    $(".city").text('Marblehead');
  }

  var isNatick = baseUrl.indexOf("natick");

  if(isNatick !== -1) {
    window.neighborhoodCode = 'natick';
    window.neighborhoodText = 'Natick';
    $(".city").text('Natick');
  }

  var isNeedham = baseUrl.indexOf("needham");

  if(isNeedham !== -1) {
    window.neighborhoodCode = 'needham';
    window.neighborhoodText = 'Needham';
    $(".city").text('Needham');
  }

  var isWaltham = baseUrl.indexOf("waltham");

  if(isWaltham !== -1) {
    window.neighborhoodCode = 'waltham';
    window.neighborhoodText = 'Waltham';
    $(".city").text('Waltham');
  }

  var isWatertown = baseUrl.indexOf("watertown");

  if(isWatertown !== -1) {
    window.neighborhoodCode = 'watertown';
    window.neighborhoodText = 'Watertown';
    $(".city").text('Watertown');
  }

  var isWellesley = baseUrl.indexOf("wellesley");

  if(isWellesley !== -1) {
    window.neighborhoodCode = 'wellesley';
    window.neighborhoodText = 'Wellesley';
    $(".city").text('Wellesley');
  }

  var isWeston = baseUrl.indexOf("weston");

  if(isWeston !== -1) {
    window.neighborhoodCode = 'weston';
    window.neighborhoodText = 'Weston';
    $(".city").text('Weston');
  }

  var isWinthrop = baseUrl.indexOf("winthrop");

  if(isWinthrop !== -1) {
    window.neighborhoodCode = 'winthrop';
    window.neighborhoodText = 'Winthrop';
    $(".city").text('Winthrop');
  }

  $("#header-text").text(window.neighborhoodText);
  
  document.title = 'Ovation Properties' // window.neighborhoodText + ' Rentals';
  }
$(document).ready(function(){
  reloadHeaderText(baseUrl);  
})
