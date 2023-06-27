const Frame = (props) => {
    const photoStyle = { backgroundImage: 'url('+props.program.image_h+')' };
    let percentage = Math.floor(props.program.got * 100 / props.program.target);
    const progressStyle = { width: percentage < 100 ? ( percentage > 3 ? percentage+'%' : '3%' ) : '100%' };
    const buttonClick = async() => {
        console.log('click '+ props.program.id);
        const docRef = doc(fbdb, "programs", "Qpv1wR0rFLllGKNpEleq");
        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, {
            got: props.program.got + 100
        });
    };
    return (
        <div className="frame">
            <div className="frame_article">
                <div className="frame_info_block">
                    <div className="title">{ props.program.title }</div>
                    <div className="text">{ props.program.text }</div>
                </div>
                <div className="frame_percent_block">{ percentage }%<span> собрано</span></div>
                <div className="frame_progress_block">
                    <div className="indicator"><div className="progress" style={ progressStyle }></div></div>
                    <div className="numbers"><div>{ props.program.got }&nbsp;р.</div><div>{ props.program.target }&nbsp;р.</div></div>
				</div>
            </div>
            <div className="image" style={photoStyle}></div>
            <a className="curtain" href={ props.program.permalink }></a>
        </div>
    );
}

export default Frame;