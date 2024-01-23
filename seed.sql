
-- Create the table
CREATE TABLE Messages (
    name VARCHAR(50),
    message TEXT,
    category VARCHAR(50)
);

CREATE TABLE categories (
    types VARCHAR(50)    
);

-- Insert data into the table
INSERT INTO Messages (name, message, category) VALUES
('Alex', 'Can we reschedule our meeting to discuss the project updates?', 'Professional'),
('Bella', 'Happy Birthday! Hope you have a fantastic day filled with joy!', 'Personal'),
('Charlie', 'Are you free this weekend for a quick basketball game?', 'Casual'),
('Dana', 'The deadline for the report submission is next Friday.', 'Professional'),
('Ethan', 'Had a great time at the concert last night!', 'Casual'),
('Fiona', 'Could you please send me the holiday photos?', 'Personal'),
('George', 'Reminder: Your dentist appointment is at 3 PM tomorrow.', 'Personal'),
('Hannah', 'Let''s have a team lunch this Thursday to discuss our next steps.', 'Professional'),
('Ian', 'Just finished reading the book you recommended. Loved it!', 'Casual'),
('Julia', 'Please review the attached file and provide your feedback.', 'Professional');

-- Insert data into the table
INSERT INTO categories (types) VALUES
('Professional'),
('Personal'),
('Casual');

-- Select statement to view the inserted data
SELECT * FROM messages;