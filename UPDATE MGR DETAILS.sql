--select e.EmpName,e.FirstLevelReportingCode,e.CurrentEmployeeCode
-- from [SQLEXPR-SERVER\SQLEXPRESS].hrdb.[HR].[V_EmployeeDetails] e where EmpName like '%shambhavi%'

DECLARE @TEMP TABLE (EmployeeCode VARCHAR(50),EmpName VARCHAR(150))
INSERT INTO @TEMP(EmployeeCode,EmpName)
SELECT CurrentEmployeeCode,EmpName FROM [SQLEXPR-SERVER\SQLEXPRESS].hrdb.[HR].[V_EmployeeDetails] WHERE CurrentEmployeeCode IS NOT NULL

DECLARE @EmpID varchar(50),@EmpName VARCHAR(150),@COUNT INT=0

WHILE EXISTS(SELECT 1 FROM @TEMP)
BEGIN
	SELECT @EmpID=EmployeeCode,@EmpName=EmpName FROM @TEMP
	DELETE FROM @TEMP WHERE EmployeeCode=@EmpID
	SET @COUNT=@COUNT+1
	SELECT @COUNT
	INSERT INTO EmpMgrDetails(MgrCode,MgrName,EmpCode,EmpName,MgrLevel,CreatedOn,IsActive,UpdatedOn)
	VALUES(@EmpID,@EmpName,@EmpID,@EmpName,0,GETDATE(),1,GETDATE())

	;WITH SubOrdinates AS
		(
			SELECT	CurrentEmployeeCode,EmpName,0 AS MgrLevel
			FROM	[SQLEXPR-SERVER\SQLEXPRESS].hrdb.[HR].[V_EmployeeDetails] 	-- change if table name is different
			WHERE	CurrentEmployeeCode = @EmpID
			UNION ALL
			SELECT	Employee.CurrentEmployeeCode,Employee.EmpName,S.MgrLevel+1 as MgrLevel
			FROM	[SQLEXPR-SERVER\SQLEXPRESS].hrdb.[HR].[V_EmployeeDetails]  Employee
			JOIN	SubOrdinates S
			ON		Employee.FirstLevelReportingCode = S.CurrentEmployeeCode
		)
		--SELECT	CurrentEmployeeCode,EmpName,MgrLevel
		--FROM	SubOrdinates WHERE	CurrentEmployeeCode <> @EmpID AND MgrLevel=2

		INSERT INTO EmpMgrDetails(MgrCode,MgrName,EmpCode,EmpName,MgrLevel,CreatedOn,IsActive,UpdatedOn)
		SELECT @EmpID,@EmpName,CurrentEmployeeCode,EmpName,MgrLevel,GETDATE(),1,GETDATE()
		FROM SubOrdinates WHERE	CurrentEmployeeCode <> @EmpID

		

END


 
 --SELECT	CurrentEmployeeCode,EmpName
	--FROM	[SQLEXPR-SERVER\SQLEXPRESS].hrdb.[HR].[V_EmployeeDetails] 
 --WHERE FirstLevelReportingCode  in ('EW00399','ET01654') -- in @EmpID
 
 
