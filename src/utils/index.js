const getHours = (startDate, endDate) => {
    const finalDate = endDate === "NULL" ? Date.now() : endDate;
    const diffTime = new Date(finalDate).getTime() - new Date(startDate).getTime();
    return diffTime / (1000 * 3600);
};

const groupByProject = (data) => (
    data.reduce((acc, { DateFrom, DateTo, EmpID, ProjectID }) => {
        acc[ProjectID] = acc[ProjectID] || { employees: [] }
        const hours = getHours(DateFrom, DateTo);
        acc[ProjectID].employees.push({ empID: EmpID, hoursWorked: hours });
        return acc;
    }, {})
);

const filterData = (data) => {
    let editedData = {}
    Object.keys(data).forEach(key => {
        if (data[key].employees.length > 1) {
            const sortedEmployees = data[key].employees.sort((emp1, emp2) => emp2.hoursWorked - emp1.hoursWorked);
            // If you don't have this key initialize it
            editedData[key] = editedData[key] || [];
            // To take only the first two worked the most => slice(0, 2)) 
            editedData[key].push(...sortedEmployees.slice(0, 2));
        }
    });
    return editedData;
};

const getUIData = (filteredProjects) => (
    Object.keys(filteredProjects)
        .reduce((result, key) => {
            // By condition, we should always show the 2 most worked
            const { empID: emp1ID, hoursWorked: emp1HoursWorked } = filteredProjects[key][0];
            const { empID: emp2ID, hoursWorked: emp2HoursWorked } = filteredProjects[key][1];
            const totalDays = Math.ceil((emp1HoursWorked + emp2HoursWorked) / 24);
            result.push({
                projectID: key,
                employee1: emp1ID,
                employee2: emp2ID,
                totalDays: totalDays
            });
            return result;
        }, [])
);

export const parseData = (fileData) => {
    const projectGroups = groupByProject(fileData);
    const filteredProjects = filterData(projectGroups);
    const uiData = getUIData(filteredProjects);
    return uiData;
};