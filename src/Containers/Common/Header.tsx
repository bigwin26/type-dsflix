import React, { useCallback } from "react";
import Header from "Components/Common/Header";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import { modalState } from "modules/modal";

export default withRouter(({ location: { pathname } }) => {
  const dispatch = useDispatch();
  const { state } = useSelector(({ modal }: RootState) => ({
    state: modal.modal_state,
  }));

  const onClick = useCallback(() => {
    dispatch(modalState(true));
  }, [dispatch]);

  return <Header pathname={pathname} onClick={onClick} modalState={state} />;
});
