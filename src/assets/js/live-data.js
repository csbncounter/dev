(function ($, _, ncounter) {

  function getTemplate(templateSelector) {
    return _.template($(templateSelector).html());
  }

  function fetchActivities() {
    return $.get('https://spreadsheets.google.com/feeds/list/1sFE_km9psbf-Ey-fhnjqgsMR_CcWCDDsqXOCMJL0X2E/od6/public/values?alt=json')
      .then(function (response) {
        return _.map(response.feed.entry, function(entry) {
          return {
            event: entry.gsx$event.$t,
            unit: entry.gsx$unit.$t,
            church: entry.gsx$church.$t,
            state: entry.gsx$state.$t,
            characterTrait: entry.gsx$charactertrait.$t
          };
        });
      });
  }

  function fetchActivitySuggestions() {
    return $.get('https://spreadsheets.google.com/feeds/list/1yUf8eVrJygLK5MRZpTKvSZU2ZrjxR26SXGkiYMKFEfo/od6/public/values?alt=json')
      .then(function (response) {
        return _.map(response.feed.entry, function(entry) {
          return {
            event: entry.gsx$event.$t,
            notes: entry.gsx$notes.$t
          };
        });
      });
  }

  function fetchRegistrationStats() {
    return $.get('https://spreadsheets.google.com/feeds/list/1kxsg1c_lPyrr_Bu8YSDNJgbPoRuD_Hh5Zx4pUSPconk/od6/public/values?alt=json')
      .then(function (response) {
        var entry = response.feed.entry[0];
        return {
          units: entry.gsx$units.$t,
          states: entry.gsx$states.$t,
          brigadiers: entry.gsx$brigadiers.$t,
          adults: entry.gsx$adults.$t,
          registered: entry.gsx$registered.$t
        };
      });
  }

  function buildHtml(template, data) {
    return template({ data: data });
  }

  function fetchShow(fetch, templateSelector, containerSelector) {
      return fetch()
        .then(function (activities) {
          return buildHtml(getTemplate(templateSelector), activities);
        })
        .then(function (html) {
          $(containerSelector).html(html);
        })
        .catch(function (err) {
          setTimeout(function () { throw err; });
        });
  }

  ncounter.liveData = {

    fetchShowActivities: function(templateSelector, containerSelector) {
      return fetchShow(fetchActivities, templateSelector, containerSelector);
    },

    fetchShowActivitySuggestions: function(templateSelector, containerSelector) {
      return fetchShow(fetchActivitySuggestions, templateSelector, containerSelector);
    },

    fetchShowRegistrationStats: function(templateSelector, containerSelector) {
      return fetchShow(fetchRegistrationStats, templateSelector, containerSelector);
    }
  }
})(window.$, window._, window.ncounter ? window.ncounter : window.ncounter = {});
