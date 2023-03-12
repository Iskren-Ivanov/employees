# employees
The application works with a CSV file, as the file must contain EmpID, ProjectID, DateFrom, DateTo (Can be NULL, equivalent to today). The application sorts and returns the two employees who have worked the longest on a given project.

Simple Data CSV:

EmpID,ProjectID,DateFrom,DateTo (a new line)
143,12,2013-11-01,2014-01-05 (a new line)
218,10,2012-05-16,NULL (a new line)
76,1,2023-01-01,2023-01-02 (a new line)
77,1,2023-01-01,2023-01-03 (a new line)

Simple Output: 

Project ID Employee ID #1 Employee ID #2 Days Worked Together (a new line)
1          77             76             3
