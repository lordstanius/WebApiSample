CREATE TABLE [dbo].[Employee](
[EmployeeID] [int] IDENTITY(1,1) NOT NULL primary key,
[FirstName] [nvarchar](50) NULL,
[LastName] [nvarchar](50) NULL,
[EmpCode] [nvarchar](50) NULL,
[Position] [nvarchar](50) NULL,
[Office] [nvarchar](50) NULL)