USE defaultdb;
-- ORBEM Operations Dashboard - Seed Data
-- Demo data for development and testing
-- Password for all demo users: password
-- Bcrypt Hash: $2a$10$ViFpr64P0W2E3H.j5Buryealx8g1ABXo6R17Hj9XqeDJHmbpzusaW

USE defaultdb;

-- ========================================
-- Clear existing data (optional, comment out in production)
-- ========================================
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE user_settings;
TRUNCATE TABLE support_tickets;
TRUNCATE TABLE tasks;
TRUNCATE TABLE calendar_events;
TRUNCATE TABLE chat_messages;
TRUNCATE TABLE assistant_messages;
TRUNCATE TABLE notifications;
TRUNCATE TABLE alerts;
TRUNCATE TABLE activity_logs;
TRUNCATE TABLE staff_activity;
TRUNCATE TABLE airline_rates;
TRUNCATE TABLE revenue;
TRUNCATE TABLE staff;
TRUNCATE TABLE complaints;
TRUNCATE TABLE users;
TRUNCATE TABLE customers;
TRUNCATE TABLE bookings;
TRUNCATE TABLE shipment_timeline;
TRUNCATE TABLE shipment_milestones;
TRUNCATE TABLE shipments;
TRUNCATE TABLE documents;
TRUNCATE TABLE uploaded_files;
TRUNCATE TABLE payments;
SET FOREIGN_KEY_CHECKS=1;

-- ========================================
-- Insert Users (Demo Login)
-- ========================================
INSERT INTO users (id, name, email, password_hash, role, phone, is_active, status) VALUES
(1, 'Ananya Rao', 'admin@orbem.local', '$2a$10$ViFpr64P0W2E3H.j5Buryealx8g1ABXo6R17Hj9XqeDJHmbpzusaW', 'Admin', '+91 98765 10001', 1, 'Active'),
(2, 'Rahul Menon', 'ops@orbem.local', '$2a$10$ViFpr64P0W2E3H.j5Buryealx8g1ABXo6R17Hj9XqeDJHmbpzusaW', 'Operations Staff', '+91 98765 10002', 1, 'Active'),
(3, 'Vikram Singh', 'ops2@orbem.local', '$2a$10$ViFpr64P0W2E3H.j5Buryealx8g1ABXo6R17Hj9XqeDJHmbpzusaW', 'Operations Staff', '+91 98765 10003', 1, 'Active'),
(4, 'Deepak Kumar', 'logistics@orbem.local', '$2a$10$ViFpr64P0W2E3H.j5Buryealx8g1ABXo6R17Hj9XqeDJHmbpzusaW', 'Warehouse Staff', '+91 98765 10004', 1, 'Active'),
(5, 'Priya Nair', 'accounts@orbem.local', '$2a$10$ViFpr64P0W2E3H.j5Buryealx8g1ABXo6R17Hj9XqeDJHmbpzusaW', 'Accounts Staff', '+91 98765 10005', 1, 'Active');

-- ========================================
-- Insert Customers
-- ========================================
INSERT INTO customers (id, customer_name, company_name, contact_person, email, phone, city, gst_number) VALUES
(1, 'TechCorp India', 'TechCorp India Pvt Ltd', 'Amit Patel', 'amit@techcorp.in', '+91 22 4567 8900', 'Mumbai', '27AAPCT1234H1Z0'),
(2, 'GlobalTrade Express', 'GlobalTrade Express Ltd', 'Sneha Desai', 'sneha@globaltrade.in', '+91 80 9876 5432', 'Bangalore', '29AABCT5678K2Z1'),
(3, 'FashionHub Stores', 'FashionHub Stores Pvt Ltd', 'Rajesh Kumar', 'rajesh@fashionhub.in', '+91 33 2222 3333', 'Kolkata', '19AAPFH9012L1Z2'),
(4, 'ElectroMart Online', 'ElectroMart Online Pvt Ltd', 'Priya Sharma', 'priya@electromart.in', '+91 11 5555 6666', 'Delhi', '07AAPEM3456M2Z3'),
(5, 'SpiceExport Co', 'SpiceExport Co Ltd', 'Vivek Gupta', 'vivek@spiceexport.in', '+91 44 7777 8888', 'Chennai', '33AAPSE7890N3Z4');

-- ========================================
-- Insert Bookings (20 bookings)
-- ========================================
INSERT INTO bookings (booking_id, booking_no, customer_id, customer_name, customer_email, customer_phone, company_name, awb_number, origin_airport, destination_airport, pickup_city, delivery_city, cargo_type, cargo_description, package_count, actual_weight, length_cm, width_cm, height_cm, volumetric_weight, chargeable_weight, pieces, gross_weight, shipment_status, booking_status, owner_id, priority, booking_date, expected_delivery_date, notes) VALUES
('ORB001', 'BK001', 1, 'TechCorp India', 'amit@techcorp.in', '+91 22 4567 8900', 'TechCorp India Pvt Ltd', 'AWB001', 'DEL', 'BOM', 'Delhi', 'Mumbai', 'Electronics', 'Server components and networking equipment', 15, 45.50, 80, 60, 50, 48.00, 50.00, 15, 45.50, 'Delivered', 'Completed', 1, 'High', '2026-06-01', '2026-06-03', 'Urgent shipment for data center'),
('ORB002', 'BK002', 2, 'GlobalTrade Express', 'sneha@globaltrade.in', '+91 80 9876 5432', 'GlobalTrade Express Ltd', 'AWB002', 'BOM', 'BLR', 'Mumbai', 'Bangalore', 'Textiles', 'Cotton fabric rolls and yarn packages', 25, 120.00, 100, 80, 60, 96.00, 130.00, 25, 120.00, 'Delivered', 'Completed', 2, 'Normal', '2026-06-02', '2026-06-05', NULL),
('ORB003', 'BK003', 3, 'FashionHub Stores', 'rajesh@fashionhub.in', '+91 33 2222 3333', 'FashionHub Stores Pvt Ltd', 'AWB003', 'CCU', 'DEL', 'Kolkata', 'Delhi', 'Apparels', 'Summer collection clothing and accessories', 30, 85.75, 90, 70, 55, 69.30, 95.00, 30, 85.75, 'In Transit', 'Confirmed', 3, 'Normal', '2026-06-05', '2026-06-08', NULL),
('ORB004', 'BK004', 4, 'ElectroMart Online', 'priya@electromart.in', '+91 11 5555 6666', 'ElectroMart Online Pvt Ltd', 'AWB004', 'DEL', 'HYD', 'Delhi', 'Hyderabad', 'Electronics', 'Mobile phones and tablets bulk order', 50, 95.25, 120, 90, 70, 151.20, 105.00, 50, 95.25, 'Delayed', 'Confirmed', 4, 'High', '2026-05-28', '2026-06-02', 'Delayed due to customs'),
('ORB005', 'BK005', 5, 'SpiceExport Co', 'vivek@spiceexport.in', '+91 44 7777 8888', 'SpiceExport Co Ltd', 'AWB005', 'MAA', 'LON', 'Chennai', 'London', 'Food Products', 'Spices, tea, coffee and snacks', 20, 150.00, 110, 85, 65, 121.50, 160.00, 20, 150.00, 'Delivered', 'Completed', 1, 'High', '2026-05-20', '2026-05-29', 'International export'),
('ORB006', 'BK006', 1, 'TechCorp India', 'amit@techcorp.in', '+91 22 4567 8900', 'TechCorp India Pvt Ltd', 'AWB006', 'BOM', 'SIN', 'Mumbai', 'Singapore', 'Electronics', 'IT hardware and peripherals', 18, 62.30, 95, 75, 60, 85.50, 68.00, 18, 62.30, 'In Transit', 'Confirmed', 2, 'Normal', '2026-06-04', '2026-06-12', NULL),
('ORB007', 'BK007', 2, 'GlobalTrade Express', 'sneha@globaltrade.in', '+91 80 9876 5432', 'GlobalTrade Express Ltd', 'AWB007', 'BLR', 'CCU', 'Bangalore', 'Kolkata', 'Pharmaceuticals', 'Medical supplies and medicines', 12, 35.80, 70, 50, 45, 31.50, 40.00, 12, 35.80, 'Booked', 'Pending', 3, 'High', '2026-06-09', '2026-06-13', 'Medical emergency shipment'),
('ORB008', 'BK008', 3, 'FashionHub Stores', 'rajesh@fashionhub.in', '+91 33 2222 3333', 'FashionHub Stores Pvt Ltd', 'AWB008', 'DEL', 'BOM', 'Delhi', 'Mumbai', 'Apparels', 'Winter collection samples', 22, 58.50, 85, 65, 50, 55.25, 65.00, 22, 58.50, 'In Transit', 'Confirmed', 1, 'Normal', '2026-06-07', '2026-06-10', NULL),
('ORB009', 'BK009', 4, 'ElectroMart Online', 'priya@electromart.in', '+91 11 5555 6666', 'ElectroMart Online Pvt Ltd', 'AWB009', 'HYD', 'BLR', 'Hyderabad', 'Bangalore', 'Electronics', 'Laptop and desktop computers', 35, 78.95, 100, 80, 65, 104.00, 88.00, 35, 78.95, 'Delivered', 'Completed', 2, 'High', '2026-06-03', '2026-06-06', NULL),
('ORB010', 'BK010', 5, 'SpiceExport Co', 'vivek@spiceexport.in', '+91 44 7777 8888', 'SpiceExport Co Ltd', 'AWB010', 'CCU', 'MAA', 'Kolkata', 'Chennai', 'Food Products', 'Rice and pulses in bulk', 40, 200.00, 120, 90, 75, 162.00, 210.00, 40, 200.00, 'In Transit', 'Confirmed', 4, 'Normal', '2026-06-08', '2026-06-11', NULL),
('ORB011', 'BK011', 1, 'TechCorp India', 'amit@techcorp.in', '+91 22 4567 8900', 'TechCorp India Pvt Ltd', 'AWB011', 'DEL', 'MAA', 'Delhi', 'Chennai', 'Electronics', 'Software licenses and hardware', 10, 28.50, 60, 40, 35, 16.80, 32.00, 10, 28.50, 'Booked', 'Pending', 1, 'Normal', '2026-06-10', '2026-06-14', NULL),
('ORB012', 'BK012', 2, 'GlobalTrade Express', 'sneha@globaltrade.in', '+91 80 9876 5432', 'GlobalTrade Express Ltd', 'AWB012', 'BOM', 'DEL', 'Mumbai', 'Delhi', 'Textiles', 'Silk fabric collection', 8, 45.20, 75, 55, 45, 37.10, 50.00, 8, 45.20, 'Delayed', 'Confirmed', 3, 'High', '2026-06-01', '2026-06-04', 'Delayed at border checkpoint'),
('ORB013', 'BK013', 3, 'FashionHub Stores', 'rajesh@fashionhub.in', '+91 33 2222 3333', 'FashionHub Stores Pvt Ltd', 'AWB013', 'CCU', 'BLR', 'Kolkata', 'Bangalore', 'Apparels', 'Kids clothing and toys', 28, 72.65, 88, 68, 52, 62.20, 80.00, 28, 72.65, 'In Transit', 'Confirmed', 2, 'Normal', '2026-06-06', '2026-06-09', NULL),
('ORB014', 'BK014', 4, 'ElectroMart Online', 'priya@electromart.in', '+91 11 5555 6666', 'ElectroMart Online Pvt Ltd', 'AWB014', 'DEL', 'CCU', 'Delhi', 'Kolkata', 'Electronics', 'Audio and video equipment', 16, 38.75, 72, 58, 48, 40.00, 43.00, 16, 38.75, 'Delivered', 'Completed', 1, 'Normal', '2026-06-02', '2026-06-05', NULL),
('ORB015', 'BK015', 5, 'SpiceExport Co', 'vivek@spiceexport.in', '+91 44 7777 8888', 'SpiceExport Co Ltd', 'AWB015', 'MAA', 'BOM', 'Chennai', 'Mumbai', 'Food Products', 'Coconut and cashew products', 15, 75.50, 85, 65, 50, 55.25, 82.00, 15, 75.50, 'In Transit', 'Confirmed', 3, 'Normal', '2026-06-09', '2026-06-13', NULL),
('ORB016', 'BK016', 1, 'TechCorp India', 'amit@techcorp.in', '+91 22 4567 8900', 'TechCorp India Pvt Ltd', 'AWB016', 'BOM', 'HYD', 'Mumbai', 'Hyderabad', 'Electronics', 'Server components replacement', 12, 55.80, 80, 60, 50, 48.00, 60.00, 12, 55.80, 'Booked', 'Pending', 2, 'High', '2026-06-11', '2026-06-15', 'Urgent replacement parts'),
('ORB017', 'BK017', 2, 'GlobalTrade Express', 'sneha@globaltrade.in', '+91 80 9876 5432', 'GlobalTrade Express Ltd', 'AWB017', 'BLR', 'MAA', 'Bangalore', 'Chennai', 'Textiles', 'Polyester and synthetic fabrics', 22, 95.45, 100, 75, 60, 90.00, 105.00, 22, 95.45, 'In Transit', 'Confirmed', 4, 'Normal', '2026-06-07', '2026-06-11', NULL),
('ORB018', 'BK018', 3, 'FashionHub Stores', 'rajesh@fashionhub.in', '+91 33 2222 3333', 'FashionHub Stores Pvt Ltd', 'AWB018', 'DEL', 'SIN', 'Delhi', 'Singapore', 'Apparels', 'Fashion export samples', 18, 48.90, 85, 65, 50, 55.25, 54.00, 18, 48.90, 'Delivered', 'Completed', 3, 'High', '2026-05-25', '2026-06-01', 'Fashion week samples'),
('ORB019', 'BK019', 4, 'ElectroMart Online', 'priya@electromart.in', '+91 11 5555 6666', 'ElectroMart Online Pvt Ltd', 'AWB019', 'HYD', 'LON', 'Hyderabad', 'London', 'Electronics', 'Industrial electronics export', 25, 125.60, 105, 85, 65, 116.00, 138.00, 25, 125.60, 'In Transit', 'Confirmed', 1, 'High', '2026-06-04', '2026-06-14', 'UK destined cargo'),
('ORB020', 'BK020', 5, 'SpiceExport Co', 'vivek@spiceexport.in', '+91 44 7777 8888', 'SpiceExport Co Ltd', 'AWB020', 'CCU', 'LON', 'Kolkata', 'London', 'Food Products', 'Organic spice mix assortment', 10, 65.30, 80, 60, 50, 48.00, 70.00, 10, 65.30, 'In Transit', 'Confirmed', 2, 'Normal', '2026-06-06', '2026-06-18', 'International food export');

-- ========================================
-- Insert Shipments
-- ========================================
INSERT INTO shipments (id, booking_id, awb_number, origin, destination, current_status, current_location, expected_delivery_date, is_delayed) VALUES
(1, 1, 'AWB001', 'Delhi', 'Mumbai', 'Delivered', 'Mumbai Warehouse', '2026-06-03', 0),
(2, 2, 'AWB002', 'Mumbai', 'Bangalore', 'Delivered', 'Bangalore Warehouse', '2026-06-05', 0),
(3, 3, 'AWB003', 'Kolkata', 'Delhi', 'In Transit', 'Gaya Hub', '2026-06-08', 0),
(4, 4, 'AWB004', 'Delhi', 'Hyderabad', 'Delayed', 'Delhi Customs', '2026-06-02', 1),
(5, 5, 'AWB005', 'Chennai', 'London', 'Delivered', 'London Port', '2026-05-29', 0),
(6, 6, 'AWB006', 'Mumbai', 'Singapore', 'In Transit', 'Singapore Port', '2026-06-12', 0),
(7, 7, 'AWB007', 'Bangalore', 'Kolkata', 'Pending', 'Bangalore Hub', '2026-06-13', 0),
(8, 8, 'AWB008', 'Delhi', 'Mumbai', 'In Transit', 'Agra Hub', '2026-06-10', 0),
(9, 9, 'AWB009', 'Hyderabad', 'Bangalore', 'Delivered', 'Bangalore Warehouse', '2026-06-06', 0),
(10, 10, 'AWB010', 'Kolkata', 'Chennai', 'In Transit', 'Chennai Port', '2026-06-11', 0),
(11, 11, 'AWB011', 'Delhi', 'Chennai', 'Pending', 'Delhi Hub', '2026-06-14', 0),
(12, 12, 'AWB012', 'Mumbai', 'Delhi', 'Delayed', 'Border Checkpoint', '2026-06-04', 1),
(13, 13, 'AWB013', 'Kolkata', 'Bangalore', 'In Transit', 'Bangalore Hub', '2026-06-09', 0),
(14, 14, 'AWB014', 'Delhi', 'Kolkata', 'Delivered', 'Kolkata Warehouse', '2026-06-05', 0),
(15, 15, 'AWB015', 'Chennai', 'Mumbai', 'In Transit', 'Mumbai Hub', '2026-06-13', 0),
(16, 16, 'AWB016', 'Mumbai', 'Hyderabad', 'Pending', 'Mumbai Hub', '2026-06-15', 0),
(17, 17, 'AWB017', 'Bangalore', 'Chennai', 'In Transit', 'Chennai Hub', '2026-06-11', 0),
(18, 18, 'AWB018', 'Delhi', 'Singapore', 'Delivered', 'Singapore Airport', '2026-06-01', 0),
(19, 19, 'AWB019', 'Hyderabad', 'London', 'In Transit', 'London Port', '2026-06-14', 0),
(20, 20, 'AWB020', 'Kolkata', 'London', 'In Transit', 'London Port', '2026-06-18', 0);

-- ========================================
-- Insert Shipment Timeline
-- ========================================
INSERT INTO shipment_timeline (id, shipment_id, status, location, note, created_by) VALUES
(1, 1, 'Picked Up', 'Delhi Hub', 'Package picked up from customer', 1),
(2, 1, 'In Transit', 'Agra Hub', 'Package in transit', 1),
(3, 1, 'Delivered', 'Mumbai Warehouse', 'Delivered to customer', 1),
(4, 3, 'Picked Up', 'Kolkata Hub', 'Package picked up', 2),
(5, 3, 'In Transit', 'Gaya Hub', 'Currently at Gaya Hub', 2),
(6, 4, 'Picked Up', 'Delhi Hub', 'Package picked up', 3),
(7, 4, 'Customs Clearance', 'Delhi Customs', 'Awaiting customs clearance', 3),
(8, 6, 'In Transit', 'Mumbai Port', 'Shipped from Mumbai', 2),
(9, 6, 'In Transit', 'Singapore Port', 'In transit to Singapore', 2);

INSERT INTO shipment_milestones (booking_id, status, location, remarks, created_by, created_at)
SELECT s.booking_id, st.status, st.location, st.note, st.created_by, st.created_at
FROM shipment_timeline st
JOIN shipments s ON s.id = st.shipment_id;

-- ========================================
-- Insert Documents
-- ========================================
INSERT INTO documents (id, booking_id, shipment_id, document_type, status, due_date, uploaded_by, verified_by) VALUES
(1, 1, 1, 'Packing List', 'Verified', '2026-06-01', 1, 1),
(2, 1, 1, 'Invoice', 'Verified', '2026-06-01', 1, 1),
(3, 2, 2, 'Bill of Lading', 'Verified', '2026-06-02', 2, 1),
(4, 3, 3, 'Export Permit', 'Pending', '2026-06-05', 3, NULL),
(5, 4, 4, 'Customs Declaration', 'Pending', '2026-06-02', 1, NULL),
(6, 5, 5, 'Airway Bill', 'Verified', '2026-05-28', 2, 1),
(7, 6, 6, 'Certificate of Origin', 'Pending', '2026-06-08', 1, NULL),
(8, 7, 7, 'Packing List', 'Pending', '2026-06-10', 3, NULL),
(9, 8, 8, 'Invoice', 'Verified', '2026-06-07', 2, 2),
(10, 9, 9, 'Bill of Lading', 'Verified', '2026-06-04', 1, 2),
(11, 10, 10, 'Export Permit', 'Verified', '2026-06-08', 2, 1),
(12, 11, 11, 'Packing List', 'Pending', '2026-06-11', 3, NULL),
(13, 12, 12, 'Customs Declaration', 'Pending', '2026-06-03', 1, NULL),
(14, 13, 13, 'Invoice', 'Verified', '2026-06-06', 2, 2),
(15, 14, 14, 'Bill of Lading', 'Verified', '2026-06-03', 3, 1),
(16, 15, 15, 'Export Permit', 'Pending', '2026-06-10', 1, NULL),
(17, 16, 16, 'Packing List', 'Pending', '2026-06-12', 2, NULL),
(18, 17, 17, 'Invoice', 'Verified', '2026-06-08', 3, 2),
(19, 18, 18, 'Airway Bill', 'Verified', '2026-05-30', 1, 1),
(20, 19, 19, 'Bill of Lading', 'Verified', '2026-06-12', 2, 1);

-- ========================================
-- Insert Payments/Revenue
-- ========================================
INSERT INTO payments (id, booking_id, customer_id, invoice_number, quotation_amount, invoice_amount, paid_amount, balance_amount, payment_status, payment_date, payment_method, due_date, paid_at) VALUES
(1, 1, 1, 'INV001', 50000, 55000, 55000, 0, 'Paid', '2026-06-02', 'Bank Transfer', '2026-06-05', '2026-06-02'),
(2, 2, 2, 'INV002', 120000, 132000, 132000, 0, 'Paid', '2026-06-04', 'Bank Transfer', '2026-06-08', '2026-06-04'),
(3, 3, 3, 'INV003', 85000, 93500, 46750, 46750, 'Partial', '2026-06-06', 'Cheque', '2026-06-10', '2026-06-06'),
(4, 4, 4, 'INV004', 95000, 104500, 0, 104500, 'Overdue', NULL, NULL, '2026-06-05', NULL),
(5, 5, 5, 'INV005', 150000, 165000, 165000, 0, 'Paid', '2026-05-27', 'Bank Transfer', '2026-06-01', '2026-05-27'),
(6, 6, 1, 'INV006', 62000, 68200, 34100, 34100, 'Partial', '2026-06-08', 'Bank Transfer', '2026-06-12', '2026-06-08'),
(7, 7, 2, 'INV007', 35000, 38500, 0, 38500, 'Pending', NULL, NULL, '2026-06-13', NULL),
(8, 8, 3, 'INV008', 58000, 63700, 63700, 0, 'Paid', '2026-06-08', 'Bank Transfer', '2026-06-11', '2026-06-08'),
(9, 9, 4, 'INV009', 78000, 85800, 85800, 0, 'Paid', '2026-06-05', 'NEFT', '2026-06-08', '2026-06-05'),
(10, 10, 5, 'INV010', 200000, 220000, 110000, 110000, 'Partial', '2026-06-09', 'Bank Transfer', '2026-06-14', '2026-06-09'),
(11, 11, 1, 'INV011', 28000, 30800, 0, 30800, 'Pending', NULL, NULL, '2026-06-17', NULL),
(12, 12, 2, 'INV012', 45000, 49500, 24750, 24750, 'Partial', '2026-06-02', 'Cheque', '2026-06-06', '2026-06-02'),
(13, 13, 3, 'INV013', 72000, 79200, 79200, 0, 'Paid', '2026-06-07', 'Bank Transfer', '2026-06-10', '2026-06-07'),
(14, 14, 4, 'INV014', 38000, 41800, 41800, 0, 'Paid', '2026-06-04', 'Bank Transfer', '2026-06-07', '2026-06-04'),
(15, 15, 5, 'INV015', 75000, 82500, 41250, 41250, 'Partial', '2026-06-10', 'Bank Transfer', '2026-06-14', '2026-06-10'),
(16, 16, 1, 'INV016', 55000, 60500, 0, 60500, 'Pending', NULL, NULL, '2026-06-17', NULL),
(17, 17, 2, 'INV017', 95000, 104500, 52250, 52250, 'Partial', '2026-06-08', 'Bank Transfer', '2026-06-12', '2026-06-08'),
(18, 18, 3, 'INV018', 48000, 52800, 52800, 0, 'Paid', '2026-05-31', 'Bank Transfer', '2026-06-04', '2026-05-31'),
(19, 19, 4, 'INV019', 125000, 137500, 68750, 68750, 'Partial', '2026-06-10', 'Bank Transfer', '2026-06-16', '2026-06-10'),
(20, 20, 5, 'INV020', 65000, 71500, 0, 71500, 'Pending', NULL, NULL, '2026-06-20', NULL);

-- ========================================
-- Insert Alerts
-- ========================================
INSERT INTO alerts (id, type, title, message, severity, related_entity_type, related_entity_id, is_read) VALUES
(1, 'Delayed Shipment', 'Shipment AWB004 Delayed', 'Shipment awaiting customs clearance for over 24 hours', 'Warning', 'shipment', 4, 0),
(2, 'Payment Overdue', 'Invoice INV004 Overdue', 'Payment due from ElectroMart Online is overdue by 5 days', 'Critical', 'payment', 4, 0),
(3, 'Document Pending', 'Export Permit Pending', 'Export permit document still pending for booking ORB004', 'Warning', 'document', 5, 0),
(4, 'Delayed Shipment', 'Shipment AWB012 Delayed', 'Shipment stuck at border checkpoint for 3 days', 'Warning', 'shipment', 12, 0),
(5, 'Payment Overdue', 'Invoice INV011 Due Soon', 'Payment due from TechCorp India is due in 3 days', 'Info', 'payment', 11, 1),
(6, 'New Booking', 'High Priority Booking ORB016', 'Urgent replacement parts booking received from TechCorp', 'Info', 'booking', 16, 1),
(7, 'Document Verified', 'Invoice Verified', 'Invoice for booking ORB014 has been verified', 'Info', 'document', 15, 1),
(8, 'Shipment Delivered', 'Delivery Completed', 'Shipment AWB001 successfully delivered to customer', 'Success', 'shipment', 1, 1),
(9, 'Payment Received', 'Payment Confirmed', 'Payment received for invoice INV009 from ElectroMart', 'Success', 'payment', 9, 1),
(10, 'Staff Activity', 'High Volume Activity', 'Operations team processed 15 shipments today', 'Info', 'staff_activity', NULL, 1);

INSERT INTO notifications (title, message, type, severity, is_read, related_booking_id, created_at)
SELECT
  title,
  message,
  CASE
    WHEN type LIKE '%Payment%' THEN 'Payment'
    WHEN type LIKE '%Document%' THEN 'Document'
    WHEN type LIKE '%Shipment%' THEN 'Shipment'
    ELSE 'System'
  END,
  CASE WHEN severity IN ('Critical','Warning','Info') THEN severity ELSE 'Info' END,
  is_read,
  CASE WHEN related_entity_type = 'booking' THEN related_entity_id ELSE NULL END,
  created_at
FROM alerts;

-- ========================================
-- Insert Staff Activity
-- ========================================
INSERT INTO staff_activity (id, user_id, action, module, action_type, title, entity_type, entity_id, description, related_type, related_id) VALUES
(1, 1, 'Created', 'Booking', 'Create', 'Booking created', 'booking', 1, 'TechCorp server components booking', 'customer', 1),
(2, 2, 'Updated', 'Shipment', 'Update', 'Shipment status updated', 'shipment', 1, 'Marked as delivered', 'booking', 1),
(3, 3, 'Verified', 'Document', 'Verify', 'Invoice verified', 'document', 1, 'Invoice for booking 1 verified', 'booking', 1),
(4, 4, 'Updated', 'Payment', 'Update', 'Payment received', 'payment', 1, 'Full payment received from TechCorp', 'booking', 1),
(5, 1, 'Created', 'Booking', 'Create', 'Booking created', 'booking', 4, 'ElectroMart mobile phones order', 'customer', 4),
(6, 2, 'Noted', 'Shipment', 'Note', 'Delay reported', 'shipment', 4, 'Customs clearance pending', 'booking', 4),
(7, 3, 'Checked', 'Document', 'Check', 'Customs declaration pending', 'document', 5, 'Awaiting approval', 'booking', 4),
(8, 4, 'Flagged', 'Payment', 'Flag', 'Payment overdue', 'payment', 4, 'Invoice INV004 overdue', 'booking', 4),
(9, 1, 'Created', 'Alert', 'Create', 'Alert generated', 'alert', 2, 'Payment overdue alert created', 'payment', 4),
(10, 2, 'Processed', 'Booking', 'Process', 'Bulk entry processed', 'booking', NULL, 'Multiple bookings processed today', 'bulk', NULL);

INSERT INTO activity_logs (user_id, action_type, title, description, related_type, related_id, created_at)
SELECT user_id, action_type, title, description, related_type, related_id, created_at
FROM staff_activity;

-- ========================================
-- Insert Settings
-- ========================================
INSERT INTO user_settings (id, user_id, setting_key, setting_value) VALUES
(1, 1, 'theme', JSON_QUOTE('dark')),
(2, 1, 'notifications_email', JSON_QUOTE('1')),
(3, 1, 'dashboard_layout', JSON_QUOTE('default')),
(4, 2, 'theme', JSON_QUOTE('light')),
(5, 2, 'notifications_sms', JSON_QUOTE('1')),
(6, 5, 'theme', JSON_QUOTE('dark')),
(7, 5, 'report_format', JSON_QUOTE('pdf'));

-- ========================================
-- Insert Rates
-- ========================================
INSERT INTO airline_rates (id, airline_name, origin_airport, destination_airport, rate_per_kg, fuel_surcharge, handling_charge, valid_from, valid_to, notes) VALUES
(1, 'ORBEM Demo Carrier', 'DEL', 'BOM', 50, 5, 0, '2026-01-01', '2026-12-31', 'Seeded demo rate'),
(2, 'ORBEM Demo Carrier', 'BOM', 'BLR', 45, 3, 0, '2026-01-01', '2026-12-31', 'Seeded demo rate'),
(3, 'ORBEM Demo Carrier', 'DEL', 'CCU', 55, 4, 0, '2026-01-01', '2026-12-31', 'Seeded demo rate'),
(4, 'ORBEM Demo Carrier', 'MAA', 'LON', 300, 50, 0, '2026-01-01', '2026-12-31', 'Seeded demo rate'),
(5, 'ORBEM Demo Carrier', 'BOM', 'SIN', 200, 30, 0, '2026-01-01', '2026-12-31', 'Seeded demo rate'),
(6, 'ORBEM Demo Carrier', 'DEL', 'HYD', 40, 2, 0, '2026-01-01', '2026-12-31', 'Seeded demo rate'),
(7, 'ORBEM Demo Carrier', 'DEL', 'SIN', 250, 40, 0, '2026-01-01', '2026-12-31', 'Seeded demo rate'),
(8, 'ORBEM Demo Carrier', 'CCU', 'LON', 320, 50, 0, '2026-01-01', '2026-12-31', 'Seeded demo rate');

-- ========================================
-- Insert Staff Information
-- ========================================
INSERT INTO staff (id, user_id, department, position, salary, join_date, is_active) VALUES
(1, 1, 'Management', 'CEO / Owner', 500000, '2024-01-15', 1),
(2, 2, 'Operations', 'Operations Manager', 150000, '2024-02-01', 1),
(3, 3, 'Operations', 'Senior Coordinator', 120000, '2024-03-10', 1),
(4, 4, 'Logistics', 'Logistics Lead', 110000, '2024-02-15', 1),
(5, 5, 'Finance', 'Accounts Manager', 130000, '2024-01-20', 1);

-- ========================================
-- Reset Auto Increment Counters
-- ========================================
ALTER TABLE users AUTO_INCREMENT = 6;
ALTER TABLE customers AUTO_INCREMENT = 6;
ALTER TABLE bookings AUTO_INCREMENT = 21;
ALTER TABLE shipments AUTO_INCREMENT = 21;
ALTER TABLE shipment_timeline AUTO_INCREMENT = 10;
ALTER TABLE shipment_milestones AUTO_INCREMENT = 10;
ALTER TABLE documents AUTO_INCREMENT = 21;
ALTER TABLE uploaded_files AUTO_INCREMENT = 1;
ALTER TABLE payments AUTO_INCREMENT = 21;
ALTER TABLE alerts AUTO_INCREMENT = 11;
ALTER TABLE notifications AUTO_INCREMENT = 11;
ALTER TABLE staff_activity AUTO_INCREMENT = 11;
ALTER TABLE activity_logs AUTO_INCREMENT = 11;
ALTER TABLE staff AUTO_INCREMENT = 6;
ALTER TABLE airline_rates AUTO_INCREMENT = 9;

-- ========================================
-- Data insertion complete
-- ========================================
SELECT 'ORBEM Operations Dashboard database seeded successfully!' AS status;
SELECT COUNT(*) AS user_count FROM users;
SELECT COUNT(*) AS customer_count FROM customers;
SELECT COUNT(*) AS booking_count FROM bookings;
SELECT COUNT(*) AS payment_count FROM payments;
SELECT COUNT(*) AS alert_count FROM alerts;
