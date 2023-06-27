const { useState, useEffect } = wp.element;

import Frame from '../../components/Frame/Frame';



const Slider = (props) => {
    
    let curSl = 1; 
    let nextSl = 1;
    let helpers = {
      helper:0,
      interval: 999,
    }
    const [currentSlide, setCurrentSlide] = useState(1);
    const numberOfSlides = props.programs.length;
    const moveSlideLeft = () => { 
      let nextSl = currentSlide == numberOfSlides ? 1 : currentSlide + 1;
      setCurrentSlide(nextSl);
    };
    const moveSlideRight = () => {
      let nextSl = currentSlide == 1 ? numberOfSlides : currentSlide - 1;
      setCurrentSlide(nextSl);
    };
    const startRotation = () => { 
      helpers.interval = setInterval(() => {
          nextSl = curSl == numberOfSlides ? 1 : curSl + 1;
          setCurrentSlide(nextSl); 
          curSl = nextSl;
          }, 5000);
          // console.log('startRotation helpers: ', helpers);
      };
    const stopRotation = () => { //console.log('stopRotation helpers: ', helpers);
      clearInterval(helpers.interval);
    };
    useEffect(() => {
        startRotation();
        return stopRotation;
     }, [])
    const sliderShiftStyle = { transform: 'translateX(-' + (currentSlide-1)*100 + '%)' };
    return (
      <>
        <div className="slider_block">
          <div className="stator">
            <div className="the_slider" style={ sliderShiftStyle }>
              { props.programs.map((program) => (
                <Frame program={program} key={program.id} />
              )) }
            </div>
          </div>
          <div className="button left" onClick={moveSlideLeft}></div>
          <div className="button right" onClick={moveSlideRight}></div>
          {/* <div dangerouslySetInnerHTML={{__html:w}} /> */}
        </div>
      </>
    );
  };

  export default Slider;