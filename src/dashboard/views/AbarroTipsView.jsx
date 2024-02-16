import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/posts/Post";
import { AbarroTipsForm } from "../forms/AbarrotipsForm";
import { CreateBox } from "../components/";

import { Posts } from "../components/posts/Posts";
import { Alert } from "@mui/material";
import { createNewPost } from "../../store/slices/postSlice/thunks";

export const AbarroTipsView = () => {
  const { activePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(createNewPost());
  };
  return (
    <>
      {!!activePost ? (
        <>
          <AbarroTipsForm />
          <Post post={activePost}/>
        </>
      ) : (
        <CreateBox title="Crear un Nuevo Abarrotip" onClick={onClick} />
      )}
      <Posts />
    </>
  );
};
