
function DaySalary({data,index, setRenderApp, setListDaySalary}) {

    let [overTime, setOverTime] = useState(data);

    useEffect(() => {

        let baseSalary = 0;
        let salaryText = '';

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
            salaryText = (baseSalaryString.slice(0, 3) + ' Ngàn ' + Math.floor(baseSalaryString.slice(3)) + ' Đồng').replace('000 Đồng', '');
        } else {
            salaryText = (baseSalaryString.slice(0, 2) + ' Ngàn ' + Math.floor(baseSalaryString.slice(2)) + ' Đồng').replace('000 Đồng', '');
        }

        if(overTime.salary != salaryText) {
            setOverTime((prev) => {
                //SaveToLocalStorage

                let signleDaySalaryList = JSON.parse(localStorage.getItem('listDaySalary'))

                signleDaySalaryList[index] = {
                    ...prev,
                    status : checkIsOverTime(prev),
                    salary : salaryText,
                    salaryNumber : baseSalary
                };

                localStorage.setItem('listDaySalary', JSON.stringify(signleDaySalaryList))
                setListDaySalary(JSON.parse(localStorage.getItem('listDaySalary')))

                //ReturnNewState

                return {
                    ...prev,
                    status : checkIsOverTime(prev),
                    salary : salaryText
                }
            })
        } 

    }, [overTime])

    return (
        <div style={{ marginTop: '10px', backgroundColor : index % 2 == 0 ? 'white' : '#e9e9e9' }} className="show-daysalary-box">
            <div className="center-with-flex">
                <div className="input-time-form center-with-flex">
                    <div className="input-hours-form">
                        <SpanWithInput setListDaySalary={setListDaySalary} setRenderApp={setRenderApp} setOverTime={setOverTime} overTime={overTime} type="hours" />
                    </div>
                    <div className="input-minutes-form">
                        <SpanWithInput setListDaySalary={setListDaySalary} setRenderApp={setRenderApp}  setOverTime={setOverTime} overTime={overTime} type="minutes" />
                    </div></div>
                <span style={{ color: 'green' }} className="center-with-flex single-daysalary">
                    <i style={{ color: 'green', marginRight: '10px' }} class="fa fa-money" aria-hidden="true"></i>
                    {calcSalary(overTime)}
                </span>
            </div>

            <div style={{ fontStyle: 'italic', marginTop: '10px' }}><span>{`${overTime.status}`}</span></div>
            <div style={{ fontStyle: 'italic', marginTop: '10px' }}><span style={{ textShadow: '0 0 5px rgb(21 217 41)' }}>{overTime.day}</span></div>
        </div>
    )
}