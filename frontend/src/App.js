import React, { useState, createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SpotPage from "./components/SpotPage"
import SpotForm from "./components/SpotForm"
import ReactDOM from "react-dom";
import PostReviewForm from "./components/PostReviewForm";
import DeleteSpotForm from "./components/DeleteSpotForm";
import SpotCard from "./components/SpotCard";

function ModalPortal() {
  const {modal, handleModal, modalContent} = useContext(ModalContext);
  return modal
    ? ReactDOM.createPortal(
      <div id="modal-container">
      <div id="modal-overlay" onClick={() => handleModal()}></div>
      <div id="modal-content">{modalContent}</div>
      </div>, document.getElementById("portal-root"))
    : null;
};

function useModal() {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("Stuff in here.");
  const handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };
  return {modal, handleModal, modalContent};
}

const ModalContext = createContext();
const ModalProvider = ({children}) => {
  const {modal, handleModal, modalContent} = useModal();
  return (
    <ModalContext.Provider value={{modal, handleModal, modalContent}}>
      <ModalPortal/>
      {children}
    </ModalContext.Provider>
  );
};
// const ComponentEx = () => {
//   return (<div><h1>Hello world</h1></div>);
// }

// export const ComponentY = () => {
//   return (<div><h1>YO world</h1></div>);
// }


export const ModalBtn = ({ type, spot }) => {
let res;
let text;
  if(type === 'post_review') {
    res = <PostReviewForm spot={spot}></PostReviewForm>
    text = 'Post Your Review';
  }
  else if (type === 'delete_spot') {
    res = <DeleteSpotForm></DeleteSpotForm>
    text = 'Delete';

  }

  // let res = <ComponentEx></ComponentEx>

  const {handleModal} = useContext(ModalContext);
  return (<button onClick={() => handleModal(res)}>{text}</button>);
};




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/spots/new">
              <SpotForm />
            </Route>
            <Route path="/spots/:spotId">
              <SpotPage />
            </Route>
          </Switch>
        )}
      </ModalProvider>
    </>
  );
}

export const useAModal = () => useContext(ModalContext);

export default App;
