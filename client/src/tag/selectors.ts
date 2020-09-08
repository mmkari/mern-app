import { createSelector } from 'reselect';
import { Tag, TagsByIdMap, TagNode } from 'tag/types';
import { RootState } from 'core/types';

const getTagsById = (state: RootState): TagsByIdMap =>
  state.tagReducers.tagsById;

const getTags = createSelector(
  [getTagsById],
  (tagsById) => {
    if (tagsById) {
      // return Object.values(tagsById)

      // generate map
      const map: { [id: string]: TagNode } = {};
      const res: Tag[] = [];
      const items = Object.values(tagsById).map((o) => ({ ...o })); // clone array of objects
      // initialize map
      items.forEach((item) => {
        map[item.id] = item;
        map[item.id].children = [];
      });
      // add children
      items.forEach((item) => {
        if (item.parentId) {
          const parent: TagNode = map[item.parentId];
          if (parent && parent.children) {
            parent.children.push(item);
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
