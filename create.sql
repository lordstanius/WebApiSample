CREATE TABLE [dbo].[Employee](
[EmployeeID] [int] IDENTITY(1,1) NOT NULL primary key,
[FirstName] [varchar](50) NULL,
[LastName] [varchar](50) NULL,
[EmpCode] [varchar](50) NULL,
[Position] [varchar](50) NULL,
[Office] [varchar](50) NULL)