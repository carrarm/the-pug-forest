# **The Pug Forest – Game Design Document (GDD)**

## **1. Game Overview**

**Title:** The Pug Forest

**Genre:** Idle / Clicker / Incremental Game

**Platform:** Web (desktop + mobile), possible mobile app

**Tone:** Whimsical, cozy, magical, humorous

### **High Concept**

The Pug Forest is a magical, ever-expanding forest filled with infinite adorable pugs waiting to be adopted. Players click to explore the forest and collect pugs, then spend those pugs on buildings, helpers, and magical structures to increase passive pug generation. Over time, players unlock advanced tiers, upgrades, events, and a prestige system themed around ancient pug spirits.

### **Core Pillars**

* **Relaxing & Whimsical:** Cute aesthetic with warm colors and soft sounds.
* **Satisfying Progression:** Exponential growth via tiers, upgrades, and prestige.
* **Replayability:** Prestige resets with meaningful bonuses.
* **Thematic Cohesion:** Everything revolves around magical pugs, forest magic, and cozy fantasy.

---

## **2. Core Gameplay Loop**

1. **Click to Explore:** Player clicks to "visit the forest" and returns with 1 pug per click (increases with upgrades).
2. **Collect Pugs:** Accumulate pugs from clicks + passive generation.
3. **Spend Pugs:** Buy tiers (producers) and upgrades to grow faster.
4. **Unlock New Content:** New tiers, upgrades, achievements, story snippets.
5. **Prestige Reset:** Trade lifetime pugs for permanent multipliers.
6. **Repeat With Faster Growth.**

---

## **3. Currency & Resources**

### **Primary Currency: Pugs**

* Earned via clicking + passive production.
* Used to buy tiers, upgrades, unlockables.

### **Secondary Currency: Pug Essence (Prestige)**

* Earned through prestige resets once lifetime total is high enough.
* Grants permanent production bonuses.

### **Temporary Event Currencies** (Optional)

* Golden Pugs
* Seasonal tokens (e.g., Winter Blankets, Howl-O-Ween Treats)

---

## **4. Clicking Mechanics**

* **Default:** 1 pug per click.
* **Scalable Upgrades:** Increase click strength, add multipliers, temporarily boost clicking.
* **Optional Crit Click:** Rare critical click gives ×10 reward.

---

## **5. Production Tiers (Passive Generators)**

Cost scaling uses:
**Next Cost = base_cost × 1.15^(owned)**

| Tier | Name                      | Base Cost  | Production/sec |
|------|---------------------------|------------|----------------|
| 1    | Neighborhood Kids         | 10         | 0.1            |
| 2    | Bike Cart                 | 75         | 1              |
| 3    | Pug Whisperer             | 500        | 8              |
| 4    | Forest Scout Hut          | 3,000      | 50             |
| 5    | Pug Rescue Wagon          | 15,000     | 200            |
| 6    | Enchanted Lantern         | 80,000     | 1,000          |
| 7    | Forest Rangers Guild      | 450,000    | 5,500          |
| 8    | Portal to the Deep Forest | 2,500,000  | 30,000         |
| 9    | Pug Sanctuary Village     | 12,000,000 | 150,000        |
| 10   | Elder Tree of Pugs        | 60,000,000 | 900,000        |

---

## **6. Upgrades**

Upgrades multiply production of specific tiers.
Cost scaling uses: **base_cost × 4^(upgrade_level)**

| Upgrade                  | Affects   | Base Cost  | Effect        |
|--------------------------|-----------|------------|---------------|
| Bark of Resonance        | Tiers 1–2 | 250        | ×2 production |
| Whisperer’s Charm        | Tier 3    | 2,000      | ×2            |
| Lantern Glow Enhancement | Tier 6    | 30,000     | ×2            |
| Guild Master Training    | Tier 7    | 300,000    | ×2            |
| Portal Stabilizer        | Tier 8    | 4,000,,000 | ×2            |

---

## **7. Prestige System**

Prestige resets progress but awards permanent bonuses.

### **Prestige Levels:**

1. **Pug Essence**

  * Requirement: 1 billion lifetime pugs
  * Bonus: +5% global production

2. **Spirit of the Elder Pug**

  * Requirement: 10 billion lifetime pugs
  * Bonus: +25% global

3. **Pug Realm Ascension**

  * Requirement: 100 billion lifetime pugs
  * Bonus: Start each run with 1 Elder Tree of Pugs

---

## **8. Achievements**

### **Early-Game Achievements**

* Paws on the Ground
* Neighborhood Watch
* Two Wheels, Many Pugs
* A Whisper in the Leaves
* Hundredfold Cuddles

### **Mid-Game Achievements**

* Rest Stop
* Wagon Wrangler
* Light in the Deep
* Master of Multipliers
* One Million Snoots

### **Late-Game Achievements**

* Ranger Commander
* Portal Pioneer
* Village Elder (of Pugs)
* Heartwood Awakening
* A Billion Barks

### **Prestige Achievements**

* Essence Collector
* Ascended Sniffer
* Elder Pug Champion
* Roots of Infinity
* Cycle of Cuddles

---

## **9. Art Direction**

### **Visual Style**

* Warm, cozy, magical forest aesthetic.
* Soft cartoon style with glows and gentle shaders.
* UI: Wooden textures, leaves, soft glowing highlights.

### **Color Palette**

* Earthy greens, warm browns, soft yellows.
* Magic: soft blues and purples.

### **Character Style**

* Pugs: round, adorable, highly expressive.
* Humans: simple stylized fantasy characters.

---

## **10. Sound Design**

### **Ambient**

* Soft forest ambience (birds, leaves, wind).

### **UI & Interactions**

* Soft tapping sound when clicking.
* Gentle pop sounds for purchasing.

### **Musical Theme**

* Calm, melodic forest theme with flute + light percussion.

---

## **11. Events & Seasonal Content**

### **Golden Pug Event**

* Random golden pug appears. Clicking gives huge bonus.

### **Moonlight Forest (Night Event)**

* Magical atmosphere. Magic tiers ×2 for 60 seconds.

### **Howl-O-Ween Festival**

* Seasonal costumes + limited upgrades.

### **Winter Snuggle Season**

* Blanket-themed bonuses.

### **Spring Pug Bloom**

* Cherry blossoms, click bonuses.

---

## **12. UX / UI Layout**

### **Main Screen Layout**

* **Left:** Click area showing magical forest, pugs popping in/out.
* **Center:** Total pugs, click button, event indicators.
* **Right:** Tier list + upgrades.
* **Top:** Menu (stats, achievements, settings).
* **Bottom:** News ticker for fun pug lore.

---

## **13. Technical Design**

### **Core Systems**

* Incremental resource generator.
* Exponential cost scaling.
* Offline production calculator.
* Save system (localStorage + optional cloud).
* Event scheduler and random spawns.

### **Save Data Structure (Simplified)**

* totalPugs
* pugsPerSecond
* tierLevels[]
* upgradesOwned[]
* lifetimePugs
* prestigeLevel
* settings{}

---

## **14. Monetization (Optional)**

* Cosmetic skins for pugs (hats, costumes).
* Temporary boosts (e.g., 2× click power for 10 min).
* Ad-watch reward: temporary +20% production.

---

## **15. Roadmap**

### **Phase 1 – Core MVP**

* Click system
* 10 tiers
* 5 upgrades
* Basic UI + saving

### **Phase 2 – Quality & Expansion**

* Achievements
* Offline production
* Events
* Full art

### **Phase 3 – Prestige & Long-Term Systems**

* Prestige
* Story & lore popups
* Seasonal content

### **Phase 4 – Optional**

* Mobile version
* Cloud saves
* Cosmetic store
