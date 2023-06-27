const { useState, useEffect } = wp.element;
import Dialogue from "./Dialogue";

const Widget = ( { program } ) => {

    const [showDialogue, setShowDialogue] = useState(false);

    let percentage = Math.floor(program.got * 100 / program.target);
    const progressStyle = { width: percentage < 100 ? ( percentage > 3 ? percentage+'%' : '3%' ) : '100%' };

    const openDialogue = () => { setShowDialogue(true); }
    const closeDialogue = () => { setShowDialogue(false); }



    return (
        <>
            <div className="progress_block">
                <div className="indicator"><div className="progress" style={ progressStyle }></div></div>
                <div className="numbers"><div>{ program.got } р.</div><div>{ program.target } р.</div></div>
            </div>
            <div className="help_button" onClick={ openDialogue }>Помочь</div>
            <Dialogue program={ program } showDialogue = { showDialogue } closeDialogue = { closeDialogue.bind(this) }  />
        </>
    );
}

export default Widget;
