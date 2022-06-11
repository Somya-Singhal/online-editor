import React, { Component } from "react";
import Modal from './Modal.js';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <div className="modal-content">
            <p>Hello, I will help you by telling some <em>SHORTCUT</em> keys that will make your work easier and faster while working on editor</p>
                <ol>
                    <li>Ctrl-Space: AutoComplete</li>
                    <li>Ctrl-/: Toggle comment</li>
                    <li>Ctrl-F: Start searching</li>
                    <li>Ctrl-G: Find next</li>
                    <li>Shift-Ctrl-G: Find previous</li>
                    <li>Shift-Ctrl-F: Replace</li>
                    <li>Shift-Ctrl-R: Replace all</li>
                    <li>Alt-G: Jump to line</li>
                </ol>
            <p>Happy Coding ;)</p>
          </div>
        </Modal>
        <button type="button" onClick={this.showModal} className="info-button">
          _userGuide();
        </button>
      </main>
    );
  }
}

export default Dashboard