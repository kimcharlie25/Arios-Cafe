-- =====================================================
-- ARIOS CAFE MENU DATA INSERTION
-- This script inserts all menu items with auto-generated IDs
-- =====================================================

-- First, insert categories if they don't exist
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
('all-day-breakfast', 'All-Day Breakfast', '🍳', 1, true),
('student-meals', 'Student Meals', '🎓', 2, true),
('pasta', 'Pasta', '🍝', 3, true),
('sandwiches', 'Sandwiches', '🥪', 4, true),
('entree', 'Entree', '🍽️', 5, true),
('family-set-meal', 'Family Set Meal', '👨‍👩‍👧‍👦', 6, true),
('boneless-chicken', 'Boneless Chicken', '🍗', 7, true),
('starters', 'Starters', '🍟', 8, true),
('soups-salads', 'Soups & Salads', '🥗', 9, true),
('pizza', 'Pizza', '🍕', 10, true),
('drinks', 'Drinks', '🥤', 11, true),
('dessert', 'Dessert', '🍰', 12, true),
('alcoholic-drinks', 'Alcoholic Drinks', '🍺', 13, true),
('coffee', 'Coffee', '☕', 14, true),
('frappucino', 'Frappucino', '🥤', 15, true),
('vietnamese-coffee', 'Vietnamese Coffee', '☕', 16, true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- I. ALL-DAY BREAKFAST (Freshly Brewed Coffee Included)
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Buttermilk Pancakes', '3pcs Freshly Cooked Pancakes + Choice of Bannoffee, Apple Pie, Coconut, Ube or Maple', 200, 'all-day-breakfast', false, true),
(gen_random_uuid(), 'Buttermilk Waffles (1pc)', '1pc Freshly Cooked Waffle + Choice of Bannoffee, Apple Pie, Coconut or Maple', 185, 'all-day-breakfast', false, true),
(gen_random_uuid(), 'Buttermilk Waffles (2pcs)', '2pcs Freshly Cooked Waffles + Choice of Bannoffee, Apple Pie, Coconut or Maple', 289, 'all-day-breakfast', false, true),
(gen_random_uuid(), 'Brioche French Toast', '2 Slices of Brioche + Maple Syrup + Butter', 230, 'all-day-breakfast', false, true),
(gen_random_uuid(), 'Bacon and Eggs', '3 Slices of Bacon + 2pcs Eggs (scrambled or sunny-side up) + 2pcs of Toast or Garlic Rice', 255, 'all-day-breakfast', true, true),
(gen_random_uuid(), 'Sausage and Eggs', 'Breakfast Sausage + 2pcs Eggs (scrambled or sunny-side up) + 2pcs of Toast or Garlic Rice', 218, 'all-day-breakfast', false, true),
(gen_random_uuid(), 'All Star Breakfast', '2 Slices of Bacon + 2pcs Eggs, Sausage + 2pcs of Pancakes or Waffles', 310, 'all-day-breakfast', true, true),
(gen_random_uuid(), 'Beef Tapa', 'Stir-fried Marinated Beef + Fried Egg + Atchara', 255, 'all-day-breakfast', false, true);

-- =====================================================
-- II. STUDENT MEALS (from 7am to 5pm; Must present student ID)
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Shanghai ni Nanay', '3pcs Shanghai Roll + Sunny Side-Up Egg + Rice', 99, 'student-meals', true, true),
(gen_random_uuid(), 'Arios Bacsilog', 'Bacon + Sunny Side-Up Egg + Rice', 99, 'student-meals', true, true),
(gen_random_uuid(), 'Chicken Ala King', 'Chicken Fillet + White Sauce + Rice + Egg', 99, 'student-meals', true, true),
(gen_random_uuid(), 'Luncheon Musubi', '2pcs Spam rolled in Nori, Rice', 99, 'student-meals', false, true);

-- =====================================================
-- III. PASTA
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Carbonara', 'Bacon Crisps + Parmesan + Egg Yolks', 230, 'pasta', true, true),
(gen_random_uuid(), 'Pasta Bolognese', 'Slow-cooked Meat Sauce + Parmesan', 245, 'pasta', true, true),
(gen_random_uuid(), 'Chicken & Spinach Alfredo', 'Chicken Fillet + Spinach + Parmesan + Cream', 230, 'pasta', false, true),
(gen_random_uuid(), 'Mushroom Pasta', 'Shiitake + Shimeji + Button + Parmesan + Cream', 245, 'pasta', false, true),
(gen_random_uuid(), 'Sausage Pasta', 'Sausage + Parmesan + Cajun Cream', 245, 'pasta', false, true),
(gen_random_uuid(), 'Buffalo Mac and Cheese', 'Bacon + Mozzarella + Parmesan + Housemade Cheese Sauce + Buffalo Sauce', 245, 'pasta', true, true),
(gen_random_uuid(), 'Sardine Pasta', 'Premium Spanish Sardines + Tomato + Olives + Capers + Parmesan', 230, 'pasta', false, true),
(gen_random_uuid(), 'Spaghetti and Meatballs', 'Spaghetti + Beef Meatballs + Marinara + Parmesan', 250, 'pasta', true, true),
(gen_random_uuid(), 'Cajun Shrimp Pasta', 'Shrimp + Cajun Seasoning + Cream + Parmesan', 269, 'pasta', false, true),
(gen_random_uuid(), 'Shrimp Scampi Pasta', 'Spaghetti + Shrimp + Garlic + Chili Flakes + Olive Oil + Parmesan', 269, 'pasta', false, true),
(gen_random_uuid(), 'Shrimp Pesto Fusilli', 'Fusilli pasta + Pesto Sauce + Shrimp + Garlic + Parmesan', 295, 'pasta', false, true),
(gen_random_uuid(), 'Bacon and Cheese Fusilli', 'Fusilli pasta + Housemade Cheese Sauce + Bacon + Mozzarella + Garlic + Onion + Parmesan', 295, 'pasta', false, true);

-- =====================================================
-- IV. SANDWICHES (Served on Brioche Bun)
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Korean Fried Chicken', 'Fried Chicken Tenders + Gochujang Mayo + Tomato + Cucumber + Lettuce', 225, 'sandwiches', true, true),
(gen_random_uuid(), 'Crispy Fish', 'Battered Fish Fillet + Apple & Curry Slaw + Tomato', 225, 'sandwiches', false, true),
(gen_random_uuid(), 'Arios Cheeseburger', '100% Pure Beef Patty + Homemade Cheese Sauce + Tomato + Vegetables', 255, 'sandwiches', true, true),
(gen_random_uuid(), 'Grilled Three Cheese', 'Provolone + Cheddar + Mozzarella + Aioli', 210, 'sandwiches', false, true),
(gen_random_uuid(), 'Bacon & Mushroom Burger', '100% Pure Beef Patty + Bacon + Mixed Mushrooms + Housemade Cheese Sauce', 255, 'sandwiches', false, true),
(gen_random_uuid(), 'Arios Egg Sandwich', 'Truffled Egg Spread + Bacon Crisp + Red Onion + Celery + Aioli', 195, 'sandwiches', false, true),
(gen_random_uuid(), 'Philly Cheesesteak', 'Sautéed Beef + Onion Jam + Garlic + White Onion', 255, 'sandwiches', true, true),
(gen_random_uuid(), 'Oahu Cheeseburger', '100% Pure Beef Patty + Onion Jam + Pineapple + Aioli', 265, 'sandwiches', false, true);

-- =====================================================
-- V. ENTREE (Served with Rice)
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Buffalo Chicken Tenders', 'Fried Chicken Tenders + Buffalo Sauce + Apple & Celery Slaw', 225, 'entree', false, true),
(gen_random_uuid(), 'Chicken Parmigiano', 'Fried Chicken Tenders + Marinara + Mozzarella + Parmesan', 225, 'entree', true, true),
(gen_random_uuid(), 'Beef Bulgogi', 'Stir-fried Beef in Bulgogi Sauce + Kimchi + Fried Egg', 245, 'entree', true, true),
(gen_random_uuid(), 'Salisbury Steak', 'Quarter Pound Pure Beef Patty + Peppercorn Gravy + Fried Egg', 255, 'entree', true, true),
(gen_random_uuid(), 'Beef Salpicao', 'Stir-fried Beef in Salpicao Sauce + Shiitake + Garlic Chips', 255, 'entree', false, true),
(gen_random_uuid(), 'Herbed Fish Fillet', 'Panko-crusted Fish Fillet + Spinach Cream Sauce', 220, 'entree', false, true),
(gen_random_uuid(), 'Arios Fried Chicken', 'Fried Chicken Leg Quarter + Mixed Vegetables + Herbed Gravy', 250, 'entree', true, true),
(gen_random_uuid(), 'Arios House Sisig', 'Grilled Pork Mask + Chicharones + Fried Egg', 245, 'entree', true, true),
(gen_random_uuid(), 'Grilled Porkchops', 'Grilled Porkchop + Korean Barbecue Sauce + Atchara', 250, 'entree', false, true),
(gen_random_uuid(), 'Smothered Porkchop', 'Breaded Porkchop + Herbed Gravy + Mixed Vegetables', 240, 'entree', false, true),
(gen_random_uuid(), 'Grilled Chicken & Pineapple Skewers', 'Marinated Chicken + Pineapple Chunks + Lemon and Mango Dressing + Side Salad', 230, 'entree', false, true),
(gen_random_uuid(), 'Arios House Ribs', 'Premium Ribs + Arios House BBQ Sauce + Buttered Corn & Carrots', 385, 'entree', true, true);

-- =====================================================
-- VI. FAMILY SET MEAL
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Set A (Good for 3-4 pax)', 'Arios 12" Pizza + Signature Arios Buffalo Wings + Spaghetti & Meatballs', 1100, 'family-set-meal', true, true),
(gen_random_uuid(), 'Set B (Good for 6-7 pax)', 'Arios 12" Pizza + Buffalo Wings + Creamy Family Size Carbonara', 1550, 'family-set-meal', true, true),
(gen_random_uuid(), 'Set C (Good for 8-12 pax)', 'Arios House Salad + Buffalo Wings + Arios Pizza + Sofia Pizza + Chicken Alfredo Pasta', 2550, 'family-set-meal', true, true);

-- =====================================================
-- VII. BONELESS CHICKEN (Half 250g / Whole 500g)
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Boneless Chicken - Original (Half)', 'Original flavored boneless chicken 250g', 275, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Original (Whole)', 'Original flavored boneless chicken 500g', 495, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Yangneom (Half)', 'Yangneom flavored boneless chicken 250g', 275, 'boneless-chicken', true, true),
(gen_random_uuid(), 'Boneless Chicken - Yangneom (Whole)', 'Yangneom flavored boneless chicken 500g', 495, 'boneless-chicken', true, true),
(gen_random_uuid(), 'Boneless Chicken - Garlic Parmesan (Half)', 'Garlic Parmesan flavored boneless chicken 250g', 275, 'boneless-chicken', true, true),
(gen_random_uuid(), 'Boneless Chicken - Garlic Parmesan (Whole)', 'Garlic Parmesan flavored boneless chicken 500g', 495, 'boneless-chicken', true, true),
(gen_random_uuid(), 'Boneless Chicken - Smokey BBQ (Half)', 'Smokey BBQ flavored boneless chicken 250g', 275, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Smokey BBQ (Whole)', 'Smokey BBQ flavored boneless chicken 500g', 495, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Truffle Butter (Half)', 'Truffle Butter flavored boneless chicken 250g', 275, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Truffle Butter (Whole)', 'Truffle Butter flavored boneless chicken 500g', 495, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Lemon Pepper (Half)', 'Lemon Pepper flavored boneless chicken 250g', 275, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Lemon Pepper (Whole)', 'Lemon Pepper flavored boneless chicken 500g', 495, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Buffalo (Half)', 'Buffalo flavored boneless chicken 250g', 275, 'boneless-chicken', false, true),
(gen_random_uuid(), 'Boneless Chicken - Buffalo (Whole)', 'Buffalo flavored boneless chicken 500g', 495, 'boneless-chicken', false, true);

-- =====================================================
-- VIII. STARTERS
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Three Cheese Quesadilla', 'Mozzarella + Cheddar + Parmesan + Marinara', 210, 'starters', false, true),
(gen_random_uuid(), 'Bacon and Cheese Fries', 'Bacon Crisp + Mozzarella + Cheddar + Cheese Sauce', 225, 'starters', true, true),
(gen_random_uuid(), 'Mozzarella Sticks', 'Panko Breaded Mozzarella + House Marinara', 245, 'starters', true, true),
(gen_random_uuid(), 'Fish and Chips', 'Marinated Breaded Fish Fillet + House Fries', 225, 'starters', false, true),
(gen_random_uuid(), 'Buttermilk Fried Chicken Wings', 'Fried Chicken Wings (Choice of Buffalo or Garlic Parmesan)', 245, 'starters', true, true),
(gen_random_uuid(), 'Chicken Fingers and Chips', 'Marinated Breaded Chicken Breast Fillet + House Fries + Arios Special Dip', 255, 'starters', false, true),
(gen_random_uuid(), 'Creamed Spinach Dip', 'Spinach + Cream + Parmesan + Tortilla Chips', 199, 'starters', false, true),
(gen_random_uuid(), 'Arios Nachos', 'Tortilla Chips + Homemade Cheese Sauce + Pico de Gallo + Chili con Carne + Garlic Cream', 275, 'starters', true, true),
(gen_random_uuid(), 'Buffalo Chicken Nachos', 'Tortilla Chips + Fried Chicken Poppers + Buffalo Sauce + Housemade Cheese Sauce + Jalapeno', 285, 'starters', true, true),
(gen_random_uuid(), 'Cheesy Chicken Poppers', 'Fried Chicken Poppers + Housemade Cheese Sauce + Parmesan + Sri Racha', 225, 'starters', false, true);

-- =====================================================
-- IX. SOUPS AND SALADS
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Arios House Salad', 'Mixed Greens + Cucumber + Red Onion + Tomato + Fried Cheese + Cashew + Mango Vinaigrette', 249, 'soups-salads', false, true),
(gen_random_uuid(), 'Chicken Asian Salad', 'Mixed Greens + Grilled Chicken Breast + Cucumber + Apple + Carrots + Roasted Sesame Dressing', 249, 'soups-salads', false, true),
(gen_random_uuid(), 'Bacon and Potato Soup', 'Roasted Potato + Bacon Chips + Chicken Stock + Cream', 170, 'soups-salads', true, true),
(gen_random_uuid(), 'Cream of Mushroom', 'Shiitake + Shimeji + Button + Chicken Stock + Cream', 170, 'soups-salads', false, true);

-- =====================================================
-- X. SPECIAL PIZZA 12"
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Pepperoni Pizza', 'Pepperoni + Mozzarella + Pomodoro', 435, 'pizza', true, true),
(gen_random_uuid(), 'Arios Spinach Cheese', 'Spinach + Mozzarella + Cream Cheese + Garlic + White Onion', 450, 'pizza', false, true),
(gen_random_uuid(), 'Three Cheese Pizza', 'Cheddar + Mozzarella + Parmesan + Pomodoro', 420, 'pizza', false, true),
(gen_random_uuid(), 'Arios Pizza', 'Pepperoni + Sausage + Bacon + Mozzarella + Bellpepper + Onions + Pomodoro', 450, 'pizza', true, true),
(gen_random_uuid(), 'Sofia Pizza', 'Ham + Sausage + Crispy Onions + Caramelized Pineapple + Mozzarella + Pomodoro', 430, 'pizza', false, true);

-- =====================================================
-- XI. DRINKS
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Arios Four Seasons - Pineapple', 'Refreshing Pineapple drink', 160, 'drinks', false, true),
(gen_random_uuid(), 'Arios Four Seasons - Apple', 'Refreshing Apple drink', 160, 'drinks', false, true),
(gen_random_uuid(), 'Arios Four Seasons - Orange', 'Refreshing Orange drink', 160, 'drinks', false, true),
(gen_random_uuid(), 'Arios Four Seasons - Watermelon', 'Refreshing Watermelon drink', 160, 'drinks', true, true),
(gen_random_uuid(), 'Grape Shake', 'Creamy grape shake', 140, 'drinks', false, true),
(gen_random_uuid(), 'Watermelon Shake', 'Fresh watermelon shake', 140, 'drinks', false, true),
(gen_random_uuid(), 'Arios Lemonade', 'Fresh squeezed lemonade', 120, 'drinks', true, true),
(gen_random_uuid(), 'Strawberry Fritz', 'Sparkling strawberry drink', 95, 'drinks', false, true),
(gen_random_uuid(), 'Blueberry Fritz', 'Sparkling blueberry drink', 95, 'drinks', false, true),
(gen_random_uuid(), 'Mixed Berries Fritz', 'Sparkling mixed berries drink', 120, 'drinks', false, true),
(gen_random_uuid(), 'Coke in Can', 'Coca-Cola', 65, 'drinks', false, true),
(gen_random_uuid(), 'Sprite in Can', 'Sprite', 65, 'drinks', false, true),
(gen_random_uuid(), 'Royal in Can', 'Royal', 65, 'drinks', false, true),
(gen_random_uuid(), 'Rootbeer in Can', 'Rootbeer', 65, 'drinks', false, true),
(gen_random_uuid(), 'Bottled Water', 'Bottled water', 25, 'drinks', false, true),
(gen_random_uuid(), 'Hot Tea', 'Hot tea selection', 90, 'drinks', false, true),
(gen_random_uuid(), 'Hot Chocolate', 'Rich hot chocolate', 90, 'drinks', true, true);

-- =====================================================
-- XII. DESSERT
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Mango Pannacota', 'Creamy mango pannacota', 120, 'dessert', false, true),
(gen_random_uuid(), 'Arios House Dessert (Fried Ice Cream)', 'Signature fried ice cream', 150, 'dessert', true, true),
(gen_random_uuid(), 'Japan Strawberry Cake', 'Japanese-style strawberry cake', 160, 'dessert', true, true),
(gen_random_uuid(), 'Extra Rice', 'Additional rice serving', 30, 'dessert', false, true);

-- =====================================================
-- XIII. ALCOHOLIC DRINKS - COCKTAILS
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Mimosa', 'Champagne + Orange Juice', 110, 'alcoholic-drinks', false, true),
(gen_random_uuid(), 'Classic Margarita', 'Tequila + Lime + Simple Syrup + Salt', 140, 'alcoholic-drinks', true, true),
(gen_random_uuid(), 'Frozen Margarita', 'Tequila + Lime + Simple Syrup + Salt in blended ice', 140, 'alcoholic-drinks', true, true),
(gen_random_uuid(), 'Mojito', 'White Rum + Mint Leaves + Lime Juice + Simple Syrup + Club Soda', 140, 'alcoholic-drinks', true, true),
(gen_random_uuid(), 'Cosmopolitan', 'Vodka + Cranberry Juice + Lime + Triple Sec', 150, 'alcoholic-drinks', false, true),
(gen_random_uuid(), 'Rum Coke', 'Rum and Coca-Cola', 130, 'alcoholic-drinks', false, true);

-- =====================================================
-- XIII. ALCOHOLIC DRINKS - BEER
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Corona', 'Corona beer', 155, 'alcoholic-drinks', true, true),
(gen_random_uuid(), 'Blue Moon', 'Blue Moon craft beer', 155, 'alcoholic-drinks', false, true),
(gen_random_uuid(), 'Hoegaarden', 'Hoegaarden wheat beer (Can/Bottle)', 155, 'alcoholic-drinks', false, true),
(gen_random_uuid(), 'Heineken', 'Heineken lager', 130, 'alcoholic-drinks', true, true),
(gen_random_uuid(), 'Asahi Dry', 'Asahi Dry Japanese beer', 130, 'alcoholic-drinks', false, true),
(gen_random_uuid(), 'San Mig Light in Can', 'San Miguel Light', 95, 'alcoholic-drinks', false, true),
(gen_random_uuid(), 'San Miguel Pale Pilsen', 'San Miguel Pale Pilsen', 95, 'alcoholic-drinks', false, true),
(gen_random_uuid(), 'Smirnoff Mule', 'Smirnoff Mule', 95, 'alcoholic-drinks', false, true);

-- =====================================================
-- XIV. COFFEE & COFFEE-BASED DRINKS
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Espresso (Hot)', 'Hot espresso shot', 50, 'coffee', false, true),
(gen_random_uuid(), 'Espresso (Iced)', 'Iced espresso', 120, 'coffee', false, true),
(gen_random_uuid(), 'Americano (Hot)', 'Hot americano', 125, 'coffee', true, true),
(gen_random_uuid(), 'Americano (Iced)', 'Iced americano', 135, 'coffee', true, true),
(gen_random_uuid(), 'Cappuccino (Hot)', 'Hot cappuccino', 125, 'coffee', true, true),
(gen_random_uuid(), 'Cappuccino (Iced)', 'Iced cappuccino', 135, 'coffee', false, true),
(gen_random_uuid(), 'Cafe Latte (Hot)', 'Hot cafe latte', 125, 'coffee', true, true),
(gen_random_uuid(), 'Cafe Latte (Iced)', 'Iced cafe latte', 135, 'coffee', true, true),
(gen_random_uuid(), 'Mocha (Hot)', 'Hot mocha', 135, 'coffee', true, true),
(gen_random_uuid(), 'Mocha (Iced)', 'Iced mocha', 145, 'coffee', true, true),
(gen_random_uuid(), 'Spanish Latte (Hot)', 'Hot Spanish latte', 135, 'coffee', true, true),
(gen_random_uuid(), 'Spanish Latte (Iced)', 'Iced Spanish latte', 145, 'coffee', true, true),
(gen_random_uuid(), 'Salted Caramel (Hot)', 'Hot salted caramel latte', 135, 'coffee', true, true),
(gen_random_uuid(), 'Salted Caramel (Iced)', 'Iced salted caramel latte', 145, 'coffee', true, true),
(gen_random_uuid(), 'Hazelnut Latte (Hot)', 'Hot hazelnut latte', 125, 'coffee', false, true),
(gen_random_uuid(), 'Hazelnut Latte (Iced)', 'Iced hazelnut latte', 145, 'coffee', false, true),
(gen_random_uuid(), 'Caramel Latte (Hot)', 'Hot caramel latte', 135, 'coffee', true, true),
(gen_random_uuid(), 'Caramel Latte (Iced)', 'Iced caramel latte', 145, 'coffee', true, true),
(gen_random_uuid(), 'Vanilla Latte (Hot)', 'Hot vanilla latte', 135, 'coffee', false, true),
(gen_random_uuid(), 'Vanilla Latte (Iced)', 'Iced vanilla latte', 145, 'coffee', false, true),
(gen_random_uuid(), 'Macadamia (Hot)', 'Hot macadamia latte', 135, 'coffee', false, true),
(gen_random_uuid(), 'Macadamia (Iced)', 'Iced macadamia latte', 145, 'coffee', false, true),
(gen_random_uuid(), 'Ube Latte (Iced)', 'Iced ube latte', 145, 'coffee', true, true),
(gen_random_uuid(), 'Pandan Iced Latte', 'Iced pandan latte', 160, 'coffee', true, true),
(gen_random_uuid(), 'Biscoffe Latte (Hot)', 'Hot biscoff latte', 150, 'coffee', true, true),
(gen_random_uuid(), 'Biscoffe Latte (Iced)', 'Iced biscoff latte', 155, 'coffee', true, true),
(gen_random_uuid(), 'Oreo Latte (Hot)', 'Hot oreo latte', 150, 'coffee', false, true),
(gen_random_uuid(), 'Oreo Latte (Iced)', 'Iced oreo latte', 155, 'coffee', false, true);

-- =====================================================
-- XIV. MACCHIATO
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Salted Caramel Macchiato (Hot)', 'Hot salted caramel macchiato', 135, 'coffee', false, true),
(gen_random_uuid(), 'Salted Caramel Macchiato (Iced)', 'Iced salted caramel macchiato', 145, 'coffee', false, true),
(gen_random_uuid(), 'Mocha Macadamia (Hot)', 'Hot mocha macadamia', 135, 'coffee', false, true),
(gen_random_uuid(), 'Mocha Macadamia (Iced)', 'Iced mocha macadamia', 145, 'coffee', false, true),
(gen_random_uuid(), 'Almond White Mocha (Hot)', 'Hot almond white mocha', 135, 'coffee', false, true),
(gen_random_uuid(), 'Almond White Mocha (Iced)', 'Iced almond white mocha', 145, 'coffee', false, true),
(gen_random_uuid(), 'Hazelnut Macchiato (Hot)', 'Hot hazelnut macchiato', 135, 'coffee', false, true),
(gen_random_uuid(), 'Hazelnut Macchiato (Iced)', 'Iced hazelnut macchiato', 145, 'coffee', false, true),
(gen_random_uuid(), 'Caramel Macchiato (Hot)', 'Hot caramel macchiato', 135, 'coffee', true, true),
(gen_random_uuid(), 'Caramel Macchiato (Iced)', 'Iced caramel macchiato', 145, 'coffee', true, true),
(gen_random_uuid(), 'Vanilla Macchiato (Hot)', 'Hot vanilla macchiato', 135, 'coffee', false, true),
(gen_random_uuid(), 'Vanilla Macchiato (Iced)', 'Iced vanilla macchiato', 145, 'coffee', false, true);

-- =====================================================
-- XV. FRAPPUCINO (Coffee Based)
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Java Chip Frappucino', 'Coffee-based frappucino with chocolate chips', 185, 'frappucino', true, true),
(gen_random_uuid(), 'Caramel Frappucino', 'Coffee-based caramel frappucino', 185, 'frappucino', true, true),
(gen_random_uuid(), 'Caffe Vanilla Frappucino', 'Coffee-based vanilla frappucino', 185, 'frappucino', false, true),
(gen_random_uuid(), 'Mocha Cookie Frappucino', 'Coffee-based mocha cookie frappucino', 185, 'frappucino', false, true),
(gen_random_uuid(), 'White Chocolate Frappucino', 'Coffee-based white chocolate frappucino', 185, 'frappucino', false, true),
(gen_random_uuid(), 'Ube Frappucino', 'Coffee-based ube frappucino', 180, 'frappucino', true, true);

-- =====================================================
-- XV. FRAPPUCINO (Cream Based / Milkshake)
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Avocado Frappucino', 'Cream-based with real avocado', 185, 'frappucino', true, true),
(gen_random_uuid(), 'Biscoff Creme Brulee Frappucino', 'Cream-based biscoff creme brulee', 185, 'frappucino', true, true),
(gen_random_uuid(), 'Pistachio Frappucino', 'Cream-based with real pistachio', 185, 'frappucino', false, true),
(gen_random_uuid(), 'Salted Caramel Pretzel Frappucino', 'Cream-based salted caramel pretzel', 165, 'frappucino', false, true),
(gen_random_uuid(), 'Cookies and Cream Frappucino', 'Cream-based cookies and cream', 175, 'frappucino', true, true),
(gen_random_uuid(), 'Strawberry Nutella Frappucino', 'Cream-based strawberry nutella', 185, 'frappucino', true, true),
(gen_random_uuid(), 'Strawberry Shortcake Frappucino', 'Cream-based with real strawberry', 185, 'frappucino', true, true),
(gen_random_uuid(), 'Melon Frappucino', 'Cream-based with real melon', 180, 'frappucino', false, true),
(gen_random_uuid(), 'Matcha Almond Frappucino', 'Cream-based matcha almond', 150, 'frappucino', false, true),
(gen_random_uuid(), 'Milk Strawberry Frappucino', 'Cream-based milk strawberry', 155, 'frappucino', false, true),
(gen_random_uuid(), 'Mango Frappucino', 'Cream-based with real mango', 155, 'frappucino', true, true),
(gen_random_uuid(), 'Ube Cream Frappucino', 'Cream-based with real ube', 170, 'frappucino', true, true),
(gen_random_uuid(), 'Vanilla Frappucino', 'Classic vanilla frappucino', 140, 'frappucino', false, true),
(gen_random_uuid(), 'Chocolate Frappucino', 'Classic chocolate frappucino', 150, 'frappucino', true, true);

-- =====================================================
-- XVI. VIETNAMESE COFFEE
-- =====================================================

INSERT INTO menu_items (id, name, description, base_price, category, popular, available) VALUES
(gen_random_uuid(), 'Coconut Coffee (Iced)', 'Tropical delight with blends of rich coffee with sweet creamy coconut cream. Traditional Vietnamese Coffee takes a few minutes to make.', 185, 'vietnamese-coffee', true, true),
(gen_random_uuid(), 'Salt Coffee', 'Vietnamese classic combines sweetened milk creates a little saltiness on the tip of your tongue. Traditional Vietnamese Coffee takes a few minutes to make.', 175, 'vietnamese-coffee', false, true),
(gen_random_uuid(), 'Egg Coffee', 'A creamy & rich coffee topped with a velvety egg concoction. Traditional Vietnamese Coffee takes a few minutes to make.', 195, 'vietnamese-coffee', true, true);

-- =====================================================
-- Success message
-- =====================================================

SELECT 'Arios Cafe menu data inserted successfully!' AS message;

