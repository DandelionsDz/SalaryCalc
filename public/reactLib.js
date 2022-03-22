const useState = React.useState;
const useRef = React.useRef;
const useEffect = React.useEffect;
const useLayoutEffect = React.useLayoutEffect;
const useMemo = React.useMemo;
const useCallback = React.useCallback;
const useContext = React.useContext;
const baseURL = "http://localhost";

function getTextValue(e) {
    return e.target.value;
}

function getDate() {
    return new Date().getDate();
}

function getMonth() {
    return new Date().getMonth();
}

function getDayFormat(inOrderDay) {
    return `Ngày thứ ${inOrderDay} (Ngày ${getDate()} Tháng ${getMonth()})`
}

function checkIsOverTime(overTime) {
    if (overTime.hours > 8 && overTime.minutes == 0) return (overTime.hours - 8) + ' tiếng tăng ca';
    if (overTime.hours >= 8 && overTime.minutes > 0) return (overTime.hours - 8) + ' tiếng ' + overTime.minutes + ' phút tăng ca';

    return 'Không tăng ca';
}

function calcSalary(overTime) {

    let baseSalary = 0;

    if (checkIsOverTime(overTime) == 'Không tăng ca') {
        baseSalary = overTime.hours * 18750;
        baseSalary += ((overTime.minutes) / 60) * 18750;
    } else {

        //base
        baseSalary = 8 * 18750;

        //overTime
        baseSalary += (overTime.hours - 8) * 25000;
        baseSalary += ((overTime.minutes) / 60) * 25000;
    }


    let baseSalaryString = new String(baseSalary);

    if (baseSalary > 100000) {
        return (baseSalaryString.slice(0, 3) + ' Ngàn ' + Math.floor(baseSalaryString.slice(3)) + ' Đồng').replace('000 Đồng', '');
    } else {
        return (baseSalaryString.slice(0, 2) + ' Ngàn ' + Math.floor(baseSalaryString.slice(2)) + ' Đồng').replace('000 Đồng', '');
    }

}

function calcSalaryMilionFormat(salaryValue) {
    console.log(salaryValue);
    let salaryMilionUnit = Math.floor(salaryValue / 1000000);
    let baseSalaryString = new String(salaryValue - (salaryMilionUnit * 1000000));
    let salaryThoundsandUnit = 0;

    if (+baseSalaryString >= 100000) {
        salaryThoundsandUnit = (baseSalaryString.slice(0, 3) + ' Ngàn ' + Math.floor(baseSalaryString.slice(3)) + ' Đồng').replace('000 Đồng', '');
    } else if(+baseSalaryString >= 10000) {
        salaryThoundsandUnit = (baseSalaryString.slice(0, 2) + ' Ngàn ' + Math.floor(baseSalaryString.slice(2)) + ' Đồng').replace('000 Đồng', '');
    } else if(+baseSalaryString >= 1000) {
        salaryThoundsandUnit = (baseSalaryString.slice(0, 1) + ' Ngàn ' + Math.floor(baseSalaryString.slice(1)) + ' Đồng').replace('000 Đồng', '');
    } else {
        salaryThoundsandUnit = (Math.floor(baseSalaryString.slice(0)) + ' Đồng');
    }

    return (salaryMilionUnit + ' Triệu ' + salaryThoundsandUnit).replace('0 Triệu', '').replace(' 0 Đồng', '');
}

