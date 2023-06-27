const { useState, useEffect } = wp.element;

import Widget from './components/Payment/Widget';

const Apppayment = () => {

    let gots = [];
    const [programs, setPrograms] = useState(jsonProgs);

    useEffect(() => {    // console.log('getProgram: ',getProgram());
        document.addEventListener('rtdbsnapshot', (e) => {
            gots = e.detail.gots;
            updateStateOnValue();
        });
     }, [])

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
        // console.log('update state PROGRAMS: ', programs);
    };

    const getProgram = () => {
        let p = null;
        if(thisProgramId) {
            programs.forEach((program) => {
                if ( Number(program.id) == thisProgramId ) p = program;
            });
        }
        return p;
    };

    return (
        <>
            <Widget program={ getProgram() } />
        </>
    );
}

export default Apppayment;