(function ($, _, ncounter) {

  function getTemplate(templateSelector) {
    return _.template($(templateSelector).html());
  }

  function fetchActivities() {
    return $.get('https://spreadsheets.google.com/feeds/list/1sFE_km9psbf-Ey-fhnjqgsMR_CcWCDDsqXOCMJL0X2E/od6/public/values?alt=json')
      .then(function (response) {
        // Normalize content from Activities Sheet API
        return _.map(response.feed.entry, function(entry) {
          return {
            event: entry.gsx$event.$t,
            unit: entry.gsx$unit.$t,
            church: entry.gsx$church.$t,
            state: entry.gsx$state.$t
          };
        });
      });
  }

  function buildActivitiesHtml(activitiesTpl, activities) {
    return activitiesTpl({ activities: activities });
  }

  ncounter.activities = {

    fetchShow: function(templateSelector, activitiesSelector) {

      return fetchActivities()
        .then(function (activities) {
          return buildActivitiesHtml(getTemplate(templateSelector), activities);
        })
        .then(function (activitiesHtml) {
          $(activitiesSelector).html(activitiesHtml);
        })
        .catch(function (err) {
          setTimeout(function () { throw err; });
        });
    }
  }
})(window.$, window._, window.ncounter ? window.ncounter : window.ncounter = {});
