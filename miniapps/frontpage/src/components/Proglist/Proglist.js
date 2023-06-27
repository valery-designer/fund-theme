const { useState, useEffect } = wp.element;

import Program from '../../components/Program/Program';



const Proglist = (props) => {
    

    const [currentSlide, setCurrentSlide] = useState(1);
    const numberOfSlides = props.programs.length;
    // useEffect(() => {
    //     startRotation();
    //     return stopRotation;
    //  }, [])
    return (
      <>
        <div className="front_section_content_block">
              { props.programs.map((program) => (
                <Program program={program} key={program.id} />
              )) }
        </div>
      </>
    );
  };

  export default Proglist;

