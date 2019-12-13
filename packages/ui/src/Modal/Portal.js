
import React from 'react';
import { createPortal } from 'react-dom';

class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.container = document.createElement('div');
  }

  componentDidMount() {
    this.createContainer();
  }

  componentWillUnmount() {
    this.removeContainer();
  }

  createContainer() {
    const { container } = this.props;
    (container || document.body).appendChild(this.container);
  }

  removeContainer() {
    this.container.parentNode.removeChild(this.container);
  }

  render() {
    const { children } = this.props;
    return createPortal(
      children,
      this.container,
    );
  }
}

export default Portal;
