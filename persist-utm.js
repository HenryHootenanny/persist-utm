console.log("Persisting UTM parameters...");
(function () {
  // Function to get URL parameters
  function getUrlParams() {
    var params = {};
    var queryString = window.location.search.substring(1);
    var pairs = queryString.split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  // Function to set URL parameters
  function setUrlParams(params) {
    var baseUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    var newUrl =
      baseUrl +
      "?" +
      Object.keys(params)
        .map(function (key) {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        })
        .join("&");
    window.history.replaceState({ path: newUrl }, "", newUrl);
  }

  // Get current URL parameters
  var params = getUrlParams();

  // Check for UTM parameters and persist them if they exist
  var utmParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  var hasUtmParams = utmParams.some(function (param) {
    return params[param];
  });

  if (hasUtmParams) {
    sessionStorage.setItem("utmParams", JSON.stringify(params));
  } else {
    var storedParams = sessionStorage.getItem("utmParams");
    if (storedParams) {
      var parsedParams = JSON.parse(storedParams);
      Object.assign(params, parsedParams);
      setUrlParams(params);
    }
  }
})();
