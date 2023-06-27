const { useState, useEffect } = wp.element;

import Proglist from './components/Proglist/Proglist';

const Appproglist = () => {

    let gots = [];
    const [programs, setPrograms] = useState(jsonProgs);    

    useEffect(() => {
        document.addEventListener('rtdbsnapshot', (e) => {
            gots = e.detail.gots;
            updateStateOnValue();
            console.log('appproglist PROGRAMS: ', programs);
        });
     }, []);

    const getGot = (programId) => {
        let got = null;
        gots.forEach((g) => {
            if (g.programId == programId) {
                got = { rtdbId: g.rtdbId, got: Number(g.got) };
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
    };

    return (
        <>
            <Proglist programs={programs} />
        </>
    );
}

export default Appproglist;