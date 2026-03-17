// ─── Product catalogue ────────────────────────────────────────────────────────
var PRODUCTS = [
  { id: "elec-001", name: "UltraBook Pro 14",        category: "Electronics", price: 1299.99, description: '14" OLED, Intel i9, 32GB RAM, 1TB NVMe SSD.',          imageUrl: "https://picsum.photos/seed/elec001/300/200", badge: "New"     },
  { id: "elec-002", name: "NoiseCraft Headphones",   category: "Electronics", price: 349.99,  description: "Adaptive noise cancellation, 40h battery, Hi-Res Audio.", imageUrl: "https://picsum.photos/seed/elec002/300/200", badge: "Popular" },
  { id: "elec-003", name: "StreamDeck 4K",           category: "Electronics", price: 599.99,  description: '4K QLED 27" monitor, 144Hz, HDR600, USB-C 90W.',        imageUrl: "https://picsum.photos/seed/elec003/300/200", badge: null      },
  { id: "elec-004", name: "PowerCell Charger",       category: "Electronics", price: 89.99,   description: "20,000mAh, 65W GaN, charges 3 devices at once.",         imageUrl: "https://picsum.photos/seed/elec004/300/200", badge: "Sale"    },
  { id: "fash-001", name: "Heritage Wool Blazer",    category: "Fashion",     price: 289.00,  description: "Single-breasted Italian wool, notch lapels, slim cut.",  imageUrl: "https://picsum.photos/seed/fash001/300/200", badge: "New"     },
  { id: "fash-002", name: "Summit Runner Shoes",     category: "Fashion",     price: 149.00,  description: "Lightweight trail runner, recycled mesh upper.",          imageUrl: "https://picsum.photos/seed/fash002/300/200", badge: "Popular" },
  { id: "fash-003", name: "Cashmere Turtleneck",     category: "Fashion",     price: 195.00,  description: "Grade A Mongolian cashmere, ribbed cuffs, relaxed fit.", imageUrl: "https://picsum.photos/seed/fash003/300/200", badge: null      },
  { id: "fash-004", name: "Canvas Weekender Bag",    category: "Fashion",     price: 120.00,  description: "Waxed canvas, full-grain leather straps, 40L.",          imageUrl: "https://picsum.photos/seed/fash004/300/200", badge: "Sale"    },
  { id: "book-001", name: "The Pragmatic Programmer",category: "Books",       price: 49.99,   description: "20th anniversary edition. Timeless software wisdom.",    imageUrl: "https://picsum.photos/seed/book001/300/200", badge: "Popular" },
  { id: "book-002", name: "Designing Data-Intensive Apps", category: "Books", price: 54.99,   description: "Kleppmann's guide to distributed systems & databases.",  imageUrl: "https://picsum.photos/seed/book002/300/200", badge: null      },
  { id: "book-003", name: "Atomic Habits",           category: "Books",       price: 27.99,   description: "James Clear's framework for building good habits.",      imageUrl: "https://picsum.photos/seed/book003/300/200", badge: "Sale"    },
  { id: "book-004", name: "The Creative Act",        category: "Books",       price: 35.00,   description: "Rick Rubin on creativity, making art, finding inspiration.", imageUrl: "https://picsum.photos/seed/book004/300/200", badge: "New"  },
];

// ─── Shared state ─────────────────────────────────────────────────────────────
var cart            = [];
var currentCategory = "All";
var viewTimers      = {};
window.unomiContext = null;
