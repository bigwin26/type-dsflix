/* eslint-disable no-restricted-globals */
import React, { useCallback, useEffect, useState } from "react";
import Modal from "Components/Common/Modal";
import { useDispatch } from "react-redux";
import { modalState } from "modules/modal";

export default () => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("");

  const onClick = useCallback((event: React.MouseEvent) => {
    const language = event.currentTarget.id;
    if (language === "korea") {
      localStorage.setItem("language", "ko");
      setLanguage("ko");
    } else if (language === "english") {
      localStorage.setItem("language", "en-US");
      setLanguage("en-US");
    } else return;
  }, []);

  const onClose = useCallback(() => {
    dispatch(modalState(false));
  }, [dispatch]);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language !== null) {
      setLanguage(language);
    }
    return () => {
      if (language !== localStorage.getItem("language")) {
        location.reload();
      }
    };
  }, []);

  return <Modal onClick={onClick} onClose={onClose} language={language} />;
};
