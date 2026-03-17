// ─── Tracker ──────────────────────────────────────────────────────────────────
function handleTrackerLoadFailure() {
  console.warn("[Unomi] Tracker script failed to load — is Unomi running?");
}

var _initialLoadDone = false;

function initTracker() {
  if (typeof unomiWebTracker === "undefined") {
    console.warn("[Unomi] unomiWebTracker not available.");
    return;
  }
  try {
    var SESSION_COOKIE = "ecommerce-demo-session-id";
    if (unomiWebTracker.getCookie(SESSION_COOKIE) == null) {
      unomiWebTracker.setCookie(SESSION_COOKIE, unomiWebTracker.generateGuid(), 1);
    }

    unomiWebTracker.initTracker({
      scope: "ecommerce-demo",
      contextServerUrl: "http://localhost:3000",
      site: { siteInfo: { siteID: "ecommerce-demo" } },
      page: {
        pageInfo: {
          pageID: "shop-" + document.location.pathname.replace(/\//g, "-"),
          pageName: document.title,
          pagePath: document.location.pathname,
          destinationURL: document.location.origin + document.location.pathname,
          language: "en",
          categories: [],
          tags: []
        },
        attributes: {},
        consentTypes: []
      },
      requiredProfileProperties: ["*"],
      requireSegments: true,
      requireScores: true,
      wemInitConfig: {
        contextServerUrl: "http://localhost:3000",
        timeoutInMilliseconds: "1500",
        contextServerCookieName: "context-profile-id",
        activateWem: true,
        trackerSessionIdCookieName: SESSION_COOKIE,
        trackerProfileIdCookieName: "context-profile-id",
        requiredProfileProperties: ["*"],
        requireSegments: true,
        requireScoring: true,
      }
    });

    // Register callback BEFORE loadContext so it fires on the first load.
    unomiWebTracker._registerCallback(function () {
      try {
        var ctx = unomiWebTracker.getLoadedContext();
        window.unomiContext = ctx;
        console.log("[Unomi] Context loaded. profileId:", ctx && ctx.profileId, "segments:", ctx && ctx.profileSegments);
        applyPersonalization(ctx);
        updateDebugPanel(ctx);

        // Send explicit view event on every page load so pageViewCount increments.
        // loadContext() alone does NOT send a view event in Unomi 2.6.
        if (!_initialLoadDone) {
          _initialLoadDone = true;
          trackPageView();
        }

        // Scores are not returned in context.json in Unomi 2.6 -- fetch via profile API
        var profileId = ctx && ctx.profileId;
        if (profileId) {
          fetch("/api/profile/" + profileId)
            .then(function (r) { return r.json(); })
            .then(function (profile) {
              var score = (profile.scores && profile.scores["engagementScore"]) || 0;
              document.getElementById("engagement-badge").textContent = "Score: " + score;
            })
            .catch(function (e) { console.warn("[Score fetch]", e); });
        }
      } catch (e) {
        console.error("[Unomi] Callback error:", e);
      }
    }, "shopDemoCallback");

    unomiWebTracker.loadContext({
      requireSegments: true,
      requireScoring: true,
      requiredProfileProperties: ["*"]
    });
    console.log("[Unomi] loadContext() called");
  } catch (e) {
    console.error("[Unomi] Tracker init failed:", e);
  }
}

function refreshContext(delayMs) {
  if (typeof unomiWebTracker === "undefined") return;
  setTimeout(function () {
    try {
      unomiWebTracker.loadContext({
        requireSegments: true,
        requireScoring: true,
        requiredProfileProperties: ["*"]
      });
    }
    catch (e) { console.warn("[Unomi] Context refresh failed:", e); }
  }, delayMs || 900);
}
// function refreshContext(delayMs) {
//   if (typeof unomiWebTracker === "undefined") return;
//   setTimeout(function () {
//     try {
//       unomiWebTracker.loadContext({
//         requireSegments: true,
//         requireScoring: true,
//         requiredProfileProperties: ["*"]
//       });
//       // Manually apply updates after a short wait since
//       // _registerCallback does not re-fire on subsequent loadContext calls
//       setTimeout(function () {
//         try {
//           var ctx = unomiWebTracker.getLoadedContext();
//           if (ctx) {
//             window.unomiContext = ctx;
//             applyPersonalization(ctx);
//             updateDebugPanel(ctx);
//             var profileId = ctx.profileId;
//             if (profileId) {
//               fetch("/api/profile/" + profileId)
//                 .then(function (r) { return r.json(); })
//                 .then(function (profile) {
//                   var score = (profile.scores && profile.scores["engagementScore"]) || 0;
//                   document.getElementById("engagement-badge").textContent = "Score: " + score;
//                 })
//                 .catch(function (e) { console.warn("[Score fetch]", e); });
//             }
//           }
//         } catch (e) { console.warn("[Unomi] Manual refresh update failed:", e); }
//       }, 500);
//     }
//     catch (e) { console.warn("[Unomi] Context refresh failed:", e); }
//   }, delayMs || 900);
// }