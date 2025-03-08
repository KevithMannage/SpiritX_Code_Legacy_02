INSERT INTO `User` (`Username`, `Password`, `Is_Admin`, `Created_date`, `Email`) VALUES
('john_doe', 'hashed_password_123', TRUE, '2025-01-15 10:30:00', 'john.doe@example.com'),
('admin_smith', 'hashed_password_456',FALSE , '2025-01-20 14:15:00', 'admin.smith@example.com'),
('jane_wilson', 'hashed_password_789', FALSE, '2025-02-10 09:45:00', 'jane.wilson@example.com'),
('mike_brown', 'hashed_password_101', FALSE, '2025-03-01 16:20:00', 'mike.brown@example.com');

INSERT INTO `Team` (`Team_Name`, `Created_Date`, `User_ID`, `Initial_Budget`) VALUES
('Thunder Strikers', '2025-01-16 12:00:00', 2, 100000.00),
('Wilson Warriors', '2025-02-11 11:15:00', 3, 120000.00),
('Brown Bombers', '2025-03-02 17:00:00', 4, 90000.00);

INSERT INTO `Team_Members` (`Team_ID`, `Player_ID`, `Added_Date`) VALUES
(1, 1, '2025-01-17 09:00:00'), -- Thunder Strikers adds Player 1
(1, 2, '2025-01-17 09:05:00'), -- Thunder Strikers adds Player 2
(2, 3, '2025-01-22 10:00:00'), -- Admin All-Stars adds Player 3
(2, 4, '2025-02-12 14:30:00'), -- Wilson Warriors adds Player 4
(3, 5, '2025-03-03 18:00:00'), -- Brown Bombers adds Player 5
(3, 6, '2025-01-23 12:00:00'); -- Admin All-Stars adds Player 1

