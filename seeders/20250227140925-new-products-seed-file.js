"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        title: "美式咖啡",
        title_en: "Americano",
        description:
          "濃縮咖啡加上熱水，口感濃郁但不苦澀，保留咖啡的原始風味，適合喜愛純粹咖啡香氣的人。",
        description_en:
          "Espresso diluted with hot water, offering a bold yet smooth taste. It retains the original coffee aroma, perfect for those who appreciate pure coffee flavors.",
        price: 50,
        category_id: 3,
        image: "https://i.imgur.com/9AbwuNX.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "拿鐵咖啡",
        title_en: "Caffee Latte",
        description:
          "濃縮咖啡搭配綿密牛奶，奶香濃郁、口感柔滑，帶有咖啡的微苦與牛奶的甜美，是經典且受歡迎的選擇。",
        description_en:
          "A perfect balance of espresso and steamed milk, creating a creamy and smooth texture. The slight bitterness of coffee blends harmoniously with the sweetness of milk.",
        price: 60,
        category_id: 3,
        image: "https://i.imgur.com/NNimlw9.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "輕奶拿鐵",
        title_en: "Light Caffe Latte",
        description:
          "比一般拿鐵奶量少，咖啡風味更突出，適合想要享受咖啡香氣又不希望過多奶味的顧客。",
        description_en:
          "A lighter version of a latte with less milk, allowing the rich espresso flavor to shine. Ideal for those who prefer a stronger coffee taste without overwhelming creaminess.",
        price: 60,
        category_id: 3,
        image: "https://i.imgur.com/uMKdqYq.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "焦糖瑪奇朵",
        title_en: "Caramel Macchiato",
        description:
          "香濃牛奶與濃縮咖啡相疊，再加上甜美焦糖醬，入口滑順，帶有焦糖的香甜與咖啡的微苦。",
        description_en:
          "Layers of steamed milk and espresso topped with caramel syrup. Smooth and rich, it offers a perfect blend of sweet caramel and mild coffee bitterness.",
        price: 70,
        category_id: 3,
        image: "https://i.imgur.com/FBz0eax.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "摩卡咖啡",
        title_en: "Caffee Mocha",
        description:
          "結合濃縮咖啡、牛奶與巧克力醬，入口香甜濃郁，帶有可可的微苦與咖啡的厚實風味。",
        description_en:
          "A delicious fusion of espresso, milk, and chocolate syrup. Rich and creamy, with a hint of cocoa bitterness balanced by the depth of coffee.",
        price: 70,
        category_id: 3,
        image: "https://i.imgur.com/kKoz40I.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "海鹽咖啡",
        title_en: "Caffee with Sea Salt",
        description:
          "在濃郁咖啡上加入海鹽奶泡，微鹹口感提升咖啡的甘甜度，層次豐富，帶來獨特的風味體驗。",
        description_en:
          "Topped with sea salt foam, this coffee enhances the natural sweetness of espresso with a hint of saltiness, creating a rich and unique flavor.",
        price: 60,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "卡布奇諾",
        title_en: "Cappuccino",
        description:
          "濃縮咖啡搭配綿密奶泡，口感輕盈，咖啡味更濃，適合喜愛豐富層次與細緻泡沫口感的咖啡愛好者。",
        description_en:
          "A classic blend of espresso and frothy milk, offering a bold coffee taste with a light and airy texture. Perfect for those who enjoy layered flavors.",
        price: 60,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "榛果風味咖啡",
        title_en: "Hazelnut Flavour Latte",
        description:
          "香醇濃縮咖啡與牛奶結合，再加入榛果風味糖漿，帶來堅果的濃郁香氣，口感溫潤順滑。",
        description_en:
          "A smooth combination of espresso and milk, infused with hazelnut syrup. Rich and nutty, it delivers a comforting and aromatic taste.",
        price: 70,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "香草風味咖啡",
        title_en: "Vanilla Flavour Latte",
        description:
          "經典拿鐵加入香草糖漿，淡雅的香草香氣與咖啡風味相融合，帶來細膩甜美的口感。",
        description_en:
          "A classic latte enhanced with vanilla syrup, blending the light floral sweetness of vanilla with the rich depth of coffee for a delicate taste.",
        price: 70,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "茉莉香片",
        title_en: "Green Tea",
        description:
          "以茉莉花香融合綠茶的清新，茶湯清澈，口感溫潤，適合喜愛淡雅茶香的顧客。",
        description_en:
          "A refreshing blend of green tea with the floral aroma of jasmine. The tea is light, smooth, and perfect for those who enjoy a subtle and elegant taste.",
        price: 40,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "清香烏龍",
        title_en: "Oolong Tea",
        description:
          "半發酵烏龍茶，口感醇厚帶花果香氣，茶韻悠長，適合喜愛溫潤與層次豐富風味的茶飲愛好者。",
        description_en:
          "A semi-fermented oolong tea with a robust yet floral aroma. Its long-lasting taste and smooth finish make it an excellent choice for tea lovers.",
        price: 40,
        category_id: 4,
        image: "https://i.imgur.com/yWDYJOb.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "高山青茶",
        title_en: "Turquoise Tea",
        description:
          "高山青茶採自高山茶區，葉片嫩綠，茶湯清香甘醇，帶有淡淡花果香。這款茶口感滑順，回甘持久，適合喜愛清爽茶香的您。",
        description_en:
          "A premium oolong tea from high mountain regions, featuring delicate green leaves and a fragrant, smooth taste. The tea has a light floral and fruity aroma with a lasting sweet aftertaste, making it a refreshing choice for tea lovers.",
        price: 40,
        category_id: 4,
        image: "https://i.imgur.com/EKzCDAY.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "日月潭紅茶",
        title_en: "Black Tea",
        description:
          "來自日月潭的頂級紅茶，茶湯琥珀透亮，帶有獨特蜜香與淡雅果香，口感醇厚回甘，風味層次豐富，適合純飲或搭配牛奶享用。",
        description_en:
          "A premium black tea from Sun Moon Lake, featuring a bright amber infusion with natural honey and fruity notes. It has a rich, smooth body with a lingering sweetness, perfect for enjoying on its own or with milk.",
        price: 40,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "伯爵紅茶",
        title_en: "Earl Gray",
        description:
          "精選紅茶搭配佛手柑香氣，散發典雅柑橘香氣，茶湯醇厚順口，適合搭配甜點或單獨享用，帶來細緻的英式風味體驗。",
        description_en:
          "A classic black tea infused with the citrusy aroma of bergamot. This tea has a bold, smooth body with a refined floral-citrus fragrance, making it a perfect choice for an elegant tea experience.",
        price: 40,
        category_id: 4,
        image: "https://i.imgur.com/ZriNa6o.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "紅茶拿鐵",
        title_en: "Black Tea Latte",
        description:
          "醇厚紅茶與絲滑鮮奶完美融合，茶香與奶香交織，帶來濃郁順口的口感，適合喜歡溫潤口感的您，冷熱皆宜。",
        description_en:
          "A perfect blend of rich black tea and creamy fresh milk, offering a smooth and well-balanced taste. The tea’s robust flavors complement the milk’s natural sweetness, making it a comforting drink, served hot or iced.",
        price: 50,
        category_id: 4,
        image: "https://i.imgur.com/uiw36Gr.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "伯爵可可拿鐵",
        title_en: "Cocoa Earl Gray Latte",
        description:
          "伯爵紅茶與濃郁可可的結合，柑橘香氣與巧克力風味交織，口感醇厚順滑，帶來獨特的奢華享受，適合午後悠閒時光。",
        description_en:
          "A luxurious fusion of Earl Grey tea and rich cocoa, combining the citrusy aroma of bergamot with deep chocolate notes. Smooth, creamy, and indulgent, it’s the perfect treat for a cozy afternoon.",
        price: 60,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "焙茶拿鐵",
        title_en: "Hojicha Milk Tea",
        description:
          "低溫焙火的焙茶，帶有獨特的烘焙香氣，搭配滑順鮮奶，溫潤柔和，茶香濃郁但不苦澀，適合喜歡溫暖茶飲的您。",
        description_en:
          "A roasted green tea with a toasty aroma, perfectly blended with creamy milk. The result is a smooth, nutty, and naturally sweet drink with no bitterness, ideal for those who enjoy a warm and comforting tea.",
        price: 50,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "輕纖喬麥茶",
        title_en: "Buckweat Tea",
        description:
          "以嚴選蕎麥慢火烘焙，散發濃郁堅果香氣，無咖啡因，口感清爽甘醇，適合日常飲用，帶來溫暖放鬆的感受。",
        description_en:
          "A caffeine-free tea made from roasted buckwheat, offering a rich, nutty aroma and a mild, naturally sweet flavor. This soothing and nutritious drink is perfect for daily enjoyment and relaxation.",
        price: 40,
        category_id: 4,
        image: "https://i.imgur.com/pH1xtlG.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "綠茶拿鐵",
        title_en: "Green Tea Latte",
        description:
          "清香綠茶搭配細膩鮮奶，入口溫潤順滑，帶有淡雅茶香與奶香，口感清爽細緻，適合喜愛輕盈口感的您。",
        description_en:
          "A delicate blend of fragrant green tea and creamy fresh milk, creating a smooth, refreshing drink with a subtle balance of tea and dairy flavors. Perfect for those who enjoy a light yet satisfying beverage.",
        price: 50,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "烏龍拿鐵",
        title_en: "Oolong Tea Latte",
        description:
          "濃郁烏龍茶香與香醇鮮奶結合，茶韻醇厚，回甘持久，入口滑順，帶有淡淡果香與奶香，冷熱皆宜。",
        description_en:
          "A rich oolong tea blended with creamy milk, offering a deep, roasted aroma with a naturally sweet aftertaste. This smooth and well-rounded tea latte can be enjoyed hot or iced.",
        price: 50,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "抹茶鮮奶",
        title_en: "Matcha Milk Tea",
        description:
          "嚴選抹茶粉搭配香醇鮮奶，茶味濃郁且滑順，帶有自然甘甜與微苦層次，呈現純正日式風味，適合抹茶愛好者。",
        description_en:
          "A premium matcha drink made with high-quality matcha powder and fresh milk. Its bold, earthy tea flavor is balanced by natural sweetness and a hint of bitterness, delivering an authentic Japanese tea experience.",
        price: 60,
        category_id: 4,
        image: "https://i.imgur.com/s6SkAQy.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "可可鮮奶",
        title_en: "Cocoa Milk Tea",
        description:
          "香濃可可與鮮奶完美融合，口感濃郁滑順，帶有自然可可香氣與微甜風味，是一款適合大人小孩的經典飲品。",
        description_en:
          "A rich and velvety blend of cocoa and fresh milk, offering a naturally sweet and chocolatey flavor. This comforting drink is perfect for both kids and adults who love a classic chocolate treat.",
        price: 60,
        category_id: 4,
        image: "https://i.imgur.com/o6pA7BU.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "冰淇淋(一球)",
        title_en: "Ice Cream (1 Scoop)",
        description:
          "精選優質冰淇淋，口感細膩香濃，提供多種口味選擇，每一口都帶來甜美滿足的享受。",
        description_en:
          "A premium ice cream with a rich, creamy texture. Available in various flavors, each scoop delivers a delightful burst of sweetness.",
        price: 80,
        category_id: 5,
        image: "https://i.imgur.com/W0C3xzV.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "冰淇淋(二球)",
        title_en: "Ice Cream (2 Scoop)",
        description:
          "雙倍美味，讓您一次享受兩種口味的冰淇淋，香甜濃郁，帶來加倍的幸福感。",
        description_en:
          "Twice the delight! Enjoy two scoops of rich and creamy ice cream, with the option to mix and match flavors for a satisfying treat.",
        price: 150,
        category_id: 5,
        image: "https://i.imgur.com/W0C3xzV.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "可可冰沙",
        title_en: "Coco Frappe'",
        description:
          "濃郁可可與冰沙結合，入口冰涼滑順，帶來絲絨般的口感與濃厚巧克力風味，適合喜歡甜點風味的您。",
        description_en:
          "A rich and refreshing cocoa-flavored frappe, blending smooth chocolatey goodness with an icy texture for a cool and indulgent experience.",
        price: 100,
        category_id: 5,
        image: "https://i.imgur.com/qLtaFwK.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "草莓冰沙",
        title_en: "Strawberry Frappe'",
        description:
          "香甜草莓搭配冰沙，口感酸甜清爽，入口即化，是炎炎夏日不可錯過的沁涼選擇。",
        description_en:
          "A refreshing blend of sweet and tangy strawberries with crushed ice, creating a perfectly smooth and cooling treat for hot days.",
        price: 100,
        category_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "抹茶冰沙",
        title_en: "Mocha Frappe'",
        description:
          "濃厚抹茶與冰沙融合，茶香馥郁，口感冰涼細膩，甜度適中，讓您隨時感受日式抹茶風味。",
        description_en:
          "A rich and frosty blend of matcha and crushed ice, delivering an earthy tea aroma with a smooth, icy texture for a balanced and refreshing matcha experience.",
        price: 100,
        category_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "香草冰沙",
        title_en: "Vanilla Frappe'",
        description:
          "經典香草風味與冰沙完美結合，口感細緻滑順，帶來清甜與奶香交織的極致享受。",
        description_en:
          "A creamy and smooth vanilla frappe, offering a classic, lightly sweet taste with a refreshing icy twist.",
        price: 100,
        category_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "紅絲絨蛋糕",
        title_en: "Red Velvet Cake",
        description:
          "經典紅絲絨蛋糕，口感濕潤細緻，搭配絲滑奶油乳酪霜，甜而不膩，帶來高雅的味蕾享受。",
        description_en:
          "A classic red velvet cake with a moist, tender crumb, paired with smooth cream cheese frosting. The perfect balance of sweetness and elegance.",
        price: 120,
        category_id: 6,
        image: "https://i.imgur.com/5yyBu7B.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "起司蛋糕",
        title_en: "Cheese Cake",
        description:
          "香濃起司製成，口感細膩綿密，入口即化，帶有淡淡奶香與微酸風味，是甜點愛好者的最愛。",
        description_en:
          "A rich and creamy cheesecake with a velvety texture and a perfect balance of sweetness and tanginess. A timeless favorite for dessert lovers.",
        price: 90,
        category_id: 6,
        image: "https://i.imgur.com/yk9gqGc.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "焦糖肉桂捲",
        title_en: "Caramel Cinnamon Roll",
        description:
          "香濃肉桂捲搭配焦糖淋醬，層層柔軟蓬鬆，甜香四溢，每一口都充滿暖心幸福感。",
        description_en:
          "A soft and fluffy cinnamon roll drizzled with caramel sauce, delivering a delightful mix of warm spices and rich sweetness.",
        price: 90,
        category_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "提拉米蘇",
        title_en: "Tiramisu",
        description:
          "經典義式甜點，融合咖啡、可可與乳酪的完美層次，口感細緻濕潤，入口即化，濃郁而迷人。",
        description_en:
          "A classic Italian dessert layered with coffee-soaked sponge, creamy mascarpone, and cocoa powder. Rich, smooth, and irresistibly delicious.",
        price: 100,
        category_id: 6,
        image: "https://i.imgur.com/0HqXL3e.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "波士頓蛋糕",
        title_en: "Boston Cake",
        description:
          "柔軟蓬鬆的蛋糕體，搭配香濃內餡與糖霜，口感輕盈不膩，適合各種場合享用。",
        description_en:
          "A light and fluffy sponge cake filled with rich cream and topped with a delicate glaze. A delightful treat for any occasion.",
        price: 90,
        category_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", {});
  },
};
