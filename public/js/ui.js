// ─── Personalization banner ───────────────────────────────────────────────────
function applyPersonalization(ctx) {
  if (!ctx) return;
  var banner      = document.getElementById("personalization-banner");
  var bannerText  = document.getElementById("banner-text");
  var bannerIcon  = document.getElementById("banner-icon");
  var scoreBadge  = document.getElementById("engagement-badge");

  var rawSegs = Array.isArray(ctx.profileSegments)
    ? ctx.profileSegments
    : (ctx.profileSegments && ctx.profileSegments.segments) || [];
  var segmentIds = rawSegs.map(function (s) { return typeof s === "string" ? s : ((s && s.itemId) || (s && s.id) || ""); });
  var score = (ctx.scores && ctx.scores["engagementScore"]) || 0;

  console.log("[Unomi] Segments:", segmentIds, "| Score:", score);
  scoreBadge.textContent = "Score: " + score;

  if (segmentIds.indexOf("high-value-customer") !== -1) {
    banner.className = "relative mb-6 px-5 py-4 rounded-2xl border-2 border-yellow-400 bg-yellow-50 flex items-center justify-between";
    bannerIcon.textContent = "👑"; bannerText.textContent = "Welcome back, VIP! Here's 20% off your next order: VIP20"; bannerText.className = "text-sm font-semibold text-yellow-800";
  } else if (segmentIds.indexOf("electronics-enthusiast") !== -1) {
    banner.className = "relative mb-6 px-5 py-4 rounded-2xl border-2 border-blue-400 bg-blue-50 flex items-center justify-between";
    bannerIcon.textContent = "💻"; bannerText.textContent = "We noticed you love Electronics! Check out our new arrivals."; bannerText.className = "text-sm font-semibold text-blue-800";
  } else if (segmentIds.indexOf("fashion-enthusiast") !== -1) {
    banner.className = "relative mb-6 px-5 py-4 rounded-2xl border-2 border-purple-400 bg-purple-50 flex items-center justify-between";
    bannerIcon.textContent = "✨"; bannerText.textContent = "Your style is showing! New fashion drops every week."; bannerText.className = "text-sm font-semibold text-purple-800";
  } else if (segmentIds.indexOf("returning-visitor") !== -1) {
    banner.className = "relative mb-6 px-5 py-4 rounded-2xl border-2 border-green-400 bg-green-50 flex items-center justify-between";
    bannerIcon.textContent = "🌿"; bannerText.textContent = "Welcome back! You've visited before — here's what's new."; bannerText.className = "text-sm font-semibold text-green-800";
  } else {
    banner.className = "relative mb-6 px-5 py-4 rounded-2xl border-2 border-gray-200 bg-gray-100 flex items-center justify-between";
    bannerIcon.textContent = "👋"; bannerText.textContent = "Welcome to ShopDemo! Discover thousands of products."; bannerText.className = "text-sm font-medium text-gray-700";
  }

  scoreBadge.className = "shrink-0 ml-4 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-500";

  var props = ctx.profileProperties || {};
  if (props.loggedInAs) document.getElementById("auth-label").textContent = props.loggedInAs;
}

// ─── Debug panel ─────────────────────────────────────────────────────────────
function updateDebugPanel(ctx) {
  if (!ctx) return;
  var profileId = ctx.profileId || "—";
  var props     = ctx.profileProperties || {};
  var segments  = Array.isArray(ctx.profileSegments)
    ? ctx.profileSegments
    : (ctx.profileSegments && ctx.profileSegments.segments) || [];
  var segIds = segments.map(function (s) { return typeof s === "string" ? s : (s.id || ""); }).filter(Boolean).join(", ") || "none";
  document.getElementById("debug-profileid").textContent  = profileId.length > 18 ? profileId.substring(0, 18) + "…" : profileId;
  document.getElementById("debug-segments").textContent   = segIds;
  document.getElementById("debug-pageviews").textContent  = props.pageViewCount || "0";
  document.getElementById("debug-cartadds").textContent   = props.totalCartAdds || "0";
}

function refreshDebug() {
  if (typeof unomiWebTracker !== "undefined") {
    try {
      unomiWebTracker.loadContext({
        requireSegments:           true,
        requireScoring:            true,
        requiredProfileProperties: ["*"]
      });
      return;
    } catch (e) { }
  }
  if (window.unomiContext) updateDebugPanel(window.unomiContext);
}

// ─── Close all overlays ───────────────────────────────────────────────────────
function closeAll() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("visible");
  closeLoginModal();
  closeCheckout();
}
