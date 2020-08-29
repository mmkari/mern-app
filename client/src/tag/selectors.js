import { createSelector } from 'reselect';
const getTagsById = (state) => state.tagReducers.tagsById;

const getTags = createSelector(
  [getTagsById],
  (tagsById) => {
    if (tagsById) {
      // return Object.values(tagsById)

      // generate map
      const map = {};
      const res = [];
      const items = Object.values(tagsById).map((o) => ({ ...o })); // clone array of objects
      // initialize map
      items.forEach((item) => {
        map[item.id] = item;
        map[item.id].children = [];
      });
      // add children
      items.forEach((item) => {
        if (item.parentId) {
          if (map[item.parentId]) {
            map[item.parentId].children.push(item);
          } else {
            res.push(item); // REMOVE!
          }
          // otherwise tag is orphaned
        } else {
          // it's a root
          res.push(item);
        }
      });
      return res;
    }
    return null;
  }
);

export { getTags, getTagsById };
