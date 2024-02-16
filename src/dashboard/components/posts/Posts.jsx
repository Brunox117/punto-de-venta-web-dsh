import { useDispatch, useSelector } from "react-redux";
import {
  setActivePost,
  startDeletingPostById,
} from "../../../store/slices/postSlice";
import { Button, Grid } from "@mui/material";
import { Post } from "./Post";

export const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const onEdit = (post) => {
    dispatch(setActivePost(post));
  };
  const onDelete = (post) => {
    dispatch(startDeletingPostById(post));
  };
  return (
      <Grid container >
        {posts.map((post) => (
          <Grid item key={post.id}>
            <Post post={post} onEdit={onEdit} onDelete={onDelete} />
          </Grid>
        ))}
        
      </Grid>
  );
};
