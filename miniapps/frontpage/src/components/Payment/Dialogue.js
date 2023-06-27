import Paymentsbp from './Paymentsbp';
// import Paymenttest from './Paymentest';
const { useState, useEffect } = wp.element;

const Dialogue = ({ program, showDialogue, closeDialogue }) => {

    const isMobile = () =>  {
        return window.matchMedia("(any-pointer:coarse)").matches;
    }

    const [amount, setAmount] = useState(500);
    const [step, setStep] = useState(1); // (3);
    const [selectorSelected, setSelectorSelected] = useState(false);

    const changeAmountByClick = (newAmount) => {
        setAmount(newAmount);
    }

    const changeAmountByInput = (newAmount) => {
        if(newAmount && parseInt(newAmount)>0 && parseInt(newAmount)<=50000) setAmount(Math.floor(newAmount))
        else console.log(newAmount);
    }

    const resetAndCloseDialogue = () => {
        setStep(1);
        setAmount(500);
        setSelectorSelected(false);
        closeDialogue();
    }

    if(!showDialogue) return null;
    return (
        <div className="dialogue">
            <div>
                <div className="lining"></div>
                <div className="box">
                    { step==1 && 
                        <>
                        <div className="content">
                            <div className="main_text">Вы намерены внести пожертвование<br/>в адрес Программы&nbsp;№{ program.id }</div>
                            <div className="main_text pay_title">«{ program.title }»</div>
                            <div className="main_text">Укажите сумму пожертвования</div>
                            <div className="selected_amount">{ amount }<span>&nbsp;&#8381;</span></div>
                            <div className="amount_buttons_block">
                                <div className="amount_button" onClick={ ()=>changeAmountByClick(100) }>100&nbsp;&#8381;</div>
                                <div className="amount_button" onClick={ ()=>changeAmountByClick(200) }>200&nbsp;&#8381;</div>
                                <div className="amount_button" onClick={ ()=>changeAmountByClick(1000) }>1000&nbsp;&#8381;</div>
                                <div className="amount_button" onClick={ ()=>changeAmountByClick(5000) }>5000&nbsp;&#8381;</div>
                            </div>
                            <div className="input_block pay_block">
                                <div className="label">Другая сумма</div>
                                <input type="number" step="100" min="100" value={ amount } onChange={ (e)=>changeAmountByInput(e.target.value) } />
                            </div>
                        </div>
                        <div className="buttons_block">
                            <div className="d_button cancel" onClick={ resetAndCloseDialogue }>Отменить</div>
                            <div className="d_button ok" onClick={ ()=>setStep(2) }>Далее</div>
                        </div>
                        </>
                    }
                    { step==2 && 
                        <>
                        <div className="content">
                            <div>
                                <div className="main_text">Вы намерены внести</div>
                                <div className="selected_amount">{ amount }<span>&nbsp;&#8381;</span></div>
                                <div className="main_text">в адрес Программы&nbsp;№{ program.id }</div> 
                            </div>
                            { !isMobile() &&
                                <>
                                <div className="main_text">Нажмите «Перечислить», и вы увидите QR-код системы быстрых платежей. Выберите в 
                                мобильном приложении вашего банка раздел оплаты по QR-коду, считайие код и подтвердите оплату.</div>
                                <div className="qr_img"></div>
                                </>
                            }
                            { isMobile() &&
                                <>
                                <div className="main_text mob">Примите условия оферты, нажмите «Продолжить», и вы увидите кнопку оплаты через
                                систему быстрых платежей, которая перенаправит вас в приложение банка.</div>
                                </>
                            }
                            <div className="selector_block" onClick={ () => setSelectorSelected(selectorSelected ? false :true )}>
                                <div className={ `selector ${selectorSelected ? 'on' : 'off'}` } ></div>
                                <div className="selector_text">Я принимаю условия публичной оферты и ознакомлен с политикой обработки персональных данных.</div>
                            </div>
                        </div>
                        <div className="buttons_block">
                            <div className="d_button cancel" onClick={ ()=>setStep(1) }>Назад</div>
                            <div className={ `d_button ${selectorSelected ? 'ok' : 'cancel'}` } onClick={ ()=>{ if(selectorSelected)setStep(3) } }>Продолжить</div>
                        </div>
                        </>
                    }
                    { step==3 && 
                        <>
                        <Paymentsbp amount={ amount } program={ program } />
                        {/* <Paymenttest amount={ amount } program={ program } /> */}
                        <div className="buttons_block">
                            <div className="d_button ok" onClick={ resetAndCloseDialogue }>Закрыть</div>
                        </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );

};

export default Dialogue;