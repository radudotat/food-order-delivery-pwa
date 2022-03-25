import { css } from '@emotion/react';
// import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Button } from 'react-scroll';

export const wrapper = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  outline: 0;
`;

export const backdrop = css`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

export const styledModal = css`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-radius: 8px;
`;

export const header = css`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
`;

export const headerText = css`
  color: #fff;
  align-self: center;
  color: lightgray;
`;

export const closeButton = css`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`;

export const content = css`
  padding: 10px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

type Props = {
  isShown: boolean;
  hide?: () => void;
  modalContent?: JSX.Element;
  headerText?: string;
};

const ModalAuth = (props: Props) => {
  const modal = (
    <Modal isOpen={props.isShown} contentLabel="Example Modal">
      <div css={wrapper}>
        <div css={backdrop}>
          <header css={header}>
            <h1 css={headerText}>{props.headerText}</h1>
            <Button css={closeButton} onClick={props.hide} to="">
              X
            </Button>
          </header>
          <div css={content}>{props.modalContent}</div>
        </div>
      </div>
    </Modal>
  );

  return props.isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default ModalAuth;
