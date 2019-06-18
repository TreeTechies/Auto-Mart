
/* Creating Database */
CREATE DATABASE auto_mart_db;

/* Creating Table */
CREATE TABLE [User](
    [Id] varchar(255),
    [FirstName] varchar(50),
    [LastName] varchar(50),
    [Email] varchar(50),
    [Password] varchar(255),
    [Address] varchar(50),
    [IsAdmin] boolean
);

/* Inserting data to a table */
INSERT INTO [User] VALUES();

/* Reading data */
SELECT * FROM table_name;

/* Updating data */
UPDATE table_name SET column1 = value1, ... WHERE condition;

/* Reading data with limit */
SELECT TOP number|percent column_name(s) FROM table_name WHERE condition;

/* Deleting table */
DELETE TABLE table_name;

/* If not exist */
IF NOT EXISTS(SELECT 1 FROM Timesheet_Hours WHERE Staff_Id = @PersonID) BEGIN RAISERROR('Default list has not been loaded!', 16, 1 ROLLBACK TRAN END

