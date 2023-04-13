import React, { useState, createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SpotPage from "./components/SpotPage"
import SpotForm from "./components/SpotForm"
import ReactDOM from "react-dom";
import PostReviewForm from "./components/PostReviewForm";
import DeleteSpotForm from "./components/DeleteSpotForm";
import UpdateSpotPage from "./components/UpdateSpotPage";
import DeleteReviewForm from "./components/DeletereviewForm";
// import SpotCard from "./components/SpotCard";
import ManageSpotsPage from './components/ManageSpotsPage'

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


export const ModalBtn = ({ type, spot, review }) => {
let res;
let text;
  if(type === 'post_review') {
    res = <PostReviewForm spot={spot}></PostReviewForm>
    text = 'Post Your Review';
  }
  else if (type === 'delete_spot') {
    res = <DeleteSpotForm spot={spot}></DeleteSpotForm>
    text = 'Delete';

  }
  else if (type === 'delete_review') {
    res = <DeleteReviewForm review={review}></DeleteReviewForm>
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
              <HomePage />
            </Route>
            <Route exact path="/spots/new">
              <SpotForm action={spotActions.createOneSpot}/>
            </Route>
            <Route path="/spots/current">
              <ManageSpotsPage />
            </Route>
            <Route path="/spots/:spotId/edit">
              <UpdateSpotPage />
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
