import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/router/custom-serializer";
import { getCurrentRoute } from "src/app/router/router.selector";
import { postsAdapter, PostsState } from "./posts.state";

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);

export const getPostsEntities = createSelector(getPostsState, postsSelectors.selectEntities);

export const getPostById = createSelector(
    getPostsEntities,
    getCurrentRoute,
    (posts, route:RouterStateUrl) => {
        return posts? posts[route.params['id']] : null
});

export const getCount = createSelector(
    getPostsState,
    (state)=> state.count
)