function GetInputOrSpan({ isInEdit, setIsInEdit, type, overTime, setOverTime, setRenderApp, setListDaySalary }) {
    let [inputText, setInputText] = useState(type == 'hours' ? overTime.hours : overTime.minutes);
    let ref = useRef();
    let timeUnit = type == 'hours' ? 'Tiếng' : 'Phút';

    function handleOnChange(e) {
        setInputText(e.target.value);
        setRenderApp(pre => !pre);

        if(timeUnit == 'Tiếng') {
            setOverTime(pre => {
                let newOverTime = {
                    ...pre,
                    hours : +e.target.value
                };
                return newOverTime;
            })
        } else {
            setOverTime(pre => {
                return {
                    ...pre,
                    minutes : +e.target.value
                }
            })
        }
    }

    function handleKeyDown(e) {
        if(e.key == "Enter") {
            setIsInEdit(!isInEdit)
        }
    }


    let inputStyle = {
        maxWidth:'20%',padding : '5px',border : `1px solid #ccc`, borderRadius : '5px',
        backgroundColor : 'white'

    }

    let spanStyle = {
        padding : '5px', border : `1px solid #ccc`, borderRadius : '5px', cursor : 'pointer',
        fontWeight: '550',
        backgroundColor : 'white'
    }

    let inputElemnt = <input size="5" style={inputStyle} onKeyDown={handleKeyDown} autoFocus ref={ref} onBlur={() => { setIsInEdit(!isInEdit) }} onChange={e => handleOnChange(e)} className="input-hours-work" type="number" value={inputText} />;
    let spanElement = <span style={spanStyle} onClick={() => { setIsInEdit(!isInEdit) }}>{`${inputText} ${timeUnit}`}</span>;

    if (isInEdit)
        return (inputElemnt);
    else return (spanElement);
}

function SpanWithInput({ type, overTime, setOverTime, setRenderApp, setListDaySalary}) {
    let [isInEdit, setIsInEdit] = useState(false);
    return (
        <div>
            <GetInputOrSpan setListDaySalary={setListDaySalary} setRenderApp={setRenderApp} setOverTime={setOverTime} overTime={overTime} type={type} setIsInEdit={setIsInEdit} isInEdit={isInEdit} />
        </div>
    )
}