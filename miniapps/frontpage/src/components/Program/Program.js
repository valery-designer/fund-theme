const Program = ({ program }) => {
    const photoStyle = { backgroundImage: 'url('+program.image_v+')' };
    let percentage = Math.floor(program.got * 100 / program.target);
    const progressStyle = { width: percentage < 100 ? ( percentage > 3 ? percentage+'%' : '3%' ) : '100%' };
    return (
        <div className="program_front_block" style={ photoStyle }>
            <div className="curtain"></div>
            <div className="program_number_block">№&nbsp;0{ program.id }</div>
            <div className="program_info_block">
                <div className="title">{ program.title }</div>
                <div className="text">{ program.text }</div>
            </div>
            <div className="program_progress_block">
                <div className="indicator"><div className="progress" style={ progressStyle }></div></div>
                <div className="numbers"><div>{ program.got }&nbsp;р.</div><div>{ program.target }&nbsp;р.</div></div>
            </div>
            <a className="a_curtain" href={ program.permalink }></a>
        </div>
    );
}

export default Program;
