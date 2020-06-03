import ReactDOM from "react-dom";

type IModal = {
  children: React.ReactNode;
};

function ModalPortal({ children }: IModal) {
  const el = document.getElementById("modal") as HTMLElement;
  return ReactDOM.createPortal(children, el);
}

export default ModalPortal;
