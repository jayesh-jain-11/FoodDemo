// ─── Unomi events ─────────────────────────────────────────────────────────────

// trackPageView: sends an explicit view event so pageViewCount increments via
// the incrementPageViews rule. loadContext() alone does NOT send this in Unomi 2.6.
function trackPageView() {
  if (typeof unomiWebTracker === "undefined") return;
  try {
    unomiWebTracker.collectEvent({
      eventType: "view", scope: "ecommerce-demo",
      source: {
        itemId:   "shop-" + document.location.pathname.replace(/\//g, "-"),
        itemType: "page", scope: "ecommerce-demo",
        properties: {
          pageInfo: {
            pageID:         "shop-" + document.location.pathname.replace(/\//g, "-"),
            pageName:       document.title,
            pagePath:       document.location.pathname,
            destinationURL: document.location.origin + document.location.pathname,
            language:       "en"
          }
        }
      }
    });
    console.log("[Unomi] view event sent");
  } catch (e) { console.error("[Unomi] view event failed:", e); }
}

function trackProductView(product) {
  if (typeof unomiWebTracker === "undefined") return;
  try {
    unomiWebTracker.collectEvent({
      eventType: "viewProduct", scope: "ecommerce-demo",
      source:     { itemId: "shop-main", itemType: "page",    scope: "ecommerce-demo" },
      target:     { itemId: product.id,  itemType: "product", scope: "ecommerce-demo" },
      properties: { productId: product.id, productName: product.name, category: product.category, price: product.price }
    });
  } catch (e) { console.error("[Unomi] viewProduct failed:", e); }
}

function trackAddToCart(product) {
  if (typeof unomiWebTracker === "undefined") return;
  try {
    unomiWebTracker.collectEvent({
      eventType: "addToCart", scope: "ecommerce-demo",
      source:     { itemId: "shop-main", itemType: "page",    scope: "ecommerce-demo" },
      target:     { itemId: product.id,  itemType: "product", scope: "ecommerce-demo" },
      properties: { productId: product.id, productName: product.name, category: product.category, price: product.price }
    });
  } catch (e) { console.error("[Unomi] addToCart failed:", e); }
}

function trackRemoveFromCart(productId) {
  if (typeof unomiWebTracker === "undefined") return;
  try {
    unomiWebTracker.collectEvent({
      eventType: "removeFromCart", scope: "ecommerce-demo",
      source:     { itemId: "shop-main", itemType: "page", scope: "ecommerce-demo" },
      properties: { productId: productId }
    });
  } catch (e) { console.error("[Unomi] removeFromCart failed:", e); }
}

function trackPurchase(orderId, total, itemCount) {
  if (typeof unomiWebTracker === "undefined") return;
  try {
    unomiWebTracker.collectEvent({
      eventType: "purchaseComplete", scope: "ecommerce-demo",
      source:     { itemId: "shop-checkout", itemType: "page", scope: "ecommerce-demo" },
      properties: { orderId: orderId, totalAmount: total, itemCount: itemCount }
    });
  } catch (e) { console.error("[Unomi] purchaseComplete failed:", e); }
}
