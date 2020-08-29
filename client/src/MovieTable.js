import * as React from 'react';
import { AutoSizer, Table, Column, SortDirection } from 'react-virtualized';
import 'react-virtualized/styles.css';

import { StarPicker } from 'react-star-picker';

import { Link, withRouter } from 'react-router-dom';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import TagDisplay from './tag/components/TagDisplay';
import RatingDisplay from 'react-verdict';

const LinkCell = ({ cellData, rowData, rowIndex, history }) => {
  return <Link to={`/item/${rowData.id}`}>{cellData}</Link>;
};
const TagsCell = ({ cellData, rowData, rowIndex, history }) => {
  // TODO handle list of tags
  const tag = cellData[0];
  return <div>{tag ? <TagDisplay value={tag} /> : 'none'}</div>;
};
const LinkColumn = withRouter(LinkCell);

class MovieTable extends React.Component {
  render() {
    const {
      data,
      onRatingChange,
      height,
      onSort,
      sort,
      sortBy,
      sortDirection,
      averageRatingsByMovieId,
    } = this.props;

    const tableHeight = !Number.isNaN(height) ? height : 500;

    return (
      <div className="Table">
        <div style={{ backgroundColor: 'ghostwhite' }}>
          <AutoSizer disableHeight>
            {({ width }) => {
              const unitWidth = width / 9.0;
              return (
                <Table
                  ref="Table"
                  headerHeight={30}
                  height={tableHeight}
                  rowHeight={40}
                  rowCount={data.length}
                  rowGetter={({ index }) => data[index]}
                  width={width}
                  onSort={onSort}
                  sort={this._sort}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                >
                  <Column
                    label="Title"
                    dataKey="title"
                    width={3 * unitWidth}
                    cellRenderer={LinkColumn}
                  />
                  <Column
                    label="Tags"
                    dataKey="tags"
                    width={3 * unitWidth}
                    cellRenderer={TagsCell}
                    disableSort
                  />

                  <Column
                    label="Average Rating"
                    dataKey="averageRating"
                    width={3 * unitWidth}
                    cellRenderer={({
                      cellData: averageRating,
                      rowIndex,
                      rowData,
                    }) => {
                      // const avgRating =
                      //   averageRatingsByMovieId && averageRatingsByMovieId[id]
                      //     ? averageRatingsByMovieId[id]
                      //     : null;
                      if (averageRating) {
                        return <RatingDisplay value={averageRating || null} />;
                      }
                      return null;
                    }}
                  />
                  <Column
                    label="Fixed"
                    dataKey="fixed"
                    width={3 * unitWidth}
                    disableSort
                  />
                  <Column
                    label="Manage"
                    dataKey="id"
                    width={3 * unitWidth}
                    cellRenderer={({ cellData }) => {
                      return (
                        <DeleteConfirmationDialog
                          onAccept={() => this.props.deleteMovie(cellData)}
                        />
                      );
                    }}
                    disableSort
                  />
                </Table>
              );
            }}
          </AutoSizer>
        </div>
      </div>
    );
  }

  _sort = ({ sortBy, sortDirection }) => {
    const { sortBy: prevSortBy, sortDirection: prevSortDirection } = this.props;

    // CLEAR sortBy and sortDirection if
    if (prevSortDirection === SortDirection.DESC) {
      sortBy = undefined;
      sortDirection = undefined;
    }
    this.props.onSort({ sortBy, sortDirection });
  };
}

export default MovieTable;
