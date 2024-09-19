(function () {
  console.log("Persisting UTM parameters...");

  const STORAGE_KEY = "utmParams";
  const UTM_PARAMETER_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  const searchParams = [];
  new URL(window.location.href).searchParams.forEach((value, key) => {
    searchParams.push([key, value]);
  });

  const utmParams = searchParams.filter(([key]) =>
    UTM_PARAMETER_KEYS.includes(key)
  );

  const restoreUtmParams = () => {
    const res = sessionStorage.getItem(STORAGE_KEY);
    if (!res) {
      return;
    }

    const utmParams = JSON.parse(res);
    const url = [
      new URL(
        `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      ),
      new URLSearchParams(utmParams).toString(),
    ].join("?");

    window.history.replaceState({ path: url.toString() }, "", url);
  };

  if (utmParams.length) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmParams));
  } else {
    restoreUtmParams();
  }
})();
