-- Drop the database if it already exists to start fresh.
DROP DATABASE IF EXISTS todo_app;

-- Create the main database for the application.
CREATE DATABASE todo_app;

-- Switch to using the new database.
USE todo_app;

-- =============================================
-- Table structure for `users`
-- Stores user account information.
-- =============================================
CREATE TABLE users (
    -- Unique identifier for each user.
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- User's chosen name.
    username VARCHAR(255) NOT NULL,
    
    -- User's email, used for login. Must be unique.
    email VARCHAR(255) NOT NULL UNIQUE,
    
    -- Hashed password for security.
    password VARCHAR(255) NOT NULL,
    
    -- Role of the user, defaults to 'user'. Can be 'admin'.
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    
    -- Timestamp of when the user account was created.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Table structure for `tasks`
-- Stores the main tasks for each user.
-- =============================================
CREATE TABLE tasks (
    -- Unique identifier for each task.
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign key linking to the user who owns the task.
    user_id INT NOT NULL,
    
    -- Title of the task.
    title VARCHAR(255) NOT NULL,
    
    -- A more detailed description of the task (optional).
    description TEXT,
    
    -- Current status of the task.
    status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
    
    -- Timestamp of when the task was created.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Establishes the link between tasks.user_id and users.id.
    -- If a user is deleted, all their tasks are also deleted (ON DELETE CASCADE).
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================
-- Table structure for `subtasks`
-- Stores sub-tasks related to a main task.
-- =============================================
CREATE TABLE subtasks (
    -- Unique identifier for each subtask.
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign key linking to the parent task.
    task_id INT NOT NULL,
    
    -- The description or title of the subtask.
    title VARCHAR(255) NOT NULL,
    
    -- Current status of the subtask.
    status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
    
    -- Establishes the link between subtasks.task_id and tasks.id.
    -- If a parent task is deleted, all its subtasks are also deleted.
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- =============================================
-- Table structure for `logs`
-- Stores a record of actions performed by users.
-- =============================================
CREATE TABLE logs (
    -- Unique identifier for each log entry.
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign key linking to the user who performed the action.
    user_id INT NOT NULL,
    
    -- Description of the action performed.
    action TEXT NOT NULL,
    
    -- Timestamp of when the action occurred.
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Establishes the link between logs.user_id and users.id.
    -- If a user is deleted, all their logs are also deleted.
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
