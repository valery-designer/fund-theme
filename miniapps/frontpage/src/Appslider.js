const { useState, useEffect } = wp.element;

import Slider from './components/Slider/Slider';

const Appslider = () => {
    // const mockupProgs = [
    //     {
    //       id:1,
    //       title:'Тем, кто на передовой',
    //       imageH:'http://fund.loc/app/uploads/2022/06/default_program_photo_horizontal.png',
    //       text: 'Собираем деньги на рации, спальные мешки, медикаменты, чтобы помочь солдатам и офицерам на боевых позициях. Наши партнеры в регионах готовы обеспечить сбор необходимых вещей, возьмут на себя логистику, транспорт, склады, взаимодействие с таможней и доставку грузов военным республиканских союзных сил.',
    //       permalink: 'http://fund.loc/тем-кто-на-передовой',
    //       target: 1000000,
    //       firebaseId: '',
    //       got: 0,
    //     },
    //     {
    //       id:2,
    //       title:'Семье погибшего героя сержанта Джабраилова',
    //       imageH:'http://fund.loc/app/uploads/2022/06/02_h.png',
    //       text: 'Сержант Джабраилов А.М. погиб при выполнении боевого задания 15.03.2022 года.',
    //       permalink: 'http://fund.loc/семье-погибшего-героя-сержанта-джабр',
    //       target: 250000,
    //       firebaseId: '',
    //       got: 0,
    //     },
    //     {
    //       id:3,
    //       title:'Центру реабилитации',
    //       imageH:'http://fund.loc/app/uploads/2022/06/03_h.png',
    //       text: 'Строительство и оснащение центра реабилитации военнослужащих, получивших ранения при выполнении задач в ходе СВО. Цель: создать многофункциональный реабилитационный комплекс, как самодостаточную систему по реабилитации и полноценной жизни.',
    //       permalink: 'http://fund.loc/центру-реабилитации',
    //       target: 3000000,
    //       firebaseId: '',
    //       got: 0,
    //     },
    // ];

    let gots = [];
    const [programs, setPrograms] = useState(jsonProgs);    

    useEffect(() => {
        document.addEventListener('rtdbsnapshot', (e) => {
            gots = e.detail.gots;
            updateStateOnValue();
        });
     }, [])

    const getGot = (programId) => {
        let got = null;
        gots.forEach((g) => {
            if (g.programId == programId) {
                got = { rtdbId: g.id, got: Number(g.got) };
            }
        });
        return got;
    };

    const updateStateOnValue = async () => { 
        await setPrograms(programs.map((program) => {
            let gt = getGot(program.id);
            if (gt) {
                return ( { ...program, firebase_id: gt.rtdbId, got: gt.got, } ); 
            }
            else return program;
        }));
        // console.log('update state PROGRAMS: ', programs);
    };

    return (
        <>
            <Slider programs={programs} />
            {/* <div style={{ position:'absolute', top:0, left:0, width:'200px', minHeight: '100px', background:'lightgray' }}>
                    <p></p>
                    <button onClick={ updateState } >Wera</button>
            </div> */}
        </>
    );
}

export default Appslider;