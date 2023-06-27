const { useEffect, useState } = wp.element;

import axios from 'axios';
import { onValue, ref } from 'firebase/database';
import QRCode from 'react-qr-code';
import realTimeDB from '../../index.js';

const Paymentsbp = ( { amount, program } ) => {

    const isMobile = () =>  {
        return window.matchMedia("(any-pointer:coarse)").matches;
    }

    const [paymentStage, setPaymentStage] = useState('qrRequested'); // useState('qrRecieved'); 
    const [paymentLink, setPaymentLink] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [showQR, setShowQR] = useState(!isMobile());

    useEffect(() => {
        createPayment();
        //console.log('program: ',program);
    },[]);

    const createPayment = () => {
            axios.post('/payment/sbp/create', { program_id: program.id, firebase_id: program.firebase_id, amount: amount })
            .then((response) => {
                console.log('RESPONSE: ', response.data);
                if(response.data.status=='ok' 
                && response.data.bank_response.error_code === '000000' 
                && +response.data.order_number !== NaN
                && +response.data.order_number > 0) {
                    setPaymentLink(response.data.bank_response.order_form_url);
                    setPaymentStage('qrReceived');
                    setOrderNumber(response.data.order_number);
                    const paymentRef = ref(realTimeDB, 'payments/'+response.data.order_number+'/status');
                    if(paymentRef){
                        onValue(paymentRef, (snapshot) => {
                            console.log('SNAPSHOT: ', snapshot.val());
                            if(snapshot.val()=='PAID') { setPaymentStage('paymentSuccess'); } 
                            if(snapshot.val()=='DECLINED') { setPaymentStage('paymentDeclined'); }
                        });
                    }
                }
                else {
                    setPaymentStage('paymentFailure');
                }
                // setPaymentStage('paymentSuccess');
            }, (response) => { 
                console.log( 'error!'); 
                setPaymentStage('paymentFailure');
            });
    }

    const notifyMockup = () => {
            axios.post('/payment/qr/notify', { 
                rqUid: 'test',
                rqTm: '2022-10-31T10:53:01Z',
                operationDateTime: '2022-11-29T10:11:27Z',
                partnerOrderNumber: this.orderNumber, 
                sbpOperationParams: 'some params',
                orderState: 'PAID', 
                operationSum: amount*100,
             })     
            .then((response) => {
                console.log('Notify mockup request response: ', response.data);
                //setPaymentStage('paymentSuccess');
            }, (response) => { 
                console.log( 'Notify mockup request ERROR response: ', response.data); 
            });
    }

    return (
        <>
        <div className="payment_content">
            { paymentStage == 'qrRequested' && 
                <>
                
                <div>
                    <div className="main_text">Перечисление { amount }&nbsp;&#8381; в качестве пожертвования<br/>в адрес Программы&nbsp;№{ program.id }</div>
                    <div className="payment_title">«{ program.title }»</div>
                </div>
                <div className="qr_placeholder">
                    <div className="main_text preloader">Запрос...</div> 
                </div>
                </>
            }
            { /* paymentStage == 'qrReceived' && 
                <>
                <div>
                    <div className="main_text">Перечисление { amount }&nbsp;&#8381; в качестве пожертвования<br/>в адрес Программы&nbsp;№{ program.id }</div>
                    <div className="payment_title">«{ program.title }»</div>
                </div>
                <div className="qr_placeholder">
                <div className="qr_block">
                    <div className="qr_code">
                        <QRCode
                            size = {256}
                            style = {{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value = { paymentLink }
                            viewBox = { `0 0 256 256` }
                        />
                    </div>
                    {/* <div className="main_text">Это - тестовая версия. Банковский сервис быстрой оплаты еще не подключен, считывать код не имеет смысла. 
                    Однако можно имитировать оплату, нажав на кнопку ниже.</div> *}
                    <div className="main_text">Это QR-код системы быстрых платежей. Считайте его и перейдите в приложение банка, или считайте сразу приложением банка.</div>
                    {/* <div className="emulation_button" onClick={ notifyMockup }>Имитировать оплату</div>   *}
                </div>
                </div>
                </>
            */ }
            { paymentStage == 'qrReceived' && 
                <>
                <div>
                    <div className="main_text">Перечисление { amount }&nbsp;&#8381; в качестве пожертвования<br/>в адрес Программы&nbsp;№{ program.id }</div>
                    <div className="payment_title">«{ program.title }»</div>
                </div>
                <div className="qr_placeholder">
                    { !showQR &&
                        <div className="qr_block">
                            <div className="mob_pay_block">
                                {/* <div className="mob_pay_button" onClick={ notifyMockup }>Перечислить</div> */}
                                <a href= { paymentLink } rel="external" target="_system"><div className="mob_pay_button">Перечислить</div></a>
                            </div>
                            {/* <div className="main_text mob">
                                Нажмите и перейдите в приложение банка для оплаты через систему быстрых платежей. 
                                Нажмите <div onClick={ () => { setShowQR(true) } }>Показать QR-код</div> если хотите оплатить с другого устройства.
                            </div> */}
                            <div className="main_text mob">
                                <div onClick={ () => { setShowQR(true) } }>Показать QR-код</div>
                                <span>Если хотите оплатить с другого устройства,
                                нажмите «Показать QR-код», считайте его камерой и проведите платёж.</span>
                            </div>
                        </div>
                    }
                    { showQR &&
                        <div className="qr_block">
                            <div className="qr_code">
                                <QRCode
                                    size = {256}
                                    style = {{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value = { paymentLink }
                                    viewBox = { `0 0 256 256` }
                                />
                            </div>
                            <div className="main_text">Это QR-код системы быстрых платежей. Считайте его и перейдите в приложение банка, или считайте сразу приложением банка.</div>
                        </div>
                    }
                </div>
                </>
            }
            { paymentStage == 'paymentSuccess' &&
                <>
                <div className="qr_placeholder">
                    <div className="payment_title">Спасибо!<br />Платёж прошел успешно.</div> 
                </div>
                </>
            }
            { paymentStage == 'paymentFailure' &&
                <>
                <div className="qr_placeholder">
                    <div className="payment_title">
                        Ошибка!<br />
                        <span><br />К сожалению,<br />возникли проблемы<br />при осуществлении<br />платежа.</span>
                    </div> 
                </div>
                </>
            }
            { paymentStage == 'paymentDeclined' &&
                <>
                <div className="qr_placeholder">
                    <div className="payment_title">
                        Платёж не прошел!<br />
                        <span><br />К сожалению,<br />платёж отклонен банком.<br />Возможно, недостаточно<br />средств на счету.</span>
                    </div> 
                </div>
                </>
            }

        </div>
        </>
    );
};

export default Paymentsbp;