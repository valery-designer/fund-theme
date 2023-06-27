'use strict';

const e = wp.element.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}




// wp.element.render(
//     e(LikeButton),
//     document.getElementById( 'miniapp1' )
// );

