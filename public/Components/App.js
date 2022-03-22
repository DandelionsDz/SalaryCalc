function calcAllMonthSalary(lists) {

    let salary = 0;

    lists.map((signle, index) => {
        salary+=signle.salaryNumber;
    })

    return calcSalaryMilionFormat(salary);

}

function calcAllMonthOverTime(lists) {
    let hours = 0;
    let minutes = 0;

    lists.map((value, index) => {
        if(value.hours > 8 || (value.hours == 8 && value.minutes > 0)) {
            hours +=(value.hours - 8);
            minutes +=value.minutes;
        }
    })

    if (minutes >= 60) {
        hours += Math.floor((minutes / 60));
        minutes = minutes - (Math.floor((minutes / 60)) * 60)
    }

    return ` ${hours} tiếng ${minutes} phút tăng ca`;
}
function App() {
    let [listDaySalary, setListDaySalary] = useState(JSON.parse(localStorage.getItem('listDaySalary')) || []);
    let [renderApp, setRenderApp] = useState(false);

    console.log('app render');

    let listRef = useRef();

    useEffect(() => {
        listRef.current.scrollTop = listRef.current.scrollHeight;
       
    }, [])

    function handleAddSingleSalary() {

        let signleSalary = {
            hours: 0,
            minutes: 0,
            status: 'Không tăng ca',
            day: getDayFormat(listDaySalary?.length + 1),
            salary: '0 Ngàn 0 Đồng',
            salaryNumber : 0,
        }

        setListDaySalary(prev => {
            localStorage.setItem('listDaySalary', JSON.stringify([...prev, signleSalary]))

            console.log(listDaySalary)
            return [...prev, signleSalary]
        })
    }

    function handleDelAll() {
        localStorage.setItem('listDaySalary', '[]');
        setListDaySalary([])
    }

    return (
        <div className="app center-with-flex">

            <div ref={listRef} className="list-single-daysalary">
                {listDaySalary.map((value, index) => {
                    return <DaySalary setListDaySalary={setListDaySalary} setRenderApp={setRenderApp} data={value} index={index} key={index} />
                })}
            </div>

            <div className="analatical-box center-with-flex">
                <div style={{flexDirection: 'column', paddingRight : '50px'}} className="center-with-flex">
                    <span style={{fontWeight : '600', color: 'green' }} className="center-with-flex">
                        <i style={{ fontWeight : '700',color: 'green', marginRight: '10px' }} class="fa fa-money" aria-hidden="true"></i>
                        Tiền Lương Tháng
                    </span>
                    <span style={{margin : '4px 0', fontWeight : '600'}}>
                        {calcAllMonthSalary(listDaySalary)}
                    </span>

                    <span style={{margin : '4px 0', fontWeight : '500', fontStyle:'italic'}}>
                    {calcAllMonthOverTime(listDaySalary)}
                    </span>
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                bottom: '10px',
                right: '10px'
            }}>
                <button onClick={handleAddSingleSalary} className="add-single-daysalary">
                    <i style={{ marginRight: '5px' }} class="fa fa-plus" aria-hidden="true"></i>
                    Thêm Ngày Lương
                </button>

                <button onClick={handleDelAll} className="del-all-daysalary">
                    <i style={{ marginRight: '5px' }} class="fa fa-trash" aria-hidden="true"></i>
                    Tháng Mới
                </button>
            </div>

        </div>
    )
}