-- KATEGORI --
INSERT INTO category(name, date_created) VALUES ('Sembako', NOW());
INSERT INTO category(name, date_created) VALUES ('Makanan', NOW());
INSERT INTO category(name, date_created) VALUES ('Minuman', NOW());
INSERT INTO category(name, date_created) VALUES ('Kebersihan', NOW());


-- BARANG --
INSERT INTO product(code, date_created, name, purchase_price, selling_price, stock_amount, unit, expired_date, category_id) VALUES ('MNY-RSB', NOW(), 'Minyak Goreng Rose Brand', 25000, 26000, 0, 'PCS', '2024-01-01', 1);
INSERT INTO product(code, date_created, name, purchase_price, selling_price, stock_amount, unit, expired_date, category_id) VALUES ('MNY-FTN', NOW(), 'Minyak Goreng Fortune', 20000, 21000, 0, 'LITER', '2024-01-01', 1);
INSERT INTO product(code, date_created, name, purchase_price, selling_price, stock_amount, unit, expired_date, category_id) VALUES ('BRS-CHR', NOW(), 'Beras Ciherang', 9500, 10000, 0, 'KG', '2024-01-01', 1);
INSERT INTO product(code, date_created, name, purchase_price, selling_price, stock_amount, unit, expired_date, category_id) VALUES ('BRS-RJL', NOW(), 'Beras Rojolele', 9000, 9500, 0, 'KG', '2024-01-01', 1);
INSERT INTO product(code, date_created, name, purchase_price, selling_price, stock_amount, unit, expired_date, category_id) VALUES ('BNG-BNG', NOW(), 'Beng-Beng', 1000, 1500, 0, 'PCS', '2024-01-01', 2);
INSERT INTO product(code, date_created, name, purchase_price, selling_price, stock_amount, unit, expired_date, category_id) VALUES ('SS-DNC', NOW(), 'Susu Dancow', 1500, 2000, 0, 'PCS', '2022-01-01', 3);
INSERT INTO product(code, date_created, name, purchase_price, selling_price, stock_amount, unit, expired_date, category_id) VALUES ('SBN-SNL', NOW(), 'Sabun Sunlight', 1000, 1500, 0, 'PCS', '2022-01-01', 4);


-- LAPAK --
INSERT INTO stall(name, date_created) VALUES ('Andi', NOW());
INSERT INTO stall(name, date_created) VALUES ('Budi', NOW());


-- STOK --
INSERT INTO stockIn(quantity, type, product_id, date, date_created) VALUES (100, 'IN', 1, NOW(), NOW());
INSERT INTO stockIn(quantity, type, product_id, date, date_created) VALUES (100, 'IN', 2, NOW(), NOW());
INSERT INTO stockIn(quantity, type, product_id, date, date_created) VALUES (100, 'IN', 3, NOW(), NOW());
INSERT INTO stockIn(quantity, type, product_id, date, date_created, stall_id) VALUES (80, 'OUT', 1, NOW(), NOW(), 2);
INSERT INTO stockIn(quantity, type, product_id, date, date_created) VALUES (3, 'BROKEN', 2, NOW(), NOW());