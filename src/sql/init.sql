use Pherify;

CREATE TABLE IF NOT EXISTS contactList (
  ContactListId CHAR(36)  NOT NULL,
  phone VARCHAR(20) NOT NULL PRIMARY KEY,
  contacts JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS globalContacts (
  GlobalContactId CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  isSpam BOOLEAN DEFAULT false NOT NULL,
  isRegistered BOOLEAN DEFAULT false NOT NULL,
  contactListId CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user(
  UserId CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  isSpam BOOLEAN DEFAULT false NOT NULL,
  contactListId CHAR(36) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);



INSERT INTO globalContacts (GlobalContactId, name, email, phone, isSpam, isRegistered, contactListId, created_at, updated_at)
VALUES
  ('04b6f2c7-7393-4a22-af9d-5f017d112a51', 'John Doe', 'john.doe@example.com', '1234567890', false, false, 'contactListId_1', NOW(), NOW()),
  ('58bb0515-6f89-4c4e-8a34-c15891c35cc0', 'Jane Doe', 'jane.doe@example.com', '9876543210', true, true, 'contactListId_2', NOW(), NOW()),
  ('6c825e2e-519b-47ab-bb15-93ad3d2511eb', 'Alice Smith', 'alice.smith@example.com', '5551112222', false, true, 'contactListId_3', NOW(), NOW()),
  ('946c1d37-b89f-4864-b950-666a4a6e69d3', 'Bob Johnson', 'bob.johnson@example.com', '9998887777', false, true, 'contactListId_4', NOW(), NOW()),
  ('bba5500a-b4ce-4b4e-b2c2-d7b0e17e2b45', 'Eve Williams', 'eve.williams@example.com', '4443332222', false, true, 'contactListId_5', NOW(), NOW()),
  ('6c464b2c-0321-4e74-a5a8-7cbf78c2eaf1', 'Charlie Brown', 'charlie.brown@example.com', '7776665555', false, true, 'contactListId_6', NOW(), NOW()),
  ('924b6155-4f2b-41da-8ed0-9381c4e4e2c7', 'Grace Davis', 'grace.davis@example.com', '2221110000', false, true, 'contactListId_7', NOW(), NOW()),
  ('98d4e056-25f3-4e16-b671-7f98d07309d1', 'Daniel Smith', 'daniel.smith@example.com', '8887776666', false, true, 'contactListId_8', NOW(), NOW());


INSERT INTO user (UserId, name, email, phone, isSpam, contactListId, password, created_at, updated_at)
VALUES
  ('045d3e76-1d9f-4d7d-9c63-2c16ed1c6843', 'John Doe', 'john.doe@example.com', '1234567890', false, 'contactListId_1', 'hashed_password_1', NOW(), NOW()),
  ('3a8a5b0d-6bf3-4ec1-a6b7-b819e2e3bcf0', 'Jane Doe', 'jane.doe@example.com', '9876543210', true, 'contactListId_2', 'hashed_password_2', NOW(), NOW()),
  ('8b031906-1a10-45a1-b51a-697f9c8c067d', 'Alice Smith', 'alice.smith@example.com', '5551112222', false, 'contactListId_3', 'hashed_password_3', NOW(), NOW()),
  ('3cf11ea3-ecbb-4c2d-834d-1fcd40d207b1', 'Bob Johnson', 'bob.johnson@example.com', '9998887777', false, 'contactListId_4', 'hashed_password_4', NOW(), NOW()),
  ('b2c6727e-6d1b-487b-ba2a-117768c61c0d', 'Eve Williams', 'eve.williams@example.com', '4443332222', false, 'contactListId_5', 'hashed_password_5', NOW(), NOW()),
  ('e9c3d803-7958-4f8b-aed9-6ce314a9b902', 'Charlie Brown', 'charlie.brown@example.com', '7776665555', false, 'contactListId_6', 'hashed_password_6', NOW(), NOW()),
  ('8e7361f4-7c64-41a3-860c-3ce2b8c9ac48', 'Grace Davis', 'grace.davis@example.com', '2221110000', false, 'contactListId_7', 'hashed_password_7', NOW(), NOW()),
  ('ac7848e1-d10d-49e2-9ea3-4a4f9652d0d7', 'Daniel Smith', 'daniel.smith@example.com', '8887776666', false, 'contactListId_8', 'hashed_password_8', NOW(), NOW());


INSERT INTO contactList (ContactListId, phone, contacts, created_at, updated_at)
VALUES
  ('contactListId_1', '1234567890', '[{"name": "John Doe", "email": "john.doe@example.com"}]', NOW(), NOW()),
  ('contactListId_2', '9876543210', '[{"name": "Jane Doe", "email": "jane.doe@example.com"}]', NOW(), NOW()),
  ('contactListId_3', '5551112222', '[{"name": "Alice Smith", "email": "alice.smith@example.com"}]', NOW(), NOW());
