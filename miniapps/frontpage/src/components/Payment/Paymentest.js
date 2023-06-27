const { useEffect, useState } = wp.element;

import axios from 'axios';
import QRCode from 'react-qr-code';


const Paymenttest = ( { amount, program } ) => {

    const [paymentStage, setPaymentStage] = useState('qrRequested');
    const [paymentLink, setPaymentLink] = useState('');

    // useEffect(() => {
    //     sendRaznotest();
    // },[]);

    const sendRaznotest = () => {
            axios.post('/raznotest', { program_id: program.id, firebase_id: program.firebase_id, amount: amount })
            .then((response) => {
                console.log('DATA: ', response.data);
                // console.log('Response: ', response.data.respond);
                setoHtml('data:text/html,'+response.data);
                // setPaymentStage('paymentSuccess');
            }, (response) => { 
                console.log( 'error!'); 
            });
    }

    const notifyMockup = () => {
            axios.post('/payment/sbp/notify', { program_id: program.id, firebase_id: program.firebase_id, amount: amount }).then((response) => {
                console.log('WERA! ', response.data);
                setPaymentStage('paymentSuccess');
            }, (response) => {
                console.log( 'error: ',response.statusText);
            });
    }

    //const oHtml = "data:text/html,<p>Some O! HTML</p>";

    return (
        <>
        <div className="raznotest_content">
            { paymentStage == 'qrRequested' && 
                <>
                    <div className='iframe_zaeframe'>
                        <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value='https://qr.nspk.ru/AD10001BJPGUR9P18FHR8H8QLFMLV8SH?type=02&bank=100000000111&sum=3&cur=RUB&crc=1ABE'
                        viewBox={`0 0 256 256`}
                        />
                    </div>              
                </>
            }
            { paymentStage == 'qrReceived' &&
                <>
                <div>
                    <div className="main_text">Перечисление { amount }&nbsp;&#8381; в качестве пожертвования<br/>в адрес Программы&nbsp;№{ program.id }</div>
                    <div className="payment_title">«{ program.title }»</div>
                </div>
                <div className="qr_placeholder">
                <div className="qr_block">
                    <div className="qr_code">
                        <QRCode
                        size = { 256 }
                        style ={ { height: "auto", maxWidth: "100%", width: "100%" } }
                        value = { paymentLink }
                        viewBox = { `0 0 256 256` }
                        />
                    </div>
                    <div className="main_text">Это - тестовая версия. Банковский сервис быстрой оплаты еще не подключен, считывать код не имеет смысла. 
                    Однако можно имитировать оплату, нажав на кнопку ниже.</div>
                    <div className="emulation_button" onClick={ notifyMockup }>Имитировать оплату</div>  
                </div>
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
        </div>
        </>
    );
};

export default Paymenttest;